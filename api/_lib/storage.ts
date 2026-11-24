// Storage for contact form submissions.
//
// - Production (Vercel) and any environment with MONGODB_URI set: MongoDB
//   (the CICF Atlas cluster). Every submission is inserted into the
//   `contact_submissions` collection, and the admin panel reads from the same
//   collection — so what the admin sees is exactly what is stored in MongoDB.
// - Local development without MONGODB_URI: submissions are written to
//   .data/contact-submissions.json (gitignored). This fallback is refused on
//   Vercel, whose filesystem is not persistent.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { type Db, MongoClient, type ObjectId } from "mongodb";
import type { ContactInput } from "../../src/lib/contactValidation.js";

export interface ContactSubmission extends ContactInput {
  id: string;
  submittedAt: string; // ISO 8601
}

/** Shape of a submission document in MongoDB. */
interface SubmissionDocument extends ContactInput {
  _id?: ObjectId;
  submittedAt: Date; // stored as a BSON date (holds both date and time, UTC)
}

interface RateLimitDocument {
  _id: string;
  count: number;
  expiresAt: Date;
}

const SUBMISSIONS_COLLECTION = "contact_submissions";
const RATE_LIMITS_COLLECTION = "rate_limits";
const DEFAULT_DB_NAME = "cicf_website";
/** Upper bound on how many submissions the admin list returns. */
export const MAX_LISTED_SUBMISSIONS = 1000;

// ---------------------------------------------------------------------------
// MongoDB connection (reused across invocations of a warm serverless function)
// ---------------------------------------------------------------------------

const globalForMongo = globalThis as typeof globalThis & {
  __cicfMongoDb?: Promise<Db>;
};

async function connect(uri: string): Promise<Db> {
  const client = new MongoClient(uri, {
    // Serverless functions handle one request at a time; keep the pool small
    // so many concurrent instances don't exhaust the cluster's connections.
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 8000,
    appName: "cicf-website",
  });
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || DEFAULT_DB_NAME);

  // Idempotent; runs once per cold start. A missing createIndex permission
  // must not take the contact form down, so failures are only logged.
  await Promise.all([
    db.collection(SUBMISSIONS_COLLECTION).createIndex({ submittedAt: -1 }),
    // TTL index: MongoDB deletes rate-limit counters once they expire.
    db.collection(RATE_LIMITS_COLLECTION).createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]).catch((error) => console.error("[storage] Could not create MongoDB indexes:", error));

  return db;
}

/** Returns the database, or null when MongoDB isn't configured (local dev). */
function getDb(): Promise<Db> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.VERCEL) {
      throw new Error("MongoDB is not configured. Set MONGODB_URI.");
    }
    return null;
  }
  if (!globalForMongo.__cicfMongoDb) {
    globalForMongo.__cicfMongoDb = connect(uri).catch((error) => {
      // Don't cache a failed connection; the next request retries.
      globalForMongo.__cicfMongoDb = undefined;
      throw error;
    });
  }
  return globalForMongo.__cicfMongoDb;
}

function toSubmission(doc: SubmissionDocument & { _id: ObjectId }): ContactSubmission {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
    message: doc.message,
    submittedAt: doc.submittedAt.toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Local JSON file fallback (development only)
// ---------------------------------------------------------------------------

const DATA_FILE = path.join(process.cwd(), ".data", "contact-submissions.json");
let fileWriteQueue: Promise<unknown> = Promise.resolve();

async function readFileSubmissions(): Promise<ContactSubmission[]> {
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf8")) as ContactSubmission[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function appendFileSubmission(submission: ContactSubmission): Promise<void> {
  // Serialise writes so concurrent submissions don't clobber each other.
  const write = fileWriteQueue.then(async () => {
    const existing = await readFileSubmissions();
    await mkdir(path.dirname(DATA_FILE), { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify([submission, ...existing], null, 2));
  });
  fileWriteQueue = write.catch(() => undefined);
  return write;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function saveSubmission(input: ContactInput): Promise<ContactSubmission> {
  const submittedAt = new Date();

  const dbPromise = getDb();
  if (dbPromise) {
    const db = await dbPromise;
    const doc: SubmissionDocument = {
      name: input.name,
      email: input.email,
      message: input.message,
      submittedAt,
    };
    const { insertedId } = await db
      .collection<SubmissionDocument>(SUBMISSIONS_COLLECTION)
      .insertOne(doc);
    return toSubmission({ ...doc, _id: insertedId });
  }

  const submission: ContactSubmission = {
    id: randomUUID(),
    ...input,
    submittedAt: submittedAt.toISOString(),
  };
  await appendFileSubmission(submission);
  return submission;
}

/** Returns submissions, newest first. */
export async function listSubmissions(): Promise<ContactSubmission[]> {
  const dbPromise = getDb();
  if (dbPromise) {
    const db = await dbPromise;
    const docs = await db
      .collection<SubmissionDocument>(SUBMISSIONS_COLLECTION)
      .find({})
      .sort({ submittedAt: -1 })
      .limit(MAX_LISTED_SUBMISSIONS)
      .toArray();
    return docs.map(toSubmission);
  }
  const submissions = await readFileSubmissions();
  return submissions.slice(0, MAX_LISTED_SUBMISSIONS);
}

// ---------------------------------------------------------------------------
// Fixed-window rate limiting (used for contact spam + login brute force)
// ---------------------------------------------------------------------------

const memoryCounters = new Map<string, { count: number; resetAt: number }>();

/**
 * Increments the counter for `key` and returns true if the caller is still
 * within `limit` hits for the current `windowSeconds` window.
 */
export async function consumeRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const dbPromise = getDb();
  if (dbPromise) {
    const db = await dbPromise;
    const now = new Date();
    const windowActive = { $gt: ["$expiresAt", now] };
    // One atomic upsert: increment inside an active window, otherwise start a
    // new window. (Both $set fields read the document as it was before.)
    const doc = await db.collection<RateLimitDocument>(RATE_LIMITS_COLLECTION).findOneAndUpdate(
      { _id: key },
      [
        {
          $set: {
            count: { $cond: [windowActive, { $add: ["$count", 1] }, 1] },
            expiresAt: {
              $cond: [windowActive, "$expiresAt", new Date(now.getTime() + windowSeconds * 1000)],
            },
          },
        },
      ],
      { upsert: true, returnDocument: "after" }
    );
    return (doc?.count ?? 1) <= limit;
  }

  const now = Date.now();
  const entry = memoryCounters.get(key);
  if (!entry || entry.resetAt <= now) {
    memoryCounters.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

export async function resetRateLimit(key: string): Promise<void> {
  const dbPromise = getDb();
  if (dbPromise) {
    const db = await dbPromise;
    await db.collection<RateLimitDocument>(RATE_LIMITS_COLLECTION).deleteOne({ _id: key });
  } else {
    memoryCounters.delete(key);
  }
}

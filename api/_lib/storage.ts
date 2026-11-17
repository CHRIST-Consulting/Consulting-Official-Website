// Storage for contact form submissions.
//
// - Production (Vercel): Upstash Redis. Configure either
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or the KV_REST_API_URL +
//   KV_REST_API_TOKEN variables that Vercel's Upstash integration injects.
// - Local development: if Redis isn't configured, submissions are written to
//   .data/contact-submissions.json (gitignored). This fallback is refused on
//   Vercel, whose filesystem is not persistent.
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import type { ContactInput } from "../../src/lib/contactValidation.js";

export interface ContactSubmission extends ContactInput {
  id: string;
  submittedAt: string; // ISO 8601
}

const SUBMISSIONS_KEY = "contact:submissions";
/** Upper bound on how many submissions the admin list returns. */
export const MAX_LISTED_SUBMISSIONS = 1000;

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  redisClient = url && token ? new Redis({ url, token }) : null;
  if (!redisClient && process.env.VERCEL) {
    throw new Error(
      "Upstash Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }
  return redisClient;
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
  const submission: ContactSubmission = {
    id: randomUUID(),
    ...input,
    submittedAt: new Date().toISOString(),
  };

  const redis = getRedis();
  if (redis) {
    // LPUSH keeps the newest submission at the head of the list.
    await redis.lpush(SUBMISSIONS_KEY, submission);
  } else {
    await appendFileSubmission(submission);
  }
  return submission;
}

/** Returns submissions, newest first. */
export async function listSubmissions(): Promise<ContactSubmission[]> {
  const redis = getRedis();
  if (redis) {
    return redis.lrange<ContactSubmission>(SUBMISSIONS_KEY, 0, MAX_LISTED_SUBMISSIONS - 1);
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
  const redis = getRedis();
  if (redis) {
    const redisKey = `ratelimit:${key}`;
    const count = await redis.incr(redisKey);
    if (count === 1) await redis.expire(redisKey, windowSeconds);
    return count <= limit;
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
  const redis = getRedis();
  if (redis) await redis.del(`ratelimit:${key}`);
  else memoryCounters.delete(key);
}

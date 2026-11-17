// Single-admin authentication.
//
// Credentials come from environment variables (never from code):
//   ADMIN_USERNAME       – admin login name
//   ADMIN_PASSWORD_HASH  – "scrypt:N:r:p:<salt>:<key>" (base64url), generated
//                          by `npm run hash-password`
//   SESSION_SECRET       – >= 32 random characters used to sign sessions
//
// A successful login sets an HttpOnly, SameSite=Strict cookie containing a
// payload + HMAC-SHA256 signature. Sessions are stateless and expire after
// SESSION_TTL_SECONDS. The signing key also mixes in the password hash, so
// changing the admin password invalidates every existing session.
import { createHash, createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { type ApiRequest, HttpError, parseCookies } from "./http.js";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem: number }
) => Promise<Buffer>;

const SESSION_COOKIE = "cicf_admin_session";
const SESSION_COOKIE_PATH = "/api/admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

interface AuthConfig {
  username: string;
  passwordHash: string;
  sessionSecret: string;
}

export interface AdminSession {
  username: string;
  expiresAt: number; // epoch ms
}

function getAuthConfig(): AuthConfig {
  const username = process.env.ADMIN_USERNAME?.trim() ?? "";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim() ?? "";
  const sessionSecret = process.env.SESSION_SECRET ?? "";

  const problems: string[] = [];
  if (!username) problems.push("ADMIN_USERNAME is missing");
  if (!passwordHash.startsWith("scrypt:")) problems.push("ADMIN_PASSWORD_HASH is missing or invalid");
  if (sessionSecret.length < 32) problems.push("SESSION_SECRET must be at least 32 characters");

  if (problems.length > 0) {
    console.error(`[auth] Admin login is not configured: ${problems.join("; ")}.`);
    throw new HttpError(503, "Admin login is not configured on the server.");
  }
  return { username, passwordHash, sessionSecret };
}

/** Constant-time string comparison (hashing first equalises lengths). */
function safeEqual(a: string, b: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, r, p, saltB64, keyB64] = stored.split(":");
  if (scheme !== "scrypt" || !saltB64 || !keyB64) return false;

  const N = Number(n);
  const R = Number(r);
  const P = Number(p);
  const expected = Buffer.from(keyB64, "base64url");
  const derived = await scryptAsync(password, Buffer.from(saltB64, "base64url"), expected.length, {
    N,
    r: R,
    p: P,
    maxmem: 256 * N * R,
  });
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

/** Checks a username/password pair against the configured admin account. */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const config = getAuthConfig();
  // Always run scrypt so a wrong username takes as long as a wrong password.
  const passwordOk = await verifyPassword(password, config.passwordHash);
  return safeEqual(username, config.username) && passwordOk;
}

function sign(payload: string, config: AuthConfig): string {
  return createHmac("sha256", `${config.sessionSecret}:${config.passwordHash}`)
    .update(payload)
    .digest("base64url");
}

function createSessionToken(username: string): { token: string; session: AdminSession } {
  const config = getAuthConfig();
  const session: AdminSession = {
    username,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify({ u: session.username, exp: session.expiresAt })).toString(
    "base64url"
  );
  return { token: `${payload}.${sign(payload, config)}`, session };
}

/** Returns the current admin session, or null if absent/invalid/expired. */
export function getSession(req: ApiRequest): AdminSession | null {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;

  const config = getAuthConfig();
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload, config));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const { u, exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof u !== "string" || typeof exp !== "number") return null;
    if (exp <= Date.now() || !safeEqual(u, config.username)) return null;
    return { username: u, expiresAt: exp };
  } catch {
    return null;
  }
}

/** Throws a 401 HttpError unless the request carries a valid admin session. */
export function requireAdmin(req: ApiRequest): AdminSession {
  const session = getSession(req);
  if (!session) throw new HttpError(401, "Not signed in.");
  return session;
}

function cookieAttributes(req: ApiRequest, maxAgeSeconds: number): string {
  const isHttps =
    Boolean(process.env.VERCEL) || req.headers["x-forwarded-proto"] === "https";
  return [
    `Path=${SESSION_COOKIE_PATH}`,
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
    isHttps ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Creates a session and returns the Set-Cookie header value for it. */
export function createSessionCookie(
  req: ApiRequest,
  username: string
): { cookie: string; session: AdminSession } {
  const { token, session } = createSessionToken(username);
  return {
    cookie: `${SESSION_COOKIE}=${token}; ${cookieAttributes(req, SESSION_TTL_SECONDS)}`,
    session,
  };
}

export function clearSessionCookie(req: ApiRequest): string {
  return `${SESSION_COOKIE}=; ${cookieAttributes(req, 0)}`;
}

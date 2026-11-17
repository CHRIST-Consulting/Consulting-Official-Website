// Small HTTP helpers that work both on Vercel's Node runtime and in the Vite
// dev middleware (see vite.config.ts). Files/folders prefixed with "_" inside
// /api are not deployed as endpoints by Vercel.
import type { IncomingMessage, ServerResponse } from "node:http";

export type ApiRequest = IncomingMessage & { body?: unknown };
export type ApiResponse = ServerResponse;

const MAX_BODY_BYTES = 32 * 1024;

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export function sendJson(res: ApiResponse, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export function requireMethod(req: ApiRequest, res: ApiResponse, method: string): boolean {
  if (req.method === method) return true;
  res.setHeader("Allow", method);
  sendJson(res, 405, { error: "Method not allowed." });
  return false;
}

/** Reads and parses a JSON request body (requires a JSON content type). */
export async function readJsonBody(req: ApiRequest): Promise<unknown> {
  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new HttpError(415, "Expected a JSON request body.");
  }

  // Vercel pre-parses the body and exposes it as req.body.
  if (req.body !== undefined) {
    if (typeof req.body === "string" || Buffer.isBuffer(req.body)) {
      return parseJson(req.body.toString());
    }
    return req.body;
  }

  // Plain Node request (Vite dev server): read the stream ourselves.
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new HttpError(413, "Request body too large.");
    chunks.push(chunk as Buffer);
  }
  return parseJson(Buffer.concat(chunks).toString("utf8"));
}

function parseJson(text: string): unknown {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new HttpError(400, "Malformed JSON body.");
  }
}

export function getClientIp(req: ApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

export function parseCookies(req: ApiRequest): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").flatMap((part) => {
      const index = part.indexOf("=");
      if (index < 0) return [];
      const key = part.slice(0, index).trim();
      const value = part.slice(index + 1).trim();
      try {
        return [[key, decodeURIComponent(value)]];
      } catch {
        return [];
      }
    })
  );
}

/** Converts thrown errors into a JSON response without leaking internals. */
export function handleError(res: ApiResponse, error: unknown, context: string): void {
  if (error instanceof HttpError) {
    sendJson(res, error.status, { error: error.message, ...error.details });
    return;
  }
  console.error(`[${context}]`, error);
  sendJson(res, 500, { error: "Something went wrong. Please try again later." });
}

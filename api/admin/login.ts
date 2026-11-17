// POST /api/admin/login — { username, password } → sets the session cookie.
import { createSessionCookie, verifyCredentials } from "../_lib/auth.js";
import {
  type ApiRequest,
  type ApiResponse,
  getClientIp,
  handleError,
  readJsonBody,
  requireMethod,
  sendJson,
} from "../_lib/http.js";
import { consumeRateLimit, resetRateLimit } from "../_lib/storage.js";

const MAX_ATTEMPTS = 10;
const WINDOW_SECONDS = 15 * 60;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const body = (await readJsonBody(req)) as Record<string, unknown>;
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || !password || username.length > 200 || password.length > 1024) {
      sendJson(res, 400, { error: "Please enter your username and password." });
      return;
    }

    const rateLimitKey = `login:${getClientIp(req)}`;
    if (!(await consumeRateLimit(rateLimitKey, MAX_ATTEMPTS, WINDOW_SECONDS))) {
      sendJson(res, 429, { error: "Too many login attempts. Please wait 15 minutes and try again." });
      return;
    }

    if (!(await verifyCredentials(username, password))) {
      sendJson(res, 401, { error: "Invalid username or password." });
      return;
    }

    await resetRateLimit(rateLimitKey);
    const { cookie, session } = createSessionCookie(req, username);
    res.setHeader("Set-Cookie", cookie);
    sendJson(res, 200, { authenticated: true, ...session });
  } catch (error) {
    handleError(res, error, "api/admin/login");
  }
}

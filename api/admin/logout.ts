// POST /api/admin/logout — clears the session cookie.
import { clearSessionCookie } from "../_lib/auth.js";
import { type ApiRequest, type ApiResponse, requireMethod, sendJson } from "../_lib/http.js";

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, "POST")) return;
  res.setHeader("Set-Cookie", clearSessionCookie(req));
  sendJson(res, 200, { authenticated: false });
}

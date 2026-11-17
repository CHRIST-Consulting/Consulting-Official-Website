// GET /api/admin/session — lets the admin UI check whether it is signed in.
import { getSession } from "../_lib/auth.js";
import {
  type ApiRequest,
  type ApiResponse,
  handleError,
  requireMethod,
  sendJson,
} from "../_lib/http.js";

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    const session = getSession(req);
    sendJson(res, 200, session ? { authenticated: true, ...session } : { authenticated: false });
  } catch (error) {
    handleError(res, error, "api/admin/session");
  }
}

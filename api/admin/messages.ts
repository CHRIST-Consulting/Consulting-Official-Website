// GET /api/admin/messages — contact form submissions, newest first (admin only).
import { requireAdmin } from "../_lib/auth.js";
import {
  type ApiRequest,
  type ApiResponse,
  handleError,
  requireMethod,
  sendJson,
} from "../_lib/http.js";
import { listSubmissions } from "../_lib/storage.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, "GET")) return;

  try {
    requireAdmin(req);
    const submissions = await listSubmissions();
    sendJson(res, 200, { submissions });
  } catch (error) {
    handleError(res, error, "api/admin/messages");
  }
}

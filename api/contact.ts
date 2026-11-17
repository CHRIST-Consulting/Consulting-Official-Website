// POST /api/contact — public endpoint used by the contact form on the home page.
import { validateContactInput } from "../src/lib/contactValidation.js";
import {
  type ApiRequest,
  type ApiResponse,
  getClientIp,
  handleError,
  readJsonBody,
  requireMethod,
  sendJson,
} from "./_lib/http.js";
import { consumeRateLimit, saveSubmission } from "./_lib/storage.js";

const SUBMISSIONS_PER_WINDOW = 5;
const WINDOW_SECONDS = 10 * 60;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const body = (await readJsonBody(req)) as Record<string, unknown>;

    // Honeypot: real visitors never see or fill the hidden "website" field.
    // Pretend success so bots don't learn they were filtered.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      sendJson(res, 200, { ok: true });
      return;
    }

    const { data, errors } = validateContactInput(body);
    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, { error: "Please fix the highlighted fields.", fieldErrors: errors });
      return;
    }

    const withinLimit = await consumeRateLimit(
      `contact:${getClientIp(req)}`,
      SUBMISSIONS_PER_WINDOW,
      WINDOW_SECONDS
    );
    if (!withinLimit) {
      sendJson(res, 429, {
        error: "Too many messages from your network. Please try again in a few minutes.",
      });
      return;
    }

    const submission = await saveSubmission(data);

    // TODO(email-notifications): Once IT approves SMTP/email API access, send a
    // notification to consultancy@christuniversity.in here (and optionally an
    // acknowledgement to `submission.email`). Do it after saving so a mail
    // failure never loses the submission — catch and log errors rather than
    // failing the request. Read credentials from env vars, never hardcode them.

    sendJson(res, 201, { ok: true, id: submission.id });
  } catch (error) {
    handleError(res, error, "api/contact");
  }
}

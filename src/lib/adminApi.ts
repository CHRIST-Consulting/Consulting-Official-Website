// Browser-side client for the admin API in /api/admin/*.
// The session lives in an HttpOnly cookie, so nothing is stored in JS.

export interface AdminSession {
  authenticated: boolean;
  username?: string;
  expiresAt?: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "same-origin",
      ...init,
      headers: { Accept: "application/json", ...init?.headers },
    });
  } catch {
    throw new AdminApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AdminApiError(response.status, data.error ?? `Request failed (${response.status}).`);
  }
  return data as T;
}

export const adminApi = {
  getSession: () => request<AdminSession>("/api/admin/session"),

  login: (username: string, password: string) =>
    request<AdminSession>("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),

  logout: () => request<AdminSession>("/api/admin/logout", { method: "POST" }),

  getMessages: () =>
    request<{ submissions: ContactSubmission[] }>("/api/admin/messages").then(
      (data) => data.submissions
    ),
};

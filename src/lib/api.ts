const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

export const getAuthToken = () => localStorage.getItem("cicf_admin_token");
export const setAuthToken = (token: string) => localStorage.setItem("cicf_admin_token", token);
export const removeAuthToken = () => localStorage.removeItem("cicf_admin_token");

export const getAdminUser = () => {
  const user = localStorage.getItem("cicf_admin_user");
  return user ? JSON.parse(user) : null;
};
export const setAdminUser = (user: any) => localStorage.setItem("cicf_admin_user", JSON.stringify(user));
export const removeAdminUser = () => localStorage.removeItem("cicf_admin_user");

// Generic authenticated fetch wrapper
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      removeAdminUser();
    }
    throw new Error(data.message || "An error occurred while connecting to server.");
  }

  return data;
}

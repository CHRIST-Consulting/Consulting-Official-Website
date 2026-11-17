import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminApi, AdminApiError } from "@/lib/adminApi";

const inputClass =
  "w-full px-4 py-3 bg-white border-2 border-accent/20 rounded-xl text-charcoal placeholder-slate-400 focus:outline-none focus:border-accent transition-colors duration-200";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Already signed in? Go straight to the messages page.
  useEffect(() => {
    let cancelled = false;
    adminApi
      .getSession()
      .then((session) => {
        if (!cancelled && session.authenticated) navigate("/admin/messages", { replace: true });
      })
      .catch(() => {
        /* Stay on the login page; errors surface when the user submits. */
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await adminApi.login(username.trim(), password);
      navigate("/admin/messages", { replace: true });
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Login failed. Please try again.");
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Sign in">
      <div className="max-w-md mx-auto mt-6 sm:mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary font-heading text-center mb-1">
            Admin sign in
          </h1>
          <p className="text-slate-500 text-sm text-center mb-8">
            Authorised CICF staff only.
          </p>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="admin-username" className="block text-charcoal font-semibold mb-2">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-charcoal font-semibold mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-base"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Lock />}
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLoginPage;

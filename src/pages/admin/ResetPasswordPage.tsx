import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Lock, ArrowLeft, AlertCircle, CheckCircle2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { apiRequest } from "../../lib/api";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, email, newPassword }),
      });
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2a4d] via-[#163a66] to-[#0a1f3d] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-md text-center shadow-2xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2 font-heading">Invalid or Expired Link</h2>
          <p className="text-charcoal-light text-xs mb-6 leading-relaxed">
            This password reset link is invalid or incomplete. Please request a new recovery email.
          </p>
          <Link
            to="/admin/forgot-password"
            className="inline-flex items-center gap-2 text-royal-blue hover:text-primary text-xs font-bold uppercase tracking-wider font-heading"
          >
            <ArrowLeft className="w-4 h-4" /> Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2a4d] via-[#163a66] to-[#0a1f3d] flex items-center justify-center p-4 relative overflow-hidden font-body">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <img
                src="/images/CICF_LOGO.png"
                alt="CHRIST Consulting Logo"
                className="max-h-[50px] w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DAA520]/15 text-[#B8860B] border border-[#DAA520]/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Security Update
            </div>
            <h1 className="text-2xl font-bold text-primary font-heading">Set New Password</h1>
            <p className="text-charcoal-light text-xs mt-1">
              Create a secure new password for your CICF Admin account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 font-heading">Password Reset Complete!</h3>
              <p className="text-xs text-charcoal-light mb-6">
                Redirecting you to the login screen in 3 seconds...
              </p>
              <Link
                to="/admin/login"
                className="inline-block py-3 px-6 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider font-heading"
              >
                Go to Login Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2 font-heading">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-11 pr-4 py-3 bg-secondary/60 border border-slate-200 rounded-xl text-charcoal placeholder-slate-400 text-sm focus:outline-none focus:border-royal-blue focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2 font-heading">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-11 pr-4 py-3 bg-secondary/60 border border-slate-200 rounded-xl text-charcoal placeholder-slate-400 text-sm focus:outline-none focus:border-royal-blue focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-royal-blue hover:from-primary-dark hover:to-primary text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer font-heading tracking-wide"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  "Update & Save Password"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Loader2, KeyRound, Sparkles } from "lucide-react";
import { apiRequest } from "../../lib/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to process password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2a4d] via-[#163a66] to-[#0a1f3d] flex items-center justify-center p-4 relative overflow-hidden font-body">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DAA520]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#78bdf2]/15 rounded-full blur-3xl pointer-events-none" />

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
              <KeyRound className="w-3.5 h-3.5" />
              Account Recovery
            </div>
            <h1 className="text-2xl font-bold text-primary font-heading">Reset Password</h1>
            <p className="text-charcoal-light text-xs mt-1">
              Enter your registered email to receive an official recovery link
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 font-heading">Check Your Inbox</h3>
              <p className="text-xs text-charcoal-light leading-relaxed mb-6">
                If an account exists with <strong>{email}</strong>, a recovery link has been dispatched via Google Apps Script from <em>consultancy@christuniversity.in</em>.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-royal-blue hover:text-primary uppercase tracking-wider font-heading"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2 font-heading">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="consultancy@christuniversity.in"
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
                    Sending Recovery Link...
                  </>
                ) : (
                  "Send Recovery Email"
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

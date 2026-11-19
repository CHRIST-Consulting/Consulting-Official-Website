import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { apiRequest, setAuthToken, setAdminUser } from "../../lib/api";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAuthToken(data.token);
      setAdminUser(data.user);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2a4d] via-[#163a66] to-[#0a1f3d] flex items-center justify-center p-4 relative overflow-hidden font-body">
      {/* Decorative Gold & Blue Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DAA520]/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#78bdf2]/15 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <img
                src="/images/CICF_LOGO.png"
                alt="CHRIST Consulting Logo"
                className="max-h-[52px] w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DAA520]/15 text-[#B8860B] border border-[#DAA520]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Administrative Portal
            </div>
            <h1 className="text-2xl font-bold text-primary font-heading">Sign In to Dashboard</h1>
            <p className="text-charcoal-light text-xs mt-1">
              CHRIST Incubation and Consultancy Foundation
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-left">
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider font-heading">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-semibold text-royal-blue hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-secondary/60 border border-slate-200 rounded-xl text-charcoal placeholder-slate-400 text-sm focus:outline-none focus:border-royal-blue focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-primary to-royal-blue hover:from-primary-dark hover:to-primary text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-60 cursor-pointer font-heading tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Admin
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              &larr; Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

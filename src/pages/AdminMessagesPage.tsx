import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Clock, Inbox, Loader2, LogOut, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminApi, AdminApiError, type ContactSubmission } from "@/lib/adminApi";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date);
};

const AdminMessagesPage = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setSubmissions(await adminApi.getMessages());
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(err instanceof AdminApiError ? err.message : "Could not load messages.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  const actions = (
    <>
      <Button
        onClick={loadMessages}
        disabled={isLoading}
        variant="ghost"
        className="text-white hover:bg-white/10 hover:text-white"
        aria-label="Refresh messages"
      >
        <RefreshCw className={isLoading ? "animate-spin" : ""} />
        <span className="hidden sm:inline">Refresh</span>
      </Button>
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="text-white hover:bg-white/10 hover:text-white"
      >
        <LogOut />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </>
  );

  return (
    <AdminLayout title="Contact messages" actions={actions}>
      <div className="flex flex-wrap items-end justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
            Contact form messages
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Submissions from the website contact form, newest first.
          </p>
        </div>
        {submissions && (
          <span className="px-3 py-1 rounded-full bg-accent/10 text-primary text-sm font-semibold">
            {submissions.length} {submissions.length === 1 ? "message" : "messages"}
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading && !submissions && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      )}

      {submissions && submissions.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-charcoal font-semibold">No messages yet</p>
          <p className="text-slate-500 text-sm mt-1">
            New contact form submissions will appear here.
          </p>
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <ul className="space-y-4">
          {submissions.map((submission) => (
            <li
              key={submission.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-charcoal font-heading break-words">
                    {submission.name}
                  </h2>
                  <a
                    href={`mailto:${submission.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-primary-light hover:underline break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {submission.email}
                  </a>
                </div>
                <time
                  dateTime={submission.submittedAt}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 whitespace-nowrap"
                >
                  <Clock className="w-4 h-4" />
                  {formatDate(submission.submittedAt)}
                </time>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap break-words leading-relaxed border-t border-slate-100 pt-3">
                {submission.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
};

export default AdminMessagesPage;

import { useEffect, type ReactNode } from "react";

interface AdminLayoutProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * Shell for admin pages. Rendered without the public Navbar/Footer and marks
 * the page as noindex so search engines never list it.
 */
const AdminLayout = ({ title, actions, children }: AdminLayoutProps) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | CICF Admin`;

    // index.html ships a global robots meta tag; override it while on admin pages.
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const createdTag = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    const previousRobots = robots.content;
    robots.content = "noindex, nofollow";

    return () => {
      document.title = previousTitle;
      if (createdTag) robots.remove();
      else robots.content = previousRobots;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <header className="bg-primary text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/images/CICF_LOGO.png"
              alt="CICF"
              className="h-9 w-auto bg-white rounded-md p-1 shrink-0"
            />
            <span className="font-heading font-bold text-lg truncate">Admin Panel</span>
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">{children}</main>
    </div>
  );
};

export default AdminLayout;

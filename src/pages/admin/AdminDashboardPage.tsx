import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  Sparkles,
  Cpu,
  Calendar,
  Mail,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  X,
  Search,
  CheckCircle,
  Clock,
  Download,
  AlertTriangle,
  Eye,
  EyeOff,
  Shield,
  Key,
} from "lucide-react";
import { apiRequest, getAdminUser, removeAuthToken, removeAdminUser } from "../../lib/api";
import { FloatingBottomDock } from "../../components/admin/FloatingBottomDock";

type TabType = "inquiries" | "team" | "testimonials" | "expertise" | "labs" | "events" | "admins";

const AdminDashboardPage = () => {
  const adminUser = getAdminUser() || { name: "Admin", email: "consultancy@christuniversity.in", role: "editor" };
  const isSuperAdmin = adminUser.role === "superadmin";

  const [activeTab, setActiveTab] = useState<TabType>(isSuperAdmin ? "inquiries" : "team");
  const [items, setItems] = useState<any[]>([]);
  const [adminAccounts, setAdminAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [adminFormData, setAdminFormData] = useState({ name: "", email: "", password: "", role: "editor" });
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const navigate = useNavigate();

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch items for current tab
  const fetchTabItems = async (tab: TabType) => {
    setLoading(true);
    try {
      if (tab === "admins") {
        if (!isSuperAdmin) return;
        const data = await apiRequest("/auth/users");
        setAdminAccounts(Array.isArray(data) ? data : []);
      } else {
        const endpoint = tab === "inquiries" ? "/content/contact" : `/content/${tab}?all=true`;
        const data = await apiRequest(endpoint);
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to load data.", "error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabItems(activeTab);
  }, [activeTab]);

  const handleLogout = () => {
    removeAuthToken();
    removeAdminUser();
    navigate("/admin/login");
  };

  // Toggle Visibility (Eye icon)
  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const updated = await apiRequest(`/content/${activeTab}/${id}/toggle-visibility`, {
        method: "PATCH",
      });
      setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
      const isNowVisible = updated.isVisible !== false;
      showNotification(
        isNowVisible
          ? "Item is now live and visible on public website."
          : "Item is hidden from public website (draft mode)."
      );
    } catch (err: any) {
      showNotification(err.message || "Failed to toggle visibility.", "error");
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this item?")) return;

    try {
      const endpoint = activeTab === "inquiries" ? `/content/contact/${id}` : `/content/${activeTab}/${id}`;
      await apiRequest(endpoint, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item._id !== id));
      showNotification("Item deleted successfully.");
    } catch (err: any) {
      showNotification(err.message || "Failed to delete.", "error");
    }
  };

  // Save Content (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editItem) {
        // Update
        const updated = await apiRequest(`/content/${activeTab}/${editItem._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        setItems((prev) => prev.map((item) => (item._id === editItem._id ? updated : item)));
        showNotification("Item updated successfully!");
      } else {
        // Create
        const created = await apiRequest(`/content/${activeTab}`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        setItems((prev) => [created, ...prev]);
        showNotification("New item added successfully!");
      }
      setModalOpen(false);
      setEditItem(null);
      setFormData({});
    } catch (err: any) {
      showNotification(err.message || "Save failed.", "error");
    }
  };

  // Create new Admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiRequest("/auth/users", {
        method: "POST",
        body: JSON.stringify(adminFormData),
      });
      setAdminAccounts((prev) => [created, ...prev]);
      setAdminModalOpen(false);
      setAdminFormData({ name: "", email: "", password: "", role: "editor" });
      showNotification(`Admin account created for ${created.email}!`);
    } catch (err: any) {
      showNotification(err.message || "Failed to create admin.", "error");
    }
  };

  // Update Admin Password
  const handleUpdateAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    try {
      await apiRequest(`/auth/users/${selectedAdmin._id}`, {
        method: "PUT",
        body: JSON.stringify({ newPassword: newAdminPassword }),
      });
      setPasswordModalOpen(false);
      setNewAdminPassword("");
      showNotification(`Password updated successfully for ${selectedAdmin.email}!`);
    } catch (err: any) {
      showNotification(err.message || "Failed to update password.", "error");
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (id: string, email: string) => {
    if (!window.confirm(`Are you sure you want to remove admin access for ${email}?`)) return;
    try {
      await apiRequest(`/auth/users/${id}`, { method: "DELETE" });
      setAdminAccounts((prev) => prev.filter((a) => a._id !== id));
      showNotification("Admin account removed.");
    } catch (err: any) {
      showNotification(err.message || "Failed to delete admin.", "error");
    }
  };

  // Toggle Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      const updated = await apiRequest(`/content/contact/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(updated);
      }
      showNotification(`Status updated to "${status}"`);
    } catch (err: any) {
      showNotification(err.message || "Status update failed", "error");
    }
  };

  // Export Inquiries to CSV
  const exportInquiriesToCSV = () => {
    if (items.length === 0) return;
    const headers = ["Date", "Name", "Email", "Phone", "Organization", "Subject", "Status", "Message"];
    const rows = items.map((m) => [
      new Date(m.createdAt).toLocaleDateString(),
      `"${m.name || ""}"`,
      `"${m.email || ""}"`,
      `"${m.phone || ""}"`,
      `"${m.organization || ""}"`,
      `"${m.subject || ""}"`,
      `"${m.status || ""}"`,
      `"${(m.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CICF_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open modal for add
  const openAddModal = () => {
    setEditItem(null);
    if (activeTab === "team") {
      setFormData({ name: "", role: "", category: "Faculty Consultant", image: "", expertise: "", email: "", linkedin: "" });
    } else if (activeTab === "testimonials") {
      setFormData({ author: "", position: "", quote: "", logo: "", rating: 5 });
    } else if (activeTab === "expertise") {
      setFormData({ title: "", description: "", icon: "Briefcase", image: "" });
    } else if (activeTab === "labs") {
      setFormData({ name: "", description: "", campus: "Yeshwanthpur Campus", icon: "Cpu", image: "" });
    } else if (activeTab === "events") {
      setFormData({ title: "", category: "past events", date: "", venue: "CHRIST (Deemed to be University)", description: "" });
    }
    setModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (item: any) => {
    setEditItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  // Filter items by search
  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase();
    if (activeTab === "inquiries") {
      return (
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.subject?.toLowerCase().includes(q) ||
        item.organization?.toLowerCase().includes(q)
      );
    }
    return (
      item.name?.toLowerCase().includes(q) ||
      item.title?.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q) ||
      item.role?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-body relative overflow-x-hidden bg-[#0a0f1d]">
      {/* ================= MODERN EXECUTIVE ABSTRACT ART CANVAS WITH HIGH CONTRAST ================= */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-br from-[#090e1a] via-[#101827] to-[#0a0f1d]">
        {/* Layer 1: Subtle Champagne & Platinum Architectural Grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Layer 2: Contrasting Warm Architectural Gold Light Field (Top-Left) */}
        <div
          className="absolute -top-32 -left-32 w-[750px] h-[750px] rounded-full blur-[140px] opacity-[0.35] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #DAA520 0%, #F59E0B 40%, rgba(218, 165, 32, 0) 70%)",
          }}
        />

        {/* Contrasting Cool Electric Indigo Refraction (Top-Right) */}
        <div
          className="absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full blur-[150px] opacity-[0.32] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #2563eb 0%, #0284c7 45%, rgba(37, 99, 235, 0) 70%)",
          }}
        />

        {/* Layer 3: Modern Art Geometric Architectural Facets */}
        <div
          className="absolute top-1/4 right-[8%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.16] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #F7DC6F 0%, #DAA520 50%, transparent 75%)",
          }}
        />

        {/* Layer 4: Modern Executive Generative Sculptural Ribbons & Architectural Coordinates */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.42] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="artRibbonGoldWarm" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#DAA520" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="artRibbonPlatinumSky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Primary Warm Gold Sculptural Ribbon */}
          <path
            d="M -120,540 C 260,320 620,720 1080,420 C 1380,240 1560,460 1740,360"
            stroke="url(#artRibbonGoldWarm)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M -100,580 C 280,360 640,760 1100,460 C 1400,280 1580,500 1760,400"
            stroke="url(#artRibbonGoldWarm)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />

          {/* Contrasting Cool Platinum & Sky Ribbon */}
          <path
            d="M -80,180 C 340,360 720,80 1180,260 C 1440,380 1580,160 1740,280"
            stroke="url(#artRibbonPlatinumSky)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M -60,220 C 360,400 740,120 1200,300 C 1460,420 1600,200 1760,320"
            stroke="url(#artRibbonPlatinumSky)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />

          {/* Architectural Crosshair & Node Coordinate Markers */}
          <g opacity="0.6">
            <circle cx="1080" cy="420" r="5" fill="#FDE68A" />
            <circle cx="1080" cy="420" r="14" stroke="#DAA520" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="1180" cy="260" r="5" fill="#38bdf8" />
            <circle cx="1180" cy="260" r="14" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            {/* Fine modern coordinate crosshairs */}
            <path d="M 380,460 L 400,460 M 390,450 L 390,470" stroke="#FDE68A" strokeWidth="1.5" />
            <path d="M 1320,620 L 1340,620 M 1330,610 L 1330,630" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all transform animate-bounce ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* ================= TOP BRAND HEADER BAR ================= */}
      <header className="bg-[#0b192c]/95 backdrop-blur-xl border-b border-white/10 text-white sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-3 group">
              <img
                src="/images/CICF_LOGO.png"
                alt="CHRIST Logo"
                className="max-h-[44px] w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-102"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-4 py-1">
              <span className="text-xs font-black text-[#F7DC6F] tracking-wider font-heading uppercase drop-shadow-sm">
                Admin Suite
              </span>
              <span
                className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isSuperAdmin
                    ? "bg-[#DAA520]/25 text-[#F7DC6F] border border-[#DAA520]/50 shadow-sm"
                    : "bg-sky-400/20 text-sky-200 border border-sky-400/40"
                }`}
              >
                {adminUser.role === "superadmin" ? "Super Admin" : "Content Editor"}
              </span>
            </div>
          </div>

          {/* Right Menu Capsule */}
          <div className="flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_6px_20px_rgba(0,0,0,0.3)]">
            <div className="hidden md:flex flex-col text-right pr-2.5 border-r border-white/20">
              <span className="text-xs font-black text-white truncate max-w-[150px] leading-tight">{adminUser.name}</span>
              <span className="text-[10px] text-amber-200/90 font-medium truncate max-w-[150px] leading-tight">{adminUser.email}</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="Open Public Site in New Tab"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-950/40 border border-red-400/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
        {/* Luminous Gold Accent Baseline */}
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#DAA520]/70 to-transparent" />
      </header>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-36 sm:pb-40">
        {/* Section Heading & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading capitalize drop-shadow-md tracking-tight">
              {activeTab === "inquiries"
                ? "Client Enquiries & Requests"
                : activeTab === "admins"
                ? "Admin Account Governance"
                : `${activeTab} Management`}
            </h1>
            <p className="text-xs text-amber-200/90 font-medium mt-1">
              {activeTab === "inquiries"
                ? "Manage messages received from the public website contact form."
                : activeTab === "admins"
                ? "Manage admin credentials, roles, and permissions."
                : `Add, edit, delete, or temporarily toggle visibility for ${activeTab}.`}
            </p>
          </div>

          {activeTab !== "admins" && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F7DC6F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/70 border border-white/25 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/25 shadow-lg backdrop-blur-md transition-all"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="py-24 text-center text-sky-200 text-sm">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-3 text-sky-400" />
            Loading database records...
          </div>
        ) : activeTab === "admins" ? (
          /* ================= ADMIN ACCOUNTS MANAGEMENT ================= */
          <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04] text-[11px] uppercase text-slate-300 font-bold border-b border-white/10 font-heading tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Created Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {adminAccounts.map((adm) => (
                    <tr key={adm._id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{adm.name}</td>
                      <td className="px-6 py-4 text-slate-300 font-medium">{adm.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            adm.role === "superadmin"
                              ? "bg-[#DAA520]/20 text-[#F7DC6F] border-[#DAA520]/40"
                              : "bg-sky-500/20 text-sky-200 border-sky-400/30"
                          }`}
                        >
                          {adm.role === "superadmin" ? "Super Admin" : "Content Editor"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(adm.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedAdmin(adm);
                            setNewAdminPassword("");
                            setPasswordModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold border border-white/15 cursor-pointer transition-colors"
                        >
                          <Key className="w-3.5 h-3.5 text-sky-300" />
                          Change Pass
                        </button>
                        {adm._id !== adminUser._id && (
                          <button
                            onClick={() => handleDeleteAdmin(adm._id, adm.email)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors cursor-pointer"
                            title="Delete Admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 px-6 text-center bg-white/[0.07] backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#DAA520]/30 to-sky-400/20 border border-[#DAA520]/50 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/30">
              <Mail className="w-8 h-8 text-[#F7DC6F] stroke-[2.2]" />
            </div>
            <h3 className="text-white text-lg font-black font-heading tracking-tight drop-shadow-sm">
              No {activeTab === "inquiries" ? "Inquiries" : activeTab === "admins" ? "Admins" : activeTab} Found
            </h3>
            <p className="text-slate-300 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
              {searchQuery
                ? `No records match "${searchQuery}". Try clearing your search filter.`
                : `There are currently no records stored in this section.`}
            </p>
            {activeTab !== "inquiries" && !searchQuery && (
              <button
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] hover:brightness-110 text-slate-950 text-xs font-black shadow-lg shadow-[#DAA520]/20 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.8]" />
                <span>Add First Record</span>
              </button>
            )}
          </div>
        ) : activeTab === "inquiries" ? (
          /* ================= CONTACT INQUIRIES TABLE ================= */
          <div className="bg-slate-900/75 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04] text-[11px] uppercase text-slate-300 font-bold border-b border-white/10 font-heading tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredItems.map((inq) => (
                    <tr key={inq._id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-white">{inq.name}</p>
                        <p className="text-xs text-slate-400">{inq.email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-200 font-medium">
                        {inq.subject || "General Consultation"}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-300">
                        {inq.organization || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inq.status || "New"}
                          onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border outline-none cursor-pointer ${
                            inq.status === "Resolved"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                              : inq.status === "In Review"
                              ? "bg-amber-500/20 text-amber-300 border-amber-400/30"
                              : "bg-sky-500/20 text-sky-200 border-sky-400/30"
                          }`}
                        >
                          <option value="New" className="bg-slate-900 text-white">New</option>
                          <option value="In Review" className="bg-slate-900 text-white">In Review</option>
                          <option value="Resolved" className="bg-slate-900 text-white">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedMessage(inq)}
                          className="px-3.5 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 rounded-full text-xs font-bold cursor-pointer transition-colors"
                        >
                          Read
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================= CARD GRID FOR CONTENT ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full backdrop-blur-xl border ${
                  item.isVisible === false
                    ? "bg-slate-900/50 border-amber-500/35 opacity-75 shadow-lg shadow-black/20"
                    : "bg-slate-900/75 hover:bg-slate-900/90 border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
                }`}
              >
                {/* 1. Team Tab Card */}
                {activeTab === "team" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-16 h-16 min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shrink-0 shadow-md relative">
                        <img
                          src={item.image || "/images/teams/consultants/default.png"}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "/images/CICF_LOGO.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${
                            item.category === "Director"
                              ? "bg-[#DAA520]/20 text-[#F7DC6F] border border-[#DAA520]/40"
                              : item.category === "Student Leader"
                              ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                              : "bg-sky-500/20 text-sky-200 border border-sky-400/30"
                          }`}
                        >
                          {item.category || "Faculty"}
                        </span>
                        <h3 className="text-base font-bold text-white font-heading truncate leading-snug" title={item.name}>
                          {item.name}
                        </h3>
                        <p className="text-xs text-amber-300/90 font-medium truncate mt-0.5" title={item.role}>
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 mb-3">
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.expertise || "No bio/expertise specified."}
                      </p>
                      {item.email && (
                        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 shrink-0 text-sky-300" />
                          <span className="truncate">{item.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Testimonials Card */}
                {activeTab === "testimonials" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15">
                        Review
                      </span>
                    </div>

                    <div className="flex-1 mb-3">
                      <p className="text-xs text-slate-200 italic line-clamp-3 leading-relaxed bg-white/[0.04] p-3 rounded-xl border border-white/10">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      {item.logo ? (
                        <div className="w-10 h-10 min-w-[40px] max-w-[40px] rounded-xl overflow-hidden bg-white/10 border border-white/15 shrink-0 p-1 flex items-center justify-center shadow-sm">
                          <img src={item.logo} alt="" className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-gradient-to-tr from-sky-600 to-blue-800 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20">
                          {item.author?.charAt(0) || "T"}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-white font-heading truncate">{item.author}</h4>
                        <p className="text-xs text-slate-400 truncate">{item.position}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Expertise Card */}
                {activeTab === "expertise" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-sky-300 shrink-0 shadow-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15 mb-1">
                          Domain
                        </span>
                        <h3 className="text-base font-bold text-white font-heading leading-snug line-clamp-2" title={item.title}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex-1 mb-2">
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.points && item.points.length > 0 && (
                      <div className="space-y-1 mb-2">
                        {item.points.slice(0, 2).map((pt: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            <span className="truncate">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Research Labs Card */}
                {activeTab === "labs" && (
                  <div className="flex-1 flex flex-col">
                    {item.image ? (
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-800 border border-white/10 mb-3 shrink-0 shadow-inner">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-center text-sky-300 shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 truncate max-w-[200px]">
                        {item.campus || "Central Campus"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-heading mb-1 leading-snug line-clamp-2" title={item.name}>
                      {item.name}
                    </h3>

                    <div className="flex-1 mb-2">
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.equipment && item.equipment.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {item.equipment.slice(0, 3).map((eq: string, idx: number) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 border border-white/10 font-medium truncate max-w-[140px]">
                            {eq}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Events Card */}
                {activeTab === "events" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          item.category === "upcoming"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                            : item.category === "industry connects"
                            ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                            : "bg-white/10 text-slate-300 border border-white/15"
                        }`}
                      >
                        {item.category || "past events"}
                      </span>
                      <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-heading mt-1 mb-1 leading-snug line-clamp-2" title={item.title}>
                      {item.title}
                    </h3>

                    {item.venue && (
                      <p className="text-[11px] text-slate-400 font-medium mb-2 truncate">
                        📍 {item.venue}
                      </p>
                    )}

                    <div className="flex-1 mb-2">
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Common Uniform Card Footer */}
                <div className="pt-3.5 mt-auto border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">#{item._id.slice(-5)}</span>
                    {item.isVisible === false && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleVisibility(item._id, item.isVisible !== false)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        item.isVisible !== false
                          ? "text-emerald-400 hover:bg-emerald-500/20"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/10"
                      }`}
                      title={item.isVisible !== false ? "Visible on website (Click to hide)" : "Hidden from website (Click to show)"}
                    >
                      {item.isVisible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD NEW ADMIN ================= */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-primary mb-1 font-heading">Add New Administrator</h2>
            <p className="text-xs text-charcoal-light mb-6">
              Create credentials for an authorized CICF team member.
            </p>

            <form onSubmit={handleCreateAdmin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={adminFormData.name}
                  onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm focus:outline-none focus:border-royal-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminFormData.email}
                  onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                  placeholder="name@christuniversity.in"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm focus:outline-none focus:border-royal-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={adminFormData.password}
                  onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm focus:outline-none focus:border-royal-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                  Permission Role
                </label>
                <select
                  value={adminFormData.role}
                  onChange={(e) => setAdminFormData({ ...adminFormData, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm focus:outline-none focus:border-royal-blue font-semibold"
                >
                  <option value="editor">Content Editor (Website data only, NO contact enquiries)</option>
                  <option value="superadmin">Super Admin (Full access: Website data + Contact enquiries + User mgmt)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#DAA520] hover:bg-[#B8860B] text-primary shadow-md font-heading tracking-wide"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT ADMIN PASSWORD ================= */}
      {passwordModalOpen && selectedAdmin && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setPasswordModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-primary mb-1 font-heading">Change Password</h2>
            <p className="text-xs text-charcoal-light mb-6">
              Setting new password for: <strong className="text-primary">{selectedAdmin.email}</strong>
            </p>

            <form onSubmit={handleUpdateAdminPassword} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Enter at least 8 characters"
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm focus:outline-none focus:border-royal-blue"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-primary hover:bg-royal-blue text-white shadow-md font-heading tracking-wide"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT CONTENT ITEM ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-primary mb-6 font-heading">
              {editItem ? "Edit Existing Item" : "Add New Item"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              {activeTab === "team" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role || ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Category
                    </label>
                    <select
                      value={formData.category || "Faculty Consultant"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm font-semibold"
                    >
                      <option value="Director">Director</option>
                      <option value="Faculty Consultant">Faculty Consultant</option>
                      <option value="Student Leader">Student Leader</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/teams/consultants/name.png"
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Expertise / Bio
                    </label>
                    <textarea
                      rows={3}
                      value={formData.expertise || ""}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                </>
              )}

              {activeTab === "testimonials" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Client / Author Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author || ""}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Designation & Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position || ""}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Quote / Testimonial
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.quote || ""}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                </>
              )}

              {activeTab === "expertise" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Expertise Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Image Path
                    </label>
                    <input
                      type="text"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                </>
              )}

              {activeTab === "labs" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Lab Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Campus Location
                    </label>
                    <input
                      type="text"
                      value={formData.campus || ""}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                </>
              )}

              {activeTab === "events" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Category
                    </label>
                    <select
                      value={formData.category || "past events"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm font-semibold"
                    >
                      <option value="past events">Past Events</option>
                      <option value="industry connects">Industry Connects</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5 font-heading">
                      Date & Venue
                    </label>
                    <input
                      type="text"
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. 27th February, 2026"
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm mb-2"
                    />
                    <input
                      type="text"
                      value={formData.venue || ""}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Venue"
                      className="w-full px-4 py-2.5 bg-secondary/50 border border-slate-200 rounded-xl text-charcoal text-sm"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-primary hover:bg-royal-blue text-white shadow-md font-heading tracking-wide cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: READ INQUIRY ================= */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-royal-blue border border-sky-200">
              Enquiry Details
            </span>
            <h2 className="text-xl font-bold text-primary mt-3 mb-1 font-heading">
              {selectedMessage.subject || "General Consultation"}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Received on {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>

            <div className="space-y-3 bg-secondary/50 p-4 rounded-2xl border border-sky-100 text-xs mb-6">
              <div>
                <span className="text-slate-500 font-bold">From: </span>
                <span className="text-primary font-bold">{selectedMessage.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Email: </span>
                <a href={`mailto:${selectedMessage.email}`} className="text-royal-blue hover:underline font-semibold">
                  {selectedMessage.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Phone: </span>
                <span className="text-charcoal">{selectedMessage.phone || "Not provided"}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Organization: </span>
                <span className="text-charcoal">{selectedMessage.organization || "Not provided"}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 font-heading">Message Body</h4>
              <p className="text-sm text-charcoal bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
                <select
                  value={selectedMessage.status}
                  onChange={(e) => handleUpdateInquiryStatus(selectedMessage._id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-full bg-secondary text-royal-blue border border-sky-200 outline-none"
                >
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 bg-primary hover:bg-royal-blue text-white rounded-full text-xs font-bold shadow-md cursor-pointer font-heading"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= APPLE-STYLE LIQUID GLASS FLOATING BOTTOM DOCK ================= */}
      <FloatingBottomDock
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
        }}
        isSuperAdmin={isSuperAdmin}
        inquiriesCount={items.length}
        onOpenAddModal={() => {
          if (activeTab === "admins") {
            setAdminModalOpen(true);
          } else {
            openAddModal();
          }
        }}
        onExportCSV={exportInquiriesToCSV}
      />
    </div>
  );
};

export default AdminDashboardPage;

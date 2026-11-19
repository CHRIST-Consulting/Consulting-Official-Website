import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Sparkles,
  Cpu,
  Calendar,
  Mail,
  Shield,
  Plus,
  Download,
  Layers,
  X,
  ChevronUp,
} from "lucide-react";
import { LiquidGlass } from "./LiquidGlass";

export type TabType =
  | "inquiries"
  | "team"
  | "testimonials"
  | "expertise"
  | "labs"
  | "events"
  | "admins";

interface FloatingBottomDockProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isSuperAdmin: boolean;
  inquiriesCount: number;
  onOpenAddModal: () => void;
  onExportCSV: () => void;
}

export const FloatingBottomDock: React.FC<FloatingBottomDockProps> = ({
  activeTab,
  onSelectTab,
  isSuperAdmin,
  inquiriesCount,
  onOpenAddModal,
  onExportCSV,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickedButtonId, setClickedButtonId] = useState<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerButtonClick = (id: string) => {
    setClickedButtonId(id);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setClickedButtonId(null);
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    ...(isSuperAdmin
      ? [
          {
            id: "inquiries" as TabType,
            label: "Inquiries",
            icon: Mail,
            badge: inquiriesCount > 0 ? inquiriesCount : null,
          },
        ]
      : []),
    { id: "team" as TabType, label: "Team", icon: Users },
    { id: "testimonials" as TabType, label: "Testimonials", icon: MessageSquare },
    { id: "expertise" as TabType, label: "Expertise", icon: Sparkles },
    { id: "labs" as TabType, label: "Labs", icon: Cpu },
    { id: "events" as TabType, label: "Events", icon: Calendar },
    ...(isSuperAdmin
      ? [{ id: "admins" as TabType, label: "Admins", icon: Shield, isSpecial: true }]
      : []),
  ];

  const currentItem = navItems.find((item) => item.id === activeTab) || navItems[0];
  const CurrentIcon = currentItem?.icon || Users;

  return (
    <>
      {/* ================= MOBILE EXPANDED LIQUID GLASS SHEET ================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-blue/30 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto z-50 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlass isExpanded={true} className="rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white shadow-sm border border-white/25">
                    <Layers className="w-4 h-4 text-[#F7DC6F] stroke-[2.4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white font-heading tracking-tight drop-shadow-sm">
                      Admin Navigation
                    </h3>
                    <p className="text-[11px] text-amber-200/90 font-bold">
                      Select portal section
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
                  title="Close Menu"
                >
                  <X className="w-4 h-4 stroke-[2.4]" />
                </button>
              </div>

              {/* Grid of options */}
              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto no-scrollbar py-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  const isItemClicked = clickedButtonId === `sheet-${item.id}`;
                  return (
                    <button
                      key={item.id}
                      onPointerDown={() => triggerButtonClick(`sheet-${item.id}`)}
                      onClick={() => {
                        onSelectTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-colors duration-200 cursor-pointer overflow-hidden ${
                        isActive
                          ? "text-white font-black"
                          : "text-white/90 hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      }`}
                    >
                      {/* Brief click highlight pulse ONLY on this button */}
                      {isItemClicked && (
                        <motion.div
                          initial={{ opacity: 0.95, scale: 0.97 }}
                          animate={{ opacity: 0, scale: 1.03 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="absolute inset-0 rounded-2xl pointer-events-none z-20 border border-white shadow-[0_0_14px_rgba(255,255,255,0.6)] bg-white/25"
                        />
                      )}

                      {/* Sliding Liquid Glass Capsule in Mobile Sheet */}
                      {isActive && (
                        <motion.div
                          layoutId="active-mobile-sheet-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 160,
                            damping: 22,
                            mass: 1,
                          }}
                          className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/50 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),_0_4px_12px_rgba(0,0,0,0.2)]"
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                            isActive
                              ? "text-[#F7DC6F] stroke-[2.6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                              : "text-sky-300 stroke-[2.3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                          }`}
                        />
                        <span className="truncate tracking-wide text-white font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {item.label}
                        </span>
                      </div>
                      <div className="relative z-10 flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isActive
                                ? "bg-[#DAA520] text-slate-950 shadow-sm"
                                : "bg-sky-400 text-slate-950 shadow-sm"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.isSpecial && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black shadow-sm bg-[#DAA520] text-slate-950 border border-amber-500/40">
                            Super
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Action inside expanded sheet */}
              <div className="pt-3 mt-3 border-t border-white/20">
                {activeTab === "inquiries" ? (
                  <button
                    onClick={() => {
                      onExportCSV();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 bg-white/15 hover:bg-white/25 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#F7DC6F] stroke-[2.5]" />
                    <span>Export Inquiries CSV</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAddModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 bg-white/15 hover:bg-white/25 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#F7DC6F] stroke-[2.8]" />
                    <span>
                      Add New {activeTab === "team" ? "Member" : activeTab === "admins" ? "Admin" : activeTab.slice(0, -1)}
                    </span>
                  </button>
                )}
              </div>
            </LiquidGlass>
          </div>
        </div>
      )}

      {/* ================= FLOATING BOTTOM DOCK ================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] pointer-events-auto">
        <LiquidGlass className="rounded-full shadow-2xl p-1.5 sm:p-2 border border-white/40">
          {/* ================= 1. DESKTOP DOCK (md and up) ================= */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isItemClicked = clickedButtonId === item.id;
              return (
                <button
                  key={item.id}
                  onPointerDown={() => triggerButtonClick(item.id)}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 overflow-hidden ${
                    isActive
                      ? "text-white font-black"
                      : "text-white font-extrabold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-amber-200 hover:bg-white/15"
                  }`}
                >
                  {/* Brief click highlight pulse ONLY on this button */}
                  {isItemClicked && (
                    <motion.div
                      initial={{ opacity: 0.95, scale: 0.95 }}
                      animate={{ opacity: 0, scale: 1.08 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_16px_rgba(255,255,255,0.7),_inset_0_0_8px_rgba(255,255,255,0.4)] bg-white/25"
                    />
                  )}

                  {/* Sliding Liquid Glass Lens Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="active-desktop-dock-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 22,
                        mass: 1,
                      }}
                      className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-xl border border-white/50 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),_inset_0_-1px_0.5px_rgba(0,0,0,0.1),_0_2px_8px_rgba(0,0,0,0.2)]"
                      style={{ willChange: "transform, width, left" }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "text-[#F7DC6F] stroke-[2.6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                          : "text-sky-300 stroke-[2.3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      }`}
                    />
                    <span className="text-white font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                          isActive
                            ? "bg-[#DAA520] text-slate-950 shadow-sm"
                            : "bg-sky-400 text-slate-950 font-black shadow-sm"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.isSpecial && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#F7DC6F] shadow-[0_0_8px_#F7DC6F]" />
                    )}
                  </span>
                </button>
              );
            })}

            {/* Separator Line */}
            <div className="w-[1px] h-6 bg-white/30 mx-1 shrink-0" />

            {/* Primary Action Button Pill */}
            {activeTab === "inquiries" ? (
              <button
                onPointerDown={() => triggerButtonClick("action-export")}
                onClick={onExportCSV}
                className="relative inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-black tracking-wide rounded-full transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),_0_4px_12px_rgba(0,0,0,0.2)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] cursor-pointer whitespace-nowrap shrink-0 border border-white/40 backdrop-blur-md overflow-hidden"
                title="Export CSV"
              >
                {clickedButtonId === "action-export" && (
                  <motion.div
                    initial={{ opacity: 0.95, scale: 0.95 }}
                    animate={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_16px_rgba(255,255,255,0.7),_inset_0_0_8px_rgba(255,255,255,0.4)] bg-white/25"
                  />
                )}
                <Download className="w-3.5 h-3.5 text-[#F7DC6F] stroke-[2.5]" />
                <span>Export CSV</span>
              </button>
            ) : (
              <button
                onPointerDown={() => triggerButtonClick("action-add")}
                onClick={onOpenAddModal}
                className={`relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black tracking-wide rounded-full transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),_0_4px_12px_rgba(0,0,0,0.2)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-md overflow-hidden ${
                  activeTab === "admins"
                    ? "bg-[#DAA520]/30 hover:bg-[#DAA520]/45 text-[#F7DC6F] border border-[#DAA520]/50"
                    : "bg-white/15 hover:bg-white/25 text-white border border-white/40"
                }`}
                title="Add New Record"
              >
                {clickedButtonId === "action-add" && (
                  <motion.div
                    initial={{ opacity: 0.95, scale: 0.95 }}
                    animate={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_16px_rgba(255,255,255,0.7),_inset_0_0_8px_rgba(255,255,255,0.4)] bg-white/25"
                  />
                )}
                <Plus className="w-4 h-4 text-[#F7DC6F] stroke-[2.8]" />
                <span>
                  Add {activeTab === "team" ? "Member" : activeTab === "testimonials" ? "Testimonial" : activeTab === "admins" ? "Admin" : activeTab.slice(0, -1)}
                </span>
              </button>
            )}
          </div>

          {/* ================= 2. MOBILE STREAMLINED DOCK (under md) ================= */}
          <div className="flex md:hidden items-center gap-2 px-1">
            {/* Active Section Indicator Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-black shrink-0 border border-white/40 shadow-sm backdrop-blur-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              <CurrentIcon className="w-3.5 h-3.5 text-sky-300 stroke-[2.5]" />
              <span className="truncate max-w-[90px]">{currentItem.label}</span>
              {currentItem.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-sky-400 text-slate-950 font-black">
                  {currentItem.badge}
                </span>
              )}
            </div>

            {/* Quick Action Pill on Mobile */}
            {activeTab === "inquiries" ? (
              <button
                onPointerDown={() => triggerButtonClick("mob-export")}
                onClick={onExportCSV}
                className="relative w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white shadow-sm shrink-0 border border-white/40 backdrop-blur-md cursor-pointer overflow-hidden"
                title="Export CSV"
              >
                {clickedButtonId === "mob-export" && (
                  <motion.div
                    initial={{ opacity: 0.95, scale: 0.95 }}
                    animate={{ opacity: 0, scale: 1.15 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_12px_rgba(255,255,255,0.7)] bg-white/30"
                  />
                )}
                <Download className="w-4 h-4 text-[#F7DC6F] stroke-[2.5]" />
              </button>
            ) : (
              <button
                onPointerDown={() => triggerButtonClick("mob-add")}
                onClick={onOpenAddModal}
                className="relative w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center shadow-sm shrink-0 border border-white/40 backdrop-blur-md cursor-pointer overflow-hidden"
                title="Add New"
              >
                {clickedButtonId === "mob-add" && (
                  <motion.div
                    initial={{ opacity: 0.95, scale: 0.95 }}
                    animate={{ opacity: 0, scale: 1.15 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_12px_rgba(255,255,255,0.7)] bg-white/30"
                  />
                )}
                <Plus className="w-4 h-4 text-[#F7DC6F] stroke-[2.8]" />
              </button>
            )}

            {/* Menu Toggle Pill */}
            <button
              onPointerDown={() => triggerButtonClick("mob-pages")}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all shadow-sm shrink-0 cursor-pointer backdrop-blur-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] overflow-hidden ${
                mobileMenuOpen
                  ? "bg-white/30 text-white border border-white/60 shadow-inner"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/35"
              }`}
            >
              {clickedButtonId === "mob-pages" && (
                <motion.div
                  initial={{ opacity: 0.95, scale: 0.95 }}
                  animate={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full pointer-events-none z-20 border border-white shadow-[0_0_12px_rgba(255,255,255,0.7)] bg-white/30"
                />
              )}
              <Layers className="w-3.5 h-3.5 text-sky-300 stroke-[2.5]" />
              <span>Pages</span>
              <ChevronUp
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </LiquidGlass>
      </div>
    </>
  );
};

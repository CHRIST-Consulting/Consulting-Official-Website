import React from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  isExpanded?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  variant?: "dark" | "light";
  active?: boolean;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      children,
      className = "",
      isExpanded = false,
      style = {},
      onClick,
      variant = "dark",
      active = true,
    },
    ref
  ) => {
    const isLight = variant === "light";

    return (
      <div
        ref={ref}
        onClick={onClick}
        style={style}
        className={`relative isolate transition-transform duration-500 ease-out ${
          isExpanded ? "scale-[1.01]" : "scale-100"
        } ${className}`}
      >
        {/* ================= LAYER 1: ADAPTIVE SHADOW & CONTACT OCCLUSION ================= */}
        <div
          className={`absolute inset-0 -z-30 rounded-[inherit] pointer-events-none transition-all duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: isLight
              ? isExpanded
                ? "0 28px 50px -12px rgba(15, 42, 77, 0.20), 0 8px 20px -8px rgba(0, 0, 0, 0.10)"
                : "0 20px 40px -12px rgba(15, 42, 77, 0.14), 0 6px 16px -6px rgba(0, 0, 0, 0.06)"
              : isExpanded
              ? "0 24px 48px -12px rgba(15, 42, 77, 0.22), 0 8px 18px -8px rgba(0, 0, 0, 0.12)"
              : "0 14px 32px -8px rgba(15, 42, 77, 0.16), 0 4px 12px -4px rgba(0, 0, 0, 0.08)",
          }}
        />

        {/* ================= LAYER 2: LENS LAYER (OPTICAL REFRACTION & BENDING) ================= */}
        <div
          className={`absolute inset-0 -z-20 rounded-[inherit] pointer-events-none overflow-hidden transition-all duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backdropFilter: isExpanded
              ? "blur(18px) saturate(185%) contrast(102%) brightness(102%)"
              : "blur(16px) saturate(180%) contrast(102%) brightness(102%)",
            WebkitBackdropFilter: isExpanded
              ? "blur(18px) saturate(185%) contrast(102%) brightness(102%)"
              : "blur(16px) saturate(180%) contrast(102%) brightness(102%)",
          }}
        />

        {/* ================= LAYER 3: MINIMAL DIELECTRIC TINT LAYER ================= */}
        <div
          className={`absolute inset-0 -z-10 rounded-[inherit] pointer-events-none transition-all duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: isLight
              ? isExpanded
                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(245, 250, 255, 0.60) 50%, rgba(255, 255, 255, 0.72) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.70) 0%, rgba(245, 250, 255, 0.50) 50%, rgba(255, 255, 255, 0.65) 100%)"
              : isExpanded
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 248, 255, 0.01) 50%, rgba(255, 255, 255, 0.03) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(240, 248, 255, 0.01) 50%, rgba(255, 255, 255, 0.02) 100%)",
          }}
        />

        {/* ================= LAYER 4: SPECULAR RIM ================= */}
        <div
          className={`absolute inset-0 -z-5 rounded-[inherit] pointer-events-none transition-all duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: isLight
              ? `
                inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95),
                inset 0 -1px 0.5px 0 rgba(255, 255, 255, 0.4),
                inset 1px 0 1px 0 rgba(255, 255, 255, 0.45),
                inset -1px 0 1px 0 rgba(255, 255, 255, 0.45),
                0 0 0 1px rgba(255, 255, 255, 0.65)
              `
              : `
                inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.7),
                inset 0 -1px 0.5px 0 rgba(255, 255, 255, 0.25),
                inset 1px 0 1px 0 rgba(255, 255, 255, 0.3),
                inset -1px 0 1px 0 rgba(255, 255, 255, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.35)
              `,
          }}
        />

        {/* Content wrapper */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

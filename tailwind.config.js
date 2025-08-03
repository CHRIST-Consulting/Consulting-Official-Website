/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        white: "#ffffff",
        "ice-blue": "#f0f8ff",
        "sky-blue": "#78bdf2",
        "electric-blue": "#3b82f6",
        "royal-blue": "#2267b5",
        "navy-blue": "#0f2a4d",
        "slate-blue": "#4b5563",
        "steel-blue": "#4682b4",
        // Enhanced blue palette for more vibrant look
        "bright-blue": "#0ea5e9",
        azure: "#007acc",
        cornflower: "#6495ed",
        "dodger-blue": "#1e90ff",
        "deep-sky": "#00bfff",
        "powder-blue": "#b0e0e6",
        "alice-blue": "#f0f8ff",
        "ghost-white": "#f8f8ff",
        lavender: "#e6f3ff",
        primary: "#0f2a4d", // Navy Blue as primary
        "primary-dark": "#0a1f3d",
        "primary-light": "#2267b5", // Royal Blue as light variant
        secondary: "#f0f8ff", // Ice Blue as secondary
        charcoal: "#222222",
        accent: "#78bdf2", // Sky Blue as accent
        "accent-dark": "#3b82f6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        heading: ["Titillium Web", "sans-serif"],
        body: ["Source Sans Pro", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        wave: "wave 3s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 2s infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spinSlow 8s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out infinite",
        levitate: "levitate 4s ease-in-out infinite",
        orbit: "orbit 10s linear infinite",
        "zoom-in-out": "zoomInOut 3s ease-in-out infinite",
        "slide-diagonal": "slideDiagonal 6s ease-in-out infinite",
        "rotate-y": "rotateY 8s linear infinite",
        morph: "morph 4s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(120, 189, 242, 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(120, 189, 242, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% center",
          },
          "100%": {
            backgroundPosition: "200% center",
          },
        },
        wave: {
          "0%, 100%": {
            transform: "translateX(0px) translateY(0px)",
          },
          "33%": {
            transform: "translateX(5px) translateY(-5px)",
          },
          "66%": {
            transform: "translateX(-5px) translateY(5px)",
          },
        },
        bounceGentle: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        glow: {
          "0%": {
            textShadow: "0 0 10px rgba(120, 189, 242, 0.5)",
          },
          "100%": {
            textShadow:
              "0 0 20px rgba(120, 189, 242, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)",
          },
        },
        spinSlow: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-2px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(2px)",
          },
        },
        levitate: {
          "0%, 100%": {
            transform: "translateY(0px) scale(1)",
          },
          "50%": {
            transform: "translateY(-20px) scale(1.05)",
          },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateX(50px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(50px) rotate(-360deg)",
          },
        },
        zoomInOut: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
        },
        slideDiagonal: {
          "0%, 100%": {
            transform: "translate(0, 0)",
          },
          "25%": {
            transform: "translate(10px, -10px)",
          },
          "50%": {
            transform: "translate(20px, 0)",
          },
          "75%": {
            transform: "translate(10px, 10px)",
          },
        },
        rotateY: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
        morph: {
          "0%, 100%": {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: "rotate(0deg)",
          },
          "25%": {
            borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%",
            transform: "rotate(90deg)",
          },
          "50%": {
            borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%",
            transform: "rotate(180deg)",
          },
          "75%": {
            borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%",
            transform: "rotate(270deg)",
          },
        },
        drift: {
          "0%, 100%": {
            transform: "translateX(0) translateY(0) rotate(0deg)",
          },
          "33%": {
            transform: "translateX(30px) translateY(-20px) rotate(120deg)",
          },
          "66%": {
            transform: "translateX(-20px) translateY(15px) rotate(240deg)",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-gradient":
          "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1e40af 100%)",
        "ice-gradient":
          "linear-gradient(135deg, #f0f8ff 0%, #e0f2fe 50%, #b3e5fc 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 30%, rgba(120, 189, 242, 0.5) 50%, transparent 70%)",
        "wave-pattern":
          "radial-gradient(circle at 25% 25%, #e0f2fe 0%, transparent 50%), radial-gradient(circle at 75% 75%, #b3e5fc 0%, transparent 50%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            // React ecosystem
            if (id.includes("react") || id.includes("react-dom")) {
              return "react";
            }
            if (id.includes("react-router")) {
              return "router";
            }

            // Animation libraries
            if (id.includes("framer-motion") || id.includes("motion")) {
              return "motion";
            }

            // Icon libraries
            if (
              id.includes("lucide") ||
              id.includes("react-icons") ||
              id.includes("heroicons")
            ) {
              return "icons";
            }

            // UI libraries
            if (
              id.includes("@radix-ui") ||
              id.includes("class-variance-authority") ||
              id.includes("@headlessui") ||
              id.includes("@chakra-ui") ||
              id.includes("@mantine") ||
              id.includes("antd")
            ) {
              return "ui-libs";
            }

            // Utility libraries
            if (
              id.includes("lodash") ||
              id.includes("date-fns") ||
              id.includes("dayjs") ||
              id.includes("moment") ||
              id.includes("uuid") ||
              id.includes("clsx") ||
              id.includes("classnames")
            ) {
              return "utils-vendor";
            }

            // State management
            if (
              id.includes("redux") ||
              id.includes("zustand") ||
              id.includes("jotai") ||
              id.includes("recoil")
            ) {
              return "state";
            }

            // HTTP/API libraries
            if (
              id.includes("axios") ||
              id.includes("fetch") ||
              id.includes("swr") ||
              id.includes("react-query") ||
              id.includes("@tanstack/react-query")
            ) {
              return "api";
            }

            // Form libraries
            if (
              id.includes("react-hook-form") ||
              id.includes("formik") ||
              id.includes("yup") ||
              id.includes("zod")
            ) {
              return "forms";
            }

            // All other vendor libraries
            return "vendor";
          }

          // Application chunks based on directory structure
          if (id.includes("/src/")) {
            if (id.includes("/components/ui/")) {
              return "ui";
            }
            if (id.includes("/components/sections/")) {
              return "sections";
            }
            if (id.includes("/pages/")) {
              return "pages";
            }
            if (id.includes("/data/")) {
              return "data";
            }
            if (
              id.includes("/utils/") ||
              id.includes("/hooks/") ||
              id.includes("/lib/")
            ) {
              return "utils";
            }
            if (id.includes("/store/") || id.includes("/context/")) {
              return "state-app";
            }
            if (id.includes("/api/") || id.includes("/services/")) {
              return "api-app";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

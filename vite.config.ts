import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Dev-only: serves the Vercel serverless functions in /api from the Vite dev
 * server, so `npm run dev` works end-to-end without the Vercel CLI.
 * In production Vercel serves /api itself and this plugin is not used.
 */
function devApiPlugin(): Plugin {
  return {
    name: "dev-api-routes",
    apply: "serve",
    configureServer(server) {
      // Expose non-VITE_ variables from .env / .env.local to the API handlers
      // (server-side only — these never reach the browser bundle).
      const env = loadEnv(server.config.mode, process.cwd(), "");
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }

      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url ?? "").split("?")[0];
        const match = /^\/api\/((?:[a-z0-9-]+\/)*[a-z0-9-]+)\/?$/i.exec(pathname);
        if (!match) return next();

        const file = path.resolve(__dirname, "api", `${match[1]}.ts`);
        if (!existsSync(file)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Not found." }));
          return;
        }

        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(req, res);
        } catch (error) {
          server.config.logger.error(`[dev-api] ${pathname} failed: ${String(error)}`);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Internal server error." }));
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});

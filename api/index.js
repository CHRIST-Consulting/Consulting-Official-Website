import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import authRoutes from "../server/routes/authRoutes.js";
import contentRoutes from "../server/routes/contentRoutes.js";

try {
  // Only override DNS on Windows where local Node SRV resolution fails
  if (process.platform === "win32") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch (e) {
  // Ignore in environments where custom DNS is restricted
}

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Request logger for Vercel runtime logs
app.use((req, res, next) => {
  console.log(`[API ${req.method}] ${req.url}`);
  next();
});

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });
}

// Database connection middleware for serverless environment
app.use(async (req, res, next) => {
  // Allow health check without blocking on DB
  if (req.path.includes("health")) {
    return next();
  }

  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("MongoDB Serverless Connection Error:", error);
    // For contact inquiries, still allow next() so Google Script email notification dispatches
    if (req.path.includes("contact")) {
      return next();
    }
    return res.status(500).json({
      message: "Database connection failed. Please ensure MONGODB_URI is configured in Vercel Environment Variables: " + error.message,
      error: error.message,
    });
  }
});

// Routes - Mount both with and without '/api' prefix so it works regardless of Vercel path rewrites
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/content", contentRoutes);
app.use("/content", contentRoutes);

// Health check handler
const healthHandler = (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
};

app.get("/api/health", healthHandler);
app.get("/health", healthHandler);

// Fallback 404 handler returning JSON instead of HTML
app.use((req, res) => {
  res.status(404).json({
    message: `API route not found: ${req.method} ${req.url}`,
  });
});

export default app;

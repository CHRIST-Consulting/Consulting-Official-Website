import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import authRoutes from "../server/routes/authRoutes.js";
import contentRoutes from "../server/routes/contentRoutes.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore in environments where custom DNS is restricted
}

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 8000,
  });
}

// Database connection middleware for serverless environment
app.use(async (req, res, next) => {
  // Allow health check without blocking on DB
  if (req.path === "/api/health" || req.path === "/health") {
    return next();
  }

  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("MongoDB Serverless Connection Error:", error);
    return res.status(500).json({
      message: "Database connection failed. Please ensure MONGODB_URI is configured in Vercel Environment Variables.",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

export default app;

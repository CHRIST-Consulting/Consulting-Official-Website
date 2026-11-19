import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required. Please log in." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "cicf_secret_2026");

    const user = await AdminUser.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired session. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session expired or invalid token.", error: error.message });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. Superadmin privileges required." });
  }
  next();
};

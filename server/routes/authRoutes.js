import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AdminUser } from "../models/AdminUser.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

// Helper to send email via Google Apps Script
const sendViaGoogleScript = async (payload) => {
  const url = process.env.GOOGLE_AUTH_SCRIPT_URL || process.env.GOOGLE_SCRIPT_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error("Google Script Error:", err);
    return false;
  }
};

// 1. Initial Setup / Register first Admin if none exist
router.post("/setup", async (req, res) => {
  try {
    const count = await AdminUser.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Admin user already exists. Setup is locked." });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await AdminUser.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "superadmin",
    });

    res.status(201).json({
      message: "Admin created successfully!",
      user: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Setup failed", error: error.message });
  }
});

// 2. Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "cicf_secret_2026",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// 3. Verify Current Session
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// 4. Forgot Password - Sends email via Google Apps Script
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide your email address." });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Don't reveal user existence for security
      return res.json({
        message: "If an account exists with that email, a password reset link has been sent.",
      });
    }

    // Generate token valid for 30 minutes
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 mins
    await user.save();

    // Construct frontend reset link
    const clientOrigin = req.headers.origin || "http://localhost:5173";
    const resetLink = `${clientOrigin}/admin/reset-password?token=${resetToken}&email=${encodeURIComponent(
      user.email
    )}`;

    // Call Google Apps Script with action "RESET_PASSWORD"
    await sendViaGoogleScript({
      action: "RESET_PASSWORD",
      email: user.email,
      name: user.name,
      resetLink,
    });

    res.json({
      message: "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
});

// 5. Reset Password with Token
router.post("/reset-password", async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await AdminUser.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
});

// ==========================================
// ADMIN USER MANAGEMENT (SUPERADMIN ONLY)
// ==========================================

// 6. Get all admin accounts
router.get("/users", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const users = await AdminUser.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin users", error: error.message });
  }
});

// 7. Create new admin account (superadmin or editor)
router.post("/users", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existing = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: "An admin with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await AdminUser.create({
      name,
      email: email.toLowerCase().trim(),
      passwordHash,
      role: role === "superadmin" ? "superadmin" : "editor",
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin user", error: error.message });
  }
});

// 8. Update admin password or role (superadmin only)
router.put("/users/:id", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { name, role, newPassword } = req.body;
    const user = await AdminUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (name) user.name = name;
    if (role && (role === "superadmin" || role === "editor")) user.role = role;

    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
      }
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin user", error: error.message });
  }
});

// 9. Delete admin account (cannot delete own account)
router.delete("/users/:id", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete your own admin account." });
    }

    const user = await AdminUser.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.json({ message: "Admin account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin user", error: error.message });
  }
});

export default router;

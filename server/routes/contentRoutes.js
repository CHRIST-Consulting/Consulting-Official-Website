import express from "express";
import {
  TeamMember,
  Testimonial,
  Expertise,
  Lab,
  Event,
  ContactMessage,
} from "../models/ContentModels.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

// Helper to create standard CRUD for any model
const createCRUDRoutes = (model, name) => {
  const subRouter = express.Router();

  // Public GET (returns only visible items for public website, or all if ?all=true by admin)
  subRouter.get("/", async (req, res) => {
    try {
      const query = req.query.all === "true" ? {} : { isVisible: { $ne: false } };
      const items = await model.find(query).sort({ order: 1, createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: `Failed to fetch ${name}`, error: err.message });
    }
  });

  // Protected: Toggle Visibility (Eye icon)
  subRouter.patch("/:id/toggle-visibility", requireAuth, async (req, res) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${name} not found` });
      item.isVisible = item.isVisible !== false ? false : true;
      await item.save();
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: `Failed to toggle visibility of ${name}`, error: err.message });
    }
  });

  // Protected: CREATE
  subRouter.post("/", requireAuth, async (req, res) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: `Failed to create ${name}`, error: err.message });
    }
  });

  // Protected: UPDATE
  subRouter.put("/:id", requireAuth, async (req, res) => {
    try {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ message: `${name} not found` });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: `Failed to update ${name}`, error: err.message });
    }
  });

  // Protected: DELETE
  subRouter.delete("/:id", requireAuth, async (req, res) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${name} not found` });
      res.json({ message: `${name} deleted successfully` });
    } catch (err) {
      res.status(500).json({ message: `Failed to delete ${name}`, error: err.message });
    }
  });

  return subRouter;
};

// Mount CRUD for each collection
router.use("/team", createCRUDRoutes(TeamMember, "Team Member"));
router.use("/testimonials", createCRUDRoutes(Testimonial, "Testimonial"));
router.use("/expertise", createCRUDRoutes(Expertise, "Expertise"));
router.use("/labs", createCRUDRoutes(Lab, "Lab"));
router.use("/events", createCRUDRoutes(Event, "Event"));

// ==========================================
// CONTACT INQUIRIES ROUTE
// ==========================================

// Public POST: User submits contact form on website
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, organization, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    // 1. Save directly into MongoDB
    const savedMessage = await ContactMessage.create({
      name,
      email,
      phone,
      organization,
      subject: subject || "General Enquiry",
      message,
    });

    // 2. Relay notification to consultancy@christuniversity.in via Google Apps Script
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CONTACT_ENQUIRY",
          name,
          email,
          phone,
          organization,
          subject,
          message,
        }),
      }).catch((err) => console.error("Google Script notification failed:", err));
    }

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your message has been received.",
      data: savedMessage,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit message.", error: err.message });
  }
});

// Protected: Admin GET all contact inquiries (Superadmin Only)
router.get("/contact", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact inquiries", error: err.message });
  }
});

// Protected: Admin UPDATE inquiry status (Superadmin Only)
router.patch("/contact/:id/status", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) {
    res.status(400).json({ message: "Failed to update status", error: err.message });
  }
});

// Protected: Admin DELETE contact inquiry (Superadmin Only)
router.delete("/contact/:id", requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message", error: err.message });
  }
});

export default router;

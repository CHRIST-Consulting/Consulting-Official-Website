import mongoose from "mongoose";

// 1. Team Member
const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    category: {
      type: String,
      enum: ["Director", "Faculty Consultant", "Student Leader"],
      default: "Faculty Consultant",
    },
    image: { type: String, default: "/images/teams/consultants/default.png" },
    expertise: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 2. Client Testimonial
const testimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    position: { type: String, required: true },
    quote: { type: String, required: true },
    logo: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 3. Service / Consulting Expertise
const expertiseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Briefcase" },
    image: { type: String, default: "/images/services/default.jpg" },
    points: [{ type: String }],
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 4. Research Lab
const labSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    icon: { type: String, default: "Cpu" },
    campus: { type: String, default: "Central Campus" },
    equipment: [{ type: String }],
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 5. Event
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["past events", "industry connects", "upcoming"],
      default: "past events",
    },
    date: { type: String, required: true },
    time: { type: String, default: "" },
    venue: { type: String, default: "CHRIST (Deemed to be University)" },
    description: { type: String, default: "" },
    images: [{ type: String }],
    highlights: [{ type: String }],
    attendees: { type: Number, default: 0 },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 6. Contact Inquiries (messages sent from Contact Form)
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    organization: { type: String, default: "" },
    subject: { type: String, default: "General Enquiry" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "In Review", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export const Expertise = mongoose.model("Expertise", expertiseSchema);
export const Lab = mongoose.model("Lab", labSchema);
export const Event = mongoose.model("Event", eventSchema);
export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

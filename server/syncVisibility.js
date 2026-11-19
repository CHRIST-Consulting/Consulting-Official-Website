import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import { TeamMember, Testimonial, Expertise, Lab, Event } from "./models/ContentModels.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

dotenv.config();

const syncVisibility = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for visibility sync...");

    // 1. TEAM MEMBERS:
    // In src/components/sections/Teams.tsx:
    // - Director (Dr Fr Jossy P George): Visible
    // - Faculty Consultants (Ms Kiran Mariam, Mr Alexander Porinchu, Ms Sharanya): Visible
    // - Student Leaders section (Srinath, Adharsh, Arnav): COMMENTED OUT on website (lines 156-190).
    // Set Student Leaders isVisible = false
    const teamRes = await TeamMember.updateMany(
      { category: "Student Leader" },
      { $set: { isVisible: false } }
    );
    console.log(`Updated ${teamRes.modifiedCount} student leaders to isVisible = false (hidden).`);

    // Ensure Director & Faculty Consultants are isVisible = true
    await TeamMember.updateMany(
      { category: { $in: ["Director", "Faculty Consultant"] } },
      { $set: { isVisible: true } }
    );

    // 2. TESTIMONIALS:
    // Ensure all active testimonials are marked true
    await Testimonial.updateMany({}, { $set: { isVisible: true } });

    // 3. EXPERTISE:
    // Ensure active services are marked true
    await Expertise.updateMany({}, { $set: { isVisible: true } });

    // 4. RESEARCH LABS:
    // Ensure labs are marked true
    await Lab.updateMany({}, { $set: { isVisible: true } });

    // 5. EVENTS:
    // Ensure active events are marked true
    await Event.updateMany({}, { $set: { isVisible: true } });

    const finalTeam = await TeamMember.find().select("name category isVisible");
    console.log("Final Team Members status in DB:");
    console.log(finalTeam);

    console.log("Visibility sync completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Sync error:", err);
    process.exit(1);
  }
};

syncVisibility();

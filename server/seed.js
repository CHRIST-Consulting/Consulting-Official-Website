import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import bcrypt from "bcryptjs";
import { AdminUser } from "./models/AdminUser.js";
import {
  TeamMember,
  Testimonial,
  Expertise,
  Lab,
  Event,
} from "./models/ContentModels.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

dotenv.config();

const initialTeam = [
  {
    name: "Dr Fr Jossy P George",
    role: "Director",
    category: "Director",
    image: "/images/teams/consultants/FR Jossy.png",
    expertise:
      "Dr Fr Jossy P George is a visionary academic leader with extensive experience in computer science, research, and institutional development. Under his guidance, CHRIST University continues to expand its impact.",
    linkedin: "https://www.linkedin.com/in/frjossy/",
    email: "director.consultancy@christuniversity.in",
    order: 1,
  },
  {
    name: "Ms Kiran Mariam",
    role: "Lead Consultant",
    category: "Faculty Consultant",
    image: "/images/teams/consultants/Kiran.png",
    expertise:
      "Ms Kiran Mariam is a postgraduate in Commerce and has previously served as the Senior Associate at Manipal Hospitals, Finance Manager in Environ Technologies Pvt Ltd and as Tax senior in E&Y.",
    linkedin: "https://www.linkedin.com/in/kiran-mariam-1b4543248/",
    email: "kiran.mariam@christuniversity.in",
    order: 2,
  },
  {
    name: "Mr Alexander Porinchu",
    role: "Business Development Manager",
    category: "Faculty Consultant",
    image: "/images/teams/consultants/Alexander.png",
    expertise:
      "Business Development Professional with sound knowledge in Finance with professional expertise in multiple industries. Actively engaged in the Educational sector with focus on Institutional Revenue Growth.",
    linkedin: "https://www.linkedin.com/in/alexander-porinchu-a90a17120/",
    email: "alexander.thalakottour@christuniversity.in",
    order: 3,
  },
  {
    name: "Ms Sharanya",
    role: "Consultant",
    category: "Faculty Consultant",
    image: "/images/teams/consultants/Sharanya.png",
    expertise:
      "Ms Sai Sharanya is a consultant with a postgraduate degree in Ancient History and Archaeology. Formerly a social media strategist at Pathika Technologies and an ex-Christite.",
    linkedin: "https://www.linkedin.com/in/sai-sharanya-3084a7296/",
    email: "saisharanya.n@christuniversity.in",
    order: 4,
  },
  {
    name: "Srinath S P",
    role: "Student Head - Branding and Strategy",
    category: "Student Leader",
    image: "/images/teams/students/Srinath.png",
    expertise: "Branding, Strategic Outreach & Design Direction",
    email: "",
    order: 5,
  },
  {
    name: "Adharsh Jolly",
    role: "Student Head - Tech and Innovation",
    category: "Student Leader",
    image: "/images/teams/students/Adharsh.png",
    expertise: "Web Platforms, Technical Systems & Innovation",
    email: "",
    order: 6,
  },
  {
    name: "Arnav Paul",
    role: "Student Head - Creative and Social Media Strategy",
    category: "Student Leader",
    image: "/images/teams/students/Arnav.png",
    expertise: "Creative Content, Multimedia Production & Social Engagement",
    email: "",
    order: 7,
  },
];

const initialTestimonials = [
  {
    author: "Dr. K. Balasubramanian",
    position: "Managing Director, Hiranandani Financial",
    quote:
      "CHRIST Consulting provided analytical depth and financial restructuring insights that exceeded our corporate expectations. The student and faculty combination is phenomenal.",
    logo: "/images/services/finance-analytics.jpg",
    rating: 5,
    order: 1,
  },
  {
    author: "Ms. Ananya Sharma",
    position: "Head of Talent, NexGen Retail",
    quote:
      "Their capacity-building workshops and behavioral assessments empowered our leadership cadre. The methodology was highly engaging, grounded, and result-oriented.",
    logo: "/images/services/leadership.jpg",
    rating: 5,
    order: 2,
  },
];

const initialExpertise = [
  {
    title: "Technology & Digital Transformation",
    description:
      "Delivering cloud architecture, AI/ML models, IoT frameworks, cybersecurity audits, and full-cycle software prototypes.",
    icon: "Laptop",
    image: "/images/services/digital-transformation.jpg",
    points: ["Enterprise Cloud Migration", "AI / Predictive Modelling", "Cybersecurity Audits"],
    order: 1,
  },
  {
    title: "Financial Engineering & Analytics",
    description:
      "Rigorous portfolio analysis, capital budgeting, risk optimization, and macroeconomic forecasting using Bloomberg terminals.",
    icon: "TrendingUp",
    image: "/images/services/financial-modeling.jpg",
    points: ["Bloomberg Terminal Data Analysis", "Capital Budgeting", "Risk Analysis"],
    order: 2,
  },
  {
    title: "Behavioral Sciences & People Ops",
    description:
      "Psychometric diagnostics, organizational culture redesign, leadership assessment centers, and employee mental wellness frameworks.",
    icon: "Brain",
    image: "/images/services/corporate-training.jpg",
    points: ["Neuropsychological Profiling", "Executive Coaching", "Culture Diagnostics"],
    order: 3,
  },
];

const initialLabs = [
  {
    name: "Bloomberg Finance Lab",
    description:
      "State-of-the-art laboratory equipped with dual Bloomberg terminals for real-time market telemetry, equity analytics, and currency modelling.",
    icon: "LineChart",
    campus: "Yeshwanthpur & Central Campus",
    equipment: ["Bloomberg Terminal Access", "Real-time feeds", "Financial Analytics Workstations"],
    order: 1,
  },
  {
    name: "Data Science & Intel AI METIS Lab",
    description:
      "High-performance deep learning clusters dedicated to computer vision, edge IoT solutions, and predictive behavioral models.",
    icon: "Cpu",
    campus: "Yeshwanthpur Campus",
    equipment: ["GPU Clusters", "Intel AI Toolkits", "IoT Benchmarks"],
    order: 2,
  },
  {
    name: "Behavioural Economics Research Lab",
    description:
      "Equipped with integrated systems and eye-tracking infrastructure to study human choice, consumer nudge theory, and decision biases.",
    icon: "BrainCircuit",
    campus: "Yeshwanthpur Campus",
    equipment: ["Integrated Testing Terminals", "STATA Licensed Suites (80 seats)", "Experimentation Suites"],
    order: 3,
  },
];

const initialEvents = [
  {
    title: "CICF VALEDICTORY 2025-26",
    category: "past events",
    date: "27th February, 2026",
    time: "2:00 PM - 3:45 PM",
    venue: "Campus View, Central Block, CHRIST Central Campus",
    description: "A celebration of student innovation, faculty consulting milestones, and corporate partnerships.",
    images: ["/images/events/past/investiture-2025/1.JPG"],
    highlights: ["Awards ceremony", "Client recognition", "Student cohort presentations"],
    order: 1,
  },
  {
    title: "Toyota Industry Connect",
    category: "industry connects",
    date: "April 12, 2025",
    time: "8:30 AM",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    description: "An exclusive industrial workshop and facility tour focusing on the world-renowned Toyota Production System.",
    images: ["/images/events/industry/toyota.png"],
    highlights: ["Shop floor walkthrough", "Plant Head interaction", "Kaizen implementation"],
    order: 2,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for database seeding...");

    // 1. Seed Initial Admin Account if none exists
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const defaultPassword = "Admin@Christ2026";
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(defaultPassword, salt);

      await AdminUser.create({
        name: "CICF Superadmin",
        email: "consultancy@christuniversity.in",
        passwordHash,
        role: "superadmin",
      });
      console.log("Created Default Admin Account: consultancy@christuniversity.in (Password: Admin@Christ2026)");
    } else {
      console.log(`Admin account exists (${adminCount} accounts)`);
    }

    // 2. Seed Team Members if empty
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(initialTeam);
      console.log(`Seeded ${initialTeam.length} initial team members.`);
    }

    // 3. Seed Testimonials if empty
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany(initialTestimonials);
      console.log(`Seeded ${initialTestimonials.length} testimonials.`);
    }

    // 4. Seed Expertise if empty
    const expCount = await Expertise.countDocuments();
    if (expCount === 0) {
      await Expertise.insertMany(initialExpertise);
      console.log(`Seeded ${initialExpertise.length} expertise categories.`);
    }

    // 5. Seed Labs if empty
    const labCount = await Lab.countDocuments();
    if (labCount === 0) {
      await Lab.insertMany(initialLabs);
      console.log(`Seeded ${initialLabs.length} research labs.`);
    }

    // 6. Seed Events if empty
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents);
      console.log(`Seeded ${initialEvents.length} events.`);
    }

    console.log("DATABASE SEEDING COMPLETED SUCCESSFULLY! No existing data was lost.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();

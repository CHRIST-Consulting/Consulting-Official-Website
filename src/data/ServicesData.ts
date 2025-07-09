import React from "react";
import { Layers, Users, FileText, Globe } from "lucide-react";

export interface Service {
  icon: React.ReactElement;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

export const getServicesData = (): Service[] => [
  {
    icon: React.createElement(Layers, { size: 40, className: "text-primary" }),
    title: "Core Consultancy Services",
    description:
      "Original business frameworks and strategic paradigms to drive innovation and sustainable growth through management consulting, custom software development, and market research.",
    highlights: [
      "Business strategy development",
      "Custom software solutions",
      "Market research & feasibility studies",
    ],
    image: "/images/services/business-solutions.jpg",
  },
  {
    icon: React.createElement(Users, { size: 40, className: "text-primary" }),
    title: "Organisational Training",
    description:
      "Customised leadership and skill development programs with e-learning modules and immersive learning experiences for transformational growth.",
    highlights: [
      "Leadership & management training",
      "E-learning curriculum design",
      "Experiential learning programs",
    ],
    image: "/images/services/education-training.jpg",
  },
  {
    icon: React.createElement(FileText, {
      size: 40,
      className: "text-primary",
    }),
    title: "Research-Based Consultancy",
    description:
      "Collaborative research partnerships and industry-specific analysis to generate actionable insights for strategic decision-making.",
    highlights: [
      "Industry research & analysis",
      "Primary & secondary data studies",
      "Field research execution",
    ],
    image: "/images/services/digital-transformation.jpg",
  },
  {
    icon: React.createElement(Globe, { size: 40, className: "text-primary" }),
    title: "Government Projects",
    description:
      "Public sector consulting focused on policy development, strategic planning, and evidence-based program evaluation.",
    highlights: [
      "Policy development consulting",
      "Large-scale project execution",
      "Impact assessments & audits",
    ],
    image: "/images/services/legal-expertise.jpg",
  },
];

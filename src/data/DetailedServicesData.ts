import React from "react";
import {
  Building2,
  BookOpen,
  Scale,
  GraduationCap,
  UtensilsCrossed,
  Home,
  Globe,
  Music,
  Leaf,
} from "lucide-react";

export interface DetailedService {
  title: string;
  icon: React.ReactElement;
  image: string;
  description: string;
}

export const getDetailedServicesData = (): DetailedService[] => [
  {
    title: "Business Solutions",
    icon: React.createElement(Building2, {
      size: 24,
      className: "text-primary",
    }),
    image: "/images/services/business-solutions.jpg",
    description:
      "Comprehensive business consulting services tailored for modern enterprises. Our team combines academic expertise with practical insights to deliver strategic solutions across operations, finance, and organizational development. We help businesses optimize their processes, enhance efficiency, and drive sustainable growth through data-driven approaches and innovative methodologies.",
  },
  {
    title: "Commercial Management",
    icon: React.createElement(BookOpen, {
      size: 24,
      className: "text-primary",
    }),
    image: "/images/services/commercial-management.jpg",
    description:
      "Expert commercial management services focusing on revenue optimization, contract management, and business development. We provide strategic guidance for commercial operations, helping organizations maximize their market potential while maintaining operational excellence. Our approach combines industry best practices with innovative strategies for sustainable commercial success.",
  },
  {
    title: "Legal Expertise and Compliance",
    icon: React.createElement(Scale, { size: 24, className: "text-primary" }),
    image: "/images/services/legal-expertise.jpg",
    description:
      "Specialized legal consulting services ensuring compliance and risk management across business operations. Our team provides comprehensive guidance on regulatory requirements, corporate governance, and legal framework implementation. We help organizations navigate complex legal landscapes while maintaining operational efficiency.",
  },
  {
    title: "Education & Training",
    icon: React.createElement(GraduationCap, {
      size: 24,
      className: "text-primary",
    }),
    image: "/images/services/education-training.jpg",
    description:
      "Customized education and training programs designed to enhance workforce capabilities and organizational learning. We develop comprehensive training solutions that combine theoretical knowledge with practical applications, ensuring lasting impact and measurable results in professional development.",
  },
  {
    title: "Hotel Management and Culinary Arts",
    icon: React.createElement(UtensilsCrossed, {
      size: 24,
      className: "text-primary",
    }),
    image: "/images/services/hotel-culinary.jpg",
    description:
      "Expert consulting services for the hospitality industry, focusing on operational excellence and culinary innovation. Our team provides comprehensive guidance on hotel operations, food service management, and customer experience enhancement, helping businesses in the hospitality sector achieve and maintain world-class standards.",
  },
  {
    title: "Architectural Excellence",
    icon: React.createElement(Home, { size: 24, className: "text-primary" }),
    image: "/images/services/architectural-excellence.jpg",
    description:
      "Professional architectural consulting services combining aesthetic excellence with functional design. We offer comprehensive solutions for architectural planning, sustainable design, and project management, ensuring that each project meets both creative and practical requirements while adhering to industry standards.",
  },
  {
    title: "Digital Transformation",
    icon: React.createElement(Globe, { size: 24, className: "text-primary" }),
    image: "/images/services/digital-transformation.jpg",
    description:
      "Strategic digital transformation services helping organizations embrace technological innovation. Our team guides businesses through digital adoption, process automation, and technology integration, ensuring seamless transition and optimal utilization of digital solutions for enhanced operational efficiency.",
  },
  {
    title: "Performing Arts & Cultural Excellence",
    icon: React.createElement(Music, { size: 24, className: "text-primary" }),
    image: "/images/services/performing-arts.jpg",
    description:
      "Specialized consulting services for performing arts organizations and cultural institutions. We provide expert guidance on program development, audience engagement, and artistic excellence, helping cultural organizations thrive while maintaining their creative integrity and cultural impact.",
  },
  {
    title: "Sustainability and Green Initiatives",
    icon: React.createElement(Leaf, { size: 24, className: "text-primary" }),
    image: "/images/services/sustainability.jpg",
    description:
      "Comprehensive sustainability consulting services focusing on environmental responsibility and green business practices. Our team helps organizations develop and implement sustainable strategies, reducing environmental impact while maintaining operational efficiency and business growth.",
  },
];

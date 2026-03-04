export interface Project {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Planning" | "Completed";
  startDate: string;
  endDate?: string;
  teamSize: number;
  category: string;
  image: string;
  tags: string[];
  priority: "High" | "Medium" | "Low";
}

export interface Campus {
  name: string;
  location: string;
  image: string;
  description: string;
  link: string;
  projects: Project[];
  stats: {
    totalProjects: number;
    activeProjects: number;
    studentsInvolved: number;
    completionRate: string;
  };
}

export const campusesData: Campus[] = [
  {
    name: "Central Campus",
    location: "Bangalore",
    image: "/images/campuses/central-campus.jpg",
    description: "COMING SOON",
    link: "https://www.christuniversity.in/#",
    stats: {
      totalProjects: 3,
      activeProjects: 2,
      studentsInvolved: 320,
      completionRate: "33%",
    },
    projects: [],
  },
  {
    name: "Bannerghatta Road Campus",
    location: "Bangalore",
    image: "/images/campuses/bannerghatta-campus.jpg",
    description: "COMING SOOn",
    link: "https://christuniversity.in/campus/Bangalore%20Bannerghatta%20Road%20Campus",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 280,
      completionRate: "50%",
    },
    projects: [
      
    ],
  },
  {
    name: "Kengeri Campus",
    location: "Bangalore",
    image: "/images/campuses/kengeri-campus.jpg",
    description: "COMING SOON",
    link: "https://christuniversity.in/campus/Bangalore%20Kengeri%20Campus",
    stats: {
      totalProjects: 3,
      activeProjects: 3,
      studentsInvolved: 450,
      completionRate: "0%",
    },
    projects: [
      
    ],
  },
  {
    name: "Yeshwanthpur Campus",
    location: "Bangalore",
    image: "/images/campuses/yeshwanthpur-campus.jpg",
    description: "COMING SOON",
    link: "https://christuniversity.in/campus/Yeshwanthpur%20Campus",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 380,
      completionRate: "50%",
    },
    projects: [
      
    ],
  },
  {
    name: "Pune Lavasa Campus",
    location: "Off Campus",
    image: "/images/campuses/pune-lavasa-campus.jpg",
    description: "COMING SOON",
    link: "https://lavasa.christuniversity.in/",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 200,
      completionRate: "50%",
    },
    projects: [
      
    ],
  },
  {
    name: "Delhi NCR Campus",
    location: "Off Campus",
    image: "/images/campuses/delhi-ncr-campus.jpg",
    description: "COMING SOON",
    link: "https://ncr.christuniversity.in/",
    stats: {
      totalProjects: 2,
      activeProjects: 2,
      studentsInvolved: 250,
      completionRate: "0%",
    },
    projects: [
      
    ],
  },
];

{/*
  export interface Project {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Planning" | "Completed";
  startDate: string;
  endDate?: string;
  teamSize: number;
  category: string;
  image: string;
  tags: string[];
  priority: "High" | "Medium" | "Low";
}

export interface Campus {
  name: string;
  location: string;
  image: string;
  description: string;
  link: string;
  projects: Project[];
  stats: {
    totalProjects: number;
    activeProjects: number;
    studentsInvolved: number;
    completionRate: string;
  };
}

export const campusesData: Campus[] = [
  {
    name: "Central Campus",
    location: "Bangalore",
    image: "/images/campuses/central-campus.jpg",
    description: "Our flagship campus in the heart of Bangalore",
    link: "https://www.christuniversity.in/#",
    stats: {
      totalProjects: 3,
      activeProjects: 2,
      studentsInvolved: 320,
      completionRate: "33%",
    },
    projects: [
      {
        id: "cc-001",
        title: "Digital Campus Transformation",
        description:
          "Implementing smart campus solutions with IoT sensors, digital displays, and automated systems to enhance student experience and campus management efficiency.",
        status: "Completed",
        startDate: "Jan 2024",
        endDate: "Dec 2024",
        teamSize: 25,
        category: "Technology",
        image: "/images/services/digital-transformation.jpg",
        tags: ["IoT", "Smart Campus", "Automation", "Digital Innovation"],
        priority: "High",
      },
      {
        id: "cc-002",
        title: "Student Success Analytics Platform",
        description:
          "AI-powered analytics platform to track student performance, predict outcomes, and provide personalized learning recommendations.",
        status: "Active",
        startDate: "Mar 2024",
        teamSize: 18,
        category: "AI & Analytics",
        image: "/images/services/business-solutions.jpg",
        tags: ["AI", "Analytics", "Student Success", "Machine Learning"],
        priority: "High",
      },
      {
        id: "cc-003",
        title: "Sustainable Campus Initiative",
        description:
          "Comprehensive sustainability program focusing on renewable energy, waste management, and carbon footprint reduction across campus operations.",
        status: "Planning",
        startDate: "Aug 2024",
        teamSize: 22,
        category: "Sustainability",
        image: "/images/services/sustainability.jpg",
        tags: [
          "Sustainability",
          "Green Energy",
          "Environment",
          "Carbon Neutral",
        ],
        priority: "Medium",
      },
      {
        id: "cc-004",
        title: "Innovation Lab Setup",
        description:
          "State-of-the-art innovation laboratory with cutting-edge equipment for research and development in emerging technologies.",
        status: "Active",
        startDate: "Feb 2024",
        teamSize: 15,
        category: "Research",
        image: "/images/services/architectural-excellence.jpg",
        tags: ["Innovation", "Research", "Lab", "Technology"],
        priority: "High",
      },
    ],
  },
  {
    name: "Bannerghatta Road Campus",
    location: "Bangalore",
    image: "/images/campuses/bannerghatta-campus.jpg",
    description: "Modern facilities dedicated to professional excellence",
    link: "https://christuniversity.in/campus/Bangalore%20Bannerghatta%20Road%20Campus",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 280,
      completionRate: "50%",
    },
    projects: [
      {
        id: "br-001",
        title: "Professional Skills Development Hub",
        description:
          "Comprehensive training center offering industry-relevant skills, certification programs, and career development workshops.",
        status: "Active",
        startDate: "Jan 2024",
        teamSize: 20,
        category: "Education",
        image: "/images/services/education-training.jpg",
        tags: [
          "Skills Development",
          "Training",
          "Professional Growth",
          "Career",
        ],
        priority: "High",
      },
      {
        id: "br-002",
        title: "Industry Partnership Program",
        description:
          "Strategic partnerships with leading companies for internships, placements, and collaborative research projects.",
        status: "Completed",
        startDate: "Nov 2023",
        endDate: "Oct 2024",
        teamSize: 12,
        category: "Industry Relations",
        image: "/images/services/commercial-management.jpg",
        tags: ["Industry", "Partnerships", "Internships", "Collaboration"],
        priority: "High",
      },
      {
        id: "br-003",
        title: "Modern Learning Spaces",
        description:
          "Renovation and modernization of classrooms with interactive technology, flexible seating, and collaborative spaces.",
        status: "Planning",
        startDate: "Sep 2024",
        teamSize: 16,
        category: "Infrastructure",
        image: "/images/services/architectural-excellence.jpg",
        tags: ["Infrastructure", "Modern Learning", "Technology", "Renovation"],
        priority: "Medium",
      },
    ],
  },
  {
    name: "Kengeri Campus",
    location: "Bangalore",
    image: "/images/campuses/kengeri-campus.jpg",
    description: "Sprawling green campus focused on research and innovation",
    link: "https://christuniversity.in/campus/Bangalore%20Kengeri%20Campus",
    stats: {
      totalProjects: 3,
      activeProjects: 3,
      studentsInvolved: 450,
      completionRate: "0%",
    },
    projects: [
      {
        id: "kg-001",
        title: "Research Excellence Center",
        description:
          "Advanced research facility promoting interdisciplinary research, innovation, and knowledge creation across multiple domains.",
        status: "Active",
        startDate: "Oct 2023",
        teamSize: 35,
        category: "Research",
        image: "/images/services/business-solutions.jpg",
        tags: ["Research", "Innovation", "Interdisciplinary", "Knowledge"],
        priority: "High",
      },
      {
        id: "kg-002",
        title: "Green Campus Initiative",
        description:
          "Extensive landscaping, biodiversity conservation, and eco-friendly practices to maintain campus as a green sanctuary.",
        status: "Active",
        startDate: "Jan 2024",
        teamSize: 28,
        category: "Environment",
        image: "/images/services/sustainability.jpg",
        tags: ["Green Campus", "Biodiversity", "Environment", "Conservation"],
        priority: "High",
      },
      {
        id: "kg-003",
        title: "Innovation Incubator",
        description:
          "Startup incubation center supporting student entrepreneurs with mentorship, funding assistance, and business development resources.",
        status: "Active",
        startDate: "Feb 2024",
        teamSize: 18,
        category: "Entrepreneurship",
        image: "/images/services/commercial-management.jpg",
        tags: ["Incubator", "Startup", "Entrepreneurship", "Innovation"],
        priority: "Medium",
      },
      {
        id: "kg-004",
        title: "Smart Agriculture Lab",
        description:
          "Cutting-edge agricultural research facility exploring precision farming, sustainable agriculture, and food security solutions.",
        status: "Planning",
        startDate: "Jul 2024",
        teamSize: 24,
        category: "Agriculture",
        image: "/images/services/sustainability.jpg",
        tags: ["Agriculture", "Smart Farming", "Food Security", "Technology"],
        priority: "Medium",
      },
    ],
  },
  {
    name: "Yeshwanthpur Campus",
    location: "Bangalore",
    image: "/images/campuses/yeshwanthpur-campus.jpg",
    description: "Technology and engineering excellence center",
    link: "https://christuniversity.in/campus/Yeshwanthpur%20Campus",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 380,
      completionRate: "50%",
    },
    projects: [
      {
        id: "yp-001",
        title: "Advanced Engineering Labs",
        description:
          "State-of-the-art engineering laboratories equipped with latest technology for mechanical, electrical, and computer engineering.",
        status: "Completed",
        startDate: "Dec 2023",
        endDate: "Nov 2024",
        teamSize: 30,
        category: "Engineering",
        image: "/images/services/digital-transformation.jpg",
        tags: ["Engineering", "Laboratory", "Technology", "Advanced Equipment"],
        priority: "High",
      },
      {
        id: "yp-002",
        title: "Tech Innovation Hub",
        description:
          "Collaborative space for technology innovation, prototype development, and tech startup incubation.",
        status: "Active",
        startDate: "Jan 2024",
        teamSize: 22,
        category: "Technology",
        image: "/images/services/business-solutions.jpg",
        tags: ["Innovation", "Technology", "Prototyping", "Startups"],
        priority: "High",
      },
      {
        id: "yp-003",
        title: "Industry 4.0 Training Center",
        description:
          "Specialized training facility for Industry 4.0 technologies including robotics, AI, and automation systems.",
        status: "Planning",
        startDate: "Aug 2024",
        teamSize: 20,
        category: "Training",
        image: "/images/services/education-training.jpg",
        tags: ["Industry 4.0", "Robotics", "Automation", "AI"],
        priority: "Medium",
      },
    ],
  },
  {
    name: "Pune Lavasa Campus",
    location: "Off Campus",
    image: "/images/campuses/pune-lavasa-campus.jpg",
    description: "Scenic campus offering unique learning experiences",
    link: "https://lavasa.christuniversity.in/",
    stats: {
      totalProjects: 2,
      activeProjects: 1,
      studentsInvolved: 200,
      completionRate: "50%",
    },
    projects: [
      {
        id: "pl-001",
        title: "Hospitality Excellence Center",
        description:
          "World-class hospitality training facility with simulated hotel environments and industry-standard equipment.",
        status: "Active",
        startDate: "Nov 2023",
        teamSize: 18,
        category: "Hospitality",
        image: "/images/services/hotel-culinary.jpg",
        tags: ["Hospitality", "Training", "Hotel Management", "Excellence"],
        priority: "High",
      },
      {
        id: "pl-002",
        title: "Culinary Arts Studio",
        description:
          "Professional culinary training facility with commercial-grade kitchens and specialized cooking equipment.",
        status: "Completed",
        startDate: "Jan 2024",
        endDate: "Nov 2024",
        teamSize: 15,
        category: "Culinary Arts",
        image: "/images/services/hotel-culinary.jpg",
        tags: ["Culinary", "Cooking", "Professional Kitchen", "Arts"],
        priority: "High",
      },
      {
        id: "pl-003",
        title: "Adventure Learning Program",
        description:
          "Outdoor education and adventure-based learning programs utilizing the scenic Lavasa environment.",
        status: "Planning",
        startDate: "Jun 2024",
        teamSize: 12,
        category: "Outdoor Education",
        image: "/images/services/education-training.jpg",
        tags: ["Adventure", "Outdoor", "Learning", "Nature"],
        priority: "Medium",
      },
    ],
  },
  {
    name: "Delhi NCR Campus",
    location: "Off Campus",
    image: "/images/campuses/delhi-ncr-campus.jpg",
    description: "Strategic location connecting north India",
    link: "https://ncr.christuniversity.in/",
    stats: {
      totalProjects: 2,
      activeProjects: 2,
      studentsInvolved: 250,
      completionRate: "0%",
    },
    projects: [
      {
        id: "dcr-001",
        title: "Corporate Connect Program",
        description:
          "Strategic partnerships with Delhi NCR corporate sector for enhanced industry exposure and placement opportunities.",
        status: "Active",
        startDate: "Oct 2023",
        teamSize: 16,
        category: "Corporate Relations",
        image: "/images/services/commercial-management.jpg",
        tags: ["Corporate", "Partnerships", "Placements", "Industry"],
        priority: "High",
      },
      {
        id: "dcr-002",
        title: "Policy Research Center",
        description:
          "Research center focusing on public policy, governance, and socio-economic development in North India region.",
        status: "Active",
        startDate: "Jan 2024",
        teamSize: 20,
        category: "Policy Research",
        image: "/images/services/legal-expertise.jpg",
        tags: ["Policy", "Research", "Governance", "Development"],
        priority: "High",
      },
      {
        id: "dcr-003",
        title: "Cultural Exchange Hub",
        description:
          "Platform for cultural exchange, diversity programs, and community engagement initiatives in the NCR region.",
        status: "Planning",
        startDate: "Sep 2024",
        teamSize: 14,
        category: "Cultural Programs",
        image: "/images/services/performing-arts.jpg",
        tags: ["Cultural Exchange", "Diversity", "Community", "Arts"],
        priority: "Medium",
      },
    ],
  },
];

  */}
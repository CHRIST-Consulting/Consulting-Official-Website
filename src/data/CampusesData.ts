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

export interface DepartmentExpertise {
  name: string;
  expertise: string[];
  iconName: string;
  description?: string;
  customIntro?: string;
  customOutro?: string;
  labs?: string[];
  labsIntro?: string;
  logos?: { name: string; path: string }[];
}

export interface CampusSPOC {
  name: string;
  role: string;
  email: string;
  image: string;
}

export interface Campus {
  id: string;
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
  // Redesign fields
  projectsCompletedCount: number;
  facultyEngagedCount: number;
  studentsEngagedCount: number;
  keyProjectsCount: number;
  spoc: CampusSPOC;
  departments: DepartmentExpertise[];
}

export const campusesData: Campus[] = [
  {
    id: "central-campus",
    name: "Central Campus",
    location: "Bangalore",
    image: "/images/campuses/Central/central-campus.jpg",
    description: "The Central Campus is the hub for innovation, research and consultancy excellence, driving impactful solutions across diverse domains.",
    link: "https://www.christuniversity.in/#",
    stats: {
      totalProjects: 4,
      activeProjects: 2,
      studentsInvolved: 256,
      completionRate: "50%",
    },
    projectsCompletedCount: 78,
    facultyEngagedCount: 132,
    studentsEngagedCount: 256,
    keyProjectsCount: 24,
    spoc: {
      name: "Dr. Mary Anita E.A.",
      role: "Associate Professor, Department of Psychology",
      email: "mary.anita@christuniversity.in",
      image: "/images/teams/consultants/Kiran.png",
    },
    departments: [
      {
        name: "Computer Science",
        expertise: ["AI/ML", "Data Analytics", "Software Engineering", "Cybersecurity", "IT Consulting"],
        iconName: "Laptop",
      },
      {
        name: "Commerce",
        expertise: ["Finance", "Accounting", "Business Analytics", "Market Research"],
        iconName: "TrendingUp",
      },
      {
        name: "Psychology",
        expertise: ["Organizational Behavior", "Assessment", "Training & Development"],
        iconName: "Brain",
      },
      {
        name: "Law",
        expertise: ["Legal Research", "Policy Advisory", "Compliance", "IPR", "Contracts"],
        iconName: "Scale",
      },
      {
        name: "Management",
        expertise: ["Strategy", "HR", "Operations", "Entrepreneurship", "Project Management"],
        iconName: "Briefcase",
      },
      {
        name: "Social Work",
        expertise: ["Community Development", "Impact Assessment", "CSR Advisory"],
        iconName: "Heart",
      },
      {
        name: "Media Studies",
        expertise: ["Digital Media", "Communication Strategy", "Content Development"],
        iconName: "Tv",
      },
      {
        name: "Life Sciences",
        expertise: ["Biotechnology", "Research Support", "Health & Wellness"],
        iconName: "Dna",
      },
      {
        name: "Education",
        expertise: ["Educational Research", "Curriculum Design", "Training & Capacity Building"],
        iconName: "GraduationCap",
      },
    ],
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
    id: "kengeri-campus",
    name: "Bangalore Kengeri Campus",
    location: "Bangalore",
    image: "/images/campuses/Kengeri/kengeri-campus.jpg",
    description: "A green sanctuary of technological innovation, housing engineering, architecture, and advanced science research facilities.",
    link: "https://christuniversity.in/campus/Bangalore%20Kengeri%20Campus",
    stats: {
      totalProjects: 4,
      activeProjects: 3,
      studentsInvolved: 184,
      completionRate: "25%",
    },
    projectsCompletedCount: 54,
    facultyEngagedCount: 98,
    studentsEngagedCount: 184,
    keyProjectsCount: 18,
    spoc: {
      name: "Dr. Ramakrishnan Raman",
      role: "Professor, Department of Computer Science",
      email: "ramakrishnan.raman@christuniversity.in",
      image: "/images/teams/consultants/Alexander.png",
    },
    departments: [
      {
        name: "Engineering",
        expertise: ["CAD/CAM", "VLSI Design", "Smart Manufacturing", "Prototyping"],
        iconName: "Settings",
      },
      {
        name: "Architecture",
        expertise: ["Sustainable Design", "Urban Planning", "Interior Architecture"],
        iconName: "Home",
      },
      {
        name: "Computer Science",
        expertise: ["IoT Systems", "Networking", "Mobile App Development", "Cloud Computing"],
        iconName: "Laptop",
      },
      {
        name: "Business Administration",
        expertise: ["Operations Management", "Supply Chain Logistics", "Retail Management"],
        iconName: "Briefcase",
      },
      {
        name: "Social Sciences",
        expertise: ["Rural Development", "Policy Impact", "Social Welfare Studies"],
        iconName: "Users",
      },
    ],
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
    id: "bannerghatta-campus",
    name: "Bangalore Bannerghatta Campus",
    location: "Bangalore",
    image: "/images/campuses/Bannerghatta/bannerghatta-campus.jpg",
    description: "Dedicated to business, humanities, and social sciences, fostering creative thinking and corporate consultancy partnerships.",
    link: "https://christuniversity.in/campus/Bangalore%20Bannerghatta%20Road%20Campus",
    stats: {
      totalProjects: 3,
      activeProjects: 1,
      studentsInvolved: 148,
      completionRate: "33%",
    },
    projectsCompletedCount: 42,
    facultyEngagedCount: 76,
    studentsEngagedCount: 148,
    keyProjectsCount: 12,
    spoc: {
      name: "Dr. Jyothi Kumar",
      role: "Professor, School of Business and Management",
      email: "jyothi.kumar@christuniversity.in",
      image: "/images/teams/consultants/Sharanya.png",
    },
    departments: [
      {
        name: "Management",
        expertise: ["Brand Strategy", "Financial Auditing", "HR Analytics", "Leadership Training"],
        iconName: "Briefcase",
      },
      {
        name: "English",
        expertise: ["Technical Writing", "Corporate Communication", "Public Relations", "Content Creation"],
        iconName: "BookOpen",
      },
      {
        name: "Tourism & Travel",
        expertise: ["Destination Marketing", "Hospitality Operations", "Eco-tourism Consulting"],
        iconName: "Globe",
      },
      {
        name: "Economics",
        expertise: ["Market Surveys", "Macroeconomic Forecasting", "Financial Risk Assessment"],
        iconName: "TrendingUp",
      },
    ],
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
    id: "yeshwanthpur-campus",
    name: "Yeshwanthpur Campus",
    location: "Bangalore",
    image: "/images/campuses/Yashwanthpur/yeshwanthpur-campus.jpg",
    description: "A state-of-the-art urban facility catering to computer applications, commerce, management, and mathematical sciences.",
    link: "https://christuniversity.in/campus/Yeshwanthpur%20Campus",
    stats: {
      totalProjects: 3,
      activeProjects: 1,
      studentsInvolved: 120,
      completionRate: "33%",
    },
    projectsCompletedCount: 35,
    facultyEngagedCount: 64,
    studentsEngagedCount: 120,
    keyProjectsCount: 10,
    spoc: {
      name: "Dr. Anthony Decruz",
      role: "Associate Professor, Department of Commerce",
      email: "anthony.decruz@christuniversity.in",
      image: "/images/teams/consultants/Suman.png",
    },
    departments: [
      {
        name: "Dept. of Computer Science",
        expertise: [
          "Data Analytics and Data Visualisation",
          "Artificial Intelligence & Machine Learning",
          "Web and Mobile Application Development",
          "Software Development and Testing",
          "Internet of Things (IoT) Solutions",
          "Cloud Computing & Cyber Security",
          "Academic Consultancy (OBE Framework, Curriculum Design)",
          "Faculty Development Programs (FDPs)",
          "Industry-Oriented Skill Development Programs"
        ],
        iconName: "Laptop",
        customIntro: "The Department of Computer Science, CHRIST University, BYC offers consultancy services in diverse and emerging areas of technology:",
        labsIntro: "The department is equipped with modern infrastructure to support consultancy and training activities:",
        labs: [
          "Programming Lab (Visual Studio, Java, Python, C++)",
          "Data Science & Intel - AI METIS Lab (Modern-driven Explorative Technologies & Intelligent Solutions )",
          "Networking & Cyber Security Lab",
          "IoT & Automation Lab"
        ],
        logos: [
          { name: "NIE First Grade College, Mysore", path: "/images/campuses/Yashwanthpur/Department/computer science/NIE First Grade College, Mysore.png" },
          { name: "Seshadripuram Institute of Commerce & Management", path: "/images/campuses/Yashwanthpur/Department/computer science/Seshadripuram Institute of Commerce & Management logo.jpg" },
          { name: "St. Aloysius (Deemed to be University)", path: "/images/campuses/Yashwanthpur/Department/computer science/St. Aloysius (Deemed to be University).jpg" },
          { name: "Toyota Tsusho Steel", path: "/images/campuses/Yashwanthpur/Department/computer science/Toyota Tsusho Steel (or download vectors via LogoKit).png" },
          { name: "Jayraj Annapackiam College, Periyakulam", path: "/images/campuses/Yashwanthpur/Department/computer science/Jayraj Annapackiam College, Periyakulam.jpg" },
          { name: "Maris Stella College, Vijayawada", path: "/images/campuses/Yashwanthpur/Department/computer science/Maris Stella College, Vijayawada.jpg" },
          { name: "UPEDUCATORS (Tech for Educators)", path: "/images/campuses/Yashwanthpur/Department/computer science/UPEDUCATORS (Tech for Educators).png" },
          { name: "Garden City University, Bengaluru", path: "/images/campuses/Yashwanthpur/Department/computer science/Garden City University, Bengaluru.png" },
          { name: "Thiagarajar College, Madurai", path: "/images/campuses/Yashwanthpur/Department/computer science/Thiagarajar College, Madurai.jpg" },
          { name: "Gokul Jain College for Women, Chennai", path: "/images/campuses/Yashwanthpur/Department/computer science/Gokul Jain College for Women, Chennai (Guru Shree Shantivijai Jain College).jpg" },
          { name: "St. Anthony's College, Shillong", path: "/images/campuses/Yashwanthpur/Department/computer science/St. Anthony's College, Shillong.jpg" },
          { name: "Blossom Arts & Science College", path: "/images/campuses/Yashwanthpur/Department/computer science/Blossom Arts & Science College.jpg" },
          { name: "3S Communication", path: "/images/campuses/Yashwanthpur/Department/computer science/3S Communication.jpg" },
          { name: "Nandha Arts & Science College", path: "/images/campuses/Yashwanthpur/Department/computer science/Nandha Arts & Science College.jpg" }
        ]
      },
      {
        name: "Dept. of Commerce",
        expertise: [
          "Financial aspects of business; Budgeting, Pricing, Taxation etc.",
          "Strategize resource management complexities",
          "ESG, Social Impact, and Sustainability",
          "Human Resource Development & Holistic Wellness"
        ],
        iconName: "TrendingUp",
        description: "The Department of Commerce at Christ University, Yeshwanthpur Campus, dwells at the intersection of tradition and transition. While we are immensely proud of our pedagogical innovations, ranging from case-based teaching to service learning, our commitment to excellence extends far beyond the classroom.\n\nWe are pleased to present our Consultancy Services; designed to channel our faculty members’ multi-dimensional expertise and our state-of-the-art infrastructure into actionable solutions for the corporate, public, and social sectors.",
        customIntro: "We would be happy to provide services in the following key areas of Business:",
        customOutro: "While the areas outlined above represent our expertise, but by no means are they exhaustive. In a rapidly evolving business environment we recognize that organizational challenges often require contemporary solutions.\n\nThe Department of Commerce is committed to versatility and adaptive problem-solving. Our consultancy division would be a dynamic partner, capable of developing tailored solutions to your specific institutional requirements. If you are facing a unique hurdle that falls outside our listed services, we welcome the opportunity to co-create a specialized framework to address it in collaboration with the expertise across the University, which would provide interdisciplinary approach.\n\nOur vide repository of academic resources, combined with the real-time analytical power of our Bloomberg Lab, allows us to pivot and scale our expertise to meet the emerging needs of any sector. Whether your requirement is a niche technical audit, a multi-disciplinary research project, or a unique capacity-building exercise, our doors are open for need-based expansion of our service portfolio.",
        labs: ["Bloomberg Lab with 2 terminal and Trainer support"],
        logos: [
          { name: "KCG College of Technology", path: "/images/campuses/Yashwanthpur/Department/Commerce/KCG College of Technology.png" },
          { name: "Mount Carmel College", path: "/images/campuses/Yashwanthpur/Department/Commerce/Mount carmel College.png" },
          { name: "Nirmala College", path: "/images/campuses/Yashwanthpur/Department/Commerce/Nirmala College.png" },
          { name: "Primax Foundation", path: "/images/campuses/Yashwanthpur/Department/Commerce/Primax Foundation.png" },
          { name: "St. Francis De Sales College", path: "/images/campuses/Yashwanthpur/Department/Commerce/St. Francis De Sales College.png" }
        ]
      },
      {
        name: "Economics dept",
        expertise: [
          "Behavioural Economics & Public Policy",
          "Labour Economics, Migration & Informal Labour Markets",
          "Development Economics, Agricultural Systems & Livelihood Studies",
          "Environmental, Energy & Circular Economics",
          "Applied Econometrics, Impact Evaluation & Efficiency Analysis",
          "Macroeconomics, Monetary Policy & Financial Sector Analysis",
          "Economic Sociology, Political Economy & Financial Inclusion",
          "Tourism Economics, Social Enterprise & MSME Development"
        ],
        iconName: "LineChart",
        description: "The Department of Economics at Christ University, Yeshwanthpur Campus, integrates quantitative scientific research with qualitative policy analysis. We are committed to translating research insights into actionable consulting strategies for governments, non-profits, and corporate institutions.",
        customIntro: "The Department offers consulting and capacity-building services across diverse and specialized domains of economics:",
        labsIntro: "The department features advanced research infrastructure dedicated to computational analysis and experimental research:",
        labs: [
          "Data Analysis Facility (80 licensed systems for STATA)",
          "Behavioural Economics Research Lab (for conducting experiments with integrated systems)"
        ]
      },
      {
        name: "English dept",
        expertise: [
          "Teaching, Learning and Assessment Practices: Designing learner-centred pedagogies, innovative teaching strategies, and effective assessment frameworks for school and higher education contexts.",
          "TESOL and English Language Pedagogy: Providing expert training in English language teaching, TESOL methodologies, and communication-focused classroom practices across K–12 and higher education through Trinity CertTESOL-certified teachers.",
          "Communication, Workplace and Soft Skills Development: Enhancing verbal, non-verbal, interpersonal, and professional communication skills for academic, workplace, and leadership contexts.",
          "ICT, Digital Pedagogy and AI in Education: Supporting the integration of digital tools, ICT-enabled teaching, and ethical AI practices to enrich learning experiences.",
          "Critical, Creative and Experiential Classroom Practices: Developing classroom strategies that foster critical thinking, creativity, simulations, role play, and experiential learning.",
          "Student Mental Health and Holistic Development: Promoting student well-being, emotional resilience, and holistic development within and beyond the classroom.",
          "Gender and Cultural Sensitisation: Facilitating inclusive and equitable learning environments through awareness of gender, diversity, and cultural contexts.",
          "SDG-aligned Education and Institutional Outreach: Supporting the integration of Sustainable Development Goals into curriculum design, classroom practice, and school–university engagement initiatives.",
          "Foreign Language Training (German and French): Offering language training in German and French for academic, professional, and everyday communication, tailored to learners across school, university, and corporate contexts."
        ],
        iconName: "BookOpen",
        description: "The Department of English at Christ University, Yeshwanthpur Campus, offers high-quality training and advisory services in teaching methodology, curriculum design, TESOL frameworks, professional communication, and language learning. We are dedicated to creating inclusive, creative, and future-ready educational spaces.",
        customIntro: "The Department offers training, advisory, and consultation services in the following areas:"
      },
      {
        name: "Psychology dept",
        expertise: [
          "Healthcare, Well-being & Public Health: Quality of Life & Well-being Assessment Frameworks for patients with chronic illness, geriatric populations, and caregivers.",
          "Neuropsychological Assessment: Cognitive screening tools, training programs for clinical teams, and standardized reporting protocols.",
          "Community Mental Health: Programme design featuring awareness modules, community resource mapping, and gatekeeper training for labourers, elders, and adolescents.",
          "Psychosocial Disaster Response: Formulation of rapid triage tools, field team training modules, and psychological first-aid systems."
        ],
        iconName: "Brain",
        description: "The Department of Psychology at Christ University, Yeshwanthpur Campus, integrates clinical insights with public health applications. We offer consultation, program design, and standardized assessments to support mental health, clinical practices, and community resilience.",
        customIntro: "The Department offers research, diagnostic, and outreach consultancy across key domains:"
      },
      {
        name: "School of Business management",
        expertise: [
          "General: Leadership Development, Management Development, Outbound Experiential Learning, Personal Effectiveness Programmes, Soft/Life Skills, and Faculty Development Programmes.",
          "Marketing: Digital Marketing, Marketing Analytics, Marketing Research, Marketing Plans & Strategies, Branding, Sales Promotion, Consumer Behaviour, and Sales Training.",
          "Finance: Fintech, Financial Modeling, Statement Preparation & Analysis, Costing, Budgeting, Investment Optimization, Behavioural Finance, and Tax Planning.",
          "Human Resources: Recruitment & Orientation, Training Need Analysis, Competency Mapping, HR Metrics, Appraisal Systems, Organisational Behaviour, HR Policy, Compliance, and Compensation Planning.",
          "Analytics: Data Gathering & Preparation, Data Cleaning, Data Analytics, Custom Dashboard Creation, Text Analytics, and Data Visualization.",
          "Entrepreneurship: Creativity & Innovation, Idea Generation, Business Plan Preparation, Startup Establishment, and Scale-up Management."
        ],
        iconName: "Briefcase",
        description: "The School of Business and Management at Christ University, Yeshwanthpur Campus, bridges academic intelligence with strategic corporate leadership. We offer dynamic executive training, business diagnostics, financial consulting, HR auditing, and analytics solutions to elevate organizational capacity.",
        customIntro: "The School of Business and Management offers comprehensive consulting, diagnostics, and capacity-building across key business verticals:"
      },
    ],
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
    id: "pune-lavasa-campus",
    name: "Pune Lavasa Campus",
    location: "Pune",
    image: "/images/campuses/Pune Lavasa/pune-lavasa-campus.jpg",
    description: "Nestled in the scenic hills, this campus is a hub for analytical sciences, data science, law, and business leadership.",
    link: "https://lavasa.christuniversity.in/",
    stats: {
      totalProjects: 3,
      activeProjects: 1,
      studentsInvolved: 90,
      completionRate: "33%",
    },
    projectsCompletedCount: 29,
    facultyEngagedCount: 45,
    studentsEngagedCount: 90,
    keyProjectsCount: 8,
    spoc: {
      name: "Dr. Fr. Jossy P. George",
      role: "Director & Professor, Dept. of Computer Science",
      email: "jossy.george@christuniversity.in",
      image: "/images/teams/consultants/FR Jossy.png",
    },
    departments: [
      {
        name: "Data Science",
        expertise: ["Predictive Analytics", "Big Data Engineering", "Business Intelligence"],
        iconName: "Database",
      },
      {
        name: "Management",
        expertise: ["Entrepreneurship Mentoring", "Leadership Coaching", "Rural Management"],
        iconName: "Briefcase",
      },
      {
        name: "Law",
        expertise: ["Corporate Law", "Dispute Resolution", "Legal Drafting", "Contract Management"],
        iconName: "Scale",
      },
      {
        name: "Commerce",
        expertise: ["Fintech Strategy", "Cost Accounting", "Wealth Management Advisory"],
        iconName: "TrendingUp",
      },
    ],
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
    id: "delhi-ncr-campus",
    name: "Delhi NCR Campus",
    location: "Delhi NCR",
    image: "/images/campuses/Delhi NCR/delhi-ncr-campus.jpg",
    description: "Serving as a vital link in the national capital region, focusing on professional education, law, and corporate connections.",
    link: "https://ncr.christuniversity.in/",
    stats: {
      totalProjects: 3,
      activeProjects: 2,
      studentsInvolved: 110,
      completionRate: "0%",
    },
    projectsCompletedCount: 31,
    facultyEngagedCount: 52,
    studentsEngagedCount: 110,
    keyProjectsCount: 9,
    spoc: {
      name: "Dr. Sunita Kumar",
      role: "Associate Professor, School of Law",
      email: "sunita.kumar@christuniversity.in",
      image: "/images/teams/consultants/Maria.png",
    },
    departments: [
      {
        name: "Law",
        expertise: ["Constitutional Studies", "Human Rights Litigation", "IPR Audits", "Environmental Law"],
        iconName: "Scale",
      },
      {
        name: "Management",
        expertise: ["Corporate Relations", "Talent Management", "Strategic PR", "Mergers & Acquisitions"],
        iconName: "Briefcase",
      },
      {
        name: "Social Sciences",
        expertise: ["NGO Collaborations", "CSR Evaluation", "Policy Advisory", "Social Impact Assessment"],
        iconName: "Users",
      },
      {
        name: "Commerce",
        expertise: ["Investment Advisory", "International Trade Consultancy", "Auditing"],
        iconName: "TrendingUp",
      },
    ],
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

export const getCampusById = (id: string): Campus | undefined => {
  return campusesData.find((c) => c.id === id);
};

export const getDeptSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const getDepartmentBySlug = (campusId: string, deptSlug: string): { campus: Campus; department: DepartmentExpertise } | undefined => {
  const campus = getCampusById(campusId);
  if (!campus) return undefined;

  const department = campus.departments.find(
    (d) => getDeptSlug(d.name) === deptSlug
  );

  if (!department) return undefined;
  return { campus, department };
};
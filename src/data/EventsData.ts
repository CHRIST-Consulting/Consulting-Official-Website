// Type definitions
export type CategoryId = "all" | "past events" | "industry connects";

export interface Category {
  id: CategoryId;
  name: string;
}

export interface FeaturedEvent {
  title: string;
  speaker?: string;
  date: string;
  time: string;
  venue: string;
  description: string[];
  image: string;
  isUpcoming: boolean;
}

// Unified interface to allow rich data for both past and upcoming events
export interface PastEvent {
  id: string;
  title: string;
  impact?: string;
  date: string;
  time?: string; // Added to support upcoming events
  speaker?: string; // Added to support upcoming events
  description: string[];
  venue: string;
  category?: string;
  attendees?: number;
  highlights?: string[];
  images: string[];
  videos?: string[];
  downloads?: { name: string; url: string }[];
  testimonials?: {
    name: string;
    role: string;
    quote: string;
    image: string;
  }[];
  statsAvailable: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
}

// Re-export PastEvent as UpcomingEvent for compatibility if needed, 
// or just use PastEvent for everything.
export type UpcomingEvent = PastEvent;

export const categories: Category[] = [
  { id: "all", name: "All Events" },
  { id: "past events", name: "Past Events" },
  { id: "industry connects", name: "Industry Connects" },
];

export const featuredEvent: FeaturedEvent = {
  title: "CICF VALEDICTORY 2025-26",
  date: "27th February, 2026",
  time: "2:00 PM - 3:45 PM",
  venue: "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
  description: "The CICF Valedictory 2025-26 was a vibrant and meticulously organized event...",
  image: "/images/events/past/investiture-2025/1.JPG",
  isUpcoming: false,
};

// Events here will appear in the "Industry Connects" tab OR "Past Events" tab depending on category
export const upcomingEvents: PastEvent[] = [
  {
    id: "toyota-connect-2025",
    title: "Toyota Industry Connect",
    date: "April 12, 2025",
    time: "8:30 AM",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    category: "industry connects", // This ensures it goes to the correct tab
    images: ["/images/events/industry/toyota.png","/images/events/industry/9.png","/images/events/industry/7.png","/images/events/industry/22.png","/images/events/industry/24.png","/images/events/industry/25.png","/images/events/industry/26.png"],
    description: "An exclusive industrial visit and workshop with Toyota Kirloskar Motor. Students gained firsthand insight into Lean Manufacturing, the Toyota Production System (TPS), and supply chain logistics.",
    attendees: 60,
    statsAvailable: true,
    stats: [
      { label: "Industry Experts", value: "5" },
      { label: "Hours of Training", value: "6" }
    ],
    highlights: [
      "Shop floor walk-through",
      "Q&A with Plant Head",
      "Kaizen implementation workshop",
      "Supply chain simulation game"
    ]
  },
  {
    id: "nasa-hackathon-2025",
    title: "NASA Hackathon",
    date: "August 22, 2025",
    time: "9:00 AM",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    category: "past events",
    images: [
      "/images/events/past/nasa/nasa.png",
      "/images/events/past/nasa/1.JPG",
      "/images/events/past/nasa/2.JPG",
      "/images/events/past/nasa/3.JPG",
      "/images/events/past/nasa/4.JPG",
      "/images/events/past/nasa/5.JPG",
      "/images/events/past/nasa/6.png",
      "/images/events/past/nasa/7.JPG",
      "/images/events/past/nasa/8.JPG",
      "/images/events/past/nasa/9.JPG",
      "/images/events/past/nasa/10.png",
      "/images/events/past/nasa/11.png",
      "/images/events/past/nasa/12.JPG",
      "/images/events/past/nasa/13.JPG",
      "/images/events/past/nasa/14.JPG",
      "/images/events/past/nasa/15.JPG",
      "/images/events/past/nasa/16.JPG",
      "/images/events/past/nasa/17.JPG",
      "/images/events/past/nasa/18.JPG",
      "/images/events/past/nasa/19.JPG"],
    description: "A 48-hour global hackathon where students collaborated to solve real-world space challenges using NASA's open data.",
    attendees: 150,
    statsAvailable: true,
    stats: [
      { label: "Teams", value: "25" },
      { label: "Projects", value: "18" }
    ],
    highlights: ["Keynote by ISRO Scientists", "24-hour nonstop coding", "Mentorship from experts"]
  },
  {
    id: "connexion-2025",
    title: "ConneXion 2025",
    date: "November 22, 2025",
    time: "6:00 PM",
    venue: "CHRIST (Deemed to be University), Central Campus Auditorium",
    category: "past events",
    images: ["/images/events/past/ConneXion/connexion.png","/images/events/past/ConneXion/12.png","/images/events/past/ConneXion/13.png","/images/events/past/ConneXion/14.png","/images/events/past/ConneXion/15.png","/images/events/past/ConneXion/17.png"],
    description: ["The event, Connexion 2025, Bridging Minds, Building Bonds, served as a crucial platform for incorporating institutional dialogue with academic reflection. It also combined a knowledge exchange between both industries and academia to ensure an era of fruitful collaboration and meaningful contribution to society through this partnership. The event featured formal addresses by the leadership of Christ (Deemed to be University), followed by a panel discussion in the latter half of the evening, in which senior corporate representatives examined the evolving workforce demands, the relevance of internships, and the need for universities to create learning ecosystems which drive innovation. The session brought to light the need for expansion in incubation and research infrastructure, strengthening of industry partnerships, and redesigning of university curricula to align with the emerging technological shifts, particularly that of Artificial Intelligence. Fostering interdisciplinary collaboration across academic programmes was also a crucial highlight of the discussion.\n\nThe open forum enabled the faculty and administrative leaders to engage directly with industry experts and generate curated insights on experimental learning models, implementation of policy and building capable students who would be prepared to tackle transitional changes of the future.\n\n The event reinforced the university’s commitment to becoming an academic institution which is equipped for the future. It emphasised the priorities of employability, entrepreneurial capability, and sustained industry engagement, which the institution works on producing in its students. It symbolised the university’s mission of establishing pathways for future collaborations, Memorandums of Understanding, and joint developmental initiatives to provide the foremost for its pupils."],
    attendees: 90,
    statsAvailable: true,
    stats: [
      { label: "Companies", value: "15+" },
      { label: "Leaders", value: "90+" }
    ],
    highlights: ["Strategic Industry Engagement", "Leadership Keynote", "Navigating the Future of Work","Focus on Experiential Learning","Actionable Open Forum","Networking and Ecosystem Building"]
  },
  {
    id: "prospero-2025",
    title: "Prospero",
    date: "December 15, 2025",
    time: "6:00 PM",
    venue: "CHRIST (Deemed to be University), Central Campus Auditorium",
    category: "past events",
    images: ["/images/events/past/Prospero/prospero.png","/images/events/past/Prospero/18.png","/images/events/past/Prospero/19.png","/images/events/past/Prospero/20.png","/images/events/past/Prospero/21.png"],
    description: "Prospero’25 was the annual Christmas Gratitude Dinner organised by the CHRIST Incubation and Consultancy Foundation. The event brought together the distinguished clients, consultants, faculty members, and interns from all campuses for an evening of formal celebration, institutional fellowship, and professional networking. It served as a platform to acknowledge partnerships, strengthen engagement, and celebrate the festive season through culture and collaboration.\n\n The programme included formal leadership addresses, curated cultural performances by interns across campuses, a collective musical segment, and a delightful fellowship dinner. The evening reflected the foundation’s continued emphasis on community building, creativity, and professional relationship development in a dignified festive setting.",
    attendees: 50,
    statsAvailable: true,
    stats: [
      { label: "Attendees", value: "50" },
      { label: "Campuses", value: "4" }
    ],
    highlights: ["Christmas Gratitude Dinner", "Formal Welcome and Keynote Addresses", "Multi-Campus Cultural Showcase","Interactive Sing-Along Segment","Event Aftermovie Screening","Vote of Thanks","Christmas Fellowship Dinner","Cross-Campus and Client Networking"]
  }
];

// Events that are strictly historical and not in the "Upcoming" list logic (like Investiture)
export const pastEvents: PastEvent[] = [
  {
    id: "investiture-2025",
    title: "CICF VALEDICTORY 2025-26",
    date: "27th February, 2026",
    description: "The CICF Valedictory 2025-26 was a vibrant and meticulously organized event that marked the official end of the academic session.",
    venue: "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
    images: [
      "/images/events/past/investiture-2025/1.JPG",
      "/images/events/past/investiture-2025/2.JPG",
      "/images/events/past/investiture-2025/3.JPG",
      "/images/events/past/investiture-2025/4.JPG",
      "/images/events/past/investiture-2025/5.JPG",
      "/images/events/past/investiture-2025/6.JPG",
      "/images/events/past/investiture-2025/7.JPG",
      "/images/events/past/investiture-2025/8.JPG",
      "/images/events/past/investiture-2025/9.JPG",
      "/images/events/past/investiture-2025/10.JPG",
      "/images/events/past/investiture-2025/11.JPG",
      "/images/events/past/investiture-2025/12.JPG",
      "/images/events/past/investiture-2025/13.JPG",
      "/images/events/past/investiture-2025/14.JPG",
      "/images/events/past/investiture-2025/15.JPG",
      "/images/events/past/investiture-2025/16.JPG",
      "/images/events/past/investiture-2025/17.JPG",
      "/images/events/past/investiture-2025/18.JPG",
      "/images/events/past/investiture-2025/19.JPG",
      "/images/events/past/investiture-2025/20.JPG",
    ],
    statsAvailable: false,
    category: "past events"
  }
];

// Utility functions
export const getEventById = (id: string): PastEvent | null => {
  const all = [...upcomingEvents, ...pastEvents];
  return all.find((event) => event.id === id) || null;
};

export const getPastEventById = (id: string): PastEvent | null => {
  return getEventById(id);
};

export const getAllEvents = (): PastEvent[] => {
  return [...upcomingEvents, ...pastEvents];
};
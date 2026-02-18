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
  description: string;
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
  description: string;
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
  title: "CICF INAUGURATION AND STUDENT ORIENTATION 2025",
  date: "5th July, 2025",
  time: "2:00 PM - 3:45 PM",
  venue: "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
  description: "The CICF Inauguration and Student Orientation 2025 was a vibrant and meticulously organized event...",
  image: "/images/events/past/investiture-2025/1.png",
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
    images: ["/images/events/industry/toyota.png"],
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
    ],
    testimonials: [
      {
         name: "Rohan M.", 
         role: "Student Coordinator", 
         quote: "Seeing TPS in action was a game-changer for understanding operations management.", 
         image: "https://ui-avatars.com/api/?name=Rohan+M" 
      }
    ]
  },
  {
    id: "nasa-hackathon-2025",
    title: "NASA Hackathon",
    date: "August 22, 2025",
    time: "9:00 AM",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    category: "past events",
    images: ["/images/events/past/nasa/nasa.jpeg"],
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
    images: ["/images/events/past/ConneXion/connexion.png"],
    description: "ConneXion 2025 was our flagship networking gala, bringing together students and top-tier consulting professionals.",
    attendees: 300,
    statsAvailable: true,
    stats: [
      { label: "Companies", value: "15+" },
      { label: "Leaders", value: "40+" }
    ],
    highlights: ["Panel discussion", "Speed networking", "Resume review booths"]
  },
  {
    id: "prospero-2025",
    title: "Prospero",
    date: "December 15, 2025",
    time: "6:00 PM",
    venue: "CHRIST (Deemed to be University), Central Campus Auditorium",
    category: "past events",
    images: ["/images/events/past/Prospero/prospero.png"],
    description: "Prospero was a high-stakes strategy simulation competition. Teams were tasked with solving complex business cases.",
    attendees: 200,
    statsAvailable: true,
    stats: [
      { label: "Case Studies", value: "4" },
      { label: "Prize Pool", value: "₹50k" }
    ],
    highlights: ["Live crisis management", "Data analytics workshop", "Final presentations"]
  }
];

// Events that are strictly historical and not in the "Upcoming" list logic (like Investiture)
export const pastEvents: PastEvent[] = [
  {
    id: "investiture-2025",
    title: "CICF INAUGURATION AND STUDENT ORIENTATION 2025",
    date: "5th June, 2025",
    description: "The CICF Inauguration and Student Orientation 2025 was a vibrant and meticulously organized event that marked the official launch of the new session.",
    venue: "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
    images: [
      "/images/events/past/investiture-2025/1.png",
      "/images/events/past/investiture-2025/2.png",
      "/images/events/past/investiture-2025/3.jpg",
      "/images/events/past/investiture-2025/4.jpg",
      "/images/events/past/investiture-2025/5.jpg",
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
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

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  venue: string;
  category: Exclude<CategoryId, "all">; 
  images: string[];
}

export interface PastEvent {
  id: string;
  title: string;
  impact?: string;
  date: string;
  description: string;
  venue: string;
  attendees?: number;
  speakers?: string[];
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

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "nasa-hackathon-2025",
    title: "NASA Hackathon",
    date: "August 22, 2025",
    time: "9:00 AM",
    speaker: "Prof. Michael Chen",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    category: "past events",
    images: ["/images/events/past/nasa/nasa.jpeg"],
  },
  {
    id: "connexion-2025",
    title: "ConneXion 2025",
    date: "November 22, 2025",
    time: "6:00 PM",
    speaker: "Prof. Michael Chen",
    venue: "CHRIST (Deemed to be University), Central Campus Auditorium",
    category: "past events",
    images: ["/images/events/past/ConneXion/connexion.png"],
  },
  {
    id: "prospero-2025",
    title: "Prospero",
    date: "December 15, 2025",
    time: "6:00 PM",
    speaker: "Prof. Michael Chen",
    venue: "CHRIST (Deemed to be University), Central Campus Auditorium",
    category: "past events",
    images: ["/images/events/past/Prospero/prospero.png"],
  },
  {
    id: "toyota-connect-2025",
    title: "Toyota",
    date: "April 12, 2025",
    time: "8:30 AM",
    speaker: "Faculty from CHRIST (Deemed to be University)",
    venue: "CHRIST (Deemed to be University), Kengeri Campus",
    category: "industry connects",
    images: ["https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"],
  },
];

export const pastEvents: PastEvent[] = [
  {
    id: "investiture-2025",
    title: "CICF INAUGURATION AND STUDENT ORIENTATION 2025",
    date: "5th June, 2025",
    description: "The CICF Inauguration and Student Orientation 2025 was a vibrant and meticulously organized event that marked the official launch of the new session and welcomed a diverse group of interns into the fold...",
    venue: "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
    images: [
      "/images/events/past/investiture-2025/1.png",
      "/images/events/past/investiture-2025/2.png",
      "/images/events/past/investiture-2025/3.jpg",
      "/images/events/past/investiture-2025/4.jpg",
      "/images/events/past/investiture-2025/5.jpg",
    ],
    statsAvailable: false,
  },
];

// Utility functions
export const getEventById = (id: string): PastEvent | UpcomingEvent | null => {
  const pastEvent = pastEvents.find((event) => event.id === id);
  const upcomingEvent = upcomingEvents.find((event) => event.id === id);
  return pastEvent || upcomingEvent || null;
};

export const getPastEventById = (id: string): PastEvent | null => {
  return pastEvents.find((event) => event.id === id) || null;
};

export const getEventsByCategory = (
  categoryId: Exclude<CategoryId, "all">
): (UpcomingEvent | PastEvent)[] => {
  const upcoming = upcomingEvents.filter((event) => event.category === categoryId);
  if (categoryId === "past events") {
    return [...upcoming, ...pastEvents];
  }
  return upcoming;
};

export const getAllEvents = (): (UpcomingEvent | PastEvent)[] => {
  return [...upcomingEvents, ...pastEvents];
};
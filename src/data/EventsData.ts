// Type definitions
export type CategoryId = "all" | "workshops" | "talks";

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
  category: Exclude<CategoryId, "all">; // Exclude "all" since it's not a real category for events
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
  { id: "workshops", name: "Workshops" },
  { id: "talks", name: "Industry Talks" },
];

export const featuredEvent: FeaturedEvent = {
  title: "CICF INAUGURATION AND STUDENT ORIENTATION 2025",
  date: "5th July, 2025",
  time: "2:00 PM - 3:45 PM",
  venue:
    "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
  description:
    "The CICF Inauguration and Student Orientation 2025 was a vibrant and meticulously organized event that marked the official launch of the new session and welcomed a diverse group of interns into the fold. The proceedings commenced with an energetic welcome by the Emcee, setting a positive tone for the afternoon. This was followed by the traditional Lighting of the Lamp and a heartfelt Welcome Prayer, creating a solemn yet inspiring atmosphere. Father Jossy delivered an engaging welcome address, unveiling the new logo to enthusiastic applause, symbolising a fresh chapter for the organisation. The Guest of Honour, Rishav, delivered a thought-provoking speech, offering valuable insights into leadership and personal growth that resonated deeply with the audience. <br/>The event featured impactful contributions from consultants, with Kiran Ma’am sharing her expertise on consulting methodologies and Shruiti Ma’am providing an inspiring overview of incubation opportunities. A special video message from Dr. Saji Varghese (DAISE) added a unique element, highlighting the importance of interdisciplinary collaboration. The highlight of the afternoon was the Badge Giving Ceremony, a significant moment in which the incoming leadership was formally recognised and welcomed with badges, accompanied by cheers and applause from their peers. The ceremony underscored the importance of leadership development and set a collaborative tone for the year ahead. The event concluded with a Vote of Thanks delivered by the Student Head, expressing gratitude to all participants, followed by a delightful High Tea featuring a single sandwich, one juice, and banana cake, which provided a relaxed opportunity for networking and reflection among attendees.",
  image: "/images/events/past/investiture-2025/1.png",
  isUpcoming: false,
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "ai-business-workshop-2025",
    title: "AI in Business Workshop",
    date: "April 5, 2025",
    time: "10:00 AM",
    speaker: "Prof. Michael Chen",
    venue: "Online",
    category: "workshops",
    images: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    ],
  },
  {
    id: "leadership-symposium-2025",
    title: "Leadership Symposium",
    date: "April 12, 2025",
    time: "2:00 PM",
    speaker: "Industry Panel",
    venue: "Bannerghatta Campus",
    category: "talks",
    images: [
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    ],
  },
];

export const pastEvents: PastEvent[] = [
  {
    id: "investiture-2025",
    title: "CICF INAUGURATION AND STUDENT ORIENTATION 2025",
    date: "5th June, 2025",
    description:
      "The CICF Inauguration and Student Orientation 2025 was a vibrant and meticulously organized event that marked the official launch of the new session and welcomed a diverse group of interns into the fold. The proceedings commenced with an energetic welcome by the Emcee, setting a positive tone for the afternoon. This was followed by the traditional Lighting of the Lamp and a heartfelt Welcome Prayer, creating a solemn yet inspiring atmosphere. Father Jossy delivered an engaging welcome address, unveiling the new logo to enthusiastic applause, symbolising a fresh chapter for the organisation. The Guest of Honour, Rishav, delivered a thought-provoking speech, offering valuable insights into leadership and personal growth that resonated deeply with the audience. <br/>The event featured impactful contributions from consultants, with Kiran Ma’am sharing her expertise on consulting methodologies and Shruiti Ma’am providing an inspiring overview of incubation opportunities. A special video message from Dr. Saji Varghese (DAISE) added a unique element, highlighting the importance of interdisciplinary collaboration. The highlight of the afternoon was the Badge Giving Ceremony, a significant moment in which the incoming leadership was formally recognised and welcomed with badges, accompanied by cheers and applause from their peers. The ceremony underscored the importance of leadership development and set a collaborative tone for the year ahead. The event concluded with a Vote of Thanks delivered by the Student Head, expressing gratitude to all participants, followed by a delightful High Tea featuring a single sandwich, one juice, and banana cake, which provided a relaxed opportunity for networking and reflection among attendees.",
    venue:
      "Campus View, Central Block, CHRIST (Deemed to be University), Central Campus",
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
): UpcomingEvent[] => {
  return upcomingEvents.filter((event) => event.category === categoryId);
};

export const getAllEvents = (): (UpcomingEvent | PastEvent)[] => {
  return [...upcomingEvents, ...pastEvents];
};

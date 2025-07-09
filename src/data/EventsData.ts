// Type definitions
export type CategoryId = "all" | "workshops" | "talks" | "recruitment";

export interface Category {
  id: CategoryId;
  name: string;
}

export interface FeaturedEvent {
  title: string;
  speaker: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  venue: string;
  category: Exclude<CategoryId, "all">; // Exclude "all" since it's not a real category for events
  image: string;
}

export interface PastEvent {
  id: string;
  title: string;
  impact: string;
  image: string;
  date: string;
  description: string;
  venue: string;
  attendees: number;
  speakers: string[];
  highlights: string[];
  images: string[];
  videos?: string[];
  downloads?: { name: string; url: string }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    image: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const categories: Category[] = [
  { id: "all", name: "All Events" },
  { id: "workshops", name: "Workshops" },
  { id: "talks", name: "Industry Talks" },
  { id: "recruitment", name: "Recruitment Drives" },
];

export const featuredEvent: FeaturedEvent = {
  title: "Future of Work Summit 2025",
  speaker: "Dr. Sarah Matthews & Industry Leaders",
  date: "March 15, 2025",
  time: "9:00 AM - 5:00 PM",
  venue: "CHRIST Central Campus, Bangalore",
  description:
    "Join us for a transformative summit exploring the intersection of technology, workplace culture, and human potential.",
  image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
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
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  },
  {
    id: "leadership-symposium-2025",
    title: "Leadership Symposium",
    date: "April 12, 2025",
    time: "2:00 PM",
    speaker: "Industry Panel",
    venue: "Bannerghatta Campus",
    category: "talks",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
  },
  {
    id: "tech-talent-fair-2025",
    title: "Tech Talent Fair",
    date: "April 20, 2025",
    time: "9:00 AM",
    speaker: "Multiple Companies",
    venue: "Central Campus",
    category: "recruitment",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
];

export const pastEvents: PastEvent[] = [
  {
    id: "innovation-summit-2024",
    title: "Innovation Summit 2024",
    impact: "500+ Attendees, 20 Speakers",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    date: "November 15-16, 2024",
    description:
      "A transformative two-day summit bringing together academia and industry to explore the future of innovation, technology, and business transformation.",
    venue: "CHRIST Central Campus, Bangalore",
    attendees: 500,
    speakers: ["Dr. Sarah Matthews", "Prof. Rajesh Kumar", "Industry Leaders"],
    highlights: [
      "Keynote on AI in Business Transformation",
      "Panel Discussion on Sustainable Innovation",
      "Startup Pitch Competition",
      "Networking Sessions with Industry Leaders",
      "Workshop on Design Thinking",
    ],
    images: [
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    ],
    videos: ["https://www.youtube.com/embed/G-GpX2-IxWI"],
    downloads: [
      { name: "Event Presentation Slides", url: "#" },
      { name: "Speaker Profiles", url: "#" },
      { name: "Innovation Framework Guide", url: "#" },
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Tech Entrepreneur",
        quote:
          "The Innovation Summit provided incredible insights and networking opportunities that directly impacted my startup journey.",
        image:
          "https://images.pexels.com/photos/3799115/pexels-photo-3799115.jpeg",
      },
      {
        name: "Rajesh Kumar",
        role: "Innovation Director, TechCorp",
        quote:
          "Outstanding event with practical insights on implementing innovation frameworks in large organizations.",
        image:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      },
    ],
    stats: [
      { label: "Attendees", value: "500+" },
      { label: "Speakers", value: "25" },
      { label: "Sessions", value: "15" },
      { label: "Networking Hours", value: "8" },
    ],
  },
  {
    id: "data-science-workshop",
    title: "Data Science Workshop",
    impact: "200+ Participants",
    image: "https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg",
    date: "October 10, 2024",
    description:
      "An intensive hands-on workshop covering the latest trends in data science, machine learning, and business analytics.",
    venue: "CHRIST Bannerghatta Campus",
    attendees: 200,
    speakers: ["Prof. Michael Chen", "Dr. Analytics Team"],
    highlights: [
      "Hands-on Python Programming",
      "Machine Learning Algorithms",
      "Data Visualization Techniques",
      "Real-world Case Studies",
      "Industry Best Practices",
    ],
    images: [
      "https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg",
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    ],
    downloads: [
      { name: "Workshop Materials", url: "#" },
      { name: "Code Examples", url: "#" },
      { name: "Dataset Collection", url: "#" },
    ],
    testimonials: [
      {
        name: "Ananya Patel",
        role: "Data Analyst",
        quote:
          "The workshop provided practical skills that I immediately applied in my work. Excellent hands-on approach!",
        image:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      },
    ],
    stats: [
      { label: "Participants", value: "200+" },
      { label: "Hours of Training", value: "8" },
      { label: "Projects Completed", value: "50" },
      { label: "Satisfaction Rate", value: "98%" },
    ],
  },
  {
    id: "leadership-conference",
    title: "Leadership Conference",
    impact: "15 Industry Leaders",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    date: "September 5, 2024",
    description:
      "A comprehensive conference focused on developing next-generation leaders with insights from industry veterans and academic experts.",
    venue: "CHRIST Central Campus",
    attendees: 300,
    speakers: ["Industry Panel", "Leadership Experts"],
    highlights: [
      "Leadership in Digital Age",
      "Building High-Performance Teams",
      "Strategic Decision Making",
      "Change Management",
      "Executive Presence",
    ],
    images: [
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    ],
    downloads: [
      { name: "Leadership Assessment Tool", url: "#" },
      { name: "Conference Proceedings", url: "#" },
    ],
    testimonials: [
      {
        name: "James Wilson",
        role: "Senior Manager",
        quote:
          "The leadership insights shared here transformed my approach to team management and strategic thinking.",
        image:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      },
    ],
    stats: [
      { label: "Leaders Trained", value: "300+" },
      { label: "Expert Speakers", value: "15" },
      { label: "Leadership Tools", value: "10" },
      { label: "Follow-up Sessions", value: "5" },
    ],
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

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

export const clientLogosData: ClientLogo[] = [
  {
    name: "Bangalore Police",
    logo: "/images/clients/government-social/bangalore-police.png",
  },
  {
    name: "BPRD",
    logo: "/images/clients/government-social/bprd.png",
  },
  {
    name: "ICMR",
    logo: "/images/clients/government-social/icmr.png",
  },
  {
    name: "MHRD",
    logo: "/images/clients/government-social/mhrd.jpg",
  },
  {
    name: "Nandini",
    logo: "/images/clients/government-social/nandini.jpg",
  },
  {
    name: "TVS",
    logo: "/images/clients/training-development/tvs.jpg",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    quote:
      "CHRIST Consulting's expertise in educational technology and strategic planning has been instrumental in transforming our digital learning initiatives. Their research-backed approach delivered measurable improvements in student engagement.",
    author: "Dr. Rajesh Kumar",
    position: "Director of Innovation, Skoolz Education",
    rating: 5,
  },
  {
    quote:
      "The consultancy team provided exceptional support in modernizing our administrative processes and implementing data-driven decision making frameworks. Their professionalism and expertise exceeded our expectations.",
    author: "Commissioner Priya Sharma",
    position: "Bangalore Police Department",
    rating: 5,
  },
  {
    quote:
      "Working with CHRIST Consulting has been transformative for our research initiatives. Their multi-disciplinary approach and academic rigor helped us develop innovative solutions for complex healthcare challenges.",
    author: "Dr. Anil Patel",
    position: "Senior Research Director, ICMR",
    rating: 5,
  },
];

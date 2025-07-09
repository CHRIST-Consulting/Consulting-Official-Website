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
      "We are privileged to have a great partnership with CHRIST Consulting and have the opportunity to work together on training for various competitive exams. Kudos to the small but mighty consulting team for all the efforts they put into co-creating solutions that are designed around student success and aspirations.",
    author: "Mr Kunkala Krishnaiah",
    position: "Founder & Director, Land Optimizer International Pvt. Ltd",
    rating: 5,
  },
  {
    quote:
      "The one-year collaboration with team Christ was a perfect blend of learning and sharing expert knowledge. We highly acknowledge the contribution of the Christ team in developing an exclusive curriculum for virtual socio-emotional wellbeing sessions under Project Prerana.",
    author: "Ms. Monica Dhawan",
    position: "India Vision Foundation",
    rating: 5,
  },
  {
    quote:
      "We engaged CHRIST Consulting to deliver two short courses for women executives. We were very happy with their partnership, their willingness to customise their interventions and their expertise. Their domain expertise in strategic planning, design thinking and marketing was deep and received very well by our leaders.",
    author: "Mr. Prashant Michael",
    position: "Vice President & Head Organization Development, [24]7.ai",
    rating: 5,
  },
];

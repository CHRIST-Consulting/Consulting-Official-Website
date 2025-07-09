export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  cluster: string; // Relates to client clusters
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Mr Kunkala Krishnaiah",
    position: "Founder, Director",
    company: "Land Optimizer International Pvt. Ltd",
    content:
      "We are privileged to have a great partnership with CHRIST Consulting and have the opportunity to work together on training for various competitive exams. Kudos to the small but mighty consulting team for all the efforts they put into co-creating solutions that are designed around student success and aspirations. We appreciate the level of collaboration and integrity the team demonstrates in driving initiatives to closure.",
    cluster: "core",
    rating: 5,
  },
  {
    id: "2",
    name: "Ms. Monica Dhawan",
    position: "",
    company: "India Vision Foundation",
    content:
      "The one-year collaboration with team Christ was a perfect blend of learning and sharing expert knowledge. We highly acknowledge the contribution of the Christ team in the field of developing an exclusive curriculum and workbook for the virtual socio-emotional wellbeing sessions for the age group 9-12 years old children under the Project Prerana. We appreciate your efforts in the completion of all the agreed points mentioned in the MoU.",
    cluster: "government",
    rating: 5,
  },
  {
    id: "3",
    name: "Mr. Prashant Michael",
    position:
      "Vice President & Head Organization Development India and America",
    company: "[24]7.ai",
    content:
      "We engaged CHRIST Consulting to deliver two short courses for women executives. We were very happy with their partnership, their willingness to customise their interventions and their expertise. Their domain expertise in strategic planning, design thinking and marketing was deep and received very well by our leaders.",
    cluster: "research",
    rating: 5,
  },
  {
    id: "4",
    name: "Mr. Abhishek K Mathew",
    position:
      "Program Manager Competency Development - OOG TVS Institute of Quality and Leadership",
    company: "TVS Group",
    content:
      "It was great collaborating with CHRIST Consulting on German culture training and thanks for providing the team a great learning experience.",
    cluster: "training",
    rating: 5,
  },
];

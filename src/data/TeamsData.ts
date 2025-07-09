export interface TeamMember {
  name: string;
  role: string;
  image: string;
  expertise: string;
  linkedin?: string;
  email: string;
}

export interface StudentLeader {
  name: string;
  role: string;
  image: string;
}

export const directorData: TeamMember = {
  name: "Dr Fr Jossy P George",
  role: "Director",
  image: "/images/teams/consultants/FR Jossy.png",
  expertise:
    "Dr Fr Jossy P George is a visionary academic leader with extensive experience in computer science, research, and institutional development. Under his guidance, CHRIST University continues to expand its impact, offering diverse opportunities for research, education, and holistic student development.",
  linkedin: "https://www.linkedin.com/in/frjossy/",
  email: "",
};

export const facultyConsultantsData: TeamMember[] = [
  {
    name: "Ms Kiran Mariam",
    role: "Lead Consultant",
    image: "/images/teams/consultants/Kiran.png",
    expertise:
      "Ms Kiran Mariam is a postgraduate in Commerce and has previously served as the Senior Associate at Manipal Hospitals, Finance Manager in Environ Technologies Pvt Ltd and as Tax senior, in E&Y.",
    linkedin: "https://www.linkedin.com/in/kiran-mariam-1b4543248/",
    email: "kiran.mariam@christuniversity.in",
  },
  {
    name: "Mr Alexander Porinchu",
    role: "Business Development Manager",
    image: "/images/teams/consultants/Alexander.png",
    expertise:
      "Business Development Professional with sound knowledge in Finance with professional expertise in multiple industries. Actively engaged in the Educational sector with focus on Institutional Revenue Growth.",
    linkedin: "https://www.linkedin.com/in/alexander-porinchu-a90a17120/",
    email: "alexander.thalakottour@christuniversity.in",
  },
  {
    name: "Ms Maria Divya",
    role: "Lead Consultant",
    image: "/images/teams/consultants/Maria.png",
    expertise:
      "Ms Maria Divya is a postgraduate in Business Administration (Tourism) and has previously served as the sales & operations manager for Thomas Cook India Ltd and the Serai group.",
    linkedin: "https://www.linkedin.com/in/maria-divya-3503961bb/",
    email: "mariadivya.chethana@christuniversity.in",
  },
  {
    name: "Mr Suman Thomas",
    role: "Lead Consultant",
    image: "/images/teams/consultants/Suman.png",
    expertise:
      "Mr Suman Thomas has over 10 years of experience in sales and marketing at KUONI Global Travel Services.",
    linkedin: "https://www.linkedin.com/in/suman-thomas-8412bb201/",
    email: "suman.thomas@christuniversity.in",
  },
  {
    name: "Ms Sharanya",
    role: "Consultant",
    image: "/images/teams/consultants/Sharanya.png",
    expertise:
      "Ms Sai Sharanya is consultant with a postgraduate degree in Ancient History and Archaeology, she combines analytical depth with creative strategy. Formerly a social media strategist at Pathika Technologies and an ex-Christite.",
    email: "saisharanya.n@christuniversity.in",
  },
];

export const studentLeadersData: StudentLeader[] = [
  {
    name: "Srinath S P",
    role: "Student Head - Branding and Strategy",
    image: "/images/teams/students/Srinath.png",
  },
  {
    name: "Adharsh Jolly",
    role: "Student Head - Tech and Innovation",
    image: "/images/teams/students/Adharsh.png",
  },
  {
    name: "Arnav Paul",
    role: "Student Head - Creative and Social Media Strategy",
    image: "/images/teams/students/Arnav.png",
  },
];

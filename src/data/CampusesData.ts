export interface Campus {
  name: string;
  location: string;
  image: string;
  description: string;
  link: string;
}

export const campusesData: Campus[] = [
  {
    name: "Central Campus",
    location: "Bangalore",
    image: "/images/campuses/central-campus.jpg",
    description: "Our flagship campus in the heart of Bangalore",
    link: "https://www.christuniversity.in/#",
  },
  {
    name: "Bannerghatta Road Campus",
    location: "Bangalore",
    image: "/images/campuses/bannerghatta-campus.jpg",
    description: "Modern facilities dedicated to professional excellence",
    link: "https://christuniversity.in/campus/Bangalore%20Bannerghatta%20Road%20Campus",
  },
  {
    name: "Kengeri Campus",
    location: "Bangalore",
    image: "/images/campuses/kengeri-campus.jpg",
    description: "Sprawling green campus focused on research and innovation",
    link: "https://christuniversity.in/campus/Bangalore%20Kengeri%20Campus",
  },
  {
    name: "Yeshwanthpur Campus",
    location: "Bangalore",
    image: "/images/campuses/yeshwanthpur-campus.jpg",
    description: "Technology and engineering excellence center",
    link: "https://christuniversity.in/campus/Yeshwanthpur%20Campus",
  },
  {
    name: "Pune Lavasa Campus",
    location: "Off Campus",
    image: "/images/campuses/pune-lavasa-campus.jpg",
    description: "Scenic campus offering unique learning experiences",
    link: "https://lavasa.christuniversity.in/",
  },
  {
    name: "Delhi NCR Campus",
    location: "Off Campus",
    image: "/images/campuses/delhi-ncr-campus.jpg",
    description: "Strategic location connecting north India",
    link: "https://ncr.christuniversity.in/",
  },
];

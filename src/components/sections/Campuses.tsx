import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { MapPin } from 'lucide-react';

const Campuses = () => {
  const campuses = [
    {
      name: "Central Campus",
      location: "Bangalore",
      image: "https://christuniversity.in/uploads/campus/medium/1546275337_2020-12-05_12-14-28.jpg",
      description: "Our flagship campus in the heart of Bangalore",
      link: "https://www.christuniversity.in/#"
    },
    {
      name: "Bannerghatta Road Campus",
      location: "Bangalore",
      image: "https://christuniversity.in/uploads/campus/medium/1656383149_2020-12-05_12-15-03.jpg",
      description: "Modern facilities dedicated to professional excellence",
      link: "https://christuniversity.in/campus/Bangalore%20Bannerghatta%20Road%20Campus"
    },
    {
      name: "Kengeri Campus",
      location: "Bangalore",
      image: "https://christuniversity.in/uploads/campus/medium/1850061447_2020-12-05_12-15-59.jpg",
      description: "Sprawling green campus focused on research and innovation",
      link: "https://christuniversity.in/campus/Bangalore%20Kengeri%20Campus"
    },
    {
      name: "Yeshwanthpur Campus",
      location: "Bangalore",
      image: "https://christuniversity.in/uploads/banners/banner/125970717_2023-08-17_12-34-52.jpg",
      description: "Technology and engineering excellence center",
      link: "https://christuniversity.in/campus/Yeshwanthpur%20Campus"
    },
    {
      name: "Pune Lavasa Campus",
      location: "Off Campus",
      image: "https://christuniversity.in/uploads/campus/medium/1370604313_2023-06-15_11-54-29.jpg",
      description: "Scenic campus offering unique learning experiences",
      link: "https://lavasa.christuniversity.in/"
    },
    {
      name: "Delhi NCR Campus",
      location: "Off Campus",
      image: "https://christuniversity.in/uploads/campus/medium/524190754_2020-12-05_12-16-11.jpg",
      description: "Strategic location connecting north India",
      link: "https://ncr.christuniversity.in/"
    }
  ];

  return (
    <section id="campuses" className="pt-12 pb-6 bg-white">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle 
            title="Our Campuses" 
            subtitle="Excellence in education across multiple locations"
            centered={true}
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {campuses.map((campus, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <a href={campus.link} >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={campus.image} 
                      alt={campus.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <MapPin size={20} className="text-accent mr-2" />
                      <span className="text-sm font-medium text-gray-600">{campus.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {campus.name}
                    </h3>
                    
                    <p className="text-charcoal text-sm">
                      {campus.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="text-primary font-medium group-hover:text-accent transition-colors duration-300 flex items-center">
                          Explore Campus
                          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </button>
                    </div>
                  </div>
                </div>
                </a>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campuses;
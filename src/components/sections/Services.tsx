import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { 
  BarChart3, 
  BookOpen, 
  FileSearch, 
  Building2,
  ArrowRight,
  Layers,
  Users,
  FileText,
  Globe
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Layers size={40} className="text-primary" />,
      title: "Core Consultancy Services",
      description: "Original business frameworks and strategic paradigms to drive innovation and sustainable growth through management consulting, custom software development, and market research.",
      highlights: [
        "Business strategy development",
        "Custom software solutions",
        "Market research & feasibility studies"
      ],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    },
    {
      icon: <Users size={40} className="text-primary" />,
      title: "Organisational Training",
      description: "Customised leadership and skill development programs with e-learning modules and immersive learning experiences for transformational growth.",
      highlights: [
        "Leadership & management training",
        "E-learning curriculum design",
        "Experiential learning programs"
      ],
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
    },
    {
      icon: <FileText size={40} className="text-primary" />,
      title: "Research-Based Consultancy",
      description: "Collaborative research partnerships and industry-specific analysis to generate actionable insights for strategic decision-making.",
      highlights: [
        "Industry research & analysis",
        "Primary & secondary data studies",
        "Field research execution"
      ],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
    },
    {
      icon: <Globe size={40} className="text-primary" />,
      title: "Government Projects",
      description: "Public sector consulting focused on policy development, strategic planning, and evidence-based program evaluation.",
      highlights: [
        "Policy development consulting",
        "Large-scale project execution",
        "Impact assessments & audits"
      ],
      image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-secondary/10">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle 
            title="Our Core Expertise" 
            subtitle="Specialized consulting services backed by academic rigor and industry experience"
            centered={true}
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 h-full">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute top-6 left-6 bg-white p-3 rounded-lg shadow-md">
                    {service.icon}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 font-heading">
                    {service.title}
                  </h3>
                  <p className="text-charcoal mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                        <span className="text-charcoal">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* <div className="flex items-center text-primary group-hover:text-accent transition-colors duration-300">
                    <span className="mr-2 font-medium">Explore Service</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div> */}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <ScrollAnimation>
							<a href="/services">
            <button 
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
	              Have a look at our Services
	              <ArrowRight size={18} />
            </button>
							</a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default Services;

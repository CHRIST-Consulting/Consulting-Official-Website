import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { 
  Target, 
  FlaskConical, 
  Lightbulb, 
  Users, 
  Award 
} from 'lucide-react';

const PrimeModel = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const primeItems = [
    {
      id: 'precision',
      icon: <Target size={48} className="text-primary mb-4" />,
      title: "Precision",
      description: "Our methodologies are precise, delivering tailored solutions that address specific client challenges with measurable outcomes."
    },
    {
      id: 'rigour',
      icon: <FlaskConical size={48} className="text-primary mb-4" />,
      title: "Rigour",
      description: "We apply academic rigour to business problems, ensuring our recommendations are backed by sound research and thorough analysis."
    },
    {
      id: 'innovation',
      icon: <Lightbulb size={48} className="text-primary mb-4" />,
      title: "Innovation",
      description: "Innovation is at our core, combining cutting-edge research with creative problem-solving to develop breakthrough solutions."
    },
    {
      id: 'multi-disciplinary',
      icon: <Users size={48} className="text-primary mb-4" />,
      title: "Multi-Disciplinary",
      description: "Our approach leverages expertise across multiple disciplines, providing holistic solutions to complex business challenges."
    },
    {
      id: 'excellence',
      icon: <Award size={48} className="text-primary mb-4" />,
      title: "Excellence",
      description: "We are committed to excellence in every project, maintaining the highest standards of quality and professionalism."
    }
  ];

  return (
    <section id="prime-model" className="py-20 bg-secondary">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle 
            title="Built on the PRIME Model" 
            subtitle="Our comprehensive framework for delivering exceptional consulting services"
            centered={true}
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {primeItems.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 100}>
              <div 
                className={`prime-item text-center cursor-pointer ${
                  activeItem === item.id ? 'border-2 border-accent' : ''
                }`}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.icon}
                <h3 className="text-xl font-bold mb-2 text-primary font-heading">{item.title}</h3>
                <p className={`text-charcoal text-sm transition-all duration-300 ${
                  activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
                }`}>
                  {item.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimeModel;
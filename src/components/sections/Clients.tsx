import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { Star } from 'lucide-react';

const Clients = () => {
  const clientLogos = [
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
    },
    {
      name: "Tata Steel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Tata_logo.svg/1200px-Tata_logo.svg.png"
    },
    {
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg"
    },
    {
      name: "Infosys",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
    },
    {
      name: "Deloitte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/1200px-Deloitte.svg.png"
    },
    {
      name: "Wipro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png"
    }
  ];

  const testimonials = [
    {
      quote: "CHRIST Consulting delivered exceptional insights that transformed our approach to market expansion. Their research-backed methodology provided us with actionable strategies that yielded measurable results.",
      author: "Ravi Kumar",
      position: "VP of Innovation, Tata Steel",
      rating: 5
    },
    {
      quote: "The team at CHRIST Consulting brings a unique blend of academic rigor and practical business acumen. Their multi-disciplinary approach helped us navigate complex regulatory challenges and develop innovative solutions.",
      author: "Priya Sharma",
      position: "Director of Strategy, Samsung India",
      rating: 5
    },
    {
      quote: "Working with CHRIST Consulting has been a game-changer for our organization. Their depth of expertise and commitment to excellence exceeded our expectations at every stage of the project.",
      author: "Anil Patel",
      position: "CEO, Greenfield Solutions",
      rating: 5
    }
  ];

  return (
    <section id="clients" className="py-20 bg-secondary">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle 
            title="Trusted by Industry Leaders" 
            subtitle="Partnering with leading organizations across diverse sectors"
            centered={true}
          />
        </ScrollAnimation>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {clientLogos.map((client, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        <div className="mt-20">
          <ScrollAnimation>
            <h3 className="text-2xl font-bold text-primary text-center mb-10 font-heading">
              What Our Clients Say
            </h3>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 200}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-accent fill-accent" />
                    ))}
                  </div>
                  
                  <blockquote className="text-charcoal italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-bold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
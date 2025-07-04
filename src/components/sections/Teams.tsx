import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { LinkedinIcon, Mail, ExternalLink } from 'lucide-react';

const Teams = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();

  const facultyConsultants = [
    {
      name: "Dr. Sarah Matthews",
      role: "Faculty Mentor - School of Business",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      expertise: "Strategic Management",
      linkedin: "#"
    },
    {
      name: "Prof. Rajesh Kumar",
      role: "Senior Consultant - Data Analytics",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      expertise: "Business Analytics",
      linkedin: "#"
    },
    {
      name: "Prof. Michael Roberts",
      role: "Faculty Mentor - Technology",
      image: "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg",
      expertise: "IT Consulting",
      linkedin: "#"
    }
  ];

  const studentLeaders = [
    {
      name: "Priya Sharma",
      role: "Project Lead",
      program: "MBA Business Analytics",
      image: "https://images.pexels.com/photos/3799115/pexels-photo-3799115.jpeg"
    },
    {
      name: "Alex Thompson",
      role: "Research Coordinator",
      program: "MSc Data Science",
      image: "https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg"
    },
    {
      name: "Rahul Verma",
      role: "Technology Lead",
      program: "MCA",
      image: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg"
    },
    {
      name: "Priya Sharma",
      role: "Project Lead",
      program: "MBA Business Analytics",
      image: "https://images.pexels.com/photos/3799115/pexels-photo-3799115.jpeg"
    }
  ];

  const studentTestimonials = [
    {
      name: "Ananya Patel",
      program: "MBA Business Analytics",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      testimonial: "CHRIST Consulting gave me a platform to lead real-world projects and grow beyond the classroom.",
      project: "Market Research Lead, 2024"
    },
    {
      name: "James Wilson",
      program: "MSc Data Science",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      testimonial: "The mentorship and hands-on experience helped me secure my dream role in consulting.",
      project: "Analytics Project Lead, 2024"
    },
    {
      name: "Sneha Reddy",
      program: "MCA",
      image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
      testimonial: "Working with industry experts shaped my understanding of technology consulting.",
      project: "Tech Solutions Team, 2024"
    },
    {
      name: "Raj Malhotra",
      program: "MBA Finance",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      testimonial: "The exposure to diverse projects and industries helped me develop a holistic business perspective.",
      project: "Financial Analysis Team, 2024"
    }
  ];

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % studentTestimonials.length);
      }, 5000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const handleTestimonialMouseEnter = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleTestimonialMouseLeave = () => {
    autoScrollRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % studentTestimonials.length);
    }, 5000);
  };

  return (
    <section id="teams">
      <div>
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-20 my-16 m-10">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-heading">
                Meet the Team
              </h2>
              <p className="text-xl text-charcoal">
                Our strength lies in our people — faculty, mentors, and student leaders working together to drive transformation.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        <div className="bg-secondary py-8">
          <ScrollAnimation>
            <SectionTitle 
              title="Consultants" 
              subtitle="Expert mentors driving innovation and excellence"
              centered={true}
            />
          </ScrollAnimation>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 section-container">
            {facultyConsultants.map((consultant, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={consultant.image} 
                      alt={consultant.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-1 font-heading">
                      {consultant.name}
                    </h3>
                    <p className="text-charcoal text-sm mb-2">{consultant.role}</p>
                    <p className="text-accent font-medium text-sm mb-4">{consultant.expertise}</p>
                    
                    <div className="flex items-center space-x-3">
                      <a href={consultant.linkedin} className="text-primary hover:text-accent transition-colors duration-300">
                        <LinkedinIcon size={20} />
                      </a>
                      <a href="#" className="text-primary hover:text-accent transition-colors duration-300">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ScrollAnimation>
            <SectionTitle 
              title="Student Leaders" 
              subtitle="The next generation of consulting excellence"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 section-container">
            {studentLeaders.map((student, index) => (
              <ScrollAnimation key={index} delay={index * 150}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden h-72">
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-1 font-heading">
                      {student.name}
                    </h3>
                    <p className="text-accent font-medium text-sm mb-1">{student.role}</p>
                    <p className="text-charcoal text-sm">{student.program}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Student Testimonials Carousel */}
        <div className="mt-20 bg-secondary py-16">
          <div className="section-container">
            <ScrollAnimation>
              <SectionTitle 
                title="What Our Student Leaders Say" 
                subtitle="Real experiences. Real impact."
                centered={true}
              />
            </ScrollAnimation>

            <div 
              className="relative mt-12 overflow-hidden"
              onMouseEnter={handleTestimonialMouseEnter}
              onMouseLeave={handleTestimonialMouseLeave}
              ref={testimonialRef}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {studentTestimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="bg-white rounded-xl shadow-md p-8 mx-auto max-w-2xl hover:shadow-xl transition-all duration-500">
                      <div className="flex items-center mb-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-primary font-heading">
                            {testimonial.name}
                          </h4>
                          <p className="text-charcoal">{testimonial.program}</p>
                          <p className="text-accent text-sm mt-1">{testimonial.project}</p>
                        </div>
                      </div>
                      
                      <blockquote className="text-lg text-charcoal italic">
                        "{testimonial.testimonial}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {studentTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ScrollAnimation>
          <div className="mt-20 bg-white rounded-2xl p-8 py-20 md:p-12">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-3xl text-primary font-heading text-center italic">
                "CHRIST Consulting empowers students and mentors to collaborate, innovate, and lead real-world projects together."
              </blockquote>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Teams;
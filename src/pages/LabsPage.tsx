import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollAnimation from '../components/ui/ScrollAnimation';
import { BrainCircuit, ShieldCheck, LineChart, Cpu, FlaskConical, Leaf, Database } from 'lucide-react';

const Lab = () => {
  const labs = [
    {
      name: "Neuropsychology Lab",
      icon: <BrainCircuit size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
      description: "Our neuropsychology lab specializes in cognitive and behavioral research with direct applications to business decision-making. We study attention, memory, and executive functions to optimize workplace performance and consumer behavior."
    },
    {
      name: "Cybersecurity Lab",
      icon: <ShieldCheck size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
      description: "The cybersecurity lab develops cutting-edge solutions to protect digital assets. Our research focuses on threat detection, encryption technologies, and security protocols for enterprise applications."
    },
    {
      name: "Bloomberg Finance Lab",
      icon: <LineChart size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
      description: "Equipped with Bloomberg terminals, this lab provides real-time financial data analysis. We conduct research on market trends, investment strategies, and economic forecasting."
    },
    {
      name: "AI & Machine Learning Lab",
      icon: <Cpu size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      description: "Pioneering research in artificial intelligence applications for business optimization. Our work includes natural language processing, computer vision, and predictive analytics."
    },
    {
      name: "Biotechnology Lab",
      icon: <FlaskConical size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
      description: "Focusing on the intersection of biology and technology, we develop innovative solutions for healthcare, agriculture, and environmental sustainability."
    },
    {
      name: "Sustainable Energy Lab",
      icon: <Leaf size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg",
      description: "Researching renewable energy technologies, energy efficiency, and sustainable business practices to drive the green economy forward."
    },
    {
      name: "Data Science Lab",
      icon: <Database size={24} className="text-accent" />,
      image: "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg",
      description: "Specializing in big data analytics, visualization, and business intelligence. We help organizations extract meaningful insights from complex datasets."
    }
  ];

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="section-container relative">
          <ScrollAnimation>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 text-center">
              A Peek into Our Labs
            </h1>
            <p className="text-xl md:text-2xl text-charcoal opacity-80 max-w-3xl mx-auto text-center">
              Where innovation meets impact. Explore the cutting-edge facilities at CHRIST Consulting that are shaping the future of research and enterprise.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle 
              title="Our Research Facilities" 
              subtitle="Specialized labs driving innovation across disciplines"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {labs.map((lab, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={lab.image} 
                      alt={lab.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm">
                      {lab.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3">{lab.name}</h3>
                    <p className="text-gray-600">{lab.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-primary">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Collaborate With Our Labs</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Interested in partnering with us on cutting-edge research or application-based innovation? Let's build the future together.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary inline-block"
            >
              Reach Out
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Lab;

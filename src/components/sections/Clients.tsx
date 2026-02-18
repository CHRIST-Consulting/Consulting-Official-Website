import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clientLogosData, testimonialsData } from "../../data/ClientsData";

/** * Local logo imports from assets folder */
import ClientLogo1 from "../../assets/testimonial_logos/client1.jpg";
import ClientLogo2 from "../../assets/testimonial_logos/client2.jpg";
import ClientLogo4 from "../../assets/testimonial_logos/client4.jpg";

const localLogos = [ClientLogo1, ClientLogo2, ClientLogo4];
const marqueeLogos = [...clientLogosData, ...clientLogosData, ...clientLogosData];

interface Testimonial {
  author: string;
  position: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  logo: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, logo, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const CHAR_LIMIT = 220;
  const isLong = testimonial.quote.length > CHAR_LIMIT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="relative group w-full md:w-[420px] min-h-[550px] p-10 mt-24 flex flex-col items-center flex-shrink-0 transition-all duration-500"
    >
      {/* SOLID NAVY BLUE DESIGN */}
      <div className="absolute inset-0 bg-[#162944] rounded-[40px] shadow-2xl border-2 border-[#162944] transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-blue-900/40"></div>

      {/* LARGER LOGO CIRCLE */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20">
        <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105">
          <img src={logo} alt="Client Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Quote Section with Read More Logic */}
      <div className="relative z-10 mt-20 text-center flex-grow flex flex-col items-center justify-center">
        <p className="text-white text-base md:text-lg leading-relaxed font-semibold italic px-4">
          "{isExpanded || !isLong ? testimonial.quote : `${testimonial.quote.substring(0, CHAR_LIMIT)}...`}"
        </p>
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#FFB400] text-sm mt-3 font-bold hover:underline underline-offset-4"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Author Details */}
      <div className="relative z-10 text-center mt-8 w-full">
        <h4 className="font-bold text-[#FFB400] text-xl tracking-wide uppercase drop-shadow-md">
          {testimonial.author}
        </h4>
        <p className="text-white/70 text-xs uppercase tracking-widest font-bold mt-2 line-clamp-2">
          {testimonial.position}
        </p>
        <div className="flex justify-center gap-1.5 mt-5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#FFB400] text-lg">★</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Clients: React.FC = () => {
  const marqueeControls = useAnimation();
  
  useEffect(() => {
    marqueeControls.start({
      x: [0, -1800],
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [marqueeControls]);

  return (
    <div className="relative bg-gradient-to-br from-[#EEF6FA] via-[#DBEAF3] to-[#B7D6E7] w-full min-h-screen flex flex-col items-center pb-32 overflow-x-hidden">
      
      {/* Section 1: Hall of Excellence (Infinite Loop + Gold Border) */}
      <section className="w-full flex flex-col items-center py-12 z-20">
        <div className="max-w-7xl w-[90vw] mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-[#162944]">
            Hall of Excellence
          </h2>
          <div className="w-20 h-1 bg-[#FFB400] mx-auto mb-2 rounded-full"></div>
          
          <div className="relative mt-8 rounded-[40px] shadow-xl bg-white overflow-hidden">
            <div className="relative w-full py-20 px-4 overflow-hidden">
              <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={marqueeControls}
                onHoverStart={() => marqueeControls.stop()}
                onHoverEnd={() => {
                  marqueeControls.start({
                    x: [null, -1800],
                    transition: { duration: 35, ease: "linear", repeat: Infinity }
                  });
                }}
                style={{ width: "max-content" }}
              >
                {marqueeLogos.map((client, index) => (
                  <motion.div
                    key={index}
                    initial="initial"
                    whileHover="hover"
                    className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40 bg-white rounded-2xl shadow-md border border-gray-100 p-4 cursor-pointer"
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <motion.rect
                        x="0" y="0" width="100%" height="100%" rx="16" ry="16"
                        fill="transparent"
                        stroke="#FFB400"
                        strokeWidth="2"
                        filter="url(#glow)"
                        variants={{
                          initial: { pathLength: 0, opacity: 0 },
                          hover: { pathLength: 1, opacity: 1 }
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </svg>
                    <motion.div
                      variants={{
                        initial: { scale: 1, y: 0 },
                        hover: { scale: 1.15, y: -8 }
                      }}
                      className="w-full h-full flex items-center justify-center z-10"
                    >
                      <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Testimonials (Single Line + Fade Animation) */}
      <section className="w-full flex flex-col items-center py-16 z-20 overflow-hidden">
        <div className="max-w-full w-screen mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2 text-[#162944]">
            Stories of Partnership & Results
          </h2>
          <div className="w-20 h-1 bg-[#FFB400] mx-auto mb-16 rounded-full"></div>
          
          <div className="flex overflow-x-auto md:overflow-visible pb-12 px-8 gap-8 justify-start md:justify-center no-scrollbar items-start">
            {testimonialsData.slice(0, 3).map((testimonial: Testimonial, i: number) => (
              <TestimonialCard 
                testimonial={testimonial} 
                key={i} 
                index={i}
                logo={localLogos[i] || localLogos[0]} 
              />
            ))}
          </div>

          <div className="flex justify-center gap-8 mt-10">
            <button className="w-14 h-14 rounded-full border-2 border-[#162944] flex items-center justify-center text-[#162944] hover:bg-[#162944] hover:text-white transition-all duration-300 shadow-md active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button className="w-14 h-14 rounded-full border-2 border-[#162944] flex items-center justify-center text-[#162944] hover:bg-[#162944] hover:text-white transition-all duration-300 shadow-md active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
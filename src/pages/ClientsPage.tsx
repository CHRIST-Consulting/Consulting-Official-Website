import { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { ChevronRight, ChevronLeft, Quote, Star } from "lucide-react";
import { clientClustersData } from "../data/ClientClustersData";
import { testimonialsData } from "../data/TestimonialsData";
import { motion, AnimatePresence } from "framer-motion";

const ClientsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clusters = clientClustersData;
  const testimonials = testimonialsData;
  const clientImages = clusters.map((cluster) => cluster.clients);

  useEffect(() => {
    if (isAutoplayPaused) return;
    const mainTimer = setTimeout(() => {
      setDirection(1);
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); 
    return () => clearTimeout(mainTimer);
  }, [testimonials.length, isAutoplayPaused, currentTestimonial]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      y: 20,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        y: { duration: 0.6, ease: "easeOut" },
        opacity: { duration: 0.8 },
        scale: { duration: 0.6 }
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentTestimonial((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const stats = [
    { value: "50+", label: "Active Clients" },
    { value: "250+", label: "Projects Completed" },
    { value: "15+", label: "Industry Sectors" },
    { value: "95%", label: "Client Retention" },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-[#002d72] to-[#0066cc] overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="section-container relative z-10">
          <ScrollAnimation>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
                Our Clients
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Trusted partners across sectors who have collaborated with
                CHRIST Consulting for transformational impact.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 1. Testimonials Section (Position & Company on Separate Lines) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle
              title="What Our Clients Say"
              subtitle="Hear from the leaders who have experienced the CHRIST Consulting difference"
              centered
            />
          </ScrollAnimation>

          <div className="mt-16 relative max-w-4xl mx-auto min-h-[550px] sm:min-h-[480px] md:min-h-[420px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-[#f8fbff] rounded-3xl shadow-lg border border-[#0066cc]/10 p-8 md:p-14 absolute inset-0 flex flex-col justify-center"
                onMouseEnter={() => setIsAutoplayPaused(true)}
                onMouseLeave={() => setIsAutoplayPaused(false)}
              >
                <div className="absolute top-8 left-8 text-[#0066cc]/5">
                  <Quote size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {Array.from({ length: testimonials[currentTestimonial]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={22} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-[#374151] mb-10 leading-relaxed italic font-medium">
                    "{testimonials[currentTestimonial]?.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0066cc] to-[#002d72] rounded-2xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl mr-5 shadow-lg border-2 border-white">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* Name */}
                      <div className="font-extrabold text-[#002d72] text-2xl sm:text-3xl tracking-tight">
                        {testimonials[currentTestimonial]?.name}
                      </div>
                      
                      {/* Position (Bold & Separate line) */}
                      <div className="text-[#4b5563] text-sm sm:text-lg font-bold">
                        {testimonials[currentTestimonial]?.position}
                      </div>

                      {/* Organization (Separate line with badge style) */}
                      <div>
                        <span className="inline-block px-3 py-0.5 bg-[#0066cc]/10 text-[#0066cc] text-sm sm:text-base font-bold rounded-lg border border-[#0066cc]/20">
                          {testimonials[currentTestimonial]?.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-24 left-0 right-0 flex justify-center items-center space-x-4 sm:space-x-8">
              <button onClick={() => paginate(-1)} className="p-3 sm:p-4 rounded-full bg-white shadow-md border border-[#0066cc]/10 text-[#002d72] hover:bg-[#0066cc] hover:text-white transition-all duration-300">
                <ChevronLeft size={24} />
              </button>
              <div className="flex space-x-2 sm:space-x-3">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => { setDirection(index > currentTestimonial ? 1 : -1); setCurrentTestimonial(index); }} className={`h-2.5 rounded-full transition-all duration-500 ${index === currentTestimonial ? "bg-[#0066cc] w-8 sm:w-12 shadow-sm" : "bg-gray-300 w-2.5 sm:w-4 hover:bg-gray-400"}`} />
                ))}
              </div>
              <button onClick={() => paginate(1)} className="p-3 sm:p-4 rounded-full bg-white shadow-md border border-[#0066cc]/10 text-[#002d72] hover:bg-[#0066cc] hover:text-white transition-all duration-300">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Scrolling Clients Section */}
      <section id="our-clients" className="relative py-20 sm:py-28 bg-gradient-to-r from-[#002d72] to-[#0066cc] overflow-hidden mt-20">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-20 text-center">Our Clients</h2>
          <div className="space-y-6 sm:space-y-12">
            {clientImages.map((rowImages, rowIndex) => (
              <div key={rowIndex} className="group relative flex overflow-hidden py-2 sm:py-4">
                <div className="absolute left-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-r from-[#002d72] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-l from-[#0066cc] to-transparent z-20 pointer-events-none" />
                <div className={`flex w-fit animate-scroll-${rowIndex % 2 === 0 ? 'left' : 'right'} group-hover:[animation-play-state:paused]`}>
                  {[...rowImages, ...rowImages, ...rowImages, ...rowImages].map((imagePath, index) => (
                    <div key={index} className="mx-4 sm:mx-8 flex-shrink-0 flex items-center">
                      <div className="bg-white rounded-[16px] sm:rounded-[24px] p-3 sm:p-4 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer flex items-center justify-center w-40 h-24 sm:w-[240px] sm:h-[140px]">
                        <img
                          src={imagePath || "/placeholder.svg"}
                          loading="lazy"
                          alt={`Client Logo ${index + 1}`}
                          className="w-full h-full object-contain mix-blend-multiply" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#f0f8ff]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-[#002d72] mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-[#4b5563] font-medium tracking-wide uppercase text-xs sm:text-sm">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
        .animate-scroll-left { animation: scroll-left 45s linear infinite; }
        .animate-scroll-right { animation: scroll-right 45s linear infinite; }

        @media (max-width: 640px) {
          .animate-scroll-left { animation: scroll-left 30s linear infinite; }
          .animate-scroll-right { animation: scroll-right 30s linear infinite; }
        }
      `}</style>
    </main>
  );
};

export default ClientsPage;
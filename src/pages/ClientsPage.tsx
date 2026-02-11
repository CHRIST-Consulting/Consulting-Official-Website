import { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { ChevronRight, ChevronLeft, Quote, Star } from "lucide-react";
import { clientClustersData } from "../data/ClientClustersData";
import { testimonialsData } from "../data/TestimonialsData";

const ClientsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clusters = clientClustersData;
  const testimonials = testimonialsData;
  const clientImages = clusters.map((cluster) => cluster.clients);

  // Testimonial Autoplay Logic
  useEffect(() => {
    if (isAutoplayPaused) return;
    const mainTimer = setTimeout(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearTimeout(mainTimer);
  }, [testimonials.length, isAutoplayPaused, currentTestimonial]);

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

      {/* FIXED: Scrolling Clients Section with CSS-Pause */}
      <section id="our-clients" className="bg-[#051650] py-20 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-16 text-center">
            Our Clients
          </h2>

          <div className="space-y-10">
            {clientImages.map((rowImages, rowIndex) => (
              <div 
                key={rowIndex} 
                className="group relative flex overflow-hidden py-4"
              >
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#051650] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#051650] to-transparent z-20 pointer-events-none" />

                {/* The Scrolling Container */}
                <div
                  className={`flex w-fit animate-scroll-${rowIndex % 2 === 0 ? 'left' : 'right'} group-hover:[animation-play-state:paused]`}
                >
                  {/* Duplicating logos multiple times for seamless scrolling */}
                  {[...rowImages, ...rowImages, ...rowImages, ...rowImages].map((imagePath, index) => (
                    <div key={index} className="mx-6 flex-shrink-0">
                      <div className="w-[220px] h-[125px] bg-white rounded-[24px] p-2 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer">
                        <div className="w-full h-full rounded-[20px] border-[3px] border-[#051650] bg-white p-3 flex items-center justify-center">
                          <img
                            src={imagePath || "/placeholder.svg"}
                            loading="lazy"
                            alt={`Client Logo ${index + 1}`}
                            className="max-w-[80%] max-h-[80%] object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS for Smooth Infinite Scroll and Pause */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#f0f8ff] to-white">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle
              title="What Our Clients Say"
              subtitle="Hear from the leaders who have experienced the CHRIST Consulting difference"
              centered
            />
          </ScrollAnimation>

          <div className="mt-16 relative max-w-4xl mx-auto">
            <ScrollAnimation>
              <div
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
                onMouseEnter={() => setIsAutoplayPaused(true)}
                onMouseLeave={() => setIsAutoplayPaused(false)}
              >
                <div className="absolute top-6 left-6 text-[#0066cc]/10">
                  <Quote size={80} />
                </div>
                <div className="relative z-10 transition-opacity duration-500">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonials[currentTestimonial]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-[#4b5563] mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial]?.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0066cc] to-[#002d72] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#002d72] text-lg">{testimonials[currentTestimonial]?.name}</div>
                      <div className="text-[#4b5563]">{testimonials[currentTestimonial]?.position}</div>
                      <div className="text-[#0066cc] font-medium">{testimonials[currentTestimonial]?.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)} 
                className="p-3 rounded-full bg-white shadow-lg border border-[#e5e7eb]"
              >
                <ChevronLeft size={20} className="text-[#002d72]" />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? "bg-[#0066cc] scale-110" : "bg-[#d1d5db]"}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)} 
                className="p-3 rounded-full bg-white shadow-lg border border-[#e5e7eb]"
              >
                <ChevronRight size={20} className="text-[#002d72]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#f0f8ff]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#002d72] mb-2">{stat.value}</div>
                  <div className="text-[#4b5563]">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClientsPage;
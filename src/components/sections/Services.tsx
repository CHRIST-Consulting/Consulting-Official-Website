import { useState, useEffect, SetStateAction } from "react";
import { ArrowRight, Sparkles, CheckCircle, ExternalLink, X, Zap, Star, ChevronRight } from "lucide-react";
import { getServicesData, Service } from "../../data/ServicesData";

type SelectedService = Service & { index: number };

const Services = () => {
  const services = getServicesData();
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Create duplicated services for seamless loop when sliding
  const duplicatedServices = [...services, ...services, ...services];

  // Enhanced scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const delay = parseInt(target.getAttribute('data-delay') || '0');
          
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          }, delay);
        }
      });
    }, observerOptions);

    // Observe all animated elements after component mounts
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate="true"]');
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(32px)';
        observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const openModal = (service: Service, index: number) => {
    setSelectedService({ ...service, index });
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="relative py-8 lg:py-12 bg-gradient-to-br from-secondary via-white to-ice-blue overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with different sizes and animations */}
        <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/15 via-amber-300/10 to-transparent rounded-full blur-2xl animate-float opacity-70" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 -right-10 w-40 h-40 bg-gradient-to-br from-primary/15 via-royal-blue/10 to-transparent rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-accent/10 via-sky-blue/8 to-transparent rounded-full blur-xl animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="section-container relative z-10 w-full">
        {/* Enhanced Header */}
        <div data-animate="true" data-delay="0">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-3">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-amber-300/20 to-yellow-400/30 rounded-lg blur-lg"></div>
              <h2 className="relative text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-primary via-royal-blue to-primary bg-clip-text text-transparent">
                Our Expert Services
              </h2>
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-300 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Click on any service to explore our expertise in detail
            </p>
          </div>
        </div>

        {/* Enhanced Sliding Services Layout */}
        <div className="relative">
          {/* Enhanced Gradient Masks */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
          
          {/* Sliding Container */}
          <div className="overflow-hidden services-slider">
            <div 
              className="flex animate-slide-left gap-4 sm:gap-6" 
              style={{ width: `${duplicatedServices.length * 280}px` }}
            >
              {duplicatedServices.map((service, index) => (
                <div 
                  key={`slide-${index}`}
                  className="group relative cursor-pointer flex-shrink-0 w-64 sm:w-72"
                  onClick={() => openModal(service, index % services.length)}
                  onMouseEnter={() => setHoveredIndex(index % services.length)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Enhanced Card with Multiple Borders */}
                  <div className="relative sliding-card">
                    {/* Outer Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-primary/15 to-amber-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Main Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 via-primary/30 to-amber-400/40 rounded-xl p-[1.5px]">
                      <div className="bg-gradient-to-br from-white via-white/95 to-white/90 rounded-xl h-full w-full"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-transparent hover:border-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-500 group overflow-hidden mx-1 sm:mx-2">
                      
                      {/* Enhanced Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-8 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary to-transparent rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-yellow-400 to-transparent rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-radial from-amber-400/8 to-transparent rounded-full"></div>
                      </div>

                      {/* Decorative Corner Elements */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                      {/* Enhanced Icon Container */}
                      <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-amber-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary/15 via-royal-blue/10 to-yellow-400/15 rounded-xl flex items-center justify-center border border-white/50 group-hover:border-yellow-400/50 transition-all duration-300 shadow-md">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <div className="relative text-primary group-hover:text-amber-600 transition-colors duration-300 transform group-hover:scale-105">
                            {service.icon}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Service Title */}
                      <h3 className="text-base sm:text-lg font-bold text-center mb-3 font-heading relative">
                        <span className="bg-gradient-to-r from-primary to-royal-blue bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-yellow-600 transition-all duration-300 line-clamp-2">
                          {service.title}
                        </span>
                        {/* Title Underline */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 group-hover:w-12 transition-all duration-500"></div>
                      </h3>

                      {/* Enhanced Description */}
                      <p className="text-xs sm:text-sm text-charcoal/70 text-center mb-4 line-clamp-2 group-hover:text-charcoal transition-colors duration-300 leading-relaxed">
                        {service.description.slice(0, 90)}...
                      </p>

                      {/* Enhanced Highlights Preview */}
                      <div className="mb-4">
                        <div className="space-y-1.5">
                          {service.highlights.slice(0, 2).map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-charcoal/60 group-hover:text-charcoal/80 transition-colors duration-300">
                              <div className="relative flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-primary group-hover:text-amber-600 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
                              </div>
                              <span className="truncate font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Explore Button */}
                      <div className="text-center relative">
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary group-hover:text-amber-600 py-1.5 px-3 rounded-lg border border-primary/20 group-hover:border-yellow-400/50 bg-white/50 group-hover:bg-yellow-400/10 transition-all duration-300">
                          <Sparkles className="w-3 h-3 animate-pulse group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                          <span>Explore</span>
                          <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Enhanced Bottom Border Accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-xl"></div>
                      
                      {/* Dynamic Corner Sparkles */}
                      <div className={`absolute top-2 right-2 transition-all duration-500 ${hoveredIndex === (index % services.length) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Star className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                      
                      {/* Secondary Sparkle */}
                      <div className={`absolute bottom-2 left-2 transition-all duration-700 ${hoveredIndex === (index % services.length) ? 'opacity-70 scale-100' : 'opacity-0 scale-50'}`}>
                        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                      </div>

                      {/* Floating Number Badge */}
                      <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-gradient-to-br from-primary/90 to-royal-blue/90 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105">
                        {(index % services.length) + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Call-to-Action */}
        <div data-animate="true" data-delay="600" className="mt-12 text-center">
          <a href="/expertise" className="inline-block group">
            <button className="relative bg-gradient-to-r from-primary to-royal-blue hover:from-royal-blue hover:to-primary text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <span>View All Expertise</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </a>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Background */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30">
              {/* Modal Header with Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Header Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-yellow-400/20"></div>
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-300 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Modal Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <div className="text-white">{selectedService.icon}</div>
                    </div>
                    <div className="bg-yellow-400/90 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-white">Service #{selectedService.index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-heading">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Description */}
                <div className="mb-8">
                  <p className="text-lg text-charcoal/80 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* Service Highlights */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Key Service Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedService.highlights.map((highlight, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-yellow-400/5 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                        <div className="relative bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary group-hover:text-amber-600 transition-colors duration-300 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-charcoal/80 group-hover:text-charcoal transition-colors duration-300">
                              {highlight}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group relative bg-gradient-to-r from-primary to-royal-blue hover:from-royal-blue hover:to-primary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                  
                  <button className="group relative bg-white/90 hover:bg-white text-primary border-2 border-primary/20 hover:border-yellow-400/50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Learn More</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};export default Services;

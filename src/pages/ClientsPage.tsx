import { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { ChevronRight, ChevronLeft, Quote, Star } from "lucide-react";
import { clientClustersData } from "../data/ClientClustersData";
import { testimonialsData } from "../data/TestimonialsData";

const ClientsPage = () => {
  const [activeCluster, setActiveCluster] = useState("core");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clusters = clientClustersData;
  const testimonials = testimonialsData;

  // Enhanced auto-advance testimonials with pause functionality
  useEffect(() => {
    if (isAutoplayPaused) return;

    // Main testimonial change timer
    const mainTimer = setTimeout(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      clearTimeout(mainTimer);
    };
  }, [testimonials.length, isAutoplayPaused, currentTestimonial]);

  // Pause autoplay when user hovers over testimonial section
  const handleMouseEnter = () => setIsAutoplayPaused(true);
  const handleMouseLeave = () => setIsAutoplayPaused(false);

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 3000); // Resume after 3 seconds
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 3000); // Resume after 3 seconds
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 3000); // Resume after 3 seconds
  };

  const stats = [
    { value: "50+", label: "Active Clients" },
    { value: "200+", label: "Projects Completed" },
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

      {/* Client Clusters */}
      <section className="py-20">
        <div className="section-container">
          <ScrollAnimation>
            <div className="flex flex-wrap gap-4 mb-12">
              {clusters.map((cluster) => (
                <button
                  key={cluster.id}
                  onClick={() => setActiveCluster(cluster.id)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeCluster === cluster.id
                      ? "bg-[#0066cc] text-white"
                      : "bg-[#f0f8ff] text-[#002d72] hover:bg-[#0066cc]/10"
                  }`}
                >
                  <span className="mr-2">{cluster.icon}</span>
                  {cluster.title}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className={`transition-all duration-500 ${
                activeCluster === cluster.id ? "block" : "hidden"
              }`}
            >
              <ScrollAnimation>
                <p className="text-xl text-charcoal mb-8">
                  {cluster.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cluster.clients.map((client, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500"
                    >
                      <div className="h-24 flex items-center justify-center mb-6">
                        <img
                          src={client}
                          alt={`Client ${index + 1}`}
                          className="max-h-16 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </section>

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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background decoration */}
                <div className="absolute top-6 left-6 text-[#0066cc]/10">
                  <Quote size={80} />
                </div>

                {/* Autoplay indicator */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isAutoplayPaused ? "bg-orange-400" : "bg-green-400"
                    }`}
                    title={
                      isAutoplayPaused ? "Autoplay Paused" : "Autoplay Active"
                    }
                  />
                </div>

                {/* Testimonial content with fade transition */}
                <div className="relative z-10 transition-opacity duration-500">
                  <div className="flex items-center mb-4">
                    {[
                      ...Array(testimonials[currentTestimonial]?.rating || 5),
                    ].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-[#4b5563] mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial]?.content}"
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0066cc] to-[#002d72] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#002d72] text-lg">
                        {testimonials[currentTestimonial]?.name}
                      </div>
                      <div className="text-[#4b5563]">
                        {testimonials[currentTestimonial]?.position}
                      </div>
                      <div className="text-[#0066cc] font-medium">
                        {testimonials[currentTestimonial]?.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Enhanced Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-[#f0f8ff] hover:scale-105 transition-all duration-300 border border-[#e5e7eb]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-[#002d72]" />
              </button>

              {/* Enhanced dots indicator with progress */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-[#0066cc] scale-110"
                        : "bg-[#d1d5db] hover:bg-[#9ca3af]"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    {index === currentTestimonial && !isAutoplayPaused && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#0066cc] animate-ping"></div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-[#f0f8ff] hover:scale-105 transition-all duration-300 border border-[#e5e7eb]"
                aria-label="Next testimonial"
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
                  <div className="text-3xl font-bold text-[#002d72] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#4b5563]">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#002d72] mb-6">
              Become a CHRIST Consulting Partner
            </h2>
            <p className="text-xl text-[#4b5563] mb-8 max-w-2xl mx-auto">
              Explore how we can collaborate to drive lasting impact.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center px-8 py-3 bg-[#0066cc] text-white rounded-lg hover:bg-[#002d72] transition-colors duration-300"
            >
              Partner With Us
              <ChevronRight size={20} className="ml-2" />
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default ClientsPage;

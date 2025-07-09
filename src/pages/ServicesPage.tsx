import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { getDetailedServicesData } from "../data/DetailedServicesData";

const ServicesPage = () => {
  const services = getDetailedServicesData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-r from-primary to-primary-light overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
                Our Consulting <span className="text-accent">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Student-powered consulting solutions backed by academic
                excellence and industry expertise
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/services/hero-consulting-team.jpg"
                  alt="CHRIST Consulting Team"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      {service.icon}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">
                      {service.title}
                    </h3>
                    <p className="text-charcoal leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-primary mb-6 font-heading">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-charcoal mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can help you achieve your goals.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get Started
              <ChevronRight size={20} />
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;

import React from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { ArrowRight } from "lucide-react";
import { getServicesData } from "../../data/ServicesData";

const Services = () => {
  const services = getServicesData();

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-secondary/10"
    >
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle
            title="Our Core Expertise"
            subtitle="Specialized consulting services backed by academic rigor and industry experience"
            centered={true}
          />
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute top-6 left-6 bg-white p-3 rounded-lg shadow-md">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 font-heading">
                    {service.title}
                  </h3>
                  <p className="text-charcoal mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                        <span className="text-charcoal">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <div className="flex items-center text-primary group-hover:text-accent transition-colors duration-300">
                    <span className="mr-2 font-medium">Explore Service</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div> */}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollAnimation>
            <a href="/services">
              <button className="btn-primary flex items-center justify-center gap-2 mx-auto">
                Have a look at our Services
                <ArrowRight size={18} />
              </button>
            </a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Services;

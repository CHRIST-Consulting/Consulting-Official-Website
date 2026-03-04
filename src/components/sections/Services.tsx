import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { ArrowRight } from "lucide-react";
import { getServicesData } from "../../data/ServicesData";

const Services = () => {
  const services = getServicesData();

  return (
    <section
      id="services"
      className="py-12 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-secondary/20"
    >
      {/* Enhanced Background Layers */}

      {/* Primary background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f2a4d' fill-opacity='0.8'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='60' cy='20' r='1'/%3E%3Ccircle cx='20' cy='60' r='1'/%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Secondary grid pattern */}
      <div className="absolute inset-0 opacity-[0.008]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 42, 77, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 42, 77, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated background shapes */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div
          className="absolute top-10 left-[10%] w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-32 right-[15%] w-40 h-40 bg-gradient-to-br from-sky-blue/10 to-accent/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s", animationDuration: "10s" }}
        ></div>
        <div
          className="absolute bottom-20 left-[20%] w-36 h-36 bg-gradient-to-br from-primary/10 to-royal-blue/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s", animationDuration: "9s" }}
        ></div>
        <div
          className="absolute bottom-40 right-[10%] w-28 h-28 bg-gradient-to-br from-accent/20 to-sky-blue/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s", animationDuration: "7s" }}
        ></div>

        {/* Medium floating elements */}
        <div
          className="absolute top-1/4 left-[5%] w-20 h-20 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s", animationDuration: "12s" }}
        ></div>
        <div
          className="absolute top-3/4 right-[8%] w-24 h-24 bg-gradient-radial from-accent/12 to-transparent rounded-full blur-2xl animate-float"
          style={{ animationDelay: "5s", animationDuration: "11s" }}
        ></div>

        {/* Geometric accent shapes */}
        <div
          className="absolute top-16 right-[25%] w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent transform rotate-45 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-[30%] w-20 h-20 bg-gradient-to-tr from-accent/8 to-transparent transform rotate-12 animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-accent/[0.03]"></div>

      {/* Central focus area with subtle highlight */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-radial from-white/30 via-transparent to-transparent blur-3xl opacity-40"></div>

      <div className="section-container relative z-10">
        <ScrollAnimation>
          <SectionTitle
            title="Our Services"
            subtitle="Specialized consulting services backed by academic rigor and industry experience"
            centered={true}
          />
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12 items-stretch">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              {/* Changed div to a tag with href="/expertise" and cursor-pointer */}
              <a 
                href="/expertise" 
                className="group relative h-full flex flex-col cursor-pointer outline-none block"
              >
                {/* Card background with glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2"></div>

                {/* Border gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-2xl p-[1px]">
                  <div className="bg-gradient-to-br from-white to-white/95 rounded-2xl h-full w-full"></div>
                </div>

                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:bg-white/95 transition-all duration-500 h-full border border-white/20 shadow-lg group-hover:shadow-2xl flex flex-col">
                  <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
                    {/* Image with enhanced overlay */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />

                    {/* Multi-layered gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon container with enhanced styling */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg shadow-xl border border-white/30 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                      <div className="text-primary group-hover:text-accent transition-colors duration-300 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-5 sm:p-6 relative flex-1 flex flex-col">
                    {/* Background pattern for content area */}
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 opacity-5">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230f2a4d' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>

                    <div className="flex flex-col h-full">
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-heading group-hover:text-accent transition-colors duration-300 relative z-10 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-charcoal/80 mb-3 sm:mb-4 leading-relaxed relative z-10 text-sm sm:text-base">
                        {service.description}
                      </p>

                      <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6 relative z-10 flex-1">
                        {service.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start group/item">
                            <div className="bullet-container">
                              <span className="bullet-static bg-primary group-hover:bg-accent"></span>
                              <span className="bullet-animated bg-accent"></span>
                            </div>
                            <span className="text-charcoal/80 group-hover:text-charcoal transition-colors duration-300 text-sm sm:text-base leading-relaxed flex-1">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </a>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center relative">
          <ScrollAnimation>
            {/* Background decoration for CTA section */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 sm:w-96 h-16 sm:h-24 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 px-4">
              <a href="/expertise" className="inline-block">
                <button className="group relative btn-primary flex items-center justify-center gap-2 sm:gap-3 mx-auto px-5 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-lg">
                  {/* Button background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                  <span className="relative z-10 whitespace-nowrap">
                    Have a look at our Expertise
                  </span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0"
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></div>
                </button>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Services;
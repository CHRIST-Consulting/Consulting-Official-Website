import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Download, ArrowDown, Award, Users, BookOpen } from "lucide-react";

const Hero = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const stats = [
    { number: "5+", label: "Years of Experience", icon: Award },
    { number: "1500+", label: "Teaching Faculties", icon: Users },
    { number: "32+", label: "Specialisms", icon: BookOpen },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Animated background blob */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-primary opacity-5 blob-animation"></div>
        <div
          className="absolute top-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-accent opacity-10 blob-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/2 w-1/4 h-1/4 rounded-full bg-primary-light opacity-5 blob-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
        <div className="particle particle-10"></div>
      </div>

      <div className="section-container pt-20 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="lg:pr-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight animate-fade-in">
              Where <span className="text-sky-blue">Experience</span> Meets
              Excellence
            </h1>

            {/* Statistics Section */}
            <div
              className="mb-6 sm:mb-8 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-3 bg-white/60 backdrop-blur-sm rounded-md shadow-sm border border-primary/5">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center transition-all duration-300 transform hover:scale-102 p-1 sm:p-2 rounded-sm ${
                        index === currentStatIndex
                          ? "text-primary bg-primary/3"
                          : "text-charcoal/80 hover:bg-accent/3"
                      }`}
                    >
                      <Icon
                        size={14}
                        className="text-sky-blue/80 mx-auto mb-1 sm:hidden"
                      />
                      <Icon
                        size={16}
                        className="text-sky-blue/80 mx-auto mb-1 hidden sm:block"
                      />
                      <div className="font-semibold text-sm sm:text-base text-primary">
                        {stat.number}
                      </div>
                      <div className="text-xs text-charcoal/60 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up"
              style={{ animationDelay: "600ms" }}
            >
              <a
                href="#services"
                className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
              >
                Explore Our Services
                <ArrowDown size={16} className="sm:hidden" />
                <ArrowDown size={18} className="hidden sm:inline" />
              </a>

              <a
                href="#"
                className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
              >
                Download Brochure
                <Download size={16} className="sm:hidden" />
                <Download size={18} className="hidden sm:inline" />
              </a>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden mt-8">
            <div
              className="relative rounded-lg overflow-hidden shadow-lg animate-fade-in"
              style={{ animationDelay: "700ms" }}
            >
              <img
                src="/images/home/hero.png"
                alt="CICF Team"
                className="w-full h-auto rounded-lg"
                loading="eager"
                decoding="async"
                width="400"
                height="300"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="hidden lg:block">
            <div
              className="relative rounded-lg overflow-hidden shadow-2xl animate-fade-in"
              style={{ animationDelay: "900ms" }}
            >
              <img
                src="/images/home/hero.png"
                alt="CICF Team"
                className="w-full h-auto rounded-lg"
                loading="eager"
                decoding="async"
                width="600"
                height="400"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a
            href="#about"
            className="text-primary opacity-80 hover:opacity-100 transition-opacity"
          >
            <ArrowDown size={20} className="sm:hidden" />
            <ArrowDown size={24} className="hidden sm:inline" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

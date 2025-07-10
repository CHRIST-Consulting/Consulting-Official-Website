import React, { useState, useEffect } from "react";
import {
  Download,
  ArrowDown,
  BookOpen,
  GraduationCap,
  UserCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const Hero = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const stats = [
    { number: "100+", label: "Student Interns", icon: GraduationCap },
    { number: "1500+", label: "Teaching Faculties", icon: UserCheck },
    { number: "32+", label: "Specialisms", icon: BookOpen },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        {/* Primary gradient blob */}
        <div className="absolute top-1/4 left-1/6 w-3/5 h-3/5 rounded-full bg-gradient-to-br from-primary/10 via-sky-blue/8 to-transparent opacity-60 blob-animation blur-3xl"></div>

        {/* Secondary accent blob */}
        <div
          className="absolute top-1/3 right-1/4 w-2/5 h-2/5 rounded-full bg-gradient-to-br from-accent/15 via-primary/10 to-transparent opacity-40 blob-animation blur-2xl"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Tertiary small blob */}
        <div
          className="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-sky-blue/12 via-primary/8 to-transparent opacity-30 blob-animation blur-xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-32 left-16 w-24 h-24 border border-accent/15 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-8 w-16 h-16 border border-sky-blue/20 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`particle particle-${i + 1} opacity-30`}
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? "rgb(14, 165, 233)"
                  : i % 3 === 1
                  ? "rgb(59, 130, 246)"
                  : "rgb(99, 102, 241)"
              } 0%, transparent 70%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="section-container pt-16 sm:pt-20 lg:pt-32 relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          <div className="lg:pr-8 text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight animate-fade-in">
              Where{" "}
              <span className="bg-gradient-to-r from-sky-blue to-primary bg-clip-text text-transparent">
                Experience
              </span>{" "}
              Meets{" "}
              <span className="text-gradient bg-gradient-to-r from-primary via-sky-blue to-accent bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>

            {/* Enhanced Statistics Section */}
            <div
              className="mb-6 sm:mb-8 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="grid grid-cols-3 gap-1 sm:gap-3 p-2 sm:p-4 bg-white/80 backdrop-blur-lg rounded-lg sm:rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 max-w-md mx-auto lg:max-w-none">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center transition-all duration-500 transform hover:scale-105 p-2 sm:p-3 rounded-md sm:rounded-lg group ${
                        index === currentStatIndex
                          ? "bg-gradient-to-br from-primary/10 to-sky-blue/5 text-primary shadow-md scale-105"
                          : "text-charcoal/80 hover:bg-gradient-to-br hover:from-accent/5 hover:to-primary/5"
                      }`}
                    >
                      <div className="relative">
                        <Icon
                          size={16}
                          className={`mx-auto mb-1 transition-all duration-300 ${
                            index === currentStatIndex
                              ? "text-sky-blue drop-shadow-sm"
                              : "text-charcoal/60 group-hover:text-primary"
                          } sm:hidden`}
                        />
                        <Icon
                          size={20}
                          className={`mx-auto mb-1 sm:mb-2 transition-all duration-300 ${
                            index === currentStatIndex
                              ? "text-sky-blue drop-shadow-sm"
                              : "text-charcoal/60 group-hover:text-primary"
                          } hidden sm:block`}
                        />
                        {index === currentStatIndex && (
                          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-blue rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div className="font-bold text-sm sm:text-base lg:text-lg text-primary mb-0.5 sm:mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs text-charcoal/70 leading-tight font-medium">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 animate-slide-up max-w-md mx-auto lg:max-w-none"
              style={{ animationDelay: "600ms" }}
            >
              <a
                href="#services"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-sky-blue text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <span className="relative z-10">Explore Our Services</span>
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300 sm:hidden"
                />
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300 hidden sm:block"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* <a
                href="#"
                className="group relative bg-white/90 backdrop-blur-sm border-2 border-primary text-primary font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 hover:bg-primary hover:text-white text-sm sm:text-base"
              >
                <Download
                  size={16}
                  className="group-hover:animate-bounce sm:hidden"
                />
                <Download
                  size={18}
                  className="group-hover:animate-bounce hidden sm:block"
                />
                <span>Download Brochure</span>
              </a> */}
            </div>
          </div>

          {/* Enhanced Mobile Image */}
          <div className="block lg:hidden mt-8 sm:mt-12 px-2 sm:px-0">
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl animate-fade-in transform hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "700ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-sky-blue/20 z-10"></div>
              <img
                src="/images/home/hero.png"
                alt="CICF Team"
                className="w-full h-auto rounded-2xl sm:rounded-3xl"
                loading="eager"
                decoding="async"
                width="400"
                height="300"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-20"></div>

              {/* Floating elements - mobile optimized */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-30">
                <Sparkles size={16} className="text-white sm:hidden" />
                <Sparkles size={20} className="text-white hidden sm:block" />
              </div>
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 px-2 sm:px-4 py-1 sm:py-2 bg-white/90 backdrop-blur-sm rounded-md sm:rounded-lg z-30">
                <span className="text-xs sm:text-sm font-semibold text-primary">
                  Excellence in Action
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Image */}
          <div className="hidden lg:block">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in transform hover:scale-105 transition-all duration-500 group"
              style={{ animationDelay: "900ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-sky-blue/20 z-10 group-hover:from-primary/30 group-hover:to-sky-blue/30 transition-all duration-500"></div>
              <img
                src="/images/home/hero.png"
                alt="CICF Team"
                className="w-full h-auto rounded-3xl"
                loading="eager"
                decoding="async"
                width="600"
                height="400"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-20"></div>

              {/* Enhanced floating elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-30 group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={24} className="text-white animate-pulse" />
              </div>
              <div className="absolute bottom-6 left-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-xl z-30 group-hover:bg-white transition-colors duration-300">
                <span className="text-base font-bold text-primary">
                  Excellence in Action
                </span>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-sky-blue/30 to-transparent rounded-br-3xl z-20"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/30 to-transparent rounded-tl-3xl z-20"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          className="bottom-4 sm:bottom-8 lg:bottom-12 left-0 right-0 flex flex-col items-center animate-fade-in"
          style={{ animationDelay: "1000ms" }}
        >
          <a
            href="#about"
            className="group relative p-2 sm:p-3 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full text-primary opacity-80 hover:opacity-100 hover:bg-primary/90 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <ArrowDown size={16} className="animate-bounce sm:hidden" />
            <ArrowDown size={20} className="animate-bounce hidden sm:block" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

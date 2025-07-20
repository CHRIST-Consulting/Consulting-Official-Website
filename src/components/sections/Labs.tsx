import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { labsData } from "../../data/LabsData";

const Labs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const labs = labsData;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % labs.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + labs.length) % labs.length);
  };

  return (
    <section id="labs" className="py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ice-blue/30 via-secondary/20 to-accent/10"></div>

        {/* Geometric Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="absolute inset-0"
          >
            <defs>
              <pattern
                id="hexagons"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="10,2 18,7 18,15 10,20 2,15 2,7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Floating Circles */}
        <div className="absolute top-16 left-10 w-28 h-28 bg-gradient-to-r from-accent/20 to-sky-blue/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-r from-primary/20 to-royal-blue/20 rounded-full blur-lg animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-32 h-32 bg-gradient-to-r from-steel-blue/15 to-electric-blue/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="section-container relative z-10">
        <ScrollAnimation>
          <SectionTitle
            title="Innovation in Action"
            subtitle="Our specialized research labs drive cutting-edge solutions"
            centered={true}
          />
        </ScrollAnimation>

        <div className="mt-8 relative">
          <ScrollAnimation>
            {/* Enhanced Card Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              {/* Inner Card with Enhanced Styling */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={labs[activeIndex].image}
                    alt={labs[activeIndex].name}
                    className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>

                  {/* Content Overlay with Better Positioning */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform translate-y-0 transition-transform duration-300 hover:-translate-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading drop-shadow-lg">
                        {labs[activeIndex].name}
                      </h3>
                      <p className="text-white/95 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow-md">
                        {labs[activeIndex].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
                  aria-label="Previous lab"
                >
                  <ChevronLeft
                    size={20}
                    className="group-hover:-translate-x-0.5 transition-transform duration-200"
                  />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
                  aria-label="Next lab"
                >
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </button>
              </div>
            </div>

            {/* Enhanced Pagination Dots */}
            <div className="flex justify-center mt-6 gap-3">
              {labs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative transition-all duration-300 group ${
                    index === activeIndex ? "w-8 h-3" : "w-3 h-3"
                  }`}
                  aria-label={`Go to lab ${index + 1}`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 group-hover:scale-125"
                    }`}
                  />
                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
          </ScrollAnimation>
        </div>

        {/* Enhanced CTA Button */}
        <div className="mt-8 text-center">
          <ScrollAnimation>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-royal-blue rounded-md blur-sm opacity-30 scale-110"></div>
              <a
                href="/labs"
                className="relative btn-primary hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Explore Research Labs
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Labs;

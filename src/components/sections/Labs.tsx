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
    <section id="labs" className="py-20">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle
            title="Innovation in Action"
            subtitle="Our specialized research labs drive cutting-edge solutions"
            centered={true}
          />
        </ScrollAnimation>

        <div className="mt-12 relative">
          <ScrollAnimation>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={labs[activeIndex].image}
                  alt={labs[activeIndex].name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                    {labs[activeIndex].name}
                  </h3>
                  <p className="text-white opacity-90 max-w-2xl">
                    {labs[activeIndex].description}
                  </p>
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                aria-label="Previous lab"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                aria-label="Next lab"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {labs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary scale-125"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to lab ${index + 1}`}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>

        <div className="mt-8 text-center">
          <ScrollAnimation>
            <a href="/labs" className="btn-primary">
              Explore Research Labs
            </a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Labs;

import React from "react";
import Button from "../ui/Button";
import { Download, ArrowDown } from "lucide-react";

const Hero = () => {
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

      <div className="section-container pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight animate-fade-in">
              Where <span className="text-sky-blue">Experience</span> Meets
              Excellence
            </h1>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ animationDelay: "600ms" }}
            >
              <a
                href="#services"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Explore Our Services
                <ArrowDown size={18} />
              </a>

              <a
                href="#"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Download Brochure
                <Download size={18} />
              </a>
            </div>
          </div>

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

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a
            href="#about"
            className="text-primary opacity-80 hover:opacity-100 transition-opacity"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

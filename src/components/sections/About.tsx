import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { Users, Play, X } from "lucide-react";

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="about" className="bg-secondary py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation>
            <SectionTitle
              title="About CHRIST Incubation and Consultancy Foundation"
              subtitle="Building bridges between academic excellence and industry innovation since 2019"
            />

            <p className="text-lg mb-6 text-charcoal">
              CHRIST Incubation and Consultancy Foundation is the result-driven
              business consultancy arm of CHRIST (Deemed to be University),
              built on research, integrity, and innovation. With over five years
              of cross-functional impact, we partner with public and private
              sector organisations to craft actionable, sustainable solutions.
            </p>

            <p className="text-lg mb-8 text-charcoal">
              Our team combines academic expertise with practical industry
              knowledge, delivering insights that drive measurable results for
              our clients.
            </p>

            <div className="flex gap-4">
              <a
                href="/teams"
                className="btn-primary flex items-center justify-center gap-2 w-fit"
              >
                <Users size={18} />
                Meet the Team
              </a>
              <button
                onClick={() => setShowVideo(true)}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Watch Video
              </button>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent rounded-lg opacity-20"></div>
              <img
                src="/images/home/about.png"
                alt="CHRIST Consulting Team"
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-lg opacity-20"></div>

              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-primary/30 hover:bg-primary/50 transition-colors duration-300 rounded-lg z-20"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <Play size={24} className="text-primary ml-1" />
                </div>
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors duration-300 z-10"
            >
              <X size={24} />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ubt6AoAT7Rk?autoplay=1"
                title="CHRIST Incubation and Consultancy Foundation "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;

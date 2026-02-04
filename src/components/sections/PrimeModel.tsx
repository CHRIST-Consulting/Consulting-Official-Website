import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import {
  Target,
  FlaskConical,
  Lightbulb,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PrimeModel = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const primeItems = [
    {
      id: "precision",
      icon: (
        <Target
          size={48}
          className="text-primary mb-4 group-hover:text-accent transition-colors duration-300"
        />
      ),
      title: "Precision",
      description:
        "Our methodologies are precise, delivering tailored solutions that address specific client challenges with measurable outcomes.",
      highlight: "Tailored Solutions",
    },
    {
      id: "rigour",
      icon: (
        <FlaskConical
          size={48}
          className="text-primary mb-4 group-hover:text-accent transition-colors duration-300"
        />
      ),
      title: "Rigour",
      description:
        "We apply academic rigour to business problems, ensuring our recommendations are backed by sound research and thorough analysis.",
      highlight: "Research-Backed",
    },
    {
      id: "innovation",
      icon: (
        <Lightbulb
          size={48}
          className="text-primary mb-4 group-hover:text-accent transition-colors duration-300"
        />
      ),
      title: "Innovation",
      description:
        "Innovation is at our core, combining cutting-edge research with creative problem-solving to develop breakthrough solutions.",
      highlight: "Breakthrough Solutions",
    },
    {
      id: "multi-disciplinary",
      icon: (
        <Users
          size={48}
          className="text-primary mb-4 group-hover:text-accent transition-colors duration-300"
        />
      ),
      title: "Multi-Disciplinary",
      description:
        "Our approach leverages expertise across multiple disciplines, providing holistic solutions to complex business challenges.",
      highlight: "Holistic Approach",
    },
    {
      id: "excellence",
      icon: (
        <Award
          size={48}
          className="text-primary mb-4 group-hover:text-accent transition-colors duration-300"
        />
      ),
      title: "Excellence",
      description:
        "We are committed to excellence in every project, maintaining the highest standards of quality and professionalism.",
      highlight: "Quality Standards",
    },
  ];

  const handleMobileToggle = (itemId: string) => {
    setExpandedMobile(expandedMobile === itemId ? null : itemId);
  };

  return (
    <section
      id="prime-model"
      className="py-16 md:py-20 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f2a4d' fill-opacity='0.8'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Ccircle cx='15' cy='15' r='0.8'/%3E%3Ccircle cx='45' cy='15' r='0.8'/%3E%3Ccircle cx='15' cy='45' r='0.8'/%3E%3Ccircle cx='45' cy='45' r='0.8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-[15%] w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-32 right-[20%] w-32 h-32 bg-gradient-to-br from-primary/8 to-accent/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s", animationDuration: "10s" }}
        ></div>
      </div>

      <div className="section-container relative">
        <ScrollAnimation>
          <SectionTitle
            title="Built on the PRIME Model"
            subtitle="Our comprehensive framework for delivering exceptional consulting services"
            centered={true}
          />
        </ScrollAnimation>

        {/* Desktop and Large Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mt-12">
          {primeItems.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 100}>
              <div
                className={`group relative h-full transition-all duration-500 ease-out cursor-pointer ${
                  activeItem === item.id
                    ? "transform -translate-y-2 scale-[1.02]"
                    : ""
                }`}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* Background with glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"></div>

                {/* Border gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br rounded-2xl p-[1px] transition-all duration-500 ${
                    activeItem === item.id
                      ? "from-accent/40 via-primary/30 to-accent/40"
                      : "from-primary/20 via-accent/10 to-primary/20"
                  }`}
                >
                  <div className="bg-gradient-to-br from-white to-white/95 rounded-2xl h-full w-full"></div>
                </div>

                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-500 text-center flex flex-col">
                  {/* Icon with enhanced styling */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      {item.icon}
                      {/* Icon glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-primary font-heading group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Highlight badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-accent/20 to-primary/20 text-primary rounded-full border border-accent/30">
                      {item.highlight}
                    </span>
                  </div>

                  <p
                    className={`text-charcoal text-sm leading-relaxed transition-all duration-500 flex-grow ${
                      activeItem === item.id
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-80"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Bottom decoration */}
                  <div className="mt-4 flex justify-center">
                    <div
                      className={`w-12 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500 ${
                        activeItem === item.id ? "w-16" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Mobile and Small Tablet Layout */}
        <div className="md:hidden space-y-4 mt-12">
          {primeItems.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 100}>
              <div className="group">
                {/* Card Header - Always Visible */}
                <div
                  className={`relative bg-white/95 backdrop-blur-sm rounded-t-2xl ${
                    expandedMobile === item.id ? "" : "rounded-b-2xl"
                  } p-6 border border-white/20 shadow-lg transition-all duration-1000 ease-in-out cursor-pointer`}
                  onClick={() => handleMobileToggle(item.id)}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl"></div>

                  {/* Border gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br rounded-2xl p-[1px] transition-all duration-500 ${
                      expandedMobile === item.id
                        ? "from-accent/40 via-primary/30 to-accent/40"
                        : "from-primary/20 via-accent/10 to-primary/20"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-white to-white/95 rounded-2xl h-full w-full"></div>
                  </div>

                  <div className="relative flex items-center space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="text-primary transition-colors duration-300 w-12 h-12 flex items-center justify-center">
                          {React.cloneElement(item.icon, { size: 32 })}
                        </div>
                      </div>
                    </div>

                    {/* Title and Toggle */}
                    <div className="flex-grow flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-primary font-heading mb-1">
                          {item.title}
                        </h3>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-accent/20 to-primary/20 text-primary rounded-full border border-accent/30">
                          {item.highlight}
                        </span>
                      </div>

                      {/* Toggle Icon */}
                      <div className="ml-4">
                        {expandedMobile === item.id ? (
                          <ChevronUp size={20} className="text-accent" />
                        ) : (
                          <ChevronDown size={20} className="text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Description */}
                <div
                  className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                    expandedMobile === item.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-b-2xl p-6 pt-0 border-l border-r border-b border-white/20 shadow-lg border-t-0">
                    <div className="relative">
                      {/* Background gradient for description */}
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-white/50 rounded-xl -m-4 p-4"></div>

                      <p className="relative text-charcoal text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bottom decoration */}
                      <div className="relative flex justify-center mt-4">
                        <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimeModel;

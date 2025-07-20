import React from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { MapPin, ExternalLink, Sparkles } from "lucide-react";
import { campusesData } from "../../data/CampusesData";

const Campuses = () => {
  const campuses = campusesData;

  return (
    <section
      id="campuses"
      className="py-16 bg-gradient-to-br from-ice-blue via-white to-secondary relative overflow-hidden"
    >
      {/* Bold & Visible Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Bold gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-accent/30 to-sky-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-primary/25 to-accent/18 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sky-blue/35 to-ice-blue/25 rounded-full blur-2xl"></div>

        {/* Bold wave shapes */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-accent/20 via-transparent to-primary/15 transform -skew-y-1"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-l from-sky-blue/25 via-transparent to-accent/20 transform skew-y-1"></div>

        {/* Prominent floating elements */}
        <div className="absolute top-1/3 right-1/4 w-12 h-50 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent rounded-full blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/5 w-10 h-40 bg-gradient-to-t from-primary/35 via-primary/15 to-transparent rounded-full blur-sm"></div>
        <div className="absolute top-1/6 left-1/2 w-8 h-45 bg-gradient-to-b from-sky-blue/45 via-sky-blue/25 to-transparent rounded-full blur-sm"></div>

        {/* Bold circular accents */}
        <div className="absolute top-1/5 left-1/6 w-40 h-40 bg-accent/25 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/5 right-1/5 w-48 h-48 bg-primary/22 rounded-full blur-lg"></div>
        <div className="absolute top-3/5 left-3/5 w-32 h-32 bg-sky-blue/30 rounded-full blur-md"></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-accent/20 rounded-full blur-lg"></div>

        {/* Additional bold geometric shapes */}
        <div className="absolute top-1/4 left-1/3 w-24 h-6 bg-accent/35 rounded-full blur-md transform rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-5 bg-primary/30 rounded-full blur-sm transform -rotate-45"></div>
        <div className="absolute top-2/3 left-1/4 w-28 h-8 bg-sky-blue/40 rounded-full blur-md transform rotate-30"></div>

        {/* Diagonal bold bands */}
        <div className="absolute top-0 left-1/4 w-48 h-full bg-gradient-to-br from-accent/12 to-transparent transform -rotate-12 blur-xl"></div>
        <div className="absolute top-0 right-1/3 w-40 h-full bg-gradient-to-bl from-primary/15 to-transparent transform rotate-12 blur-xl"></div>

        {/* Bold overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-primary/6"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-sky-blue/10 via-transparent to-accent/8"></div>
      </div>

      <div className="section-container relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <SectionTitle
              title="Our Distinguished Campuses"
              subtitle="Where excellence meets innovation across multiple strategic locations"
              centered={true}
            />
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="group relative h-full">
                <a href={campus.link} className="block h-full">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-2 border border-white/50 h-full flex flex-col">
                    {/* Image Container with Enhanced Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={campus.image}
                        alt={campus.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                      />
                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Action button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                          <ExternalLink className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Location badge */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center bg-gradient-to-r from-accent/10 to-sky-blue/10 rounded-full px-3 py-1.5 border border-accent/20">
                          <MapPin size={14} className="text-accent mr-2" />
                          <span className="text-xs font-semibold text-primary">
                            {campus.location}
                          </span>
                        </div>
                      </div>

                      {/* Campus name */}
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 leading-tight">
                        {campus.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-blue text-sm leading-relaxed mb-4 flex-1">
                        {campus.description}
                      </p>

                      {/* CTA button */}
                      <div className="flex items-center pt-3 border-t border-gray-100/80 mt-auto">
                        <div className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors duration-300">
                          <span className="text-sm">Explore Campus</span>
                          <div className="ml-2 w-7 h-7 bg-primary/10 group-hover:bg-accent/20 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                            <span className="text-xs">→</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-accent via-sky-blue to-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </a>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campuses;

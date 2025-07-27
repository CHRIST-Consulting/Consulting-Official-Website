import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { Users, Play, X } from "lucide-react";

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      id="about"
      className="bg-secondary py-12 lg:py-16 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-accent/10 rounded-lg rotate-45 blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 right-10 w-24 h-24 bg-accent/10 rounded-lg rotate-12 blur-xl animate-pulse delay-1500"></div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center">
          <ScrollAnimation>
            <div className="space-y-6 sm:space-y-8">
              <div className="relative">
                {/* Decorative Element Behind Title */}
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 lg:-top-4 lg:-left-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/15 to-accent/15 sm:from-primary/20 sm:to-accent/20 rounded-full blur-xl lg:blur-2xl"></div>

                <SectionTitle
                  title="About CHRIST Incubation and Consultancy Foundation"
                  subtitle="Building bridges between academic excellence and industry innovation since 2019"
                />
              </div>

              <div className="relative">
                {/* Text Content with Background Accent */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-full h-full bg-gradient-to-r from-primary/3 to-accent/3 sm:from-primary/5 sm:to-accent/5 rounded-lg sm:rounded-xl blur-sm"></div>
                <div className="relative bg-white/50 sm:bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-white/15 sm:border-white/20 shadow-md lg:shadow-lg">
                  <p className="text-sm sm:text-base mb-3 sm:mb-4 text-charcoal leading-relaxed">
                    CHRIST Incubation and Consultancy Foundation is the
                    result-driven business consultancy arm of CHRIST (Deemed to
                    be University), built on research, integrity, and
                    innovation. With over five years of cross-functional impact,
                    we partner with organizations to craft actionable,
                    sustainable solutions.
                  </p>

                  <p className="text-sm sm:text-base mb-0 text-charcoal leading-relaxed">
                    Our team combines academic expertise with practical industry
                    knowledge, delivering insights that drive measurable
                    results.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
                <a
                  href="/teams"
                  className="btn-primary flex items-center justify-center gap-2 text-sm px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Users size={14} className="sm:w-4 sm:h-4 relative z-10" />
                  <span className="relative z-10">Meet the Team</span>
                </a>
                <button
                  onClick={() => setShowVideo(true)}
                  className="btn-secondary flex items-center justify-center gap-2 text-sm px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Play size={14} className="sm:w-4 sm:h-4 relative z-10" />
                  <span className="relative z-10">Watch Video</span>
                </button>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="space-y-6 sm:space-y-8">
              <div className="relative w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-none lg:ml-4 xl:ml-8">
                {/* Decorative Background */}
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl opacity-60"></div>

                {/* Floating Geometric Shapes */}
                <div
                  className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-accent/40 to-accent/25 rounded-xl rotate-12 animate-bounce shadow-xl"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/40 to-primary/25 rounded-full animate-pulse delay-1000 shadow-xl"></div>

                {/* Main Image Container */}
                <div className="relative bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 border border-white/30 shadow-2xl">
                  <div className="relative overflow-hidden rounded-lg lg:rounded-xl">
                    <img
                      src="/images/home/about.png"
                      alt="CHRIST Consulting Team"
                      className="w-full h-auto shadow-2xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:max-h-96 object-cover"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="384"
                    />

                    {/* Video Play Overlay */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/2 hover:bg-black/8 transition-all duration-300 rounded-lg lg:rounded-xl group backdrop-blur-[1px]"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-white rounded-full shadow-xl transform group-hover:scale-110 transition-all duration-300">
                        <Play
                          size={20}
                          className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary ml-1"
                        />
                      </div>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium">
                          Watch Video
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Vision and Mission - Positioned Below Video */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:ml-4 xl:ml-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/8 sm:from-primary/20 sm:to-primary/10 rounded-lg sm:rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative bg-white/70 sm:bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 border border-primary/25 sm:border-primary/30 hover:border-primary/40 sm:hover:border-primary/50 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-0.5 sm:hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-primary to-primary/70 rounded-full mr-2 sm:mr-3 shadow-md lg:shadow-lg"></div>
                        <h3 className="text-base sm:text-lg font-bold text-primary">
                          Vision
                        </h3>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/40"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L14 10.202a1 1 0 000-1.664l-4.445-2.37z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                      Transform CHRIST Consulting into a highly profitable
                      centre, bring visibility and create impact in academia
                      globally.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent/8 sm:from-accent/20 sm:to-accent/10 rounded-lg sm:rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative bg-white/70 sm:bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 border border-accent/25 sm:border-accent/30 hover:border-accent/40 sm:hover:border-accent/50 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-0.5 sm:hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-accent to-accent/70 rounded-full mr-2 sm:mr-3 shadow-md lg:shadow-lg"></div>
                        <h3 className="text-base sm:text-lg font-bold text-accent">
                          Mission
                        </h3>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent/40"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                      Generating business, growing aggressively and supporting
                      overall revenues of CHRIST University.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Video Modal - Mobile Optimized */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="relative w-full max-w-sm sm:max-w-2xl lg:max-w-4xl bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-xl lg:shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white hover:text-accent transition-all duration-300 z-10 rounded-full backdrop-blur-sm"
            >
              <X size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ubt6AoAT7Rk?autoplay=1"
                title="CHRIST Incubation and Consultancy Foundation"
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

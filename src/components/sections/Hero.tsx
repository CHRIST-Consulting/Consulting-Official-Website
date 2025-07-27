import { useState, useEffect } from "react";
import {
  ArrowDown,
  BookOpen,
  GraduationCap,
  UserCheck,
  Sparkles,
  ChevronRight,
  Play,
} from "lucide-react";

const Hero = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { number: "100+", label: "Student Interns", icon: GraduationCap },
    { number: "1500+", label: "Teaching Faculties", icon: UserCheck },
    { number: "32+", label: "Specialisms", icon: BookOpen },
  ];

  const heroImages = [
    {
      src: "/images/home/hero.png",
      title: "Excellence in Action",
      subtitle: "Where expertise meets innovation",
    },
    {
      src: "/images/home/hero1.png",
      title: "Leading Consultancy",
      subtitle: "Transforming businesses worldwide",
    },
    {
      src: "/images/services/hero-consulting-team.jpg",
      title: "Expert Team",
      subtitle: "Professional consulting at its finest",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="max-h-screen relative overflow-hidden flex items-center"
    >
      {/* Full-screen Image Background with Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
            {/* Enhanced dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
            {/* Additional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`particle particle-${i + 1} opacity-20`}
            style={{
              background: `radial-gradient(circle, ${
                i % 4 === 0
                  ? "rgba(255, 255, 255, 0.8)"
                  : i % 4 === 1
                  ? "rgba(120, 189, 242, 0.6)"
                  : i % 4 === 2
                  ? "rgba(59, 130, 246, 0.5)"
                  : "rgba(255, 215, 0, 0.4)"
              } 0%, transparent 70%)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${12 + i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-32 left-16 w-24 h-24 border-2 border-accent/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-8 w-16 h-16 border border-white/25 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-8 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full animate-bounce"
          style={{ animationDelay: "3s", animationDuration: "3s" }}
        ></div>
      </div>

      <div className="section-container pt-8 sm:pt-12 lg:pt-16 relative z-20 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center h-screen max-h-screen overflow-hidden">
          {/* Left Content - Original Content with Better Visibility */}
          <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left flex flex-col justify-center">
            {/* Main Heading - Enhanced Typography */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-10 sm:mb-8 leading-tight animate-fade-in">
              <span className="block drop-shadow-2xl">
                Where{" "}
                <span className="bg-gradient-to-r from-accent via-sky-blue to-white bg-clip-text text-transparent font-extrabold">
                  Experience
                </span>
              </span>
              <span className="block drop-shadow-2xl">
                Meets{" "}
                <span className="bg-gradient-to-r from-white via-accent to-sky-blue bg-clip-text text-transparent font-extrabold">
                  Excellence
                </span>
              </span>
            </h1>

            {/* Enhanced Statistics Section - Compact Layout */}
            <div
              className="mb-4 sm:mb-6 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-3 bg-white/40 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-2xl border border-white/30 hover:shadow-3xl hover:bg-white/50 transition-all duration-500 max-w-md mx-auto lg:max-w-none">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center transition-all duration-500 transform hover:scale-105 p-2 sm:p-3 rounded-lg group ${
                        index === currentStatIndex
                          ? "bg-gradient-to-br from-primary/30 to-sky-blue/20 text-white shadow-xl scale-105 ring-2 ring-accent/30"
                          : "text-white hover:bg-gradient-to-br hover:from-accent/20 hover:to-primary/20"
                      }`}
                    >
                      <div className="relative">
                        <Icon
                          size={16}
                          className={`mx-auto mb-1 transition-all duration-300 ${
                            index === currentStatIndex
                              ? "text-accent drop-shadow-lg"
                              : "text-white/90 group-hover:text-accent"
                          } sm:hidden`}
                        />
                        <Icon
                          size={20}
                          className={`mx-auto mb-2 transition-all duration-300 ${
                            index === currentStatIndex
                              ? "text-accent drop-shadow-lg"
                              : "text-white/90 group-hover:text-accent"
                          } hidden sm:block`}
                        />
                        {index === currentStatIndex && (
                          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-ping shadow-lg"></div>
                        )}
                      </div>
                      <div className="font-black text-sm sm:text-base lg:text-lg text-white mb-1 drop-shadow-lg tracking-wide">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-xs text-white/95 leading-tight font-semibold drop-shadow-md tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-up max-w-md mx-auto lg:max-w-none"
              style={{ animationDelay: "600ms" }}
            >
              <a
                href="#services"
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-sky-blue to-accent text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-accent/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-3 text-base sm:text-lg tracking-wide"
              >
                <span className="relative z-10 drop-shadow-sm">
                  Explore Our Services
                </span>
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300 sm:hidden"
                />
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300 hidden sm:block"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-sky-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>
          </div>

          {/* Right Content - Image Showcase */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center h-full -mt-40 sm:mt-0">
            <div
              className="relative animate-fade-in w-full max-w-2xl"
              style={{ animationDelay: "1600ms" }}
            >
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 group">
                {/* Current Image */}
                <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] xl:h-[480px]">
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  ))}

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"></div>

                  {/* Floating Info Card with Original Content */}
                  {/* <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl border border-white/20">
                    <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                      Excellence in Action
                    </h3>
                    <p className="text-charcoal/80 text-xs sm:text-sm">
                      Where Experience Meets Excellence
                    </p>
                  </div> */}

                  {/* Enhanced Corner Decorations */}
                  <div className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Sparkles
                      size={18}
                      className="text-white animate-pulse drop-shadow-lg sm:hidden"
                    />
                    <Sparkles
                      size={22}
                      className="text-white animate-pulse drop-shadow-lg hidden sm:block"
                    />
                  </div>

                  {/* Additional Corner Elements for Visual Interest */}
                  <div className="absolute top-4 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-ping shadow-lg"></div>
                  <div
                    className="absolute bottom-4 right-12 sm:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-sky-blue rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                {/* Enhanced Image Navigation Dots */}
                <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 border ${
                        index === currentImageIndex
                          ? "bg-white border-white scale-125 shadow-lg"
                          : "bg-white/30 border-white/50 hover:bg-white/75 hover:border-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements Around Main Image */}
              <div
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent/30 to-transparent rounded-full animate-bounce"
                style={{ animationDelay: "2s", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-tl from-sky-blue/30 to-transparent rounded-full animate-bounce"
                style={{ animationDelay: "3s", animationDuration: "4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

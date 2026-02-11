import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen,
  GraduationCap,
  UserCheck,
  ArrowRight,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

const TYPING_WORDS = ["Smarter", "Faster", "Better", "Stronger"];

// Smooth spring configuration for entrance animations
const smoothSpring = {
  type: "spring",
  stiffness: 70,
  damping: 15,
  mass: 1
};

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const currentWord = useMemo(() => TYPING_WORDS[currentWordIndex], [currentWordIndex]);

  const handleTyping = useCallback(() => {
    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        setTypingSpeed(150);
      } else {
        setTypingSpeed(2000);
        setIsDeleting(true);
      }
    } else {
      if (currentText.length > 0) {
        setCurrentText(currentWord.slice(0, currentText.length - 1));
        setTypingSpeed(100);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        setTypingSpeed(500);
      }
    }
  }, [isDeleting, currentText, currentWord]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleTyping();
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [handleTyping, typingSpeed]);

  const heroImages = [
    { src: "/images/home/hero.JPG", title: "Excellence in Action", subtitle: "Where expertise meets innovation" },
    { src: "/images/services/hero-consulting-team.jpg", title: "Leading Consultancy", subtitle: "Transforming businesses worldwide" },
    { src: "/images/home/hero.png", title: "Expert Team", subtitle: "Professional consulting at its finest" },
  ];

  const extendedImages = [
    heroImages[heroImages.length - 1],
    ...heroImages,
    heroImages[0],
  ];

  const [index, setIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const stats = [
    { number: "6", label: "Campuses", icon: GraduationCap },
    { number: "1500+", label: "Teaching Faculties", icon: UserCheck },
    { number: "32+", label: "Specialisms", icon: BookOpen },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === extendedImages.length - 1) {
      // Delay disabling transition to allow the animation to finish
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex(1);
      }, 700); 
      return () => clearTimeout(timer);
    } else if (index === 0) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex(extendedImages.length - 2);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [index, extendedImages.length]);

  useEffect(() => {
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  }, [transitionEnabled]);

  return (
    <section
      id="hero"
      className="relative flex w-full min-h-[90vh] items-center has-navbar-offset overflow-hidden bg-gradient-to-br from-secondary via-white to-ice-blue"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/home/bg-1.jpg')] bg-cover bg-center select-none pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/15 via-amber-300/10 to-transparent rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 -right-10 w-40 h-40 bg-gradient-to-br from-primary/15 via-royal-blue/10 to-transparent rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col py-8 sm:py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-10 flex-1 flex justify-center">
          <div className="w-full max-w-[1100px]">
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ...smoothSpring }}
                className="w-full lg:w-1/2 flex flex-col gap-6"
              >
                {/* Featured Image Card */}
                <div className="hero-card group overflow-hidden rounded-2xl">
                  <div
                    className={`hero-carousel-track flex h-full ${
                      transitionEnabled
                        ? "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        : "transition-none"
                    }`}
                    style={{ 
                        transform: `translateX(-${index * 100}%)`,
                        willChange: "transform" // Force GPU use for smoothness
                    }}
                  >
                    {extendedImages.map((image, i) => (
                      <div key={i} className="relative w-full h-full shrink-0">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading={i === 1 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">{image.title}</h3>
                          <p className="text-white/90 text-sm sm:text-base drop-shadow-md mt-1">{image.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {heroImages.map((_, dotIndex) => {
                      const active = (index - 1 + heroImages.length) % heroImages.length === dotIndex;
                      return (
                        <button
                          key={dotIndex}
                          onClick={() => setIndex(dotIndex + 1)}
                          className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                            active ? "bg-white border-white scale-110" : "bg-white/40 border-white/60"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + idx * 0.1, ...smoothSpring }}
                        className="group cursor-pointer w-full h-[80px] sm:h-[90px] rounded-lg bg-white/95 border border-primary/10 shadow-sm flex flex-col items-center justify-center relative overflow-hidden"
                      >
                        <Icon size={14} className="text-primary mb-1" />
                        <div className="text-base sm:text-lg font-black text-primary leading-none">{stat.number}</div>
                        <div className="text-[10px] sm:text-xs text-primary/70 font-medium">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Side Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 sm:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ...smoothSpring }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase">
                    <Sparkles className="w-4 h-4 text-accent" /> Leading Business Transformation
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                    <span className="text-charcoal">Empowering</span>{" "}
                    <span className="bg-gradient-to-r from-primary via-royal-blue to-primary bg-clip-text text-transparent">Businesses</span>{" "}
                    <span className="text-charcoal">to Scale</span>{" "}
                    <span className="relative inline-block min-w-[200px]">
                      <span className="bg-gradient-to-r from-accent to-royal-blue bg-clip-text text-transparent">{currentText}</span>
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-accent">|</motion.span>
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-charcoal/80 font-medium leading-relaxed max-w-2xl">
                    We help <span className="text-primary font-bold">startups and enterprises</span> unlock growth.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ...smoothSpring }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a href="#contact" className="inline-flex items-center justify-center h-14 px-12 rounded-xl text-white font-bold bg-primary hover:bg-royal-blue transition-colors shadow-lg">
                    Contact Us <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
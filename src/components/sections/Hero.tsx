import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, UserCheck, ArrowRight, Sparkles, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  //this part is for typing effect
  const typingWords = ["Smarter", "Faster", "Better", "Stronger"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect logic
  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // starts deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // deleting
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, typingWords, typingSpeed]);
  //sliding carousel
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

  const extendedImages = [
    heroImages[heroImages.length - 1],
    ...heroImages,
    heroImages[0],
  ];

  const [index, setIndex] = useState(1); 
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  
  const stats = [
    { number: "100+", label: "Student Interns", icon: GraduationCap },
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
      
      setTransitionEnabled(false);
      setIndex(1);
    } else if (index === 0) {
      
      setTransitionEnabled(false);
      setIndex(extendedImages.length - 2);
    }
    
  }, [index, extendedImages.length]);

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  return (
    <section id="hero" className="relative flex w-full min-h-[90vh] items-center has-navbar-offset overflow-hidden">
  
      <div aria-hidden className="absolute inset-0 z-0">
        {/* Base background image (ued bg-1.jpg from public folder) */}
        <div className="absolute inset-0 bg-[url('/images/home/bg-1.jpg')] bg-cover bg-center select-none pointer-events-none" />
        
        { /* Gradient filter is used here to reduce the contrast of the background image */ }
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-transparent" />
        
        
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/8 to-accent/8 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col py-8 sm:py-12 lg:py-16">
        
  <div className="px-4 sm:px-6 lg:px-10 flex-1 flex justify-center">
          <div className="w-full max-w-[1100px]">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="hero-card group">
                  <div
                    className={`hero-carousel-track ${
                      transitionEnabled
                        ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "transition-none"
                    }`}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                  >
                    {extendedImages.map((image, i) => (
                      <div key={i} className="relative w-full h-full shrink-0">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading={i === 1 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                        
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="absolute bottom-6 left-6 right-6"
                        >
                          <h3 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                            {image.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base drop-shadow-md mt-1">
                            {image.subtitle}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {heroImages.map((_, dotIndex) => {
                      const active = ((index - 1 + heroImages.length) % heroImages.length) === dotIndex;
                      return (
                        <motion.button
                          key={dotIndex}
                          onClick={() => setIndex(dotIndex + 1)}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                            active
                              ? "bg-white border-white shadow-lg shadow-white/50"
                              : "bg-white/40 border-white/60 hover:bg-white/70 hover:border-white/90"
                          }`}
                        />
                      );
                    })}
                  </div>
                  
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>

              
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 sm:gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-left space-y-4"
                >
                  {/* Overline with icon */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base tracking-wide uppercase"
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                    Leading Business Transformation
                  </motion.div>

                  {/* Main headline with gradient and emphasis */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
                  >
                    <span className="text-[#0e111b]">Empowering</span>{" "}
                    <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                      Businesses
                    </span>{" "}
                    <span className="text-[#0e111b]">to Scale</span>{" "}
                    <span className="relative inline-block min-w-[200px] sm:min-w-[240px] lg:min-w-[280px]">
                      <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                        {currentText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                          className="text-accent"
                        >
                          |
                        </motion.span>
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary-light rounded-full"
                      />
                    </span>
                  </motion.h1>

                  {/* Enhanced subtitle with better typography */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-lg sm:text-xl lg:text-2xl text-[#0e111b]/80 font-medium leading-relaxed max-w-2xl"
                  >
                    We help <span className="font-bold text-primary">startups and enterprises</span> unlock 
                    exponential growth with <span className="font-bold text-accent-dark">tailored strategies</span>, 
                    data-driven decisions, and <span className="font-bold text-primary-light">innovative solutions</span>.
                  </motion.p>

                  {/* Key benefits with icons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    {[
                      { icon: Target, text: "Strategic Excellence" },
                      { icon: Sparkles, text: "Innovation-Driven" },
                      { icon: GraduationCap, text: "Expert Team" }
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-primary font-semibold">
                        <benefit.icon className="w-4 h-4 text-accent" />
                        <span className="text-sm sm:text-base">{benefit.text}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Enhanced CTAs with animations */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center h-14 px-12 px-8 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg tracking-wide shadow-2xl hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Book Free Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    />
                  </motion.a>
                  
                  <motion.a
                    href="#clients"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center h-14 px-12 rounded-xl bg-white/90 backdrop-blur-sm text-primary font-bold text-lg tracking-wide border-2 border-primary/20 hover:border-primary/40 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center gap-2">
                      See Our Success Stories
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </div>

            {/* Enhanced subtitle with animated elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center gap-3 mt-8 px-1"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
              <p className="text-primary/80 text-lg font-semibold tracking-wide flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Our Impact at a Glance
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
            </motion.div>

            {/* Enhanced stats cards with animations */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 + idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-2xl hover:shadow-primary/20 p-6 transition-all duration-300 relative overflow-hidden">
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
                        >
                          <Icon size={28} className="text-primary group-hover:text-primary-light transition-colors" />
                        </motion.div>
                        <div>
                          <motion.div 
                            className="text-3xl sm:text-4xl font-black text-primary leading-none"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {stat.number}
                          </motion.div>
                          <div className="text-sm sm:text-base text-primary/70 font-semibold mt-1 group-hover:text-primary transition-colors">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent"
                        whileHover={{
                          borderColor: "rgba(15, 42, 77, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

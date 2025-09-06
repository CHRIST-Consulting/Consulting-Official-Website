import { useState, useEffect, useRef, useCallback } from "react";
import { Users, Play, X, Award, Target, TrendingUp, Globe, BookOpen, Lightbulb } from "lucide-react";

// Stats data with unique IDs
const STATS_DATA = [
  { id: 'years', value: 'years', suffix: '+', label: 'Years', icon: Award, gradient: 'from-yellow-400 to-amber-500' },
  { id: 'projects', value: 'projects', suffix: '+', label: 'Projects', icon: TrendingUp, gradient: 'from-primary to-royal-blue' },
  { id: 'clients', value: 'clients', suffix: '+', label: 'Clients', icon: Globe, gradient: 'from-accent to-sky-blue' },
  { id: 'impact', value: 'impact', suffix: '%', label: 'Success', icon: Target, gradient: 'from-amber-400 to-yellow-500' }
];

// Core values data with unique IDs
const CORE_VALUES_DATA = [
  { id: 'research', icon: BookOpen, title: 'Research-Driven', desc: 'Evidence-based solutions', gradient: 'from-primary to-royal-blue' },
  { id: 'results', icon: Target, title: 'Result-Oriented', desc: 'Measurable outcomes', gradient: 'from-yellow-400 to-amber-500' },
  { id: 'innovation', icon: Lightbulb, title: 'Innovation-Led', desc: 'Future-ready strategies', gradient: 'from-accent to-sky-blue' }
];

const About = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    impact: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Move animateCounters before useEffect to fix "variables before they are defined"
  const animateCounters = useCallback(() => {
    const duration = 2500;
    const targets = { years: 5, projects: 150, clients: 50, impact: 95 };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCounters({
        years: Math.floor(targets.years * easeOutQuart),
        projects: Math.floor(targets.projects * easeOutQuart),
        clients: Math.floor(targets.clients * easeOutQuart),
        impact: Math.floor(targets.impact * easeOutQuart)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  // Handler functions to avoid inline functions in JSX
  const handleVideoOpen = useCallback(() => setShowVideo(true), []);
  const handleVideoClose = useCallback(() => setShowVideo(false), []);

  // Enhanced scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const delay = parseInt(target.getAttribute('data-delay') || '0', 10);
          
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          }, delay);
          
          // Trigger counter animation when stats section is visible
          if (target.classList.contains('stats-section') && !isVisible) {
            setIsVisible(true);
            animateCounters();
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements after component mounts
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate="true"]');
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(32px)';
        observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isVisible, animateCounters]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-6 lg:py-8 bg-gradient-to-br from-secondary via-white to-ice-blue overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Golden gradient orbs */}
        <div className="absolute top-10 -left-20 w-64 h-64 bg-gradient-to-br from-yellow-400/20 via-amber-300/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-gradient-to-br from-primary/20 via-royal-blue/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="section-container relative z-10 w-full">
        {/* Compact Header */}
        <div data-animate="true" data-delay="0">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-2">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-amber-300/20 to-yellow-400/30 rounded-lg blur-lg"></div>
              <h2 className="relative text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-primary via-royal-blue to-primary bg-clip-text text-transparent">
                About CHRIST Consulting
              </h2>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-300 mx-auto rounded-full mb-3"></div>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Excellence in consultancy since 2019 • Research-driven solutions • Industry innovation
            </p>
          </div>
        </div>

        {/* Main Content Grid - Tighter Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Stats Column - More compact */}
          <div data-animate="true" data-delay="200" className="lg:col-span-1 stats-section">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {STATS_DATA.map((stat, index) => {
                const IconComponent = stat.icon;
                const counterValue = counters[stat.value as keyof typeof counters];
                
                return (
                  <div key={stat.id} className="group relative" data-animate="true" data-delay={300 + index * 50}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="flex lg:flex-col items-center lg:items-center gap-2 lg:gap-1">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 lg:text-center">
                          <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-royal-blue bg-clip-text text-transparent">
                            {counterValue}{stat.suffix}
                          </div>
                          <p className="text-sm font-medium text-charcoal/60">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Column - Expanded */}
          <div data-animate="true" data-delay="400" className="lg:col-span-3">
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-yellow-400/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-primary mb-4">Transforming Ideas Into Strategic Solutions</h3>
                  <p className="text-base text-charcoal/80 leading-relaxed mb-4">
                    CHRIST Incubation and Consultancy Foundation is the result-driven business consultancy arm of 
                    <span className="font-semibold text-primary"> CHRIST (Deemed to be University)</span>, 
                    built on research, integrity, and innovation.
                  </p>
                  <p className="text-base text-charcoal/70 leading-relaxed">
                    Our team combines academic expertise with practical industry knowledge, delivering insights that drive measurable results across diverse sectors.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Core Values - Horizontal */}
                <div className="grid grid-cols-3 gap-4">
                  {CORE_VALUES_DATA.map((value, index) => {
                    const IconComponent = value.icon;
                    
                    return (
                      <div key={value.id} data-animate="true" data-delay={600 + index * 50} className="group relative cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                        <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/40 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 text-center">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-3 mx-auto`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-sm font-bold text-primary mb-1">{value.title}</h4>
                          <p className="text-xs text-charcoal/60">{value.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div data-animate="true" data-delay="750" className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="/teams"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-royal-blue hover:from-royal-blue hover:to-primary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Users className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Meet Our Team</span>
                  </a>
                  
                  <button
                    onClick={handleVideoOpen}
                    className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-primary border-2 border-primary/20 hover:border-yellow-400/50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Play className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Watch Our Story</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video & Vision/Mission Column - Reduced width */}
          <div data-animate="true" data-delay="500" className="lg:col-span-1">
            <div className="space-y-4">
              {/* Compact Video */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 via-primary/15 to-accent/20 rounded-xl blur-lg opacity-60"></div>
                
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400/50 to-amber-400/40 rounded-lg rotate-12 animate-float shadow-lg"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/50 to-royal-blue/40 rounded-full animate-float delay-1000 shadow-lg"></div>

                  <div className="relative bg-white/40 backdrop-blur-sm rounded-xl p-2 border border-white/50 shadow-xl">
                    <div className="relative overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-500">
                      <img
                        src="/images/home/about.png"
                        alt="CHRIST Consulting Excellence"
                        className="w-full h-auto aspect-[4/3] object-cover"
                        loading="lazy"
                      />
                      
                      <button
                        onClick={handleVideoOpen}
                        className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-all duration-300 group-video"
                        type="button"
                        aria-label="Play video about CHRIST Consulting"
                      >
                        <div className="relative w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-xl transform group-video-hover:scale-110 transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400/60">
                          <Play className="w-4 h-4 text-primary ml-1" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-400/30 animate-ping"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Vision & Mission */}
              <div className="grid grid-cols-1 gap-3">
                <div data-animate="true" data-delay="600" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-yellow-400/10 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-royal-blue flex items-center justify-center">
                        <Target className="w-3 h-3 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-primary">Vision</h4>
                    </div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Transform CHRIST Consulting into a highly profitable centre with global academic impact.
                    </p>
                  </div>
                </div>

                <div data-animate="true" data-delay="650" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-yellow-600">Mission</h4>
                    </div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Generate business growth and support CHRIST University revenues through innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white hover:text-accent transition-all duration-300 z-10 rounded-full backdrop-blur-sm border border-white/20"
              type="button"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Video container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl blur-xl"></div>
              <div className="relative">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/ubt6AoAT7Rk?autoplay=1&rel=0&modestbranding=1"
                    title="CHRIST Incubation and Consultancy Foundation - Our Story"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                </div>
              </div>
            </div>
            
            {/* Video description */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Our Journey of Excellence</h3>
              <p className="text-white/80">Discover how CHRIST Consulting transforms ideas into impactful solutions</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(href), 100);
      } else {
        scrollToSection(href);
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    let ticking = false;

    const updateMenuTop = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMenuTop(Math.ceil(rect.bottom));
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(y > 10);

          // Active section highlight
          if (location.pathname === "/") {
            const sections = document.querySelectorAll("section[id]");
            sections.forEach((section) => {
              const sectionTop = section.getBoundingClientRect().top;
              const sectionId = section.getAttribute("id") || "";
              if (sectionTop < window.innerHeight / 3) {
                setActiveSection(sectionId);
              }
            });
          }

          updateMenuTop();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      updateMenuTop();
    };

    // Initial measurement
    updateMenuTop();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Observe size changes on the container itself
    const ro = new ResizeObserver(() => updateMenuTop());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [location]);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Expertise", href: "/expertise" },
    { name: "Team", href: "/teams" },
    { name: "Labs", href: "/labs" },
    { name: "Clients", href: "/clients" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/#contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && activeSection === href.substring(2);
    }
    return location.pathname === href;
  };

  return (
    <header
      className={`fixed z-50 motion-safe:transition-all motion-safe:duration-600 motion-safe:ease-in-out ${
        isScrolled 
          ? "top-4 sm:top-3 left-1/2 transform -translate-x-1/2 w-[94%] sm:w-[95%] max-w-6xl" 
          : "top-0 left-0 right-0 w-full"
      }`}
      style={{ willChange: "transform, width" }}
    >
      <div 
        ref={containerRef}
        className={`mx-auto motion-safe:transition-all motion-safe:duration-600 motion-safe:ease-in-out transform ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-full px-6 py-3 border border-white/40 scale-[0.985] hover:scale-100" 
            : "bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 scale-100"
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          willChange: "transform, filter, box-shadow"
        }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/#home");
              }}
              className={`font-heading font-bold text-xl md:text-2xl text-primary motion-safe:transition-all motion-safe:duration-600 motion-safe:ease-in-out transform ${
                isScrolled ? "pt-1 scale-100" : "pt-2 scale-100"
              }`}
            >
              <img
                src="/images/CICF_LOGO.png"
                alt="CHRIST Consulting Logo"
                className={`object-cover motion-safe:transition-all motion-safe:duration-600 motion-safe:ease-in-out transform ${
                  isScrolled 
                    ? "max-h-[44px] w-auto scale-100" 
                    : "max-h-[50px] scale-100"
                }`}
                width={isScrolled ? 200 : 250}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`font-medium motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out transform hover:scale-105 ${
                  isScrolled 
                    ? "text-sm lg:text-base px-3 py-2 rounded-full hover:bg-white/60" 
                    : "text-base px-2 py-1"
                } ${
                  isLinkActive(link.href)
                    ? "text-royal-blue font-semibold"
                    : "text-charcoal-light hover:text-royal-blue"
                }`}
                style={{
                  transitionDelay: isScrolled ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className={`md:hidden p-2 rounded-full text-charcoal hover:text-royal-blue focus:outline-none motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out transform hover:scale-110 focus:scale-110 ${
              isScrolled ? "scale-90 hover:bg-white/60" : "scale-100"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <div className="transition-transform duration-300 ease-in-out">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed left-0 right-0 z-40 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          } ${
            isScrolled 
              ? "bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl mx-4 shadow-2xl"
              : "bg-white/95 backdrop-blur-md"
          }`}
          style={{ 
            top: `${menuTop}px`,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className={`px-6 py-8 ${isScrolled ? 'rounded-3xl' : ''}`}>
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-lg font-medium motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out px-4 py-3 rounded-2xl hover:bg-white/60 transform hover:scale-[1.02] ${
                    isLinkActive(link.href)
                      ? "text-royal-blue bg-white/70 font-semibold"
                      : "text-charcoal hover:text-royal-blue"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
            style={{ top: `${menuTop}px` }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;

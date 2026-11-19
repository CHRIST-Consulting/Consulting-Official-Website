import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LiquidGlass } from "./admin/LiquidGlass";
import { CICFLogo } from "./CICFLogo";

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
      <LiquidGlass 
        ref={containerRef}
        variant="light"
        active={isScrolled}
        className={`mx-auto motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out transform ${
          isScrolled
            ? "rounded-full px-6 py-2.5 sm:py-3 scale-[0.985] hover:scale-100" 
            : "bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 rounded-none scale-100"
        }`}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/#home");
              }}
              className={`flex items-center transition-all duration-300 ${
                isScrolled ? "py-0.5" : "py-1"
              }`}
            >
              <CICFLogo
                className={`w-auto transition-all duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] ${
                  isScrolled 
                    ? "h-8 sm:h-9 md:h-10" 
                    : "h-10 sm:h-11 md:h-12"
                }`}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link, index) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`font-medium motion-safe:transition-all motion-safe:duration-300 transform hover:scale-105 ${
                    isScrolled 
                      ? "text-sm lg:text-[15px] px-3.5 py-1.5 rounded-full" 
                      : "text-base px-2 py-1"
                  } ${
                    active
                      ? isScrolled
                        ? "text-royal-blue font-bold bg-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),_0_2px_8px_rgba(15,42,77,0.08)] border border-white/70"
                        : "text-royal-blue font-semibold"
                      : isScrolled
                        ? "text-slate-700 hover:text-royal-blue hover:bg-white/40"
                        : "text-charcoal-light hover:text-royal-blue"
                  }`}
                  style={{
                    transitionDelay: isScrolled ? `${index * 30}ms` : '0ms'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <button
            className={`md:hidden p-2 rounded-full text-charcoal hover:text-royal-blue focus:outline-none motion-safe:transition-all motion-safe:duration-300 transform hover:scale-105 ${
              isScrolled ? "scale-95 hover:bg-white/50 border border-transparent hover:border-white/60" : "scale-100"
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
      </LiquidGlass>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed left-0 right-0 z-40 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled 
            ? "mx-4 top-20"
            : "w-full top-[72px]"
        }`}
        style={{ 
          top: `${menuTop}px`,
        }}
      >
        {isScrolled ? (
          <LiquidGlass variant="light" className="rounded-3xl p-6">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-lg font-medium motion-safe:transition-all motion-safe:duration-300 px-4 py-3 rounded-2xl transform hover:scale-[1.02] ${
                    isLinkActive(link.href)
                      ? "text-royal-blue bg-white/70 font-bold shadow-sm border border-white/70"
                      : "text-slate-800 hover:text-royal-blue hover:bg-white/40"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </LiquidGlass>
        ) : (
          <div className="bg-white/95 backdrop-blur-md px-6 py-8 shadow-xl border-t border-slate-100">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-lg font-medium motion-safe:transition-all motion-safe:duration-300 px-4 py-3 rounded-2xl hover:bg-slate-100/60 transform hover:scale-[1.02] ${
                    isLinkActive(link.href)
                      ? "text-royal-blue bg-white font-semibold shadow-sm"
                      : "text-charcoal hover:text-royal-blue"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/25 backdrop-blur-xs z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: `${menuTop}px` }}
        />
      )}
    </header>
  );
};

export default Navbar;

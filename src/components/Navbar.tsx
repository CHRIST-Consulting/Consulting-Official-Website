import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

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
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/#home");
              }}
              className="font-heading font-bold text-xl md:text-2xl text-primary pt-2"
            >
              <img
                src="/images/CICF_LOGO.png"
                alt=""
                className="object-cover max-h-[50px]"
                width={250}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`font-medium transition-colors duration-300 ${
                  isLinkActive(link.href)
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-accent focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
          style={{ top: "72px" }}
        >
          <div className="px-4 py-6">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-xl font-medium transition-colors duration-300 ${
                    isLinkActive(link.href)
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

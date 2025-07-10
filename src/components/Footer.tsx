import React from "react";
import { Phone, Mail, MapPin, Linkedin, Instagram } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              CHRIST Incubation and Consultancy Foundation
            </h3>
            <p className="text-gray-300 mb-4">
              The business consultancy arm of CHRIST (Deemed to be University),
              bridging academia and industry through research-driven solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.linkedin.com/company/christ-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sky-blue transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                to="https://www.instagram.com/christ_consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sky-blue transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/#about");
                  }}
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/services");
                  }}
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/teams");
                  }}
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/#labs"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/#labs");
                  }}
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  Research Labs
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/#contact");
                  }}
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <Link
                  to="mailto:consultancy@christuniversity.in"
                  className="text-gray-300 hover:text-sky-blue transition-colors duration-300"
                >
                  consultancy@christuniversity.in
                </Link>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">080 4012 9958</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  CHRIST (Deemed to be University), Hosur Road, Bengaluru -
                  560029
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} CHRIST Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect } from "react";
import {
  Building2,
  BookOpen,
  Scale,
  GraduationCap,
  UtensilsCrossed,
  Home,
  Globe,
  Music,
  Leaf,
  ChevronRight,
} from "lucide-react";
import ScrollAnimation from "../components/ui/ScrollAnimation";

const ServicesPage = () => {
  const services = [
    {
      title: "Business Solutions",
      icon: <Building2 size={24} className="text-primary" />,
      image: "/images/services/business-solutions.jpg",
      description:
        "Comprehensive business consulting services tailored for modern enterprises. Our team combines academic expertise with practical insights to deliver strategic solutions across operations, finance, and organizational development. We help businesses optimize their processes, enhance efficiency, and drive sustainable growth through data-driven approaches and innovative methodologies.",
    },
    {
      title: "Commercial Management",
      icon: <BookOpen size={24} className="text-primary" />,
      image: "/images/services/commercial-management.jpg",
      description:
        "Expert commercial management services focusing on revenue optimization, contract management, and business development. We provide strategic guidance for commercial operations, helping organizations maximize their market potential while maintaining operational excellence. Our approach combines industry best practices with innovative strategies for sustainable commercial success.",
    },
    {
      title: "Legal Expertise and Compliance",
      icon: <Scale size={24} className="text-primary" />,
      image: "/images/services/legal-expertise.jpg",
      description:
        "Specialized legal consulting services ensuring compliance and risk management across business operations. Our team provides comprehensive guidance on regulatory requirements, corporate governance, and legal framework implementation. We help organizations navigate complex legal landscapes while maintaining operational efficiency.",
    },
    {
      title: "Education & Training",
      icon: <GraduationCap size={24} className="text-primary" />,
      image: "/images/services/education-training.jpg",
      description:
        "Customized education and training programs designed to enhance workforce capabilities and organizational learning. We develop comprehensive training solutions that combine theoretical knowledge with practical applications, ensuring lasting impact and measurable results in professional development.",
    },
    {
      title: "Hotel Management and Culinary Arts",
      icon: <UtensilsCrossed size={24} className="text-primary" />,
      image: "/images/services/hotel-culinary.jpg",
      description:
        "Expert consulting services for the hospitality industry, focusing on operational excellence and culinary innovation. Our team provides comprehensive guidance on hotel operations, food service management, and customer experience enhancement, helping businesses in the hospitality sector achieve and maintain world-class standards.",
    },
    {
      title: "Architectural Excellence",
      icon: <Home size={24} className="text-primary" />,
      image: "/images/services/architectural-excellence.jpg",
      description:
        "Professional architectural consulting services combining aesthetic excellence with functional design. We offer comprehensive solutions for architectural planning, sustainable design, and project management, ensuring that each project meets both creative and practical requirements while adhering to industry standards.",
    },
    {
      title: "Digital Transformation",
      icon: <Globe size={24} className="text-primary" />,
      image: "/images/services/digital-transformation.jpg",
      description:
        "Strategic digital transformation services helping organizations embrace technological innovation. Our team guides businesses through digital adoption, process automation, and technology integration, ensuring seamless transition and optimal utilization of digital solutions for enhanced operational efficiency.",
    },
    {
      title: "Performing Arts & Cultural Excellence",
      icon: <Music size={24} className="text-primary" />,
      image: "/images/services/performing-arts.jpg",
      description:
        "Specialized consulting services for performing arts organizations and cultural institutions. We provide expert guidance on program development, audience engagement, and artistic excellence, helping cultural organizations thrive while maintaining their creative integrity and cultural impact.",
    },
    {
      title: "Sustainability and Green Initiatives",
      icon: <Leaf size={24} className="text-primary" />,
      image: "/images/services/sustainability.jpg",
      description:
        "Comprehensive sustainability consulting services focusing on environmental responsibility and green business practices. Our team helps organizations develop and implement sustainable strategies, reducing environmental impact while maintaining operational efficiency and business growth.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-r from-primary to-primary-light overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
                Our Consulting <span className="text-accent">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Student-powered consulting solutions backed by academic
                excellence and industry expertise
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/services/hero-consulting-team.jpg"
                  alt="CHRIST Consulting Team"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      {service.icon}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">
                      {service.title}
                    </h3>
                    <p className="text-charcoal leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-primary mb-6 font-heading">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-charcoal mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can help you achieve your goals.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get Started
              <ChevronRight size={20} />
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;

import React from "react";
import {
  BarChart3,
  Monitor,
  BookOpen,
  FlaskConical,
  Leaf,
  TrendingUp,
} from "lucide-react"; // ✅ professional symbols

export default function Services(): JSX.Element {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "var(--ice-blue)" }}>
      <style>{`
        :root {
          --primary: #0f2a4d;      /* Navy blue */
          --royal-blue: #1e40af;   /* Royal blue */
          --steel-blue: #4682b4;   /* Steel blue */
          --accent: #fbbf24;       /* Yellow accent */
          --ice-blue: #f9fafb;     /* Light background */
          --charcoal: #222222;
          --charcoal-light: #4a5568;
          --white: #ffffff;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .services-title {
          position: relative;
          display: inline-block;
        }
        .services-title::after {
          content: "";
          position: absolute;
          width: 60%;
          height: 4px;
          background: var(--accent);
          left: 20%;
          bottom: -8px;
          border-radius: 2px;
        }

        .service-card {
          background: var(--white);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border-top: 4px solid transparent;
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
        }
        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-top: 4px solid var(--accent);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--royal-blue), var(--steel-blue));
          margin-bottom: 1rem;
          color: var(--white);
          font-size: 1.75rem;
          transition: transform 0.3s ease;
        }
        .service-card:hover .icon-circle {
          animation: bounceIcon 0.6s ease infinite;
        }
      `}</style>

      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="services-title text-4xl font-bold text-[var(--primary)] mb-16">
            Our Services
          </h3>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="service-card">
              <div className="icon-circle"><BarChart3 size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Business Strategy</h4>
              <p className="text-[var(--charcoal-light)]">
                Helping businesses define goals, streamline operations, and achieve growth with proven strategies.
              </p>
            </div>

            <div className="service-card">
              <div className="icon-circle"><Monitor size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Digital Transformation</h4>
              <p className="text-[var(--charcoal-light)]">
                Guiding companies through modern tech adoption, automation, and digital-first business models.
              </p>
            </div>

            <div className="service-card">
              <div className="icon-circle"><BookOpen size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Education & Training</h4>
              <p className="text-[var(--charcoal-light)]">
                Workshops, courses, and certifications designed to equip teams with future-ready skills.
              </p>
            </div>

            <div className="service-card">
              <div className="icon-circle"><FlaskConical size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Research & Development</h4>
              <p className="text-[var(--charcoal-light)]">
                Innovative R&D solutions to turn groundbreaking ideas into market-ready products and services.
              </p>
            </div>

            <div className="service-card">
              <div className="icon-circle"><Leaf size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Sustainability Consulting</h4>
              <p className="text-[var(--charcoal-light)]">
                Helping businesses adopt eco-friendly strategies and sustainable growth practices.
              </p>
            </div>

            <div className="service-card">
              <div className="icon-circle"><TrendingUp size={28} /></div>
              <h4 className="text-xl font-semibold text-[var(--primary)] mb-2">Commercial Management</h4>
              <p className="text-[var(--charcoal-light)]">
                Optimizing financial and operational performance for sustainable profitability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

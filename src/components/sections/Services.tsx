import React from "react";

export default function Services(): JSX.Element {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb" }}>
      <style>{`
        :root {
          --primary: #1e3a8a;   /* deep professional blue */
          --secondary: #334155; /* slate gray */
          --accent: #fbbf24;    /* golden yellow */
          --light-bg: #f9fafb;
          --white: #ffffff;
        }

        section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: auto;
        }

        h2 {
          font-size: 2.5rem;
          text-align: center;
          color: var(--primary);
          margin-bottom: 3rem;
          font-weight: 700;
        }

        .services-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .service-card {
          background: var(--white);
          border-radius: 1rem;
          border-top: 4px solid var(--accent);
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .service-card:nth-child(1) { animation-delay: 0.1s; }
        .service-card:nth-child(2) { animation-delay: 0.2s; }
        .service-card:nth-child(3) { animation-delay: 0.3s; }
        .service-card:nth-child(4) { animation-delay: 0.4s; }
        .service-card:nth-child(5) { animation-delay: 0.5s; }
        .service-card:nth-child(6) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 24px rgba(30, 58, 138, 0.2); /* blue glow */
        }

        .icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .icon-circle svg {
          width: 28px;
          height: 28px;
          stroke: var(--white);
          stroke-width: 2;
        }

        .service-card:hover .icon-circle {
          background: var(--accent);
          transform: scale(1.1);
        }

        .service-card:hover .icon-circle svg {
          stroke: var(--primary);
        }

        .service-card h3 {
          font-size: 1.25rem;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .service-card p {
          color: var(--secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>

      <section>
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon-circle">
              {/* Business Solutions (briefcase) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6V4h6v2m-9 0h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
              </svg>
            </div>
            <h3>Business Solutions</h3>
            <p>Helping businesses define goals, streamline operations, and achieve growth with proven strategies.</p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              {/* Digital Transformation (cloud + arrow) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a4 4 0 00-4 4H7a5 5 0 100 10h10a5 5 0 100-10h-1a4 4 0 00-4-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m0 0l3-3m-3 3l-3-3" />
              </svg>
            </div>
            <h3>Digital Transformation</h3>
            <p>Guiding companies through modern tech adoption, automation, and digital-first business models.</p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              {/* Education & Training (book) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5H5v14h2.5c1.746 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5H19v14h-2.5c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3>Education & Training</h3>
            <p>Workshops and certifications designed to equip teams with future-ready skills.</p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              {/* Research & Development (flask) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2m-9 6h12M5 21h14l-2-10H7l-2 10z" />
              </svg>
            </div>
            <h3>Research & Development</h3>
            <p>Turning groundbreaking ideas into market-ready products and services.</p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              {/* Sustainability Consulting (leaf) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 00-9.95 9h9.95V2zm0 0v9h9.95A10 10 0 0012 2zm0 20a10 10 0 01-9.95-9h19.9A10 10 0 0112 22z" />
              </svg>
            </div>
            <h3>Sustainability Consulting</h3>
            <p>Helping businesses adopt eco-friendly strategies and sustainable growth practices.</p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              {/* Commercial Management (bar chart) */}
              <svg fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h2v7H5v-7zm6-5h2v12h-2V7zm6 8h2v4h-2v-4z" />
              </svg>
            </div>
            <h3>Commercial Management</h3>
            <p>Optimizing financial and operational performance for long-term profitability.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

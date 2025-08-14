export default function Services(): JSX.Element {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: 'white' }}>
      <style>{`
        /* Fade-in effect */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .fade-in:nth-child(1) { animation-delay: 0.1s; }
        .fade-in:nth-child(2) { animation-delay: 0.2s; }
        .fade-in:nth-child(3) { animation-delay: 0.3s; }
        .fade-in:nth-child(4) { animation-delay: 0.4s; }
        .fade-in:nth-child(5) { animation-delay: 0.5s; }
        .fade-in:nth-child(6) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hover effects */
        .service-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .icon-circle:hover {
          transform: rotate(10deg) scale(1.1);
          transition: transform 0.3s ease;
        }

        .hover-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }
        .service-card:hover .hover-img {
          opacity: 1;
        }

        .service-content {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          padding: 2rem;
          height: 100%;
        }
      `}</style>

      <section id="services" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Our Services
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Service Card */}
            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <div
                  className="hover-img"
                  style={{ backgroundImage: "url('c:\\Users\\Arnima Guha\\OneDrive\\Desktop\\Consulting-Official-Website\\public\\images\\services\\business-solutions.jpg')" }}
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Business Solutions & Strategy</h4>
              <p className="text-gray-700">
                Helping businesses define goals, streamline operations, and achieve growth with proven strategies.
              </p>
            </div>

            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1 4v-4h-1m-1 0H7m0 4h.01M17 16h.01M9 20h6m2 0a2 2 0 002-2v-4a2 2 0 00-2-2h-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v4H5a2 2 0 00-2 2v4a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Digital Transformation</h4>
              <p className="text-gray-700">
                Guiding companies through modern tech adoption, automation, and digital-first business models.
              </p>
            </div>

            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5v-6l9 5 9-5v6l-9 5z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Education & Training</h4>
              <p className="text-gray-700">
                Workshops, courses, and certifications designed to equip teams with future-ready skills.
              </p>
            </div>

            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5V4H2v16h5m10-4l4 4m0 0l-4-4m4 4H6"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Research & Development</h4>
              <p className="text-gray-700">
                Innovative R&D solutions to turn groundbreaking ideas into market-ready products and services.
              </p>
            </div>

            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 16h10M5 12h14M12 20v-8"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Sustainability Consulting</h4>
              <p className="text-gray-700">
                Helping businesses adopt eco-friendly strategies and sustainable growth practices.
              </p>
            </div>

            <div className="service-card fade-in bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 transition-all duration-300">
              <div className="icon-circle flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-2">Commercial Management</h4>
              <p className="text-gray-700">
                Optimizing financial and operational performance for sustainable profitability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

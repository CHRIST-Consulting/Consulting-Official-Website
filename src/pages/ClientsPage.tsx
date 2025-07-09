import React, { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { ChevronRight } from "lucide-react";
import { clientClustersData } from "../data/ClientClustersData";

const ClientsPage = () => {
  const [activeCluster, setActiveCluster] = useState("core");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clusters = clientClustersData;

  const stats = [
    { value: "50+", label: "Active Clients" },
    { value: "200+", label: "Projects Completed" },
    { value: "15+", label: "Industry Sectors" },
    { value: "95%", label: "Client Retention" },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-[#002d72] to-[#0066cc] overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="section-container relative z-10">
          <ScrollAnimation>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
                Our Clients
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Trusted partners across sectors who have collaborated with
                CHRIST Consulting for transformational impact.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Client Clusters */}
      <section className="py-20">
        <div className="section-container">
          <ScrollAnimation>
            <div className="flex flex-wrap gap-4 mb-12">
              {clusters.map((cluster) => (
                <button
                  key={cluster.id}
                  onClick={() => setActiveCluster(cluster.id)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeCluster === cluster.id
                      ? "bg-[#0066cc] text-white"
                      : "bg-[#f0f8ff] text-[#002d72] hover:bg-[#0066cc]/10"
                  }`}
                >
                  <span className="mr-2">{cluster.icon}</span>
                  {cluster.title}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className={`transition-all duration-500 ${
                activeCluster === cluster.id ? "block" : "hidden"
              }`}
            >
              <ScrollAnimation>
                <p className="text-xl text-charcoal mb-8">
                  {cluster.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cluster.clients.map((client, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500"
                    >
                      <div className="h-24 flex items-center justify-center mb-6">
                        <img
                          src={client}
                          alt={`Client ${index + 1}`}
                          className="max-h-16 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#f0f8ff]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#002d72] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#4b5563]">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-[#002d72] mb-6">
              Become a CHRIST Consulting Partner
            </h2>
            <p className="text-xl text-[#4b5563] mb-8 max-w-2xl mx-auto">
              Explore how we can collaborate to drive lasting impact.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center px-8 py-3 bg-[#0066cc] text-white rounded-lg hover:bg-[#002d72] transition-colors duration-300"
            >
              Partner With Us
              <ChevronRight size={20} className="ml-2" />
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default ClientsPage;

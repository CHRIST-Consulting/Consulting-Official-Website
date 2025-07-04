import React, { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import {
  Users,
  FileSearch,
  Target,
  ChevronRight,
  Building2,
} from "lucide-react";

const ClientsPage = () => {
  const [activeCluster, setActiveCluster] = useState("core");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clusters = [
    {
      id: "core",
      title: "Core Consultancy",
      icon: <Target size={24} />,
      description:
        "Strategic consulting, software development, and innovation partners",
      clients: [
        {
          name: "Samsung",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
          sector: "Technology",
          engagement: "Digital Transformation Strategy",
        },
        {
          name: "Tata Steel",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Tata_logo.svg/1200px-Tata_logo.svg.png",
          sector: "Manufacturing",
          engagement: "Operational Excellence",
        },
        {
          name: "Toyota",
          logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
          sector: "Automotive",
          engagement: "Supply Chain Optimization",
        },
      ],
    },
    {
      id: "training",
      title: "Training & Development",
      icon: <Users size={24} />,
      description:
        "Partners in leadership development and organizational learning",
      clients: [
        {
          name: "Infosys",
          logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
          sector: "IT Services",
          engagement: "Leadership Development Program",
        },
        {
          name: "Deloitte",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/1200px-Deloitte.svg.png",
          sector: "Consulting",
          engagement: "Graduate Training Program",
        },
        {
          name: "Wipro",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png",
          sector: "Technology",
          engagement: "Digital Skills Enhancement",
        },
      ],
    },
    {
      id: "research",
      title: "Research Consultancy",
      icon: <FileSearch size={24} />,
      description:
        "Research partnerships and data-driven consulting engagements",
      clients: [
        {
          name: "Indian Institute of Science",
          logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IISc_logo.svg/1200px-IISc_logo.svg.png",
          sector: "Research",
          engagement: "Collaborative Research",
        },
        {
          name: "ISRO",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Indian_Space_Research_Organisation_Logo.svg/1200px-Indian_Space_Research_Organisation_Logo.svg.png",
          sector: "Space Research",
          engagement: "Technology Transfer",
        },
        {
          name: "Ministry of Science",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png",
          sector: "Government",
          engagement: "Policy Research",
        },
      ],
    },
    {
      id: "government",
      title: "Government Projects/Social Work",
      icon: <Building2 size={24} />,
      description:
        "Collaborations with government bodies and NGOs for social impact and public sector transformation",
      clients: [
        {
          name: "Ministry of Education",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png",
          sector: "Government",
          engagement: "National Education Policy Implementation",
        },
        {
          name: "UNICEF",
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/UNICEF_Logo.png",
          sector: "NGO",
          engagement: "Child Welfare Initiatives",
        },
        {
          name: "Swachh Bharat Mission",
          logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Swachh_Bharat_Mission_Logo.png",
          sector: "Government",
          engagement: "Sanitation Awareness Campaigns",
        },
      ],
    },
  ];

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
                          src={client.logo}
                          alt={client.name}
                          className="max-h-16 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#002d72] mb-2">
                        {client.name}
                      </h3>
                      <p className="text-[#4b5563] mb-2">{client.sector}</p>
                      <p className="text-sm text-[#4b5563]">
                        {client.engagement}
                      </p>
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
              href="/contact"
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

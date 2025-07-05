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
        "/images/clients/core-consultancy/client1.jpg",
        "/images/clients/core-consultancy/client2.jpg",
        "/images/clients/core-consultancy/testpan-india.png",
        "/images/clients/core-consultancy/client4.jpg",
        "/images/clients/core-consultancy/skoolz.png",
        "/images/clients/core-consultancy/client6.jpg",
        "/images/clients/core-consultancy/client7.jpg",
      ],
    },
    {
      id: "training",
      title: "Training & Development",
      icon: <Users size={24} />,
      description:
        "Partners in leadership development and organizational learning",
      clients: [
        "https://c.ndtvimg.com/2025-01/t7f4o1kg_tvs_625x300_17_January_25.jpg?im=FaceCrop,algorithm=dnn,width=545,height=307",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "https://media.licdn.com/dms/image/v2/D560BAQHxJyAxHZaGSA/company-logo_200_200/company-logo_200_200/0/1720464895560?e=2147483647&v=beta&t=7RpQdY0hP0UGXiy5vnGWAVfBb1Gr8ouJXEN9zGgc03w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGzGc_hB5EtDwgx3wlESjIUCP5tbE_xms2w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAQ6D0-QJZJyCmBTwmEFWMvDjCBuhcbJbq1Q&s",
      ],
    },
    {
      id: "research",
      title: "Research Consultancy",
      icon: <FileSearch size={24} />,
      description:
        "Research partnerships and data-driven consulting engagements",
      clients: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwiG_zComoVpi_YXgjmMixJ028Y-lTdifTw&s",
        "https://media.licdn.com/dms/image/v2/C4D0BAQGgpMQjgqEjSg/company-logo_200_200/company-logo_200_200/0/1653633169164?e=2147483647&v=beta&t=d69l5qYk49hoOulVVfp1GWJxu02Igvf139XFNs1RCMI",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhYIOBKHVPAX-45vU5KYJjyOcCjlcJ_Gwyg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTKw126m7PlZDHmn3_yrLzPY1n-C7lykRNcQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0v_Jq-AvPE8R-1MFtepbjG3rttIVHVW00-g&s",
        "https://media.licdn.com/dms/image/v2/D560BAQF_ME8AjzO4ZA/company-logo_200_200/company-logo_200_200/0/1727760583753/zopnote_logo?e=2147483647&v=beta&t=EKCtf1BOCuDCYMg2zAlId8qE0PLtFjCAIxktpKQpYKI",
      ],
    },
    {
      id: "government",
      title: "Government Projects/Social Work",
      icon: <Building2 size={24} />,
      description:
        "Collaborations with government bodies and NGOs for social impact and public sector transformation",
      clients: [
        "https://upload.wikimedia.org/wikipedia/en/f/fc/Bangalore_City_Police_Logo.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Bureau_of_Police_Research_and_Development_Logo.png/250px-Bureau_of_Police_Research_and_Development_Logo.png",
        "https://www.scconline.com/blog/wp-content/uploads/2020/08/MHRD-678x325-1.jpg",
        "https://static.ambitionbox.com/alpha/company/photos/logos/labournet-services.jpg",
        "https://www.logopeople.in/wp-content/uploads/2023/08/Nandini-logo.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Indian_Council_of_Medical_Research_Logo.svg/1200px-Indian_Council_of_Medical_Research_Logo.svg.png",
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

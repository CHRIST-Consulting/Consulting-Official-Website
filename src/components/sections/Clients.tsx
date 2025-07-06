import React from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { Star } from "lucide-react";

const Clients = () => {
  const clientLogos = [
    {
      name: "Bangalore Police",
      logo: "/images/clients/government-social/bangalore-police.png",
    },
    {
      name: "BPRD",
      logo: "/images/clients/government-social/bprd.png",
    },
    {
      name: "ICMR",
      logo: "/images/clients/government-social/icmr.png",
    },
    {
      name: "MHRD",
      logo: "/images/clients/government-social/mhrd.jpg",
    },
    {
      name: "Nandini",
      logo: "/images/clients/government-social/nandini.jpg",
    },
    {
      name: "TVS",
      logo: "/images/clients/training-development/tvs.jpg",
    },
  ];

  const testimonials = [
    {
      quote:
        "CHRIST Consulting's expertise in educational technology and strategic planning has been instrumental in transforming our digital learning initiatives. Their research-backed approach delivered measurable improvements in student engagement.",
      author: "Dr. Rajesh Kumar",
      position: "Director of Innovation, Skoolz Education",
      rating: 5,
    },
    {
      quote:
        "The consultancy team provided exceptional support in modernizing our administrative processes and implementing data-driven decision making frameworks. Their professionalism and expertise exceeded our expectations.",
      author: "Commissioner Priya Sharma",
      position: "Bangalore Police Department",
      rating: 5,
    },
    {
      quote:
        "Working with CHRIST Consulting has been transformative for our research initiatives. Their multi-disciplinary approach and academic rigor helped us develop innovative solutions for complex healthcare challenges.",
      author: "Dr. Anil Patel",
      position: "Senior Research Director, ICMR",
      rating: 5,
    },
  ];

  return (
    <section id="clients" className="py-20 bg-secondary">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle
            title="Trusted by Industry Leaders"
            subtitle="Partnering with leading organizations across diverse sectors"
            centered={true}
          />
        </ScrollAnimation>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {clientLogos.map((client, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-20">
          <ScrollAnimation>
            <h3 className="text-2xl font-bold text-primary text-center mb-10 font-heading">
              What Our Clients Say
            </h3>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 200}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>

                  <blockquote className="text-charcoal italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>

                  <div>
                    <p className="font-bold text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

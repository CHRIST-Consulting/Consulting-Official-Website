import React from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { clientLogosData, testimonialsData } from "../../data/ClientsData";
import { motion } from "framer-motion";

// Utility: Duplicate logos array for seamless infinite loop
const getSeamlessLogos = (arr) => [...arr, ...arr];

const LOGO_SIZE = 128; // w-32/h-32 in px
const GAP = 48; // gap-12 in px
const clientLogos = clientLogosData;
const testimonials = testimonialsData;

const Clients = () => {
  const splitIdx = Math.ceil(clientLogos.length / 2);
  const topSet = clientLogos.slice(0, splitIdx);
  const btmSet = clientLogos.slice(splitIdx);

  // Duplicate for infinite loop
  const logosTop = getSeamlessLogos(topSet);
  const logosBottom = getSeamlessLogos(btmSet);

  // Distance for one set (so loop is always seamless)
  const slideDistanceTop = (LOGO_SIZE + GAP) * topSet.length;
  const slideDistanceBottom = (LOGO_SIZE + GAP) * btmSet.length;

  return (
    <div className="bg-gradient-to-br from-[#eef6fa] via-[#dbeaf3] to-[#b7d6e7] w-full min-h-screen flex flex-col items-center pb-24 overflow-x-hidden">
      
      {/* Floating blurred shapes for energy */}
      <div className="absolute top-32 left-12 w-48 h-48 rounded-full bg-blue-200 opacity-30 blur-2xl pointer-events-none"></div>
      <div className="absolute top-[50%] right-32 w-40 h-40 rounded-full bg-indigo-100 blur-2xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 w-32 h-32 rounded-full bg-[#b7d6e7] opacity-30 blur-2xl pointer-events-none"></div>

      {/* Logos Section */}
      <section className="w-full flex flex-col items-center py-20 z-20">
        <div className="max-w-6xl w-full mx-auto">
          {/* Animated heading */}
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, type: "spring" }}
            className="text-[2.7rem] md:text-5xl font-black text-center mb-4"
            style={{ color: "#162944" }}
          >
            Hall of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-center mb-10 text-blue-900 font-medium"
          >
            Celebrating our Remarkable Partners and their trust in our Journey of Impact
          </motion.p>
          
          {/* Two animated sliding rows, 100% seamless */}
          <div className="relative mt-12 rounded-3xl shadow-2xl p-8 bg-[#dbeaf3] bg-opacity-90">
            {/* Subtle gradient overlay for visual layering */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-[#dbeaf3]/80 pointer-events-none"></div>
            {/* Top row: slides left */}
            <div className="overflow-hidden whitespace-nowrap mb-8 relative">
              <motion.div
                className="flex gap-12"
                animate={{ x: [0, -slideDistanceTop] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 16,
                  ease: "linear"
                }}
                style={{ minWidth: "fit-content" }}
              >
                {logosTop.map((client, index) => (
                  <div
                    key={`top-${index}`}
                    className="flex items-center justify-center w-32 h-32 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-20 h-20 object-contain filter drop-shadow"
                      style={{ filter: "drop-shadow(0 4px 8px rgba(46,61,74,0.09))" }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Bottom row: slides right */}
            <div className="overflow-hidden whitespace-nowrap relative">
              <motion.div
                className="flex gap-12"
                animate={{ x: [0, slideDistanceBottom] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 16,
                  ease: "linear"
                }}
                style={{ minWidth: "fit-content" }}
              >
                {logosBottom.map((client, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="flex items-center justify-center w-32 h-32 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-20 h-20 object-contain filter drop-shadow"
                      style={{ filter: "drop-shadow(0 4px 8px rgba(46,61,74,0.09))" }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 mt-[-3rem] flex flex-col items-center relative z-10">
        {/* Modern background block */}
        <div
          className="absolute left-1/2 top-16 -translate-x-1/2 w-[93vw] md:w-[78vw] h-[65vw] md:h-[38vw] rounded-3xl blur-[1.5px] scale-95 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #eef6fa 50%, #c7e0ed 100%)",
            opacity: 0.95,
            zIndex: 0
          }}
        ></div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 font-heading tracking-tight text-[#162944] drop-shadow">
              Stories of Partnership & Results
            </h2>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 items-stretch"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative bg-white rounded-2xl shadow-xl px-10 py-10 flex flex-col h-full min-h-[350px] items-center justify-between border border-blue-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-5 left-8 text-[3rem] text-blue-300 opacity-20 pointer-events-none">&ldquo;</span>
                <blockquote className="relative text-gray-700 italic mb-8 text-center font-medium z-10 drop-shadow">
                  {testimonial.quote}
                </blockquote>
                <div className="w-full text-center z-10 mt-4">
                  <span className="font-bold text-[#162944] text-lg">{testimonial.author}</span>
                  {testimonial.position && (
                    <div className="text-blue-600 text-sm mt-2 font-medium">{testimonial.position}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>                        
  );
};

export default Clients;

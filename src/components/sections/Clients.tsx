import React from "react";
import { motion } from "framer-motion";
import { clientLogosData, testimonialsData } from "../../data/ClientsData";

// Helpers for infinite marquee
const getSeamlessLogos = (arr) => [...arr, ...arr, ...arr, ...arr];
const LOGO_SIZE = 128;
const GAP = 48;
const logosRow = getSeamlessLogos(clientLogosData);
const slideDistance = (LOGO_SIZE + GAP) * clientLogosData.length;

const getAvatar = (author) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    author
  )}&background=dae6f3&color=283c54&rounded=true&format=svg`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.07,
      zIndex: 40,
      boxShadow: "0 12px 36px rgba(30,58,138,0.13)",
    }}
    transition={{ type: "spring", stiffness: 235, damping: 22 }}
    className={`group relative cursor-pointer bg-white border border-gray-200 shadow-lg rounded-2xl flex items-center w-full md:w-[320px] max-w-[360px] min-h-[74px] px-5 py-3 transition-all duration-300`}
    style={{ minWidth: 180 }}
  >
    <img
      src={getAvatar(testimonial.author)}
      alt={testimonial.author}
      className="w-10 h-10 min-w-[40px] rounded-full border border-blue-200 object-cover shadow"
    />
    <div className="ml-3 flex-1">
      <div className="font-semibold text-[#162944] text-sm leading-tight">
        {testimonial.author}
      </div>
      <div className="text-blue-700 text-xs">{testimonial.position}</div>
    </div>
    <div className="hidden group-hover:flex flex-col items-center justify-center z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-6 bg-white rounded-2xl shadow-xl ring-2 ring-yellow-300/60 w-[92vw] max-w-sm">
      <img
        src={getAvatar(testimonial.author)}
        alt={testimonial.author}
        className="w-10 h-10 rounded-full mb-2 border border-blue-200 object-cover shadow"
      />
      <div className="font-semibold text-[#162944] text-base mb-1 text-center">
        {testimonial.author}
      </div>
      <div className="text-blue-700 text-xs mb-2 text-center">
        {testimonial.position}
      </div>
      <blockquote className="italic text-gray-700 text-sm leading-snug text-center">
        {testimonial.quote}
      </blockquote>
    </div>
  </motion.div>
);

const Clients = () => (
  <div className="relative bg-gradient-to-br from-[#EEF6FA] via-[#DBEAF3] to-[#B7D6E7] w-full min-h-screen flex flex-col items-center pb-24 overflow-x-hidden">
    {/* Decorative shapes */}
    <div className="absolute top-32 left-12 w-40 h-40 rounded-full bg-blue-200 opacity-30 blur-2xl pointer-events-none"></div>
    <div className="absolute top-[54%] right-28 w-32 h-32 rounded-full bg-yellow-200 blur-2xl opacity-40 pointer-events-none"></div>
    <div className="absolute top-0 left-1/2 w-24 h-24 rounded-full bg-[#FFB400] opacity-20 blur-2xl pointer-events-none"></div>

    {/* Logos Marquee Section */}
    <section className="w-full flex flex-col items-center py-10 z-20">
      <div className="max-w-7xl w-[90vw] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-2xl md:text-4xl font-black text-center mb-3"
          style={{ color: "#162944" }}
        >
          Hall of Excellence
        </motion.h2>
        <div className="w-20 h-1 bg-[#FFB400] mx-auto mb-2 rounded-full"></div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-base md:text-lg text-center mb-2 text-blue-900 font-medium"
        >
          Celebrating our Remarkable Partners and their trust in our Journey of Impact
        </motion.p>
        <div className="relative mt-2 rounded-3xl shadow-xl bg-white">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-[#EEF6FA]/80 pointer-events-none"></div>
          <div className="overflow-hidden relative w-full py-6">
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: [0, -slideDistance] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 18,
                ease: "linear",
              }}
              style={{ minWidth: "fit-content" }}
            >
              {logosRow.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md border border-gray-100 hover:ring-2 hover:ring-yellow-400 transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="w-full flex flex-col items-center py-7 z-20">
      <div className="max-w-7xl w-[90vw] mx-auto">
        {/* Opening quote mark */}
        <div className="flex justify-center mb-1 -mt-5">
          <span className="text-5xl text-yellow-400 opacity-60">“</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-2xl md:text-4xl font-black text-center mb-2"
          style={{ color: "#162944" }}
        >
          Stories of Partnership & Results
        </motion.h2>
        <div className="w-20 h-1 bg-[#FFB400] mx-auto mb-2 rounded-full"></div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-base md:text-lg text-center mb-3 text-blue-900 font-medium"
        >
          Real voices from our trusted collaborators sharing their impactful journey with us
        </motion.p>
        <motion.div
          className="relative mt-2 rounded-3xl shadow-xl bg-white flex justify-center items-center py-6 px-6"
          style={{ background: "linear-gradient(90deg, #f6fbff 0%, #f9fbfc 100%)" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-[#EEF6FA]/70 pointer-events-none"></div>
          <div className="relative z-10 flex flex-row justify-center items-stretch gap-8 w-full">
            {testimonialsData.slice(0, 3).map((testimonial, i) => (
              <TestimonialCard testimonial={testimonial} key={i} />
            ))}
          </div>
        </motion.div>
        {/* Closing quote mark */}
        <div className="flex justify-center mt-1">
          <span className="text-5xl text-yellow-400 opacity-60">”</span>
        </div>
      </div>
    </section>
  </div>
);

export default Clients;

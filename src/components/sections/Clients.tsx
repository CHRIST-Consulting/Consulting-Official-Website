import React from "react";
import { motion } from "framer-motion";
import { clientLogosData, testimonialsData } from "../../data/ClientsData";

// Helpers for infinite marquee (unchanged)
const getSeamlessLogos = (arr) => [...arr, ...arr, ...arr, ...arr];
const LOGO_SIZE = 128;
const GAP = 48;
const logosRow = getSeamlessLogos(clientLogosData);
const slideDistance = (LOGO_SIZE + GAP) * clientLogosData.length;

const getAvatar = (author) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    author
  )}&background=f9fafb&color=283c54&rounded=true&format=svg`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
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
    className="relative bg-white border border-gray-200 rounded-2xl flex flex-col items-center w-full md:w-[320px] max-w-[360px] min-h-[440px] pt-8 px-8 pb-2 transition-all duration-300 hover:border-yellow-400 shadow-lg"
  >
    <div className="flex flex-col items-center">
      <div className="bg-blue-100 w-20 h-20 flex items-center justify-center rounded-full border-2 border-blue-200 shadow-md -mt-12 mb-4">
        <img
          src={getAvatar(testimonial.author)}
          alt={testimonial.author}
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>
      <div className="font-bold text-lg text-[#162944] text-center mb-1 border-b-2 border-blue-100 pb-1 w-full">
        {testimonial.author}
      </div>
      <div className="text-blue-700 text-xs text-center mb-4">
        {testimonial.position}
      </div>
    </div>
    {/* Testimonial content centered vertically and horizontally */}
    <div className="flex-1 flex items-center justify-center">
      <blockquote className="italic text-blue-900 text-[1rem] leading-snug text-center px-1">
        {testimonial.quote}
      </blockquote>
    </div>
  </motion.div>
);

const Clients = () => (
  <div className="relative bg-gradient-to-br from-[#EEF6FA] via-[#DBEAF3] to-[#B7D6E7] w-full min-h-screen flex flex-col items-center pb-24 overflow-x-hidden">
    {/* Decorative shapes for subtle effect */}
    <div className="absolute top-28 left-10 w-36 h-36 rounded-full bg-blue-200 opacity-20 blur-3xl pointer-events-none"></div>
    <div className="absolute top-[60%] right-20 w-24 h-24 rounded-full bg-yellow-100 blur-2xl opacity-30 pointer-events-none"></div>
    <div className="absolute top-0 left-1/2 w-24 h-24 rounded-full bg-yellow-300 opacity-20 blur-xl pointer-events-none"></div>

    {/* Logos Marquee Section - unchanged */}
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
          className="text-base md:text-lg text-center mb-3 text-blue-900 font-medium"
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
    <section className="w-full flex flex-col items-center py-10 z-20">
      <div className="max-w-7xl w-[90vw] mx-auto">
        {/* Opening quote mark */}
        <div className="flex justify-center mt-4 mb-2">
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
          Real Voices from Our Trusted Collaborators Sharing Their Impactful Journey with us
        </motion.p>
        <motion.div
          className="relative mt-2 rounded-3xl shadow-xl bg-white/80 flex justify-center items-end py-8 px-6"
          style={{ background: "linear-gradient(90deg, #f6fbff 0%, #f9fbfc 100%)" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-[#EEF6FA]/90 pointer-events-none"></div>
          {/* Flexbox row for testimonials, align to bottom */}
          <div className="relative z-10 flex flex-row justify-center items-end gap-8 w-full">
            {testimonialsData.slice(0, 3).map((testimonial, i) => (
              <TestimonialCard testimonial={testimonial} key={i} />
            ))}
          </div>
        </motion.div>
        {/* Closing quote mark */}
        <div className="flex justify-center mt-2 mb-8">
          <span className="text-5xl text-yellow-400 opacity-60">”</span>
        </div>
      </div>
    </section>
  </div>
);

export default Clients;

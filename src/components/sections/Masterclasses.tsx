import { CalendarDays, CalendarX, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { upcomingEvents, pastEvents } from "../../data/EventsData";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const EventsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.9"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const hasUpcomingEvents = upcomingEvents.length > 0;
  const hasPastEvents = pastEvents.length > 0;

  const events = [
    ...(hasUpcomingEvents ? upcomingEvents.slice(0, 3) : []),
    ...(hasPastEvents ? pastEvents.slice(0, 3) : []),
  ];

  return (
    <section
      id="events"
      className="py-24 bg-ice-blue relative overflow-hidden"
      ref={containerRef}
    >
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-4">
            Our Events
          </h2>
          <p className="text-charcoal-light text-lg">
            Explore our upcoming and past milestones
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-1 bg-royal-blue origin-top"
          ></motion.div>

          <div className="space-y-20">
            {events.length > 0 ? (
              events.map((event, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={i}
                  className={`relative md:flex md:items-center md:gap-25 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Date beside the line */}
                  <div
                    className={`hidden md:flex md:w-5/12 text-xl font-bold text-primary-dark ${
                      i % 2 === 0
                        ? "justify-end mr-6 text-right"
                        : "justify-start ml-6 text-left"
                    }`}
                  >
                    {event.date}
                  </div>

                  {/* Event Card */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white shadow-md rounded-lg p-6 md:w-5/12 hover:shadow-xl transition"
                  >
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="text-lg font-bold text-primary mb-2">
                      {event.title}
                    </h4>
                    <a
                      href={
                        i < upcomingEvents.length ? "/events" : `/events/${event.id}`
                      }
                      className="text-royal-blue text-sm font-semibold hover:text-amber-500"
                    >
                      {i < upcomingEvents.length ? "Learn More →" : "View Recap →"}
                    </a>
                  </motion.div>

                  {/* Date for mobile */}
                  <div className="md:hidden text-primary-dark text-base font-semibold mt-4 text-center">
                    {event.date}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <CalendarX size={40} className="mx-auto mb-4 text-primary" />
                <p className="text-charcoal-light">No events available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

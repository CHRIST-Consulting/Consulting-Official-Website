import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { CalendarDays, ChevronRight, CalendarX } from "lucide-react";
import { upcomingEvents, pastEvents } from "../../data/EventsData";

const EventsSection = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);

  // LOGIC: 
  // If showUpcoming is true -> Show NASA, ConneXion, Prospero + Inauguration
  // If showUpcoming is false -> Show Toyota
  const eventsToShow = showUpcoming 
    ? [...upcomingEvents.filter(e => e.category === "past events"), ...pastEvents]
    : upcomingEvents.filter(e => e.category === "industry connects");

  const displayedEvents = eventsToShow.slice(0, 4); // Increased to 4 to show all past events
  const hasEvents = eventsToShow.length > 0;

  return (
    <section id="events" className="py-20">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle
            title={showUpcoming ? "Past Events" : "Industry Connects"}
            subtitle={
              showUpcoming
                ? "Join our transformative learning experiences"
                : "Join the network that moves the world."
            }
            centered={true}
          />
        </ScrollAnimation>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-secondary rounded-full p-1">
            <button
              onClick={() => setShowUpcoming(true)}
              className={`px-6 py-2 rounded-full transition-all ${
                showUpcoming
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary/10"
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              className={`px-6 py-2 rounded-full transition-all ${
                !showUpcoming
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary/10"
              }`}
            >
              Industry Connects
            </button>
          </div>
        </div>

        {hasEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {eventsToShow.map((event, index) => (
              <ScrollAnimation key={event.id} delay={index * 150}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold py-1 px-2 rounded">
                      {"category" in event ? event.category : "past events"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-4">
                      <CalendarDays size={16} className="mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>

                    <p className="text-charcoal mb-4 flex-grow text-sm">
                      {showUpcoming
                        ? "A look back at our successful event with valuable insights and networking."
                        : "Join us for this exciting industry collaboration featuring experts and hands-on learning."}
                    </p>

                    <a
                      href={`/events/${event.id}`}
                      className="text-primary font-medium flex items-center hover:text-accent transition-colors duration-300 mt-auto"
                    >
                      View Recap
                      <ChevronRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <ScrollAnimation>
            <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <CalendarX size={48} className="text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                No Events Available
              </h3>
              <p className="text-charcoal mb-6">
                Check back soon for updates in this category.
              </p>
            </div>
          </ScrollAnimation>
        )}

        <div className="mt-12 text-center">
          <ScrollAnimation>
            <a href="/events" className="btn-primary">
              View All {showUpcoming ? "Past Events" : "Industry Connects"}
            </a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
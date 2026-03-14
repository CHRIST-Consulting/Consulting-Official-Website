import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Award,
  Building2,
  Clock,
  MapPin,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import SectionTitle from "../components/ui/SectionTitle";
import {
  categories,
  featuredEvent,
  pastEvents,
  upcomingEvents,
} from "../data/EventsData";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: Calendar, value: "50+", label: "Events Hosted" },
    { icon: Users, value: "3000+", label: "Participants" },
    { icon: Building2, value: "15+", label: "Industry Partners" },
    { icon: Award, value: "25", label: "Guest Speakers" },
  ];

  // Combine both arrays to ensure "All" includes Investiture (from pastEvents) 
  // and Toyota (from upcomingEvents)
  const allEvents = [...upcomingEvents, ...pastEvents];

  const filteredEvents =
    activeFilter === "all"
      ? allEvents
      : allEvents.filter((event) => event.category === activeFilter);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-[#0d3463] to-[#154b8d] overflow-hidden">
        {/* Subtle overlay to add depth like the original image */}
        <div className="absolute inset-0 bg-black/5"></div>
  
        <div className="section-container relative z-10 py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-heading text-white">
                <span className="text-[#6bb5ff]">Experience</span> the Momentum
              </h1>
              <p className="text-xl text-blue-50/90 mb-8 max-w-lg">
                Stay updated with academic events, corporate interactions, and
                exclusive expert sessions curated by CHRIST Consulting.
              </p>
              <a
                href="#upcoming"
                className="inline-block px-8 py-3 rounded-md font-semibold transition-all bg-[#0d1b31] text-white border border-white/10 hover:bg-white hover:text-[#0d3463]"
              >
                View All Events
              </a>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      
      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-20 bg-secondary">
          <div className="section-container">
            <ScrollAnimation>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12">
                    <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                      Featured Event
                    </span>
                    <h2 className="text-3xl font-bold text-primary mb-4 font-heading">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-charcoal mb-6 line-clamp-2">
                      {featuredEvent.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-gray-600">
                        <CalendarDays size={20} className="mr-3" />
                        <span>
                          {featuredEvent.date} • {featuredEvent.time}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={20} className="mr-3" />
                        <span>{featuredEvent.venue}</span>
                      </div>
                    </div>

                    {featuredEvent.isUpcoming && (
                      <button className="btn-primary">Register Now</button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Event Categories & Upcoming Events */}
      <section id="upcoming" className="py-20">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle
              title="Our Events"
              subtitle="Join us for these transformative learning experiences"
              centered={true}
            />

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-primary text-white"
                      : "bg-secondary text-primary hover:bg-primary/10"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                      {event.category ? (event.category.charAt(0).toUpperCase() + event.category.slice(1)) : "Event"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">
                      {event.title}
                    </h3>
                    <p className="text-charcoal mb-4">{event.speaker || "Guest Speakers"}</p>

                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2" />
                        <span>{event.date}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center text-gray-600">
                          <Clock size={18} className="mr-2" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>

                    {/* UPDATED LINK LOGIC HERE */}
                    <Link 
                      to={`/events/${event.id}`} 
                      className="w-full btn-primary flex items-center justify-center mt-auto"
                    >
                      View Recap
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <stat.icon size={32} className="text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-charcoal">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;

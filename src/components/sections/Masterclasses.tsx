import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollAnimation from '../ui/ScrollAnimation';
import { CalendarDays, ChevronRight, CalendarX } from 'lucide-react';

const EventsSection = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);

  // Example data - in a real app this would come from an API
  const upcomingEvents = []; // Empty array for demonstration
  const pastEvents = [
    {
      title: "Innovation Summit 2024",
      date: "November 15-16, 2024",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      category: "Conference",
      link: "/events"
    },
    {
      title: "Data Science Workshop",
      date: "October 10, 2024",
      image: "https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg",
      category: "Workshop",
      link: "/events"
    },
    {
      title: "Leadership Conference",
      date: "September 5, 2024",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      category: "Conference",
      link: "/events"
    }
  ];

  const hasUpcomingEvents = upcomingEvents.length > 0;
  const hasPastEvents = pastEvents.length > 0;
  const eventsToShow = showUpcoming ? upcomingEvents : pastEvents;
  const displayedEvents = eventsToShow.slice(0, 3);

  return (
    <section id="events" className="py-20">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle 
            title={showUpcoming ? "Upcoming Events" : "Past Events"} 
            subtitle={showUpcoming 
              ? "Join our transformative learning experiences" 
              : "Relive our past successful events"}
            centered={true}
          />
        </ScrollAnimation>

        {(hasUpcomingEvents || hasPastEvents) && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-secondary rounded-full p-1">
              <button
                onClick={() => setShowUpcoming(true)}
                className={`px-6 py-2 rounded-full transition-all ${showUpcoming ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setShowUpcoming(false)}
                className={`px-6 py-2 rounded-full transition-all ${!showUpcoming ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'}`}
              >
                Past Events
              </button>
            </div>
          </div>
        )}
        
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {displayedEvents.map((event, index) => (
              <ScrollAnimation key={index} delay={index * 150}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-primary text-xs font-bold py-1 px-2 rounded">
                      {event.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <CalendarDays size={16} className="mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    
                    <p className="text-charcoal mb-4 flex-grow">
                      {showUpcoming 
                        ? "Join us for this exciting event featuring industry experts and hands-on learning."
                        : "A look back at our successful event with valuable insights and networking."}
                    </p>
                    
                    <a 
                      href={event.link} 
                      className="text-primary font-medium flex items-center hover:text-accent transition-colors duration-300 mt-auto"
                    >
                      {showUpcoming ? "Learn More" : "View Recap"} 
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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
                {showUpcoming ? "No Upcoming Events Scheduled" : "No Past Events Available"}
              </h3>
              <p className="text-charcoal mb-6">
                {showUpcoming 
                  ? "We're currently planning our next events. Check back soon or subscribe to our newsletter for updates!"
                  : "Our event history will be available here soon."}
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors duration-300"
              >
                {showUpcoming ? "Get Notified About Future Events" : "Contact Us For More Information"}
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </ScrollAnimation>
        )}
        
        {hasPastEvents && (
          <div className="mt-12 text-center">
            <ScrollAnimation>
              <a href="/events" className="btn-primary">
                View All {showUpcoming ? "Events" : "Past Events"}
              </a>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;

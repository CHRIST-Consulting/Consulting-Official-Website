import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, Building2, Clock, MapPin, ChevronRight, CalendarDays } from 'lucide-react';
import ScrollAnimation from '../components/ui/ScrollAnimation';
import SectionTitle from '../components/ui/SectionTitle';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'talks', name: 'Industry Talks' },
    { id: 'recruitment', name: 'Recruitment Drives' }
  ];

  const featuredEvent = {
    title: "Future of Work Summit 2025",
    speaker: "Dr. Sarah Matthews & Industry Leaders",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "CHRIST Central Campus, Bangalore",
    description: "Join us for a transformative summit exploring the intersection of technology, workplace culture, and human potential.",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
  };

  const upcomingEvents = [
    {
      title: "AI in Business Workshop",
      date: "April 5, 2025",
      time: "10:00 AM",
      speaker: "Prof. Michael Chen",
      venue: "Online",
      category: "workshops",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
    },
    {
      title: "Leadership Symposium",
      date: "April 12, 2025",
      time: "2:00 PM",
      speaker: "Industry Panel",
      venue: "Bannerghatta Campus",
      category: "talks",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    },
    {
      title: "Tech Talent Fair",
      date: "April 20, 2025",
      time: "9:00 AM",
      speaker: "Multiple Companies",
      venue: "Central Campus",
      category: "recruitment",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    }
  ];

  const pastEvents = [
    {
      title: "Innovation Summit 2024",
      impact: "500+ Attendees, 20 Speakers",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
    },
    {
      title: "Data Science Workshop",
      impact: "200+ Participants",
      image: "https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg"
    },
    {
      title: "Leadership Conference",
      impact: "15 Industry Leaders",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
    }
  ];

  const stats = [
    { icon: Calendar, value: "50+", label: "Events Hosted" },
    { icon: Users, value: "3000+", label: "Participants" },
    { icon: Building2, value: "15+", label: "Industry Partners" },
    { icon: Award, value: "25", label: "Guest Speakers" }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === activeFilter);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-[#4682b4] to-[#78bdf2] overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="section-container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 font-heading">
                <span className="text-sky-blue">Experience</span> the Momentum
              </h1>
              <p className="text-xl text-charcoal mb-8">
                Stay updated with academic events, corporate interactions, and exclusive expert sessions curated by CHRIST Consulting.
              </p>
              <a href="#upcoming" className="btn-primary bg-primary text-white hover:bg-white/90">
                View All Events
              </a>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="relative hidden lg:flex rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                  alt="Event Networking"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Event */}
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
                  <h2 className="text-3xl font-bold text-primary mb-4 font-heading">{featuredEvent.title}</h2>
                  <p className="text-charcoal mb-6">{featuredEvent.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-600">
                      <CalendarDays size={20} className="mr-3" />
                      <span>{featuredEvent.date} • {featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={20} className="mr-3" />
                      <span>{featuredEvent.venue}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Event Categories & Upcoming Events */}
      <section id="upcoming" className="py-20">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle 
              title="Upcoming Events" 
              subtitle="Join us for these transformative learning experiences"
              centered={true}
            />
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-primary hover:bg-primary/10'
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
                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">{event.title}</h3>
                    <p className="text-charcoal mb-4">{event.speaker}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={18} className="mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary flex items-center justify-center">
                      Register Now
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-secondary">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle 
              title="Past Events" 
              subtitle="Highlights from our previous events"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pastEvents.map((event, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 font-heading">{event.title}</h3>
                    <p className="text-accent mb-4">{event.impact}</p>
                    <button className="text-primary font-medium group-hover:text-accent transition-colors duration-300 flex items-center">
                      View Recap
                      <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
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
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-charcoal">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Collaborators */}
      <section className="bg-secondary text-white py-20">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6 font-heading">
              Are you an expert or organization looking to host with CHRIST Consulting?
            </h2>
            <button className="btn-primary bg-white text-primary hover:bg-white/90">
              Contact Us
            </button>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
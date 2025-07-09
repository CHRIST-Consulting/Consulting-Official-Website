import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  Download,
  ExternalLink,
} from "lucide-react";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import SectionTitle from "../components/ui/SectionTitle";
import { getPastEventById, PastEvent } from "../data/EventsData";

const EventRecapPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<PastEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      const eventData = getPastEventById(id);
      setEvent(eventData);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-charcoal">Loading event recap...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Event Not Found
          </h1>
          <p className="text-charcoal mb-8">
            The event recap you're looking for doesn't exist.
          </p>
          <Link to="/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${event.images[0]})`,
            opacity: 0.3,
            zIndex: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        ></div>
        <div className="section-container relative z-10">
          <ScrollAnimation>
            <Link
              to="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Events
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar size={20} className="mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="mr-2" />
                <span>{event.attendees}+ Attendees</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold text-primary mb-6 font-heading">
                  Event Overview
                </h2>
                <p className="text-lg text-charcoal mb-8">
                  {event.description}
                </p>

                <h3 className="text-2xl font-bold text-primary mb-4 font-heading">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3"></span>
                      <span className="text-charcoal">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </ScrollAnimation>
            </div>

            <div>
              <ScrollAnimation delay={200}>
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 font-heading">
                    Event Stats
                  </h3>
                  <div className="space-y-4">
                    {event.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-charcoal">{stat.label}</span>
                        <span className="font-bold text-primary">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {event.downloads && (
                  <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">
                      Downloads
                    </h3>
                    <div className="space-y-3">
                      {event.downloads.map((download, index) => (
                        <a
                          key={index}
                          href={download.url}
                          className="flex items-center text-primary hover:text-accent transition-colors duration-300"
                        >
                          <Download size={18} className="mr-2" />
                          <span>{download.name}</span>
                          <ExternalLink size={16} className="ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="py-20 bg-secondary">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle
              title="Event Gallery"
              subtitle="Capturing the moments and memories"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {event.images.map((image, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 group">
                  <img
                    src={image}
                    alt={`${event.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {event.videos && (
            <div className="mt-16">
              <ScrollAnimation>
                <h3 className="text-2xl font-bold text-primary mb-8 text-center font-heading">
                  Event Highlights Video
                </h3>
                <div className="max-w-4xl mx-auto">
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-xl">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={event.videos[0]}
                      title={`${event.title} Highlights`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="section-container">
          <ScrollAnimation>
            <SectionTitle
              title="What Attendees Said"
              subtitle="Feedback from our participants"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {event.testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 200}>
                <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary font-heading">
                        {testimonial.name}
                      </h4>
                      <p className="text-charcoal">{testimonial.role}</p>
                    </div>
                  </div>

                  <blockquote className="text-charcoal italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-primary">
        <div className="section-container text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
              Don't Miss Our Next Event
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Stay updated with our upcoming events and be part of the CHRIST
              Consulting community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="btn-secondary bg-white text-primary hover:bg-secondary"
              >
                View Upcoming Events
              </Link>
              <Link
                to="/contact"
                className="btn-secondary border-white text-primary hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default EventRecapPage;

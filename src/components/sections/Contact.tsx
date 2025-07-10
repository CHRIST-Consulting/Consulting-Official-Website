import React, { useState } from "react";
import ScrollAnimation from "../ui/ScrollAnimation";
import Button from "../ui/Button";
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="section-container">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-accent/10 text-primary font-medium rounded-full text-sm mb-4">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 font-heading">
              Ready to Collaborate?
            </h2>
            <p className="text-lg text-slate-blue max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to solve complex challenges or explore new
              opportunities, our team is here to help you succeed.
            </p>
          </div>
        </ScrollAnimation>

        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
          <ScrollAnimation delay={100}>
            <div className="group text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3 font-heading">
                Email
              </h3>
              <a
                href="mailto:consultancy@christuniversity.in"
                className="text-primary hover:text-accent transition-colors duration-300 font-medium"
              >
                consultancy@christuniversity.in
              </a>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="group text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3 font-heading">
                Phone
              </h3>
              <p className="text-primary font-medium">080 4012 9958</p>
              <p className="text-slate-blue text-sm">Mon-Fri 9AM-6PM</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="group text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3 font-heading">
                Location
              </h3>
              <p className="text-primary font-medium">Bengaluru</p>
              <p className="text-slate-blue text-sm">CHRIST University</p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <div className="bg-gradient-to-br from-ice-blue to-white border border-accent/20 rounded-3xl p-8 md:p-12 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal mb-4 font-heading">
                    Thank You!
                  </h3>
                  <p className="text-slate-blue text-lg mb-8 max-w-md mx-auto">
                    Your message has been received. We'll get back to you soon
                    with next steps.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-charcoal mb-4 font-heading">
                      Start the Conversation
                    </h3>
                    <p className="text-slate-blue">
                      Tell us about your project and let's explore how we can
                      help you achieve your goals.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-charcoal font-semibold mb-3"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white border-2 border-accent/20 rounded-xl text-charcoal placeholder-slate-blue focus:outline-none focus:border-accent transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-charcoal font-semibold mb-3"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white border-2 border-accent/20 rounded-xl text-charcoal placeholder-slate-blue focus:outline-none focus:border-accent transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-charcoal font-semibold mb-3"
                      >
                        Your requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-6 py-4 bg-white border-2 border-accent/20 rounded-xl text-charcoal placeholder-slate-blue focus:outline-none focus:border-accent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, challenges, or goals. What kind of consulting services are you looking for?"
                      ></textarea>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto shadow-lg"
                      >
                        <Send size={20} />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </ScrollAnimation>
        </div>

        {/* Social Links */}
        <ScrollAnimation delay={500}>
          <div className="text-center mt-16">
            <p className="text-slate-blue mb-6">Follow our journey</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.linkedin.com/company/christ-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white border border-accent/20 rounded-full text-primary hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/christ_consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white border border-accent/20 rounded-full text-primary hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Contact;

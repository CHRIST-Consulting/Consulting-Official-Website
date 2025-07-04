import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import Button from "../ui/Button";
import { Send, CheckCircle } from "lucide-react";

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
    <section id="contact" className="py-20 bg-secondary">
      <div className="section-container">
        <ScrollAnimation>
          <SectionTitle
            title="Let's Build Something Great"
            subtitle="Get in touch to start a project, design a training program, or explore collaboration"
            centered={true}
          />
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ScrollAnimation>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle size={64} className="text-primary mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-2 font-heading">
                    Thank You!
                  </h3>
                  <p className="text-center text-charcoal mb-6">
                    Your message has been sent successfully. Our team will get
                    back to you shortly.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Requirement
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 font-heading">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-accent font-bold mb-1">Email</p>
                  <a
                    href="mailto:consultancy@christuniversity.in"
                    className="text-white opacity-90 hover:opacity-100 transition-opacity"
                  >
                    consultancy@christuniversity.in
                  </a>
                </div>

                <div>
                  <p className="text-accent font-bold mb-1">Phone</p>
                  <p className="text-white opacity-90">
                    080 4012 9157 / 9958 / 9700
                  </p>
                </div>

                <div>
                  <p className="text-accent font-bold mb-1">Address</p>
                  <p className="text-white opacity-90">
                    CHRIST (Deemed to be University),
                    <br />
                    Hosur Road, Bengaluru - 560029
                    <br />
                    Karnataka, India
                  </p>
                </div>

                <div>
                  <p className="text-accent font-bold mb-1">Social Media</p>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="https://www.linkedin.com/company/christ-consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white opacity-90 hover:opacity-100 hover:text-accent transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/christ_consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white opacity-90 hover:opacity-100 hover:text-accent transition-all duration-300"
                      aria-label="Instagram"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-primary-dark p-4 rounded-lg">
                <p className="text-white opacity-90 text-sm italic">
                  "Our consultancy brings together the best of academic research
                  and industry practice to deliver solutions that create lasting
                  impact."
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;

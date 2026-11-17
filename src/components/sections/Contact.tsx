import React, { useState } from "react";
import ScrollAnimation from "../ui/ScrollAnimation";
import { Button } from "../ui/Button";
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  CONTACT_LIMITS,
  validateContactInput,
  type ContactErrors,
} from "@/lib/contactValidation";

const EMPTY_FORM = {
  name: "",
  email: "",
  message: "",
  website: "", // honeypot — hidden from humans, bots tend to fill it
};

const inputBaseClass =
  "w-full px-6 py-4 bg-white border-2 rounded-xl text-charcoal placeholder-slate-blue focus:outline-none transition-all duration-300";

const inputClass = (hasError: boolean) =>
  `${inputBaseClass} ${
    hasError ? "border-red-400 focus:border-red-500" : "border-accent/20 focus:border-accent"
  }`;

const Contact = () => {
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const { errors } = validateContactInput(formState);
    setFieldErrors(errors);
    setSubmitError(null);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(
          data.error ??
            "We couldn't send your message right now. Please try again shortly."
        );
        return;
      }

      setIsSubmitted(true);
      setFormState(EMPTY_FORM);
      setFieldErrors({});
    } catch {
      setSubmitError(
        "We couldn't reach our server. Please check your connection and try again, or email us directly at consultancy@christuniversity.in."
      );
    } finally {
      setIsSubmitting(false);
    }
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

                  <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                      >
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Honeypot: visually hidden and skipped by keyboard/screen readers */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[10000px] w-px h-px overflow-hidden"
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formState.website}
                        onChange={handleChange}
                      />
                    </div>

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
                          maxLength={CONTACT_LIMITS.name}
                          autoComplete="name"
                          aria-invalid={Boolean(fieldErrors.name)}
                          aria-describedby={fieldErrors.name ? "name-error" : undefined}
                          className={inputClass(Boolean(fieldErrors.name))}
                          placeholder="John Doe"
                        />
                        {fieldErrors.name && (
                          <p id="name-error" className="mt-2 text-sm text-red-600">
                            {fieldErrors.name}
                          </p>
                        )}
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
                          maxLength={CONTACT_LIMITS.email}
                          autoComplete="email"
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? "email-error" : undefined}
                          className={inputClass(Boolean(fieldErrors.email))}
                          placeholder="john@company.com"
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className="mt-2 text-sm text-red-600">
                            {fieldErrors.email}
                          </p>
                        )}
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
                        maxLength={CONTACT_LIMITS.message}
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                        className={`${inputClass(Boolean(fieldErrors.message))} resize-none`}
                        placeholder="Tell us about your project, challenges, or goals. What kind of consulting services are you looking for?"
                      ></textarea>
                      {fieldErrors.message && (
                        <p id="message-error" className="mt-2 text-sm text-red-600">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 mx-auto shadow-lg"
                      >
                        {isSubmitting ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Send size={20} />
                        )}
                        {isSubmitting ? "Sending…" : "Send Message"}
                      </Button>
                      {/* Submissions are stored via /api/contact and listed in the
                          admin panel (/admin/messages). Email notifications are a
                          TODO in api/contact.ts, pending IT approval. */}
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

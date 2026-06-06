import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Briefcase, 
  Award, 
  Calendar, 
  CheckCircle, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Users, 
  FileText,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const InternshipRegistrationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    campus: "Bangalore Central Campus",
    registerNumber: "",
    course: "",
    year: "3rd Year",
    linkedin: "",
    sop: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.registerNumber.trim()) newErrors.registerNumber = "Register/Roll number is required";
    if (!formData.course.trim()) newErrors.course = "Course/Specialization is required";
    if (!formData.sop.trim()) {
      newErrors.sop = "Please write a brief statement of purpose";
    } else if (formData.sop.trim().length < 50) {
      newErrors.sop = "Statement must be at least 50 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 sm:pt-28">
      {/* Back navigation & header banner */}
      <div className="bg-primary text-white py-12 md:py-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#163a66] to-[#1e4a7a]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DAA520]/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DAA520]/20 text-[#ffd700] border border-[#DAA520]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Cohort 2026-27 Registrations
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight mb-4">
              Student Intern Program
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-normal">
              Bridge academic excellence with professional impact. Join our elite student consulting cohort and solve real corporate briefs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {isSubmitted ? (
          /* Submission Success State */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-green-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-100">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-heading mb-4">
              Application Submitted!
            </h2>
            <p className="text-charcoal mb-2 font-medium">
              Thank you for applying, <span className="font-semibold text-primary">{formData.fullName}</span>!
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
              We have received your registration details. A confirmation email has been sent to <span className="font-medium text-charcoal">{formData.email}</span>. Our recruitment committee will review your application and get in touch regarding next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8">
                <Link to="/">Return Home</Link>
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    campus: "Bangalore Central Campus",
                    registerNumber: "",
                    course: "",
                    year: "3rd Year",
                    linkedin: "",
                    sop: "",
                  });
                }}
                className="border-primary/20 text-primary hover:bg-primary/5"
              >
                Submit Another Application
              </Button>
            </div>
          </div>
        ) : (
          /* General Layout - Info + Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Details (7 Cols on desktop) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Program Overview */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading mb-4 flex items-center gap-2.5">
                  <BookOpen className="w-5.5 h-5.5 text-accent" />
                  Program Overview
                </h2>
                <p className="text-charcoal leading-relaxed text-sm sm:text-base">
                  The CHRIST Consulting Internship Program is a selective 6-month initiative designed to give students practical exposure to management consulting, research, and client relationship management. Under the mentorship of experienced faculty and industry veterans, interns play a crucial role in gathering intelligence, conducting analysis, and designing solutions for active clients.
                </p>
              </div>

              {/* Roles Offered */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading mb-6 flex items-center gap-2.5">
                  <Users className="w-5.5 h-5.5 text-accent" />
                  Roles & Positions
                </h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#DAA520] pl-4">
                    <h3 className="text-base font-semibold text-primary">Student Consultant</h3>
                    <p className="text-sm text-charcoal/90 mt-1">
                      Support senior consultants in identifying client bottlenecks, processing qualitative surveys, compiling final reports, and presenting slides. Requires strong communication skills and basic strategic frameworks.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#DAA520] pl-4">
                    <h3 className="text-base font-semibold text-primary">Research Analyst</h3>
                    <p className="text-sm text-charcoal/90 mt-1">
                      Perform data collection, competitor benchmarking, financial modeling, and academic literature reviews. Ideal for students with strong statistical, analytics, or academic writing skills.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#DAA520] pl-4">
                    <h3 className="text-base font-semibold text-primary">Project Operations Intern</h3>
                    <p className="text-sm text-charcoal/90 mt-1">
                      Assist in coordinating across departments, scheduling masterclasses, tracking client deliverables, and managing internal program operations. Strong organization skills are vital.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading mb-6 flex items-center gap-2.5">
                  <Award className="w-5.5 h-5.5 text-accent" />
                  Benefits & Perks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAA520] mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-primary">Certificate of Experience</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Formal certificate recognizing your contributions.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAA520] mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-primary">Mentorship & Guidance</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Regular reviews with expert consultants.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAA520] mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-primary">Client Engagement</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Direct interaction and presentations to business representatives.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#DAA520] mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-primary">Academic Flex-Hours</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Schedule respects exams and academic commitments.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading mb-6 flex items-center gap-2.5">
                  <Calendar className="w-5.5 h-5.5 text-accent" />
                  Important Dates
                </h2>
                <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-white" />
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#DAA520] mb-0.5">
                      <Clock className="w-3.5 h-3.5" /> Currently Open
                    </div>
                    <h4 className="text-sm font-bold text-primary">Applications Open</h4>
                    <p className="text-xs text-muted-foreground">Register your details online.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 border-4 border-white" />
                    <h4 className="text-sm font-bold text-primary">July 15, 2026</h4>
                    <p className="text-xs text-muted-foreground">Application portal closes at 11:59 PM.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 border-4 border-white" />
                    <h4 className="text-sm font-bold text-primary">July 20 – 25, 2026</h4>
                    <p className="text-xs text-muted-foreground">Shortlisting rounds & interviews.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 border-4 border-white" />
                    <h4 className="text-sm font-bold text-primary">August 01, 2026</h4>
                    <p className="text-xs text-muted-foreground">Internship onboarding and kick-off.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form (5 Cols on desktop) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100 sticky top-28">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading">
                    Apply Online
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fill in the form to register your application. Fields marked * are mandatory.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Darshan Gowda"
                      className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                        errors.fullName ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@christuniversity.in"
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                          errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="phone">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                          errors.phone ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Campus Select */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="campus">
                      Campus Location *
                    </label>
                    <select
                      id="campus"
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:bg-white"
                    >
                      <option>Bangalore Central Campus</option>
                      <option>Bangalore Kengeri Campus</option>
                      <option>Bangalore Bannerghatta Road Campus</option>
                      <option>Bangalore Yeshwanthpur Campus</option>
                      <option>Delhi NCR Campus</option>
                      <option>Pune Lavasa Campus</option>
                    </select>
                  </div>

                  {/* Register Number & Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="registerNumber">
                        Register / Roll No *
                      </label>
                      <input
                        type="text"
                        id="registerNumber"
                        name="registerNumber"
                        value={formData.registerNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 23112345"
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                          errors.registerNumber ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.registerNumber && <p className="text-[11px] text-red-500 mt-1">{errors.registerNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="course">
                        Course & Spec *
                      </label>
                      <input
                        type="text"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="e.g. BBA Finance"
                        className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                          errors.course ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.course && <p className="text-[11px] text-red-500 mt-1">{errors.course}</p>}
                    </div>
                  </div>

                  {/* Year Select & LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="year">
                        Current Year *
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:bg-white"
                      >
                        <option>1st Year (UG)</option>
                        <option>2nd Year (UG)</option>
                        <option>3rd Year (UG)</option>
                        <option>4th Year (UG Honours)</option>
                        <option>1st Year (PG)</option>
                        <option>2nd Year (PG)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="linkedin">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Mock CV Upload File Input */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Upload Resume / CV (Mock)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-slate-200 rounded-lg cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileText className="w-6 h-6 text-muted-foreground mb-1" />
                          <p className="text-[11px] text-muted-foreground">
                            <span className="font-semibold text-primary">Click to select CV file</span> or drag & drop (PDF, Max 5MB)
                          </p>
                        </div>
                        <input type="file" className="hidden" disabled />
                      </label>
                    </div>
                  </div>

                  {/* Statement of Purpose */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1" htmlFor="sop">
                      Statement of Purpose (SOP) *
                    </label>
                    <textarea
                      id="sop"
                      name="sop"
                      rows={4}
                      value={formData.sop}
                      onChange={handleInputChange}
                      placeholder="Tell us why you want to join and what makes you a good fit (min 50 chars)..."
                      className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-slate-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white ${
                        errors.sop ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-primary"
                      }`}
                    />
                    {errors.sop && <p className="text-[11px] text-red-500 mt-1">{errors.sop}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-4 transition-all focus:ring-2 focus:ring-ring"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default InternshipRegistrationPage;

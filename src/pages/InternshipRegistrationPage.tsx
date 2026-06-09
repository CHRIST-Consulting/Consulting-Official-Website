import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Briefcase, 
  Award, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  Users, 
  FileText,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const InternshipRegistrationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                The CHRIST Incubation and Consultancy Foundation Internship Program is a selective 6-month initiative designed to give students practical exposure to management consulting, research, and client relationship management. Under the mentorship of experienced faculty and industry veterans, interns play a crucial role in gathering intelligence, conducting analysis, and designing solutions for active clients.
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

          </div>

          {/* Right Column: Google Form Link (5 Cols on desktop) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100 sticky top-28 text-center space-y-6">
              <div className="w-16 h-16 bg-[#DAA520]/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <FileText className="w-8 h-8 text-[#DAA520]" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-primary font-heading">
                  Apply Online
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  To register your application for the Student Intern Program, please fill out the official Google Form.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 text-left space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/80 font-medium">Verify your student credentials</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/80 font-medium">Provide your academic and contact details</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/80 font-medium">Submit your CV & Statement of Purpose (SOP)</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 christ-glow hover:shadow-lg transition-all"
                >
                  <a 
                    href="https://forms.gle/mSeqUbb27gTM3T1k7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    Open Application Form
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <p className="text-[11px] text-muted-foreground mt-3">
                  The link will open in a new browser tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InternshipRegistrationPage;

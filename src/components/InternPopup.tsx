import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, GraduationCap, Briefcase, Award, ArrowRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";

const InternPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5-second delay for a smooth entry

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-white border border-[#DAA520]/20 shadow-2xl rounded-2xl">
          {/* Banner Image / Gradient Header */}
          <div className="relative p-8 text-white bg-gradient-to-br from-primary via-[#163a66] to-[#1e4a7a] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#DAA520]/10 rounded-full blur-xl" />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DAA520]/20 text-[#ffd700] border border-[#DAA520]/30 mb-4 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Applications Open
            </div>

            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
                Student Internship
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm mt-2 font-medium">
                Join the elite student consulting team at the CHRIST Incubation and Consultancy Foundation (CICF). Work on real industry projects and build your professional network.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-6 bg-white">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Why Join CICF?
              </h4>
              
              <div className="grid gap-3.5">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-[#DAA520]/10 group-hover:text-[#DAA520] transition-colors">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-primary">Real Industry Experience</h5>
                    <p className="text-xs text-charcoal/80">Collaborate with client companies on strategic consulting projects.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-[#DAA520]/10 group-hover:text-[#DAA520] transition-colors">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-primary">Mentorship & Training</h5>
                    <p className="text-xs text-charcoal/80">Learn directly from senior academic consultants and industry leaders.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-[#DAA520]/10 group-hover:text-[#DAA520] transition-colors">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-primary">Professional Growth</h5>
                    <p className="text-xs text-charcoal/80">Build an impressive CV, secure recommendation letters, and earn a certificate.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto flex-1 border-primary/20 text-primary hover:bg-primary/5 order-2 sm:order-1"
              >
                Maybe Later
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto flex-[1.5] bg-primary hover:bg-primary/90 text-white font-medium border-0 order-1 sm:order-2 christ-glow hover:shadow-lg transition-all"
              >
                <Link to="/internship-registration" onClick={handleClose} className="flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-primary via-[#163a66] to-[#1e4a7a] text-white rounded-full shadow-lg border border-[#DAA520]/40 hover:border-[#DAA520] hover:scale-105 hover:shadow-[#DAA520]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-offset-2 animate-bounce-subtle christ-glow"
          aria-label="Join CICF"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd700] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DAA520]"></span>
          </span>
          
          <GraduationCap className="w-5 h-5 text-[#ffd700] group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="text-xs font-bold tracking-wide font-heading uppercase text-white pr-1">
            Join CICF
          </span>
        </button>
      </div>
    </>
  );
};

export default InternPopup;

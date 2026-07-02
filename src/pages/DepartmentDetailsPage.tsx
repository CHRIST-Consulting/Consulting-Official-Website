import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Users,
  Compass,
  Calendar,
  Building2
} from "lucide-react";
import { getDepartmentBySlug, getCampusById, Campus, DepartmentExpertise, getDeptSlug } from "../data/CampusesData";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/Button";

// Helper to generate dynamic descriptions for departments
const getDeptDescription = (deptName: string, campusName: string) => {
  const name = deptName.toLowerCase();
  if (name.includes("computer") || name.includes("applications")) {
    return `The Department of Computer Science at ${campusName} is dedicated to fostering innovation, technical competence, and research excellence in computing fields. Through collaboration with leading technology partners, we offer state-of-the-art consultancy, technical prototyping, and professional software solutions that empower organizations to drive their digital transformations.`;
  }
  if (name.includes("commerce") || name.includes("finance")) {
    return `The Department of Commerce at ${campusName} stands as a beacon of academic rigor and industrial relevance. We provide professional financial advisory, taxation consultancies, and compliance auditing services. Our faculty and students collaborate closely with corporate entities to solve business bottlenecks, analyze market trends, and implement efficient governance frameworks.`;
  }
  if (name.includes("business") || name.includes("management")) {
    return `The School of Business and Management at ${campusName} prepares tomorrow's organizational leaders. We deliver world-class business solutions, strategic consulting, change management plans, and executive education. Our consulting vertical connects academic intelligence with practical corporate logistics to optimize operational models.`;
  }
  if (name.includes("economics")) {
    return `The Department of Economics at ${campusName} analyzes complex market structures, macroeconomic policies, and socio-economic dynamics. We offer qualitative and quantitative market studies, impact assessments, policy design reviews, and econometric modeling to guide public sector decisions and corporate investment strategy.`;
  }
  if (name.includes("english") || name.includes("communication")) {
    return `The Department of English at ${campusName} focuses on the power of language, narrative, and strategic communication. We consult with businesses and non-profits to build professional communication strategies, digital content pipelines, technical documentation standards, and public relations campaigns.`;
  }
  if (name.includes("psychology") || name.includes("behavior")) {
    return `The Department of Psychology at ${campusName} merges clinical scientific research with industrial application. We offer professional consultancies in organizational behavior, employee well-being, psychological assessment design, workplace conflict resolution, and leadership developmental training.`;
  }
  return `The Department of ${deptName} at ${campusName} is committed to academic excellence, industry integration, and social impact. We leverage state-of-the-art academic resources and consulting capabilities to solve practical problems, provide policy research, and run high-impact development programs for stakeholders.`;
};

// Helper to get coordinator names based on department
const getDeptCoordinator = (deptName: string, campusSPOC: { name: string; email: string; image: string }) => {
  const name = deptName.toLowerCase();
  if (name.includes("computer") || name.includes("applications")) {
    return {
      name: "Dr. Balachandran K.",
      role: "Head of Department, Computer Science",
      email: "balachandran.k@christuniversity.in",
      image: "/images/teams/consultants/Kiran.png",
      phone: "+91 80 4012 9100"
    };
  }
  if (name.includes("commerce")) {
    return {
      name: "Dr. Theresa Nithila Vincent",
      role: "Head of Department, Commerce",
      email: "nithila.vincent@christuniversity.in",
      image: "/images/teams/consultants/Suman.png",
      phone: "+91 80 4012 9200"
    };
  }
  if (name.includes("management") || name.includes("business")) {
    return {
      name: "Dr. Jeevananda S.",
      role: "Associate Dean, School of Business & Management",
      email: "jeevananda.s@christuniversity.in",
      image: "/images/teams/consultants/Alexander.png",
      phone: "+91 80 4012 9300"
    };
  }
  if (name.includes("economics")) {
    return {
      name: "Dr. Joshy K. J.",
      role: "Professor & Coordinator, Economics",
      email: "joshy.kj@christuniversity.in",
      image: "/images/teams/consultants/FR Jossy.png",
      phone: "+91 80 4012 9400"
    };
  }
  if (name.includes("english")) {
    return {
      name: "Dr. Kozhikode John Joseph",
      role: "Associate Professor, English",
      email: "john.joseph@christuniversity.in",
      image: "/images/teams/consultants/Maria.png",
      phone: "+91 80 4012 9500"
    };
  }
  if (name.includes("psychology")) {
    return {
      name: "Dr. Tony Sam George",
      role: "Dean, Social Sciences & Psychology",
      email: "tony.sam.george@christuniversity.in",
      image: "/images/teams/consultants/Sharanya.png",
      phone: "+91 80 4012 9600"
    };
  }
  return {
    name: campusSPOC.name,
    role: `Coordinator, Dept. of ${deptName}`,
    email: campusSPOC.email,
    image: campusSPOC.image,
    phone: "+91 80 4012 9000"
  };
};

const DepartmentDetailsPage = () => {
  const { campusId, deptId } = useParams<{ campusId: string; deptId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<{ campus: Campus; department: DepartmentExpertise } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (campusId && deptId) {
      const match = getDepartmentBySlug(campusId, deptId);
      if (match) {
        setData(match);
      }
    }
  }, [campusId, deptId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="text-center max-w-md p-6 bg-white dark:bg-slate-850 rounded-2xl shadow-xl">
          <Building className="w-16 h-16 mx-auto text-primary mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Department Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The department details you are looking for are not available or the URL is incorrect.
          </p>
          <Button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 mx-auto">
            <ChevronLeft className="w-4 h-4" /> Go to Home Page
          </Button>
        </div>
      </div>
    );
  }

  const { campus, department } = data;
  const coordinator = getDeptCoordinator(department.name, campus.spoc);

  // Dynamic Icon rendering helper
  const renderIcon = (name: string, className = "h-5 w-5") => {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return <Icons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-955 pt-20 pb-16">
      {/* Immersive Header Section */}
      <section className="relative h-[35vh] min-h-[250px] w-full flex items-end overflow-hidden">
        {/* Background Image of Campus */}
        <div className="absolute inset-0 z-0">
          <img
            src={campus.image}
            alt={campus.name}
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="section-container relative z-10 w-full pb-8 text-left">
          <ScrollAnimation>
            {/* Breadcrumb navigation */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs md:text-sm font-medium text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to={`/campus/${campus.id}`} className="hover:text-white transition-colors">{campus.name}</Link>
              <span>/</span>
              <span className="text-sky-300 font-semibold">{department.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/30 border border-primary-light/40 px-3.5 py-1 text-xs font-semibold text-sky-250 mb-2 backdrop-blur-md">
                  <MapPin size={12} className="text-sky-300" />
                  {campus.name}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {department.name}
                </h1>
              </div>
              
              <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm self-start sm:self-center">
                <Link to={`/campus/${campus.id}`}>
                  <ChevronLeft className="w-4 h-4 mr-1.5" /> Back to Campus
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="section-container mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <ScrollAnimation>
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary dark:text-sky-300 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    {renderIcon(department.iconName, "h-6 w-6")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-855 dark:text-white">
                      Academic & Consulting Profile
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Driving innovation and research-led corporate solutions
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {department.description || getDeptDescription(department.name, campus.name)}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 mt-4">
                  <h4 className="text-sm font-bold text-primary dark:text-sky-300 mb-3 uppercase tracking-wider">
                    Key Performance Indicators (KPIs)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase block font-bold tracking-wider">Faculty Consultants</span>
                      <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">14</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase block font-bold tracking-wider">Active Projects</span>
                      <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">3</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase block font-bold tracking-wider">Scholarly Papers</span>
                      <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">68+</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase block font-bold tracking-wider">Corporate Partners</span>
                      <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">8+</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Consulting & Expertise Areas */}
            <ScrollAnimation>
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-1.5">
                    Areas of Expertise
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {department.customIntro || "Specific domains where we offer consultancy, troubleshooting, and developmental programs."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {department.expertise.map((exp, idx) => {
                    let title = exp;
                    let desc = "Expert solutions, academic research backup, and customizable execution modules.";
                    
                    const colonIndex = exp.indexOf(":");
                    if (colonIndex !== -1) {
                      title = exp.slice(0, colonIndex).trim();
                      desc = exp.slice(colonIndex + 1).trim();
                    }
                    
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl border border-slate-200/40 dark:border-slate-800/80 transition-all group"
                      >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-955/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={13} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                            {title}
                          </h4>
                          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed mt-1">
                            {desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {department.customOutro && (
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line bg-slate-50/40 dark:bg-slate-900/10 p-5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800/60 mt-4">
                    {department.customOutro}
                  </div>
                )}
              </div>
            </ScrollAnimation>

            {/* Offered Lab Facilities */}
            {department.labs && department.labs.length > 0 && (
              <ScrollAnimation>
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-1.5 flex items-center gap-2">
                      <Icons.FlaskConical className="h-5 w-5 text-primary dark:text-sky-300" />
                      Offered Lab Facilities
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {department.labsIntro || "The department is equipped with modern infrastructure to support consultancy and training activities:"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {department.labs.map((lab, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl border border-slate-200/40 dark:border-slate-800/80 transition-all group flex items-start gap-3.5"
                      >
                        <div className="w-10 h-10 bg-primary/5 dark:bg-primary/20 text-primary dark:text-sky-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {lab.toLowerCase().includes("bloomberg") ? (
                            <Icons.LineChart className="h-5 w-5" />
                          ) : lab.toLowerCase().includes("iot") || lab.toLowerCase().includes("automation") ? (
                            <Icons.Cpu className="h-5 w-5" />
                          ) : lab.toLowerCase().includes("data science") || lab.toLowerCase().includes("ai") ? (
                            <Icons.Database className="h-5 w-5" />
                          ) : lab.toLowerCase().includes("network") || lab.toLowerCase().includes("cyber") ? (
                            <Icons.ShieldAlert className="h-5 w-5" />
                          ) : (
                            <Icons.Settings className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-855 dark:text-slate-100 text-base md:text-lg mb-1 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                            {lab}
                          </h4>
                          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed mt-1">
                            {lab.toLowerCase().includes("bloomberg")
                              ? "Leveraging live global financial data feed terminals to drive market analyses and research consultancies."
                              : "Equipped with high-performance computing platforms, specialized modules, and coordinator trainer support."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            )}
            {/* Collaborations Grid Section */}
            {department.logos && department.logos.length > 0 && (
              <ScrollAnimation>
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6 overflow-hidden relative">
                  <style>{`
                    @keyframes marquee-infinite {
                      0% { transform: translate3d(0, 0, 0); }
                      100% { transform: translate3d(-50%, 0, 0); }
                    }
                    .animate-marquee-infinite {
                      animation: marquee-infinite 35s linear infinite;
                      will-change: transform;
                      backface-visibility: hidden;
                    }
                    .animate-marquee-infinite:hover {
                      animation-play-state: paused;
                    }
                  `}</style>
                  <div>
                    <h3 className="text-xl font-bold text-slate-855 dark:text-white mb-1.5 flex items-center gap-2">
                      <Icons.Handshake className="h-5 w-5 text-primary dark:text-sky-300" />
                      Academic & Industry Collaborations
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Leading institutions and corporate organizations that have partnered with the department for research, consultancy briefs, and technical collaborations.
                    </p>
                  </div>

                  {/* Infinite Marquee Container */}
                  <div className="relative w-full overflow-hidden py-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/60">
                    {/* Fade gradients at edges for premium look */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

                    <div className="flex w-max animate-marquee-infinite gap-6 px-6">
                      {[...department.logos, ...department.logos].map((logo, idx) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-64 h-44 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col items-center justify-between text-center relative overflow-hidden"
                          title={logo.name}
                        >
                          {/* TECH GRADIENT GLOW BORDER */}
                          <div className="absolute inset-0 border border-transparent group-hover:border-sky-500 dark:group-hover:border-emerald-400 rounded-xl transition-colors duration-300 pointer-events-none z-10" />
                          <div className="absolute -inset-[2px] bg-gradient-to-r from-sky-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300 pointer-events-none" />

                          <div className="w-full h-24 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            <img
                              src={logo.path}
                              alt={logo.name}
                              className="w-full h-full object-contain filter dark:brightness-95 bg-white dark:bg-white/95 rounded-lg p-2 shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300"
                              loading="lazy"
                            />
                          </div>
                          
                          <div className="w-full flex-grow flex items-center justify-center mt-3">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug w-full px-1 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                              {logo.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8 text-left">
            {/* SPOC Contact */}
            <ScrollAnimation delay={150}>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                <h4 className="text-sm font-bold text-primary dark:text-sky-300 mb-4 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                  Department Coordinator
                </h4>
                
                {/* Photo */}
                <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-inner mb-4 relative bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex-shrink-0 mx-auto">
                  <img
                    src={coordinator.image}
                    alt={coordinator.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="text-center space-y-1.5 mb-6">
                  <h5 className="text-xl font-bold text-slate-855 dark:text-slate-100 leading-snug">
                    {coordinator.name}
                  </h5>
                  <p className="text-sm font-semibold text-primary dark:text-sky-300 uppercase tracking-wider">
                    {coordinator.role}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {campus.name}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`mailto:${coordinator.email}`}
                    className="flex items-center text-sm text-slate-650 dark:text-slate-350 hover:text-primary dark:hover:text-sky-300 transition-colors group break-all bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800"
                  >
                    <Mail className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0 group-hover:text-primary" />
                    <span className="font-semibold">{coordinator.email}</span>
                  </a>
                  <a
                    href={`tel:${coordinator.phone}`}
                    className="flex items-center text-sm text-slate-650 dark:text-slate-350 hover:text-primary dark:hover:text-sky-300 transition-colors group break-all bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800"
                  >
                    <Phone className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0 group-hover:text-primary" />
                    <span className="font-semibold">{coordinator.phone}</span>
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Quick Links / Navigation helper */}
            <ScrollAnimation delay={250}>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                  Quick Navigation
                </h4>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start text-sm border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <Link to={`/campus/${campus.id}`}>
                      <Building2 size={14} className="mr-2 text-primary" />
                      Explore {campus.name}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start text-sm border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <a href={campus.link} target="_blank" rel="noopener noreferrer">
                      <Compass size={14} className="mr-2 text-primary" />
                      Official University Webpage
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>

        </div>
      </section>
    </main>
  );
};

export default DepartmentDetailsPage;

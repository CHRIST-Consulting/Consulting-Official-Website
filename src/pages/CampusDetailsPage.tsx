import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  MapPin,
  Tag,
  Award,
  Briefcase,
  Users,
  GraduationCap,
  Mail,
  ChevronLeft,
} from "lucide-react";
import { getCampusById, Campus, getDeptSlug } from "../data/CampusesData";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/Button";

const CampusDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [campus, setCampus] = useState<Campus | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const data = getCampusById(id);
      if (data) {
        setCampus(data);
      }
    }
  }, [id]);

  if (!campus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="text-center max-w-md p-6 bg-white dark:bg-slate-850 rounded-2xl shadow-xl">
          <Icons.Building2 className="w-16 h-16 mx-auto text-primary mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Campus Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The campus detail page you are looking for does not exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/#campuses" className="flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back to Campuses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const activeProjects = campus.projects?.filter((p) => p.status === "Active") || [];
  const completedProjects = campus.projects?.filter((p) => p.status === "Completed") || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900/30";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900/30";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300 border border-green-200 dark:border-green-900/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300";
    }
  };

  const renderIcon = (name: string, className = "h-5 w-5") => {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return <Icons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      {/* Immersive Header Section */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-end overflow-hidden">
        {/* Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={campus.image}
            alt={campus.name}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Layered Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        {/* Content Container */}
        <div className="section-container relative z-10 w-full pb-8 md:pb-12 text-left">
          <ScrollAnimation>
            <div className="mb-4">
              <Link
                to="/#campuses"
                className="inline-flex items-center text-slate-300 hover:text-white text-sm font-semibold transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" /> Back to Campuses
              </Link>
            </div>
            
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/30 border border-primary-light/40 px-3.5 py-1 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
              <MapPin size={13} className="text-sky-300" />
              {campus.location}, India
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
              {campus.name}
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="section-container -mt-10 sm:-mt-12 relative z-20">
        <ScrollAnimation delay={100}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat 1 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white block mb-1">
                  {campus.projectsCompletedCount}
                </span>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Completed Projects
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white block mb-1">
                  {activeProjects.length}
                </span>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Active Projects
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white block mb-1">
                  {campus.facultyEngagedCount}
                </span>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Faculty Engaged
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white block mb-1">
                  {campus.studentsEngagedCount}
                </span>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Students Involved
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Main Details and Side profile */}
      <section className="section-container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column (col-span-2) */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <ScrollAnimation>
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                  Campus Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                  {campus.description}
                </p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800/60">
                  <h4 className="text-xs font-bold text-primary dark:text-sky-300 mb-3 uppercase tracking-wide">
                    Consolidated Stats
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
                    <div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Total Projects</span>
                      <p className="text-lg font-bold text-slate-800 dark:text-white">{campus.stats.totalProjects}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Active Projects</span>
                      <p className="text-lg font-bold text-slate-800 dark:text-white">{campus.stats.activeProjects}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Students Engaged</span>
                      <p className="text-lg font-bold text-slate-800 dark:text-white">{campus.stats.studentsInvolved}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Completion Rate</span>
                      <p className="text-lg font-bold text-slate-800 dark:text-white">{campus.stats.completionRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Departments & Expertise */}
            <ScrollAnimation>
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary dark:text-white mb-2">
                    Departments & Expertise
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Discover specialized knowledge sectors available for professional consultancy services.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campus.departments.map((dept, index) => (
                    <Link
                      key={index}
                      to={`/campus/${campus.id}/department/${getDeptSlug(dept.name)}`}
                      className="bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800 flex flex-col justify-start hover:bg-slate-100 dark:hover:bg-slate-800/45 hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 text-primary dark:text-sky-300 rounded-full flex items-center justify-center flex-shrink-0">
                          {renderIcon(dept.iconName, "h-4.5 w-4.5")}
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                          {dept.name}
                        </h4>
                      </div>
                      <p className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pl-1">
                        {dept.expertise.join(", ")}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Sidebar Info Column (col-span-1) */}
          <div className="space-y-8 text-left">
            <ScrollAnimation delay={200}>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
                <div>
                  <h4 className="text-sm font-bold text-primary dark:text-sky-300 mb-4 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                    Campus Coordinator (SPOC)
                  </h4>
                  {/* Photo */}
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-inner mb-4 relative bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-800 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={campus.spoc.image}
                      alt={campus.spoc.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Info details */}
                  <h5 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1">
                    {campus.spoc.name}
                  </h5>
                  <p className="text-xs font-bold text-primary dark:text-sky-300 mb-2 uppercase tracking-wide">
                    Campus Coordinator
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {campus.spoc.role}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                  <a
                    href={`mailto:${campus.spoc.email}`}
                    className="flex items-center text-xs text-slate-600 dark:text-slate-350 hover:text-primary dark:hover:text-sky-300 transition-colors group break-all bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800"
                  >
                    <Mail className="h-4.5 w-4.5 text-slate-400 mr-2 flex-shrink-0 group-hover:text-primary" />
                    <span className="font-medium">{campus.spoc.email}</span>
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="section-container mt-16 text-left">
        <ScrollAnimation>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                  Consultancy Projects
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Explore academic and practical projects implemented under this campus.
                </p>
              </div>

              {/* Tabs Switcher */}
              <div className="flex bg-slate-200/60 dark:bg-slate-900/60 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                    activeTab === "active"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
                >
                  Active ({activeProjects.length})
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                    activeTab === "completed"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
                >
                  Completed ({completedProjects.length})
                </button>
              </div>
            </div>

            {/* Dynamic Grid */}
            {activeTab === "active" ? (
              activeProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getPriorityColor(
                              project.priority
                            )}`}
                          >
                            {project.priority} Priority
                          </span>
                        </div>
                      </div>

                      <CardHeader className="p-5 pb-2">
                        <Badge variant="outline" className="text-[10px] w-fit mb-1 border-primary/25 text-primary dark:text-sky-300">
                          {project.category}
                        </Badge>
                        <CardTitle className="text-lg font-bold text-slate-850 dark:text-white line-clamp-1">{project.title}</CardTitle>
                        <CardDescription className="text-xs text-slate-550 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 mt-auto space-y-4">
                        <div className="flex items-center text-xs text-slate-550 dark:text-slate-400">
                          <Icons.Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                          Started: {project.startDate}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 py-0.5 px-2">
                              <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  <Award className="h-12 w-12 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                  <p className="text-sm">No active projects at this campus currently.</p>
                </div>
              )
            ) : completedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getPriorityColor(
                            project.priority
                          )}`}
                        >
                          {project.priority} Priority
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900/30">
                          Completed
                        </span>
                      </div>
                    </div>

                    <CardHeader className="p-5 pb-2">
                      <Badge variant="outline" className="text-[10px] w-fit mb-1 border-primary/25 text-primary dark:text-sky-300">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg font-bold text-slate-850 dark:text-white line-clamp-1">{project.title}</CardTitle>
                      <CardDescription className="text-xs text-slate-550 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-5 pt-0 mt-auto space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-550 dark:text-slate-400">
                        <div className="flex items-center">
                          <Icons.Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                          {project.startDate}
                        </div>
                        {project.endDate && (
                          <div className="text-[10px] font-semibold text-slate-400">
                            Completed: {project.endDate}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 py-0.5 px-2">
                            <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <Briefcase className="h-12 w-12 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                <p className="text-sm">No completed projects to display yet.</p>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </section>
    </main>
  );
};

export default CampusDetailsPage;

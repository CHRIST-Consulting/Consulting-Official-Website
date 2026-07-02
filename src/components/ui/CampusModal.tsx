import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  X,
  MapPin,
  Clock,
  Tag,
  Award,
  Briefcase,
  Users,
  GraduationCap,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./Button";
import { ScrollArea } from "./scroll-area";
import { campusesData, Campus, getDeptSlug } from "../../data/CampusesData";

interface CampusModalProps {
  campus: Campus | null;
  isOpen: boolean;
  onClose: () => void;
}

const CampusModal: React.FC<CampusModalProps> = ({
  campus,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Set the initial tab when the modal opens based on the clicked campus card
  useEffect(() => {
    if (campus && isOpen) {
      const index = campusesData.findIndex((c) => c.name === campus.name);
      if (index !== -1) {
        setActiveTab(index);
      }
    }
  }, [campus, isOpen]);

  useEffect(() => {
    setShowAllDepartments(false);
    setAnimationKey((prev) => prev + 1);
  }, [activeTab]);

  const selectedCampus = campusesData[activeTab];

  if (!selectedCampus) return null;

  const activeProjects = selectedCampus.projects?.filter((p) => p.status === "Active") || [];
  const completedProjects = selectedCampus.projects?.filter((p) => p.status === "Completed") || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300";
    }
  };

  // Helper to render Lucide icons dynamically from key strings in data
  const renderIcon = (name: string, className = "h-5 w-5") => {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return <Icons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
  };

  const scrollToProjects = () => {
    const element = document.getElementById("modal-projects-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-full max-h-[92vh] p-0 overflow-hidden bg-white dark:bg-slate-900">
        {/* Custom Header Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors z-50 cursor-pointer"
          aria-label="Close modal"
          type="button"
        >
          <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>

        {/* Scrollable Container covering everything */}
        <ScrollArea className="h-[92vh]">
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Header: Title, Subtitle, and Decorative SVGs */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-100 dark:border-white/5 pb-6 relative">
              <div className="max-w-3xl text-left">
                <DialogTitle className="text-3xl sm:text-4xl font-bold text-primary dark:text-white mb-2">
                  Campus Overview
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  Driving meaningful collaborations and impactful solutions across CHRIST (Deemed to be University) campuses.
                </DialogDescription>
              </div>
              
              {/* Decorative line art building columns */}
              <div className="hidden lg:block absolute right-12 bottom-2 opacity-[0.08] dark:opacity-20 pointer-events-none">
                <svg
                  width="220"
                  height="75"
                  viewBox="0 0 220 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  className="text-primary dark:text-sky-blue"
                >
                  <path
                    d="M10 65 H210 M20 65 V15 H50 V65 M60 65 V5 H90 V65 M100 65 V15 H130 V65 M140 65 V5 H170 V65 M180 65 V25 H200 V65"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35 5 L35 10 M75 0 L75 3 M115 5 L115 10 M155 0 L155 3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="35" cy="2" r="1.5" fill="currentColor" />
                  <circle cx="75" cy="0" r="1.5" fill="currentColor" />
                  <circle cx="115" cy="2" r="1.5" fill="currentColor" />
                  <circle cx="155" cy="0" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Campus Selection Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-2 border-b border-slate-100 dark:border-white/5 pb-4">
              {campusesData.map((c, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === index
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]"
                      : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                  }`}
                  aria-label={`Select ${c.name}`}
                >
                  <Icons.Building2 className="h-4 w-4" />
                  {c.name}
                </button>
              ))}
            </div>

            {/* Campus Specific Dynamic Overview Area */}
            <div key={animationKey} className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Card: Summary Stats Card (col-span-3) */}
                <div className="lg:col-span-3 bg-[#f4f7fa] dark:bg-[#121c2c]/60 rounded-2xl border border-slate-200/60 dark:border-white/5 flex flex-col justify-between overflow-hidden relative">
                  
                  {/* Title, description, and blended cover photo flush-right */}
                  <div className="flex flex-col md:flex-row justify-between items-stretch">
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-3">
                        {selectedCampus.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                        {selectedCampus.description}
                      </p>
                    </div>

                    {/* Building photo flush right (fits top & right edges perfectly) */}
                    <div className="relative md:w-[320px] min-h-[200px] md:min-h-0 overflow-hidden flex-shrink-0">
                      <img
                        src={selectedCampus.image}
                        alt={selectedCampus.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Gradient overlay blending 100% seamlessly with the solid card background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7fa] via-[#f4f7fa]/35 to-transparent hidden md:block dark:from-[#121c2c] dark:via-[#121c2c]/35" />
                    </div>
                  </div>

                  {/* 4 Statistics Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-6 md:p-8 pt-6 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/30 dark:bg-slate-900/10">
                    {/* Projects Completed */}
                    <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-150 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full hover:shadow-md transition-shadow group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center">
                            <Briefcase className="h-4.5 w-4.5 text-white" />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            {selectedCampus.projectsCompletedCount}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Projects Completed
                        </p>
                      </div>
                      <button
                        onClick={scrollToProjects}
                        className="text-xs text-primary-light hover:underline font-semibold flex items-center gap-1 mt-4 cursor-pointer text-left focus:outline-none"
                      >
                        View Details <Icons.ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* Faculty Engaged */}
                    <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-150 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full hover:shadow-md transition-shadow group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center">
                            <Users className="h-4.5 w-4.5 text-white" />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            {selectedCampus.facultyEngagedCount}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Faculty Engaged
                        </p>
                      </div>
                      <button
                        onClick={scrollToProjects}
                        className="text-xs text-primary-light hover:underline font-semibold flex items-center gap-1 mt-4 cursor-pointer text-left focus:outline-none"
                      >
                        View Details <Icons.ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* Students Engaged */}
                    <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-150 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full hover:shadow-md transition-shadow group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center">
                            <GraduationCap className="h-4.5 w-4.5 text-white" />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            {selectedCampus.studentsEngagedCount}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Students Engaged
                        </p>
                      </div>
                      <button
                        onClick={scrollToProjects}
                        className="text-xs text-primary-light hover:underline font-semibold flex items-center gap-1 mt-4 cursor-pointer text-left focus:outline-none"
                      >
                        View Details <Icons.ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* Key Projects Completed */}
                    <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-150 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full hover:shadow-md transition-shadow group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center">
                            <Award className="h-4.5 w-4.5 text-white" />
                          </div>
                          <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            {selectedCampus.keyProjectsCount}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Key Projects Completed
                        </p>
                      </div>
                      <button
                        onClick={scrollToProjects}
                        className="text-xs text-primary-light hover:underline font-semibold flex items-center gap-1 mt-4 cursor-pointer text-left focus:outline-none"
                      >
                        View Details <Icons.ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Card: Campus SPOC Details (col-span-1) */}
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-primary dark:text-white mb-4 uppercase tracking-wider">
                      Campus SPOC
                    </h4>
                    {/* SPOC Photo (Square with fixed width/height matching design layout) */}
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-inner mb-4 relative bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 flex-shrink-0">
                      <img
                        src={selectedCampus.spoc.image}
                        alt={selectedCampus.spoc.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Identity Details */}
                    <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1">
                      {selectedCampus.spoc.name}
                    </h5>
                    <p className="text-xs font-bold text-primary dark:text-sky-blue mb-1">
                      Campus SPOC
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {selectedCampus.spoc.role}
                    </p>
                  </div>

                  {/* Mail address */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4 mt-4">
                    <a
                      href={`mailto:${selectedCampus.spoc.email}`}
                      className="flex items-center text-xs text-slate-600 dark:text-slate-300 hover:text-primary-light dark:hover:text-sky-blue transition-colors group break-all"
                    >
                      <Mail className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0 group-hover:text-primary-light" />
                      <span>{selectedCampus.spoc.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Block: Departments & Expertise Grid */}
              <div className="bg-white dark:bg-white/5 border border-slate-150 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="mb-6">
                  <h4 className="text-xl md:text-2xl font-bold text-primary dark:text-white mb-1.5">
                    Departments & Expertise in Consultancy
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Our diverse departments bring specialized knowledge and expertise to address complex challenges.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(showAllDepartments
                    ? selectedCampus.departments
                    : selectedCampus.departments.slice(0, 6)
                  ).map((dept, index) => (
                    <Link
                      key={index}
                      to={`/campus/${selectedCampus.id}/department/${getDeptSlug(dept.name)}`}
                      onClick={() => onClose()}
                      className="bg-slate-50/50 dark:bg-slate-900/10 p-4 rounded-xl border border-slate-100/50 dark:border-white/5 flex flex-col justify-start hover:bg-slate-100 dark:hover:bg-slate-900/25 hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 text-primary dark:text-sky-blue rounded-full flex items-center justify-center flex-shrink-0">
                          {renderIcon(dept.iconName, "h-4.5 w-4.5")}
                        </div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-primary dark:group-hover:text-sky-blue transition-colors">
                          {dept.name}
                        </h5>
                      </div>
                      <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed pl-1 line-clamp-2 mt-1">
                        {dept.expertise
                          .map((exp) => {
                            const colonIndex = exp.indexOf(":");
                            return colonIndex !== -1 ? exp.slice(0, colonIndex).trim() : exp;
                          })
                          .join(", ")}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* View All Departments Button */}
                {selectedCampus.departments.length > 6 && (
                  <div className="flex justify-center mt-8 pt-4 border-t border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => setShowAllDepartments(!showAllDepartments)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary-light hover:underline group cursor-pointer focus:outline-none"
                    >
                      {showAllDepartments ? "View Less" : "View All Departments"}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          showAllDepartments ? "rotate-90" : "group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Projects List */}
              <div id="modal-projects-section" className="pt-8 border-t border-slate-200 dark:border-white/5 space-y-6">
                {/* Active Projects Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-850 dark:text-white">
                      <Award className="h-5 w-5 text-accent" />
                      Active Projects
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900 dark:text-green-300"
                    >
                      {activeProjects.length} Active
                    </Badge>
                  </div>

                  {activeProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeProjects.map((project) => (
                        <Card key={project.id} className="hover:shadow-md transition-shadow overflow-hidden">
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getPriorityColor(
                                  project.priority
                                )}`}
                              >
                                {project.priority} Priority
                              </span>
                            </div>
                          </div>

                          <CardHeader className="p-4 pb-2">
                            <Badge variant="outline" className="text-[10px] w-fit mb-1">
                              {project.category}
                            </Badge>
                            <CardTitle className="text-base line-clamp-1">{project.title}</CardTitle>
                            <CardDescription className="text-xs line-clamp-2 mt-1">
                              {project.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="p-4 pt-0 space-y-3">
                            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              Started: {project.startDate}
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-[10px] py-0 px-2">
                                  <Tag className="w-2.5 h-2.5 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 2 && (
                                <Badge variant="outline" className="text-[10px] py-0 px-2">
                                  +{project.tags.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-450 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl border border-dashed border-slate-200 dark:border-white/5">
                      <Award className="h-10 w-10 mx-auto mb-2 text-slate-350 dark:text-slate-650" />
                      <p className="text-sm">No active projects at this campus currently.</p>
                    </div>
                  )}
                </div>

                {/* Past Projects Grid */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-850 dark:text-white">
                      <Briefcase className="h-5 w-5 text-slate-500" />
                      Past Projects
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300"
                    >
                      {completedProjects.length} Completed
                    </Badge>
                  </div>

                  {completedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {completedProjects.map((project) => (
                        <Card key={project.id} className="hover:shadow-md transition-shadow overflow-hidden opacity-95">
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getPriorityColor(
                                  project.priority
                                )}`}
                              >
                                {project.priority} Priority
                              </span>
                            </div>
                            <div className="absolute top-2.5 right-2.5">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800">
                                Completed
                              </span>
                            </div>
                          </div>

                          <CardHeader className="p-4 pb-2">
                            <Badge variant="outline" className="text-[10px] w-fit mb-1">
                              {project.category}
                            </Badge>
                            <CardTitle className="text-base line-clamp-1">{project.title}</CardTitle>
                            <CardDescription className="text-xs line-clamp-2 mt-1">
                              {project.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="p-4 pt-0 space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <div className="flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                {project.startDate}
                              </div>
                              {project.endDate && (
                                <div className="text-[10px] font-medium text-slate-400">
                                  Completed: {project.endDate}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-[10px] py-0 px-2">
                                  <Tag className="w-2.5 h-2.5 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 2 && (
                                <Badge variant="outline" className="text-[10px] py-0 px-2">
                                  +{project.tags.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-450 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl border border-dashed border-slate-200 dark:border-white/5">
                      <Briefcase className="h-10 w-10 mx-auto mb-2 text-slate-350 dark:text-slate-650" />
                      <p className="text-sm">No completed projects to display yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action/Close buttons in footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-250/50 dark:border-white/5">
                <Button variant="outline" asChild>
                  <Link
                    to={`/campus/${selectedCampus.id}`}
                    onClick={() => onClose()}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Campus Page
                  </Link>
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                  type="button"
                >
                  Close Overview
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CampusModal;

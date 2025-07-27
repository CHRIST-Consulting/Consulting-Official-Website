import React from "react";
import {
  MapPin,
  Briefcase,
  ExternalLink,
  Star,
  Clock,
  Tag,
  Award,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Button } from "./Button";
import { ScrollArea } from "./scroll-area";
import {
  calculateCampusStats,
  getActiveProjects,
  getCompletedProjects,
} from "../../utils/campusUtils";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Planning" | "Completed";
  startDate: string;
  endDate?: string;
  teamSize: number;
  category: string;
  image: string;
  tags: string[];
  priority: "High" | "Medium" | "Low";
}

interface Campus {
  name: string;
  location: string;
  image: string;
  description: string;
  link: string;
  projects: Project[];
  stats: {
    totalProjects: number;
    activeProjects: number;
    studentsInvolved: number;
    completionRate: string;
  };
}

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
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!campus) return null;

  // Use utility functions for consistent data calculation
  const campusStats = calculateCampusStats(campus);
  const activeProjects = getActiveProjects(campus);
  const completedProjects = getCompletedProjects(campus);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-r from-primary to-sky-blue">
          <img
            src={campus.image}
            alt={campus.name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110 border border-white/30 z-50 cursor-pointer"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5 text-white pointer-events-none" />
          </button>

          <div className="relative p-8 h-full flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-white/20 text-white border-white/30">
                <MapPin className="w-3 h-3 mr-1" />
                {campus.location}
              </Badge>
            </div>
            <DialogHeader className="text-left">
              <DialogTitle className="text-4xl font-bold text-white">
                {campus.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-white/90">
                {campus.description}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(90vh-16rem)]">
          <div className="p-8 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Projects
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-sky-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campusStats.totalProjects}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All projects combined
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {campusStats.activeProjects} Active +{" "}
                    {campusStats.completedProjects} Completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <Star className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campusStats.activeProjects}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently running
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Projects
                  </CardTitle>
                  <Award className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campusStats.completedProjects}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Successfully finished
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Projects */}
            <div className="space-y-8">
              {/* Active Projects Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Award className="h-6 w-6 text-accent" />
                    Active Projects
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-800"
                  >
                    {campusStats.activeProjects} Active
                  </Badge>
                </div>

                {activeProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                project.priority
                              )}`}
                            >
                              {project.priority}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </div>
                        </div>

                        <CardHeader>
                          <Badge variant="outline" className="text-xs w-fit">
                            {project.category}
                          </Badge>
                          <CardTitle className="text-lg">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            Started: {project.startDate}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No active projects at this campus currently.</p>
                  </div>
                )}
              </div>

              {/* Past Projects Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-slate-600" />
                    Past Projects
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-gray-50 border-gray-200 text-gray-800"
                  >
                    {campusStats.completedProjects} Completed
                  </Badge>
                </div>

                {completedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="hover:shadow-lg transition-shadow opacity-90"
                      >
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                project.priority
                              )}`}
                            >
                              {project.priority}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Completed
                            </span>
                          </div>
                        </div>

                        <CardHeader>
                          <Badge variant="outline" className="text-xs w-fit">
                            {project.category}
                          </Badge>
                          <CardTitle className="text-lg">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {project.startDate}
                            </div>
                            {project.endDate && (
                              <div className="text-xs text-gray-500">
                                Completed: {project.endDate}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No completed projects to display yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
              <Button variant="outline" asChild>
                <a
                  href={campus.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Campus Page
                </a>
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                type="button"
              >
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CampusModal;

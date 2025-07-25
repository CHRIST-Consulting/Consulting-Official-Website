import { Campus, Project } from "../data/CampusesData";

export interface CampusStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  planningProjects: number;
  studentsInvolved: number;
  completionRate: string;
}

/**
 * Calculate dynamic stats for a campus based on its projects
 */
export const calculateCampusStats = (campus: Campus): CampusStats => {
  const projects = campus.projects || [];

  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const planningProjects = projects.filter(
    (p) => p.status === "Planning"
  ).length;

  // Total projects only includes Active + Completed (Planning projects are not shown in modal)
  const totalProjects = activeProjects + completedProjects;

  // Calculate completion rate based on completed vs displayed total projects
  const completionRate =
    totalProjects > 0
      ? `${Math.round((completedProjects / totalProjects) * 100)}%`
      : "0%";

  // Use the original studentsInvolved from stats as it's not project-based
  const studentsInvolved = campus.stats?.studentsInvolved || 0;

  return {
    totalProjects,
    activeProjects,
    completedProjects,
    planningProjects,
    studentsInvolved,
    completionRate,
  };
};

/**
 * Get active projects for a campus
 */
export const getActiveProjects = (campus: Campus): Project[] => {
  return campus.projects?.filter((p) => p.status === "Active") || [];
};

/**
 * Get completed projects for a campus
 */
export const getCompletedProjects = (campus: Campus): Project[] => {
  return campus.projects?.filter((p) => p.status === "Completed") || [];
};

/**
 * Get planning projects for a campus
 */
export const getPlanningProjects = (campus: Campus): Project[] => {
  return campus.projects?.filter((p) => p.status === "Planning") || [];
};

"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/site";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./SkeletonLoader";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading
        ? Array.from({ length: projects.length || 3 }).map((_, i) => (
            <ProjectCardSkeleton key={`skeleton-${i}`} />
          ))
        : projects.map((project, index) => (
            <div
              key={project.slug}
              className="animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
    </div>
  );
}

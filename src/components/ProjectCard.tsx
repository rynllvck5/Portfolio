"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site";
import { Tooltip } from "./Tooltip";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md dark:border-slate-700 dark:bg-surface-card dark:hover:border-accent/40">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={project.featuredImage}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            dateTime={project.date}
            className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </time>
          <h3 className="mb-2 text-lg font-semibold text-slate-900 transition group-hover:text-accent dark:text-white dark:group-hover:text-accent-light">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>
          <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >
                {item}
              </li>
            ))}
            {project.tech.length > 4 && (
              <li className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700">
                +{project.tech.length - 4}
              </li>
            )}
          </ul>
          <span className="inline-flex items-center text-sm font-medium text-accent dark:text-accent-light">
            View case study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-1 transition group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
      <div className="flex gap-2 border-t border-slate-100 px-5 py-3 dark:border-slate-700">
        {project.repo ? (
          <Tooltip content="View repository">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-accent dark:hover:bg-slate-700 dark:hover:text-accent-light"
              aria-label={`${project.title} repository`}
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon />
            </a>
          </Tooltip>
        ) : (
          <span className="rounded-md px-2 py-1 text-xs text-slate-400">
            {project.repoLabel ?? "Private Repository"}
          </span>
        )}
        {project.demo && (
          <Tooltip content="Live demo">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-accent dark:hover:bg-slate-700 dark:hover:text-accent-light"
              aria-label={`${project.title} live demo`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalIcon />
            </a>
          </Tooltip>
        )}
      </div>
    </article>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.005-.54-1.695-.945-1.695-1.905 0-.825.945-1.605 2.475-1.605 1.44 0 2.16.945 2.535 1.875.135.345.72.945 1.23.945.495 0 1.005-.225 1.575-.855 2.685-.555 2.685-1.875 2.685-2.475 0-.195-.015-.375-.045-.555 2.295-1.635 3.555-3.885 3.555-6.495 0-1.485-.525-2.7-1.395-3.675-.135-.165-.6-.84.135-1.755 0 0 1.14-.345 3.735 1.395 1.08-.3 2.25-.45 3.405-.45 1.155 0 2.325.15 3.405.45 2.595-1.74 3.735-1.395 3.735-1.395.735.915.27 1.59.135 1.755.87.975 1.395 2.19 1.395 3.675 0 2.625-1.275 4.875-3.555 6.495.3.27.585.78.585 1.575 0 1.14-.015 2.055-.015 2.34 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

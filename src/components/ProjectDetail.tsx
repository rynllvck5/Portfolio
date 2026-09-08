"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "@/lib/site";
import { ProjectPageSkeleton } from "./SkeletonLoader";
import { Tooltip } from "./Tooltip";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [project.slug]);

  if (loading) {
    return <ProjectPageSkeleton />;
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 animate-fade-in">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center text-sm font-medium text-accent hover:underline dark:text-accent-light"
      >
        ← Back to projects
      </Link>

      <header className="mb-8">
        <time
          dateTime={project.date}
          className="text-sm font-medium uppercase tracking-wide text-slate-400"
        >
          {new Date(project.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        <p className="mt-2 text-sm font-medium text-accent dark:text-accent-light">
          Role: {project.role}
        </p>
      </header>

      <div className="relative mb-10 aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <Image
          src={project.featuredImage}
          alt={`${project.title} featured image`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        <Section title="Problem" content={project.problem} />
        <Section title="Approach" content={project.approach} />
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Results
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-8 dark:border-slate-700">
        {project.repo ? (
          <Tooltip content="View source code on GitHub">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              View Repository
            </a>
          </Tooltip>
        ) : (
          <span className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
            {project.repoLabel ?? "Private Repository"}
          </span>
        )}
        {project.demo && (
          <Tooltip content="Open live demo">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent px-4 py-2.5 text-sm font-medium text-accent transition hover:bg-accent hover:text-white dark:border-accent-light dark:text-accent-light dark:hover:bg-accent dark:hover:text-white"
            >
              Live Demo
            </a>
          </Tooltip>
        )}
      </div>
    </article>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{content}</p>
    </div>
  );
}

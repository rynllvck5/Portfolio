import Link from "next/link";
import type { ResumeData } from "@/lib/resume";
import { siteConfig } from "@/lib/site";
import { Tooltip } from "@/components/Tooltip";

interface ResumeViewProps {
  data: ResumeData;
  showDownload?: boolean;
}

export function ResumeView({ data, showDownload = true }: ResumeViewProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 print:py-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 print:hidden">
        <Link href="/" className="text-sm font-medium text-accent hover:underline dark:text-accent-light">
          ← Back to home
        </Link>
        {showDownload && (
          <Tooltip content="Download software-focused PDF resume">
            <a
              href="/resume.pdf"
              download
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              Download PDF
            </a>
          </Tooltip>
        )}
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-surface-card print:border-0 print:shadow-none">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-700">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">{data.variant}</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{siteConfig.name}</h1>
          <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">{data.headline}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span>{siteConfig.location}</span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
              {siteConfig.email}
            </a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              GitHub
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              LinkedIn
            </a>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{data.summary}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.school} className="mt-3">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{edu.degree}</h3>
                <span className="text-sm text-slate-500">{edu.period}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {edu.school} · {edu.location}
                {edu.honors && <span className="font-medium text-accent"> · {edu.honors}</span>}
              </p>
              {edu.details && (
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600 dark:text-slate-300">
                  {edu.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Experience</h2>
          {data.experience.map((exp) => (
            <div key={`${exp.org}-${exp.title}`} className="mt-4">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{exp.title}</h3>
                <span className="text-sm text-slate-500">{exp.period}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {exp.org} · {exp.location}
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.name} className="mt-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                {project.name}{" "}
                <span className="font-normal text-slate-500">· {project.tech}</span>
              </h3>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {project.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">Skills</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {Object.entries(data.skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">{category}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

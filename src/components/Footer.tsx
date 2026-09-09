import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Tooltip } from "./Tooltip";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-surface-dark">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} Raynell<span className="text-accent">.</span> Built with Next.js & Tailwind.
        </p>
        <div className="flex items-center gap-4">
          <Tooltip content="GitHub profile">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition hover:text-accent dark:text-slate-400 dark:hover:text-accent-light"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
          </Tooltip>
          <Tooltip content="LinkedIn profile">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition hover:text-accent dark:text-slate-400 dark:hover:text-accent-light"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </Tooltip>
          <Tooltip content="Send email">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-slate-500 transition hover:text-accent dark:text-slate-400 dark:hover:text-accent-light"
              aria-label="Email Raynell"
            >
              <MailIcon />
            </a>
          </Tooltip>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-3 text-center dark:border-slate-800">
        <p className="text-xs text-slate-400">
          Alternate resume versions:{" "}
          <Link href="/resume/software" className="underline hover:text-accent">
            Software
          </Link>
          {" · "}
          <Link href="/resume/it-support" className="underline hover:text-accent">
            IT Support
          </Link>
          {" · "}
          <Link href="/resume/networking" className="underline hover:text-accent">
            Networking
          </Link>
          {" · "}
          <Link href="/resume/general-tech" className="underline hover:text-accent">
            General Tech
          </Link>
        </p>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.005-.54-1.695-.945-1.695-1.905 0-.825.945-1.605 2.475-1.605 1.44 0 2.16.945 2.535 1.875.135.345.72.945 1.23.945.495 0 1.005-.225 1.575-.855 2.685-.555 2.685-1.875 2.685-2.475 0-.195-.015-.375-.045-.555 2.295-1.635 3.555-3.885 3.555-6.495 0-1.485-.525-2.7-1.395-3.675-.135-.165-.6-.84.135-1.755 0 0 1.14-.345 3.735 1.395 1.08-.3 2.25-.45 3.405-.45 1.155 0 2.325.15 3.405.45 2.595-1.74 3.735-1.395 3.735-1.395.735.915.27 1.59.135 1.755.87.975 1.395 2.19 1.395 3.675 0 2.625-1.275 4.875-3.555 6.495.3.27.585.78.585 1.575 0 1.14-.015 2.055-.015 2.34 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

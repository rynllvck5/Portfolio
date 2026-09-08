import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getFeaturedProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Tooltip } from "@/components/Tooltip";

export default function HomePage() {
  const projects = getFeaturedProjects();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Computer Science Graduate",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bauang",
      addressRegion: "La Union",
      addressCountry: "PH",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-surface-muted dark:border-slate-700 dark:from-surface-dark dark:to-surface-dark"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
          <div className="animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {siteConfig.heroStatement}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {siteConfig.location} · Open to remote, hybrid, or on-site
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Tooltip content="Browse featured projects">
                <Link
                  href="#projects"
                  className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View Projects
                </Link>
              </Tooltip>
              <Tooltip content="Download resume PDF">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-600 dark:text-slate-200 dark:hover:border-accent-light dark:hover:text-accent-light"
                >
                  Download Resume
                </a>
              </Tooltip>
            </div>
          </div>
          <div
            className="relative mx-auto h-48 w-48 animate-fade-in overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-700 sm:h-56 sm:w-56"
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
          >
            <Image
              src="/images/profile_picture.png"
              alt="Portrait of Raynell Vick F. Abuan"
              fill
              className="object-cover"
              priority
              sizes="224px"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="About" subtitle="Who I am and what I'm looking for" />
        <div className="prose prose-slate max-w-3xl dark:prose-invert">
          <ReactMarkdown>{siteConfig.about}</ReactMarkdown>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="border-y border-slate-200 bg-white dark:border-slate-700 dark:bg-surface-card/50"
      >
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading title="Skills" subtitle="Technologies and strengths" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <SkillGroup title="Languages" items={siteConfig.skills.languages} />
            <SkillGroup title="Frameworks" items={siteConfig.skills.frameworks} />
            <SkillGroup title="Tools" items={siteConfig.skills.tools} />
            <SkillGroup title="Soft Skills" items={siteConfig.skills.soft} />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="Projects" subtitle="Selected work from thesis, internship, and coursework" />
        <ProjectsSection projects={projects} />
      </section>

      {/* Resume CTA */}
      <section
        id="resume"
        className="border-y border-slate-200 bg-surface-muted dark:border-slate-700 dark:bg-surface-dark"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resume</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            View my experience online or download the PDF version tailored for software roles.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/resume"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              HTML Resume
            </Link>
            <a
              href="/resume.pdf"
              download
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-accent dark:border-slate-600 dark:text-slate-200"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="Contact" subtitle="Let's connect" />
        <div className="grid gap-6 sm:grid-cols-3">
          <ContactCard
            label="Email"
            value={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
          />
          <ContactCard label="GitHub" value="rynllvck5" href={siteConfig.github} external />
          <ContactCard
            label="LinkedIn"
            value="linkedin.com/in/rynllvck"
            href={siteConfig.linkedin}
            external
          />
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent dark:text-accent-light">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactCard({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md dark:border-slate-700 dark:bg-surface-card"
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</p>
    </a>
  );
}

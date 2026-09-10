import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getFeaturedProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Tooltip } from "@/components/Tooltip";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SkillsSection } from "@/components/skills";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  const projects = getFeaturedProjects();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Software Developer",
    description: siteConfig.heroStatement,
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
      <Hero />

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <AnimatedSection>
          <SectionHeading title="About" subtitle="Who I am and what I'm looking for" />
          <div className="prose prose-slate max-w-3xl dark:prose-invert">
            <ReactMarkdown>{siteConfig.about}</ReactMarkdown>
          </div>
        </AnimatedSection>
      </section>

      {/* Skills */}
      <AnimatedSection>
        <SkillsSection title="Skills" subtitle="Technologies and strengths" />
      </AnimatedSection>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
        <AnimatedSection>
          <SectionHeading title="Projects" subtitle="Selected work from thesis, internship, and coursework" />
          <ProjectsSection projects={projects} />
        </AnimatedSection>
      </section>

      {/* Resume CTA */}
      <section
        id="resume"
        className="border-y border-slate-200 bg-surface-muted dark:border-slate-700 dark:bg-surface-dark"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <AnimatedSection>
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
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <AnimatedSection>
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
        </AnimatedSection>
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

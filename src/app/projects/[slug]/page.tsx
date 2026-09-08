import type { Metadata } from "next";
import Link from "next/link";
import { getProjectSlugs, getProjectBySlug } from "@/lib/content";
import { ProjectDetail } from "@/components/ProjectDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.featuredImage, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/#projects" className="mt-4 inline-block text-accent hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    programmingLanguage: project.tech,
    codeRepository: project.repo,
    author: {
      "@type": "Person",
      name: "Raynell Vick F. Abuan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}

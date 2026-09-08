export interface ProjectFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  repoLabel?: string;
  featuredImage: string;
  featured: boolean;
  role: string;
  problem: string;
  approach: string;
  results: string[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export const siteConfig = {
  name: "Raynell Vick F. Abuan",
  title: "Raynell Abuan | Portfolio",
  description:
    "Magna Cum Laude CS graduate seeking impactful software and tech opportunities. Open to software development, IT support, networking, and more.",
  url: "https://raynell-abuan.vercel.app",
  email: "abuanrenren4@gmail.com",
  github: "https://github.com/rynllvck5",
  linkedin: "https://www.linkedin.com/in/rynllvck",
  heroStatement:
    "Recent CS grad seeking to build impactful software with modern tools and solid fundamentals.",
  about: `I'm **Raynell Vick F. Abuan**, a **Magna Cum Laude** Computer Science graduate from Parian Oeste, Bauang, La Union. I'm looking for a **full-time role** in tech — remote, hybrid, or on-site — and I'm **open to relocating** for the right opportunity.

While I'm especially interested in **software development**, I'm also open to other paths like **IT support**, **networking**, and related roles; I'm **willing to learn** and **adapt quickly** to new tools and responsibilities. I like working on **practical apps and tools that solve everyday problems**.

Outside of work, I unwind with **anime** and **gaming**.`,
  location: "Bauang, La Union, Philippines",
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "PHP", "Dart", "SQL"],
    frameworks: [
      "React",
      "Node.js",
      "Express",
      "Next.js",
      "Flutter",
      "Expo",
      "Android Studio",
    ],
    tools: [
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Git",
      "GitHub",
      "Arduino",
      "Ozeki SMS",
      "REST APIs",
    ],
    soft: [
      "Team Leadership",
      "Project Management",
      "Adaptability",
      "Problem Solving",
      "Communication",
    ],
  },
};

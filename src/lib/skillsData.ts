import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiKotlin,
  SiPhp,
  SiDart,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiGit,
  SiGithub,
  SiAndroidstudio,
  SiExpo,
  SiArduino,
  SiPostman,
} from "react-icons/si";
import {
  FaUsers,
  FaBriefcase,
  FaLightbulb,
  FaCode,
  FaDatabase,
} from "react-icons/fa";
import { LuRefreshCw, LuMessageSquare } from "react-icons/lu";

export type SkillCategory = "All" | "Languages" | "Frameworks" | "Tools" | "Soft Skills";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export const skillsData: Skill[] = [
  // Languages
  {
    name: "JavaScript",
    category: "Languages",
    icon: SiJavascript,
    description: "Dynamic web development",
  },
  {
    name: "TypeScript",
    category: "Languages",
    icon: SiTypescript,
    description: "Type-safe JavaScript",
  },
  {
    name: "Python",
    category: "Languages",
    icon: SiPython,
    description: "Backend and scripting",
  },
  {
    name: "Java",
    category: "Languages",
    icon: FaCode,
    description: "Enterprise applications",
  },
  {
    name: "Kotlin",
    category: "Languages",
    icon: SiKotlin,
    description: "Android development",
  },
  {
    name: "PHP",
    category: "Languages",
    icon: SiPhp,
    description: "Server-side scripting",
  },
  {
    name: "Dart",
    category: "Languages",
    icon: SiDart,
    description: "Flutter language",
  },
  {
    name: "SQL",
    category: "Languages",
    icon: FaDatabase,
    description: "Database queries",
  },

  // Frameworks
  {
    name: "React",
    category: "Frameworks",
    icon: SiReact,
    description: "Frontend library",
  },
  {
    name: "Node.js",
    category: "Frameworks",
    icon: SiNodedotjs,
    description: "JavaScript runtime",
  },
  {
    name: "Express",
    category: "Frameworks",
    icon: SiExpress,
    description: "Web framework",
  },
  {
    name: "Next.js",
    category: "Frameworks",
    icon: SiNextdotjs,
    description: "React framework",
  },
  {
    name: "Flutter",
    category: "Frameworks",
    icon: SiFlutter,
    description: "Cross-platform apps",
  },
  {
    name: "Expo",
    category: "Frameworks",
    icon: SiExpo,
    description: "React Native tooling",
  },
  {
    name: "Android Studio",
    category: "Frameworks",
    icon: SiAndroidstudio,
    description: "Android development",
  },

  // Tools
  {
    name: "PostgreSQL",
    category: "Tools",
    icon: SiPostgresql,
    description: "Relational database",
  },
  {
    name: "MySQL",
    category: "Tools",
    icon: SiMysql,
    description: "Database management",
  },
  {
    name: "Docker",
    category: "Tools",
    icon: SiDocker,
    description: "Containerization",
  },
  {
    name: "Git",
    category: "Tools",
    icon: SiGit,
    description: "Version control",
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: SiGithub,
    description: "Code hosting",
  },
  {
    name: "Arduino",
    category: "Tools",
    icon: SiArduino,
    description: "Embedded systems",
  },
  {
    name: "Ozeki SMS",
    category: "Tools",
    icon: SiPostman,
    description: "SMS gateway",
  },
  {
    name: "REST APIs",
    category: "Tools",
    icon: SiPostman,
    description: "API integration",
  },

  // Soft Skills
  {
    name: "Team Leadership",
    category: "Soft Skills",
    icon: FaUsers,
    description: "Leading teams effectively",
  },
  {
    name: "Project Management",
    category: "Soft Skills",
    icon: FaBriefcase,
    description: "Managing projects",
  },
  {
    name: "Adaptability",
    category: "Soft Skills",
    icon: LuRefreshCw,
    description: "Adapting to change",
  },
  {
    name: "Problem Solving",
    category: "Soft Skills",
    icon: FaLightbulb,
    description: "Solving complex problems",
  },
  {
    name: "Communication",
    category: "Soft Skills",
    icon: LuMessageSquare,
    description: "Clear communication",
  },
];

export const categories: SkillCategory[] = [
  "All",
  "Languages",
  "Frameworks",
  "Tools",
  "Soft Skills",
];

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  if (category === "All") {
    return skillsData;
  }
  return skillsData.filter((skill) => skill.category === category);
}

export interface ResumeData {
  variant: string;
  headline: string;
  summary: string;
  education: {
    school: string;
    degree: string;
    honors?: string;
    location: string;
    period: string;
    details?: string[];
  }[];
  experience: {
    title: string;
    org: string;
    location: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    tech: string;
    bullets: string[];
  }[];
  skills: Record<string, string[]>;
  certifications?: string[];
}

const baseEducation = [
  {
    school: "College of Computer Science",
    degree: "Bachelor of Science in Computer Science",
    honors: "Magna Cum Laude",
    location: "La Union, Philippines",
    period: "2021 – 2025",
    details: [
      "College Best Thesis — Governance Category (GovConnect)",
      "Relevant coursework: Web Development, Application Development, OOP, Software Engineering",
    ],
  },
];

const baseProjects = [
  {
    name: "GovConnect — LGU CMS Platform",
    tech: "PERN Stack",
    bullets: [
      "Thesis project: editable CMS for government websites, adaptable for other LGUs",
      "Sole developer and team lead; awarded College Best Thesis under Governance",
    ],
  },
  {
    name: "DOST R1 Monthly Consumption Monitoring",
    tech: "PERN Stack, Docker",
    bullets: [
      "Internship project monitoring electricity and fuel consumption for DOST Region I",
      "Project manager and lead developer; deployed and in use by the agency",
    ],
  },
  {
    name: "Flag Ceremony Attendance App",
    tech: "TypeScript, Expo, React Native",
    bullets: [
      "Mobile app for tracking student attendance at flag ceremonies",
      "Sole developer and team lead for CCS group project",
    ],
  },
  {
    name: "QR + Fingerprint Attendance Checker",
    tech: "Kotlin, Android Studio, Arduino",
    bullets: [
      "Combined software and hardware attendance verification using QR codes and fingerprint",
      "Sole developer and team lead; integrated Arduino with Android application",
    ],
  },
  {
    name: "SMS Voting System",
    tech: "Flutter, PHP, MySQL, Ozeki SMS",
    bullets: [
      "SMS-based voting platform using Ozeki gateway; midterm and enhanced final versions",
      "Sole developer in group projects for Application Development course",
    ],
  },
];

export const softwareResume: ResumeData = {
  variant: "Software Development",
  headline: "Software Developer · CS Graduate · Magna Cum Laude",
  summary:
    "Magna Cum Laude Computer Science graduate with hands-on experience building full-stack web applications, mobile apps, and integrated hardware projects. Proven leadership as team lead and project manager on thesis, internship, and coursework deliverables. Comfortable with the PERN stack, mobile development, and learning new tools quickly.",
  education: baseEducation,
  experience: [
    {
      title: "Lead Developer & Project Manager (Internship)",
      org: "DOST Region I",
      location: "La Union, Philippines",
      period: "2025",
      bullets: [
        "Led development of a monthly electricity and fuel consumption monitoring system",
        "Managed project timeline, deliverables, and deployment using Docker",
        "Built full-stack application with PostgreSQL, Express, React, and Node.js",
      ],
    },
    {
      title: "Thesis Lead Developer",
      org: "GovConnect — Capstone Project",
      location: "La Union, Philippines",
      period: "2024 – 2025",
      bullets: [
        "Designed and built a CMS platform for LGU government websites",
        "Sole developer; led team and delivered College Best Thesis (Governance)",
        "Architected adaptable system reusable by other local government units",
      ],
    },
  ],
  projects: baseProjects,
  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "PHP", "Dart", "SQL"],
    Frameworks: ["React", "Node.js", "Express", "Next.js", "Flutter", "Expo"],
    Tools: ["PostgreSQL", "MySQL", "Docker", "Git", "Android Studio", "Arduino", "Ozeki SMS"],
    Strengths: ["Team Leadership", "Project Management", "Problem Solving", "Adaptability"],
  },
};

export const itSupportResume: ResumeData = {
  variant: "IT Support",
  headline: "IT Support · CS Graduate · Magna Cum Laude",
  summary:
    "Magna Cum Laude Computer Science graduate with practical experience supporting operational systems, troubleshooting hardware-software integrations, and delivering reliable tools for agency use. Strong foundation in systems setup, user-facing applications, and quick adaptation to new environments.",
  education: baseEducation,
  experience: [
    {
      title: "Project Manager & Lead Developer (Internship)",
      org: "DOST Region I",
      location: "La Union, Philippines",
      period: "2025",
      bullets: [
        "Delivered and maintained monitoring system actively used by DOST Region I staff",
        "Coordinated deployment with Docker and ensured system reliability",
        "Supported agency workflow for tracking electricity and fuel consumption",
      ],
    },
    {
      title: "Hardware-Software Integration Developer",
      org: "QR + Fingerprint Attendance Project",
      location: "La Union, Philippines",
      period: "2024",
      bullets: [
        "Integrated Arduino hardware with Android application for attendance verification",
        "Configured QR code and fingerprint modules for reliable check-in",
        "Sole developer and team lead for combined hardware/software solution",
      ],
    },
  ],
  projects: [
    baseProjects[1],
    baseProjects[3],
    {
      name: "GovConnect — LGU CMS Platform",
      tech: "PERN Stack",
      bullets: [
        "Built and maintained CMS used for government website content management",
        "Ensured editable modules and adaptable configuration for different LGU needs",
      ],
    },
  ],
  skills: {
    Technical: [
      "Hardware Troubleshooting",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "Android",
      "Arduino",
      "REST APIs",
    ],
    Support: [
      "System Deployment",
      "User-Facing Applications",
      "Documentation",
      "Issue Diagnosis",
    ],
    Soft: ["Communication", "Adaptability", "Team Leadership", "Time Management"],
  },
};

export const networkingResume: ResumeData = {
  variant: "Networking & Infrastructure",
  headline: "Networking / IT · CS Graduate · Magna Cum Laude",
  summary:
    "Computer Science graduate with experience deploying containerized applications, integrating connected devices, and building systems that depend on reliable data flow between clients, servers, and hardware. Eager to grow in networking, infrastructure, and systems administration roles.",
  education: baseEducation,
  experience: [
    {
      title: "Lead Developer (Internship)",
      org: "DOST Region I",
      location: "La Union, Philippines",
      period: "2025",
      bullets: [
        "Deployed monitoring system with Docker for agency infrastructure",
        "Built client-server architecture with PostgreSQL backend and React frontend",
        "Delivered production system for operational resource tracking",
      ],
    },
  ],
  projects: [
    baseProjects[1],
    baseProjects[3],
    {
      name: "SMS Voting System",
      tech: "Flutter, PHP, MySQL, Ozeki SMS",
      bullets: [
        "Integrated Ozeki SMS gateway for message-based voting workflows",
        "Connected mobile frontend with PHP/MySQL backend services",
      ],
    },
  ],
  skills: {
    Infrastructure: ["Docker", "Client-Server Architecture", "REST APIs", "PostgreSQL", "MySQL"],
    Connected: ["Arduino", "Hardware Integration", "SMS Gateways (Ozeki)", "Android"],
    Foundations: ["Linux Basics", "Git", "JavaScript", "Python", "SQL"],
    Soft: ["Problem Solving", "Adaptability", "Project Management", "Documentation"],
  },
};

export const generalTechResume: ResumeData = {
  variant: "General Technology",
  headline: "Technology Graduate · Magna Cum Laude · Open to Multiple Roles",
  summary:
    "Magna Cum Laude Computer Science graduate open to software development, IT support, networking, and related technology roles. Demonstrated ability to lead projects, learn new stacks quickly, and deliver practical solutions from mobile apps to agency systems and hardware integrations.",
  education: baseEducation,
  experience: [
    {
      title: "Intern — Project Manager & Lead Developer",
      org: "DOST Region I",
      location: "La Union, Philippines",
      period: "2025",
      bullets: [
        "Led agency monitoring system from development through deployment",
        "Managed team coordination and technical delivery under internship timeline",
      ],
    },
    {
      title: "Thesis Lead — GovConnect",
      org: "Capstone Project",
      location: "La Union, Philippines",
      period: "2024 – 2025",
      bullets: [
        "College Best Thesis (Governance); sole developer and team lead",
      ],
    },
  ],
  projects: baseProjects.slice(0, 4),
  skills: {
    Development: ["JavaScript", "TypeScript", "React", "Node.js", "Flutter", "Kotlin", "PHP"],
    Systems: ["Docker", "PostgreSQL", "MySQL", "Arduino", "Android Studio"],
    Universal: ["Git", "Leadership", "Adaptability", "Communication", "Problem Solving"],
  },
};

export const resumeVariants = {
  software: softwareResume,
  "it-support": itSupportResume,
  networking: networkingResume,
  "general-tech": generalTechResume,
} as const;

export type ResumeVariant = keyof typeof resumeVariants;

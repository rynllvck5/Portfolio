"use client";

import React, { useState, useEffect } from "react";
import { SkillCategory, getSkillsByCategory } from "@/lib/skillsData";
import { SkillSphere } from "./SkillSphere";
import { SkillCategoryTabs } from "./SkillCategoryTabs";
import { SkillList } from "./SkillList";

interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
}

export function SkillsSection({
  title = "Skills",
  subtitle = "Technologies and strengths",
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if mobile and handle hydration
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    setMounted(true);
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const currentSkills = getSkillsByCategory(activeCategory);

  return (
    <section
      id="skills"
      className="border-y border-slate-200 bg-white dark:border-slate-700 dark:bg-surface-card/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>

        {/* Main content - Two column layout */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-4">
          {/* Left column - Skill list */}
          <div className="order-2 min-w-0 md:order-1 md:min-h-[280px]">
            <SkillList
              skills={currentSkills}
              category={activeCategory}
            />
          </div>

          {/* Right column - 3D Skill Sphere, flush to the far right and vertically centered */}
          <div className="order-1 flex items-center justify-center md:order-2 md:w-[280px] md:justify-end md:self-stretch">
            <SkillSphere
              category={activeCategory}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-8">
          <SkillCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { SkillCategory, categories } from "@/lib/skillsData";

interface SkillCategoryTabsProps {
  activeCategory: SkillCategory;
  onCategoryChange: (category: SkillCategory) => void;
}

export function SkillCategoryTabs({
  activeCategory,
  onCategoryChange,
}: SkillCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            ${
              activeCategory === category
                ? "bg-accent text-white shadow-md hover:bg-accent-dark"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }
          `}
          aria-label={`Filter by ${category}`}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

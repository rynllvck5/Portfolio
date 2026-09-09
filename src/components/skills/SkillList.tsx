"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skill, SkillCategory } from "@/lib/skillsData";

interface SkillListProps {
  skills: Skill[];
  category: SkillCategory;
}

function pickColumns(count: number, width: number): number {
  if (width > 0 && width < 380) {
    return Math.min(2, count);
  }
  if (count <= 3) return Math.min(count, 2);
  if (count <= 5) return 2;
  if (count <= 6) return 3;
  if (count <= 10) return width > 0 && width < 520 ? 3 : 4;
  return 4;
}

export function SkillList({ skills }: SkillListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setBox({ width: el.clientWidth, height: el.clientHeight });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [skills.length]);

  const count = skills.length;
  const cols = pickColumns(count, box.width);
  const rows = Math.max(1, Math.ceil(count / cols));
  const gap = count > 16 ? 8 : count > 8 ? 10 : 12;
  const compact = count > 16;
  const minHeight = compact ? undefined : 280;

  const cellW =
    box.width > 0 ? (box.width - gap * (cols - 1)) / cols : 160;
  const cellH =
    box.height > 0 ? (box.height - gap * (rows - 1)) / rows : compact ? 56 : 88;

  const iconPx = Math.round(
    Math.min(48, Math.max(compact ? 18 : 22, Math.min(cellH * 0.42, cellW * 0.2)))
  );
  const titlePx = Math.round(
    Math.min(20, Math.max(compact ? 11 : 13, Math.min(cellH * 0.2, cellW * 0.085)))
  );
  const descPx = Math.round(Math.min(14, Math.max(compact ? 9 : 11, titlePx * 0.72)));
  const padY = Math.round(Math.min(20, Math.max(compact ? 6 : 10, cellH * 0.12)));
  const padX = Math.round(Math.min(18, Math.max(8, cellW * 0.045)));
  const itemGap = Math.round(Math.max(8, iconPx * 0.32));

  return (
    <div
      ref={containerRef}
      className="grid h-full w-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gap,
        minHeight,
      }}
    >
      {skills.map((skill) => {
        const Icon = skill.icon;
        return (
          <div
            key={skill.name}
            className="flex h-full min-h-0 w-full items-center rounded-lg bg-slate-50 transition-colors duration-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800"
            style={{
              padding: `${padY}px ${padX}px`,
              gap: itemGap,
            }}
          >
            <span
              className="inline-flex flex-shrink-0 text-accent"
              style={{ width: iconPx, height: iconPx }}
            >
              <Icon className="h-full w-full" />
            </span>
            <div className="flex min-w-0 flex-col justify-center">
              <span
                className="truncate font-medium leading-tight text-slate-900 dark:text-white"
                style={{ fontSize: titlePx }}
              >
                {skill.name}
              </span>
              {skill.description && (
                <span
                  className="truncate leading-snug text-slate-500 dark:text-slate-400"
                  style={{ fontSize: descPx }}
                >
                  {skill.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Skill } from "@/lib/skillsData";

interface SkillIconProps {
  skill: Skill;
  position: { x: number; y: number; z: number };
  scale: number;
  opacity: number;
  isVisible: boolean;
  onHover: (skill: Skill | null) => void;
  isSoftSkill: boolean;
}

export function SkillIcon({
  skill,
  position,
  scale,
  opacity,
  isVisible,
  onHover,
  isSoftSkill,
}: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const Icon = skill.icon;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(skill);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
    onHover(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSoftSkill) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - rect.left - centerX) / centerX;
    const y = (e.clientY - rect.top - centerY) / centerY;

    setTiltX(-y * 10); // Max 10 degree tilt
    setTiltY(x * 10);
  };

  const handleFocus = () => {
    setIsHovered(true);
    onHover(skill);
  };

  const handleBlur = () => {
    setIsHovered(false);
    onHover(null);
  };

  if (!isVisible) return null;

  const depthFactor = (position.z + 1) / 2; // Normalize z from -1 to 1 -> 0 to 1
  const adjustedScale = isSoftSkill ? scale : scale * (0.85 + depthFactor * 0.3);
  const adjustedOpacity = isSoftSkill ? opacity : opacity * (0.65 + depthFactor * 0.35);

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, ${position.z}px) scale(${adjustedScale})`,
        opacity: adjustedOpacity,
        zIndex: Math.floor(depthFactor * 100),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} - ${skill.category}`}
    >
      <div
        className={`
          relative flex flex-col items-center justify-center rounded-xl p-2
          transition-all duration-300 ease-out
          ${isSoftSkill
            ? "bg-slate-100/80 dark:bg-slate-700/80 backdrop-blur-sm min-w-[80px] min-h-[70px]"
            : "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
          }
          ${isHovered
            ? "shadow-lg scale-110 ring-2 ring-accent/50"
            : "shadow-md scale-100 ring-1 ring-slate-200/50 dark:ring-slate-600/50"
          }
        `}
        style={{
          transform: isSoftSkill 
            ? `rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`
            : undefined,
        }}
      >
        <Icon
          className={`
            transition-colors duration-300
            ${isSoftSkill ? "h-5 w-5 mb-1.5" : "h-6 w-6"}
            ${isHovered ? "text-accent" : "text-slate-600 dark:text-slate-300"}
          `}
        />
        {isSoftSkill && (
          <div className="text-[10px] font-medium text-slate-600 dark:text-slate-300 text-center leading-tight">
            {skill.name}
          </div>
        )}
        {!isSoftSkill && isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-slate-900 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="font-semibold">{skill.name}</div>
            <div className="text-[10px] opacity-75">{skill.category}</div>
          </div>
        )}
      </div>
    </div>
  );
}

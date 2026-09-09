"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
}

export function AnimatedSection({ children }: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

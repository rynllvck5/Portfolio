"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/site";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./SkeletonLoader";

interface ProjectsSectionProps {
  projects: Project[];
}

const MOBILE_QUERY = "(max-width: 639px)";

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncViewport = () => setIsMobile(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const itemCount = loading ? projects.length || 3 : projects.length;

  const getSlideWidth = () => {
    const scroller = scrollerRef.current;
    const first = scroller?.firstElementChild as HTMLElement | undefined;
    if (!scroller || !first) return 0;
    const styles = getComputedStyle(scroller);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !isMobile) return;

    const slideWidth = getSlideWidth();
    if (slideWidth <= 0) return;

    const nextIndex = Math.round(scroller.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), itemCount - 1));
  }, [isMobile, itemCount]);

  useEffect(() => {
    setActiveIndex(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [loading, isMobile]);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    const slideWidth = getSlideWidth();
    if (!scroller || slideWidth <= 0) return;
    scroller.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  };

  return (
    <div>
      <div className="-mx-4 overflow-x-clip sm:mx-0 sm:overflow-visible">
        <div
          ref={scrollerRef}
          onScroll={updateActiveIndex}
          className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-pl-4 px-4 pb-1 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:scroll-pl-0 sm:px-0 sm:pb-0 lg:grid-cols-3"
          {...(isMobile
            ? {
                role: "region" as const,
                "aria-roledescription": "carousel",
                "aria-label": "Featured projects",
              }
            : {})}
        >
          {loading
            ? Array.from({ length: itemCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="w-[86vw] min-w-[86vw] max-w-[86vw] shrink-0 snap-start snap-always sm:w-auto sm:min-w-0 sm:max-w-none sm:snap-align-none"
                >
                  <ProjectCardSkeleton />
                </div>
              ))
            : projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="w-[86vw] min-w-[86vw] max-w-[86vw] shrink-0 snap-start snap-always animate-slide-up opacity-0 sm:w-auto sm:min-w-0 sm:max-w-none sm:snap-align-none"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
        </div>
      </div>

      {itemCount > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-2 sm:hidden"
          role="tablist"
          aria-label="Project slides"
        >
          {Array.from({ length: itemCount }).map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Go to project ${i + 1}`}
                aria-selected={isActive}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "w-6 bg-accent"
                    : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    setIsLoaded(true);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const enter = (delayMs: number) => {
    if (reducedMotion) {
      return { opacity: 1, transform: "none", transition: "none" } as const;
    }

    return {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? "translateY(0) scale(1)" : "translateY(14px) scale(0.985)",
      transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
    } as const;
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-surface-muted dark:border-slate-700/50 dark:bg-surface-dark">
      <HeroBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(200px,0.65fr)] lg:gap-8 xl:gap-12">
          <div className="relative z-10 min-w-0">
            <div className="relative min-h-[6.5rem] sm:min-h-[8.5rem] md:min-h-[10.5rem] lg:min-h-0">
              <div
                className="absolute -right-1 top-0 z-10 w-[4.75rem] sm:w-[5.75rem] md:w-28 lg:hidden"
                style={enter(160)}
              >
                <ProfileVisual compact reducedMotion={reducedMotion} />
              </div>

              <p
                className="pr-20 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-accent sm:pr-28 sm:text-xs"
                style={enter(40)}
              >
                Hey, I&apos;m
              </p>

              <h1
                className="mt-3 max-w-[11ch] pr-[4.75rem] text-[2.55rem] font-bold leading-[0.9] tracking-tight text-slate-900 dark:text-white sm:mt-4 sm:pr-32 sm:text-6xl md:text-7xl lg:max-w-none lg:pr-0 lg:text-[5.25rem] xl:text-8xl"
                style={enter(120)}
              >
                Raynell
                <span className="text-accent">.</span>
              </h1>
            </div>

            <p
              className="mt-5 max-w-xl text-pretty text-lg font-medium leading-snug text-slate-800 dark:text-slate-100 sm:mt-6 sm:text-xl lg:text-2xl"
              style={enter(220)}
            >
              I build thoughtful digital experiences with code.
            </p>

            <p
              className="mt-3 max-w-md text-pretty text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base"
              style={enter(300)}
            >
              Full-stack apps, system tools, and practical software people actually use.
            </p>

            <div
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={enter(400)}
            >
              <Link
                href="#projects"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-[transform,background-color,box-shadow] duration-200 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/25 motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                See what I&apos;ve built
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>

              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300/90 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-[transform,background-color,border-color,color,box-shadow] duration-200 hover:border-accent hover:bg-white hover:text-accent hover:shadow-md motion-safe:hover:-translate-y-0.5 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-accent-light dark:hover:bg-slate-800 dark:hover:text-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ResumeIcon />
                Download resume
              </a>
            </div>

            <div
              className="mt-6 inline-flex items-start gap-2.5"
              style={enter(500)}
            >
              <span className="relative mt-1 flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Open to opportunities
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  Remote · Hybrid · On-site
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative hidden w-[10.75rem] justify-self-end lg:block xl:w-[15.5rem]"
            style={enter(280)}
          >
            <ProfileVisual reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.14),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(20,184,166,0.16),transparent_68%)]" />
      <div className="absolute -right-16 top-8 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.12),transparent_64%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(20,184,166,0.18),transparent_64%)]" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.04),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(148,163,184,0.08),transparent_70%)]" />

      <div
        className="absolute inset-0 text-slate-900 opacity-[0.035] dark:text-white dark:opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 70% 40%, black 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 40%, black 20%, transparent 78%)",
        }}
      />

      <div className="hero-noise absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]" />

      <div className="absolute right-[18%] top-16 hidden h-24 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent lg:block" />
      <div className="absolute right-[12%] top-28 hidden h-px w-16 bg-gradient-to-r from-accent/40 to-transparent lg:block" />
    </div>
  );
}

function ProfileVisual({
  compact = false,
  reducedMotion,
}: {
  compact?: boolean;
  reducedMotion: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const resetTilt = () => {
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    if (tilt) {
      tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    if (glow) {
      glow.style.opacity = "0";
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || compact || event.pointerType !== "mouse") return;

    const frame = frameRef.current;
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    if (!frame || !tilt) return;

    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 6;
    const rotateX = (0.5 - y) * 6;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      tilt.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      if (glow) {
        glow.style.opacity = "1";
        glow.style.background = `radial-gradient(280px circle at ${x * 100}% ${y * 100}%, rgba(20,184,166,0.28), transparent 58%)`;
      }
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative ${compact ? "" : "motion-safe:animate-hero-float"}`}
      style={{ perspective: compact ? undefined : "1100px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {!compact && (
        <>
          <div className="absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl dark:bg-accent/25" />
          <div className="absolute -right-3 top-8 h-[78%] w-full rotate-3 rounded-[1.75rem] border border-accent/25 dark:border-accent/30" />
          <div className="absolute -left-2 top-10 h-14 w-14 rounded-full border border-slate-300/50 dark:border-slate-600/50" />
        </>
      )}
      {compact && (
        <div className="absolute -inset-1.5 rounded-2xl bg-accent/25 blur-md dark:bg-accent/30" />
      )}

      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transition: reducedMotion ? "none" : "transform 180ms ease-out",
        }}
      >
        <div
          className={`relative overflow-hidden border border-white/80 bg-slate-100 shadow-xl shadow-slate-900/10 dark:border-slate-600/80 dark:bg-slate-200 dark:shadow-black/40 ${
            compact ? "rounded-2xl" : "rounded-[1.35rem]"
          }`}
        >
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/profile_picture.png"
              alt="Raynell Vick F. Abuan"
              fill
              priority
              className="object-cover object-[center_12%]"
              sizes={compact ? "112px" : "(max-width: 1024px) 280px, 264px"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-slate-900/[0.04] dark:from-slate-950/30 dark:to-accent/[0.04]" />
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-200"
            />
          </div>
        </div>

        {!compact && (
          <>
            <div className="absolute -bottom-2.5 left-2 rounded-md border border-slate-200/60 bg-white/70 px-2 py-1 shadow-sm shadow-slate-900/5 backdrop-blur-md dark:border-slate-600/50 dark:bg-slate-800/70 dark:shadow-black/15">
              <p className="text-[0.5rem] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Based in
              </p>
              <p className="text-[0.7rem] font-medium leading-tight text-slate-600 dark:text-slate-300">Philippines</p>
            </div>

            <div className="absolute -right-2 top-[58%] z-20 w-max max-w-none rounded-lg border border-slate-200/70 bg-white/80 px-2.5 py-1.5 shadow-sm shadow-accent/10 backdrop-blur-md dark:border-accent/20 dark:bg-slate-900/80 dark:shadow-accent/10">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent">
                Software engineer
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[0.65rem] leading-none text-slate-500 dark:text-slate-400">
                PERN · Flutter · Java · C · Python
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ResumeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0118 8.414V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

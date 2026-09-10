"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const imageTransform = reducedMotion 
    ? 'translate3d(0, 0, 0)' 
    : `translate3d(${mousePosition.x * 8}px, ${mousePosition.y * 8}px, 0) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)`;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] overflow-hidden border-b border-slate-200/50 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/80 dark:border-slate-700/50 dark:from-surface-dark dark:via-slate-900/30 dark:to-slate-800/40"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle radial gradient */}
        <div className="absolute -right-20 top-20 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />
        <div className="absolute -left-20 bottom-20 h-[500px] w-[500px] rounded-full bg-blue-500/3 blur-3xl dark:bg-blue-500/5" />
        
        {/* Very subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          {/* Text Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <div className="space-y-6">
              {/* Eyebrow */}
              <p 
                className={`text-sm font-semibold uppercase tracking-[0.2em] text-accent transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : '100ms' }}
              >
                Hey, I'm Raynell
              </p>

              {/* Main Headline */}
              <h1 
                className={`text-balance text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : '200ms' }}
              >
                I build thoughtful digital experiences with code.
              </h1>

              {/* Supporting Description */}
              <p 
                className={`max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : '300ms' }}
              >
                CS graduate creating practical software that solves real problems. 
                From full-stack web apps to system tools — I turn ideas into working solutions.
              </p>

              {/* Availability Badge */}
              <div 
                className={`inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : '400ms' }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities
              </div>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: reducedMotion ? '0ms' : '500ms' }}
              >
                <Link
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  See what I've built
                  <svg 
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/50 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent hover:bg-white hover:shadow-md hover:-translate-y-0.5 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-accent-light dark:hover:text-accent-light dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* Profile Visual */}
          <div 
            ref={imageRef}
            className={`relative order-1 mx-auto lg:order-2 lg:mx-0 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: reducedMotion ? '0ms' : '300ms',
              transform: imageTransform,
              transition: reducedMotion ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-blue-500/20 blur-2xl opacity-60 dark:from-accent/30 dark:to-blue-500/30" />
            
            {/* Main image container */}
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/30 via-accent/10 to-transparent opacity-50 blur-sm dark:from-accent/40" />
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-white/80 shadow-2xl dark:border-slate-700/80">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                  <Image
                    src="/images/profile_picture.png"
                    alt="Raynell Vick F. Abuan"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
                </div>
              </div>

              {/* Floating status badge */}
              <div className="absolute -right-4 -bottom-4 rounded-xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm dark:bg-slate-800/90">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <svg 
                      className="h-5 w-5 text-accent" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Based in</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Philippines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: reducedMotion ? '0ms' : '700ms' }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <div className={`h-6 w-px bg-slate-300 dark:bg-slate-600 ${!reducedMotion ? 'animate-pulse' : ''}`} />
        </div>
      </div>
    </section>
  );
}
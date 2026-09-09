"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip } from "./Tooltip";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-700/80 dark:bg-surface-dark/80">
      <div
        className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-accent to-accent-light transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900 transition hover:text-accent dark:text-white dark:hover:text-accent-light"
        >
          Raynell<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-accent dark:text-slate-300 dark:hover:text-accent-light"
            >
              {link.label}
            </Link>
          ))}
          {mounted && (
            <Tooltip
              content={
                theme === "system"
                  ? "Toggle theme (follows system)"
                  : `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
              }
            >
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-accent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-accent-light"
                aria-label="Toggle color theme"
              >
                {resolvedTheme === "dark" ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )}
              </button>
            </Tooltip>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Tooltip content="Toggle theme">
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
                aria-label="Toggle color theme"
              >
                {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </Tooltip>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-slate-200 px-4 py-4 dark:border-slate-700 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12h16M4 6h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

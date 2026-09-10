"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "label",
  "summary",
  "select",
  "[role='button']",
  "[role='link']",
  "[role='menuitem']",
  "[data-cursor]",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "input[type='checkbox']",
  "input[type='radio']",
  "input[type='file']",
].join(",");

const TEXT_SELECTOR = [
  "input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='file']):not([type='range']):not([type='color'])",
  "textarea",
  "[contenteditable='true']",
].join(",");

type CursorKind = "default" | "hover" | "text" | "grab";

type Ripple = {
  id: number;
  x: number;
  y: number;
  strong: boolean;
};

function kindFromTarget(target: EventTarget | null): CursorKind {
  if (!(target instanceof Element)) return "default";
  if (target.closest("[data-cursor='grab']")) return "grab";
  if (target.closest(TEXT_SELECTOR)) return "text";
  if (target.closest(INTERACTIVE_SELECTOR)) return "hover";
  return "default";
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, rx: -100, ry: -100 });
  const kindRef = useRef<CursorKind>("default");
  const pressedRef = useRef(false);
  const visibleRef = useRef(false);
  const desktopRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const rippleIdRef = useRef(0);

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncDesktop = () => {
      const next = fineQuery.matches && !motionQuery.matches;
      desktopRef.current = next;
      setDesktop(next);
      document.documentElement.classList.toggle("has-custom-cursor", next);
    };

    syncDesktop();
    fineQuery.addEventListener("change", syncDesktop);
    motionQuery.addEventListener("change", syncDesktop);

    return () => {
      fineQuery.removeEventListener("change", syncDesktop);
      motionQuery.removeEventListener("change", syncDesktop);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    const applyCursorState = () => {
      const root = cursorRef.current;
      if (!root) return;

      const kind = kindRef.current;
      root.dataset.kind = kind;
      root.dataset.pressed = pressedRef.current ? "true" : "false";
      root.dataset.hidden = !visibleRef.current || kind === "text" ? "true" : "false";
    };

    const tick = () => {
      if (desktopRef.current) {
        const pos = posRef.current;
        pos.rx += (pos.x - pos.rx) * 0.22;
        pos.ry += (pos.y - pos.ry) * 0.22;

        const root = cursorRef.current;
        if (root) {
          root.style.setProperty("--cursor-x", `${pos.x}px`);
          root.style.setProperty("--cursor-y", `${pos.y}px`);
          root.style.setProperty("--cursor-ring-x", `${pos.rx}px`);
          root.style.setProperty("--cursor-ring-y", `${pos.ry}px`);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const spawnRipple = (x: number, y: number, strong: boolean) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const id = ++rippleIdRef.current;
      setRipples((current) => [...current.slice(-4), { id, x, y, strong }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 650);
    };

    const onPointerMove = (event: PointerEvent) => {
      posRef.current.x = event.clientX;
      posRef.current.y = event.clientY;

      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        visibleRef.current = true;
        kindRef.current = kindFromTarget(event.target);
        applyCursorState();
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      kindRef.current = kindFromTarget(event.target);
      applyCursorState();
    };

    const onPointerDown = (event: PointerEvent) => {
      const targetKind = kindFromTarget(event.target);
      const interactive = targetKind === "hover" || targetKind === "grab";

      if (event.pointerType === "touch") {
        visibleRef.current = false;
        applyCursorState();
        spawnRipple(event.clientX, event.clientY, interactive);
        return;
      }

      pressedRef.current = true;
      kindRef.current = targetKind;
      applyCursorState();
      spawnRipple(event.clientX, event.clientY, interactive);
    };

    const onPointerUp = () => {
      pressedRef.current = false;
      applyCursorState();
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.target !== document.documentElement) return;
      visibleRef.current = false;
      pressedRef.current = false;
      applyCursorState();
    };

    const onVisibility = () => {
      if (document.hidden) {
        visibleRef.current = false;
        pressedRef.current = false;
        applyCursorState();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {desktop && (
        <div ref={cursorRef} className="custom-cursor" data-hidden="true" data-kind="default">
          <span className="custom-cursor-ring">
            <span className="custom-cursor-ring-shape" />
          </span>
          <span className="custom-cursor-dot">
            <span className="custom-cursor-dot-shape" />
          </span>
        </div>
      )}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`custom-cursor-ripple ${ripple.strong ? "custom-cursor-ripple-strong" : ""}`}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </div>
  );
}

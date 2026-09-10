"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Skill, getSkillsByCategory } from "@/lib/skillsData";
import { SkillIcon } from "./SkillIcon";

interface SkillSphereProps {
  category: "All" | "Languages" | "Frameworks" | "Tools" | "Soft Skills";
  isMobile: boolean;
}

interface SkillPosition {
  skill: Skill;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  isVisible: boolean;
}

export function SkillSphere({ category, isMobile }: SkillSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [positions, setPositions] = useState<SkillPosition[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const isSoftSkillCategory = category === "Soft Skills";
  const skills = getSkillsByCategory(category);

  // Calculate Fibonacci sphere distribution
  const calculateSpherePositions = useCallback(
    (rotationX: number, rotationY: number) => {
      const count = skills.length;
      const radius = isMobile ? 80 : 120;
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

      return skills.map((skill, index) => {
        const y = 1 - (index / (count - 1 || 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * index;

        // Original 3D coordinates
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Apply rotation
        const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        const rotatedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
        const finalZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);

        // Project to 2D with perspective
        const perspective = isMobile ? 300 : 400;
        const scale = perspective / (perspective - finalZ);
        const projectedX = rotatedX * radius * scale;
        const projectedY = rotatedY * radius * scale;

        // Calculate depth-based opacity
        const depthFactor = (finalZ + radius) / (2 * radius);
        const opacity = 0.4 + depthFactor * 0.6;

        return {
          skill,
          x: projectedX,
          y: projectedY,
          z: finalZ,
          scale: Math.max(0.5, Math.min(1.5, scale)),
          opacity,
          isVisible: true,
        };
      });
    },
    [skills, isMobile]
  );

  // Animation loop
  useEffect(() => {
    const animate = () => {
      let newX = rotationRef.current.x;
      let newY = rotationRef.current.y;

      // Idle rotation - always rotate slowly when not dragging
      if (!isDraggingRef.current) {
        newY += 0.002;
        // Apply velocity-based damping for smooth transition
        newX += velocityRef.current.x;
        newY += velocityRef.current.y;
        // Gradually decay velocity
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;
        // Gradually return to normal rotation with damping
        newX *= 0.995;
      }

      rotationRef.current = { x: newX, y: newY };
      setPositions(calculateSpherePositions(newX, newY));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [calculateSpherePositions, isMobile]);

  // Mouse down handler - start dragging
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, [isMobile]);

  // Mouse move handler - only when dragging
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    // Update rotation based on mouse movement (subtle response)
    rotationRef.current.y += deltaX * 0.003;
    rotationRef.current.x += deltaY * 0.003;

    // Track velocity for smooth transition
    velocityRef.current = {
      x: deltaX * 0.003,
      y: deltaY * 0.003
    };

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, [isMobile]);

  // Mouse up handler - stop dragging
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Touch handlers for mobile drag support
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !isDraggingRef.current) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    // Update rotation based on touch movement (subtle response)
    rotationRef.current.y += deltaX * 0.003;
    rotationRef.current.x += deltaY * 0.003;

    // Track velocity for smooth transition
    velocityRef.current = {
      x: deltaX * 0.003,
      y: deltaY * 0.003
    };

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const shouldAnimate = !prefersReducedMotion();

  // Global mouse up handler - catch mouse release outside sphere
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleGlobalTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="grab"
      className="relative cursor-grab overflow-visible active:cursor-grabbing"
      style={{
        width: isMobile ? "200px" : "280px",
        height: isMobile ? "200px" : "280px",
        perspective: isMobile ? "300px" : "400px",
      }}
      onMouseDown={shouldAnimate ? handleMouseDown : undefined}
      onMouseMove={shouldAnimate ? handleMouseMove : undefined}
      onMouseUp={shouldAnimate ? handleMouseUp : undefined}
      onMouseLeave={() => {
        isDraggingRef.current = false;
      }}
      onTouchStart={shouldAnimate ? handleTouchStart : undefined}
      onTouchMove={shouldAnimate ? handleTouchMove : undefined}
      onTouchEnd={shouldAnimate ? handleTouchEnd : undefined}
    >
      {/* Subtle background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isMobile ? "140px" : "200px",
          height: isMobile ? "140px" : "200px",
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Skill icons — origin is the visual center of this column */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {positions.map((pos) => (
          <SkillIcon
            key={pos.skill.name}
            skill={pos.skill}
            position={{ x: pos.x, y: pos.y, z: pos.z }}
            scale={pos.scale}
            opacity={pos.opacity}
            isVisible={pos.isVisible}
            onHover={setHoveredSkill}
            isSoftSkill={false}
          />
        ))}
      </div>

      {/* Optional: Subtle orbit lines */}
      {!isMobile && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: isMobile ? "140px" : "200px",
            height: isMobile ? "140px" : "200px",
            border: "1px solid rgba(13, 148, 136, 0.1)",
            borderRadius: "50%",
            transform: "rotateX(60deg)",
          }}
        />
      )}
    </div>
  );
}

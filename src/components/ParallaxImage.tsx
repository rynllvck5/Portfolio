"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({ src, alt, className, speed = 0.15 }: ParallaxImageProps) {
  const parallaxOffset = useParallax(speed);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="224px"
        />
      </div>
    </div>
  );
}

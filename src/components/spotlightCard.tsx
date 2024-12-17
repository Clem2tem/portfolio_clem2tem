"use client";

import React, { useRef, useEffect } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
};

export function SpotlightCard({
  children,
  className = "",
  width = "45vw",
  height = "50vh",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();

        // Étend la portée de détection autour de la carte (zone étendue)
        const extendedPadding = 100; // Zone supplémentaire autour de la carte
        const extendedRect = {
          left: rect.left - extendedPadding,
          right: rect.right + extendedPadding,
          top: rect.top - extendedPadding,
          bottom: rect.bottom + extendedPadding,
        };

        // Coordonnées de la souris relatives à la carte
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Si la souris est dans la zone étendue
        const insideExtended =
          e.clientX >= extendedRect.left &&
          e.clientX <= extendedRect.right &&
          e.clientY >= extendedRect.top &&
          e.clientY <= extendedRect.bottom;

        if (insideExtended) {
          cardRef.current.style.setProperty("--mouse-x", `${x}px`);
          cardRef.current.style.setProperty("--mouse-y", `${y}px`);
        } else {
          cardRef.current.style.setProperty("--mouse-x", `-9999px`);
          cardRef.current.style.setProperty("--mouse-y", `-9999px`);
        }
      }
    };

    // Ajoute l'événement à window pour suivre la souris globalement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        "--card-width": width,
        "--card-height": height,
      } as React.CSSProperties}
      className={`relative h-[var(--card-height)] w-[var(--card-width)] bg-slate-800 rounded-3xl p-px 
      before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 
      before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity 
      before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] 
      before:opacity-50 before:z-10 before:blur-[100px] 
      after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 
      after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity 
      after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] 
      after:hover:opacity-10 after:z-30 after:blur-[120px] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

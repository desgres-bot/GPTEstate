"use client";

import { useRef, useState, useCallback } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  label?: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {label && (
        <div className="absolute top-3 left-3 z-10 rounded-lg bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {label}
        </div>
      )}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After image (background) */}
        <div
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: `url(${afterSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 bg-gray-300"
          style={{
            backgroundImage: `url(${beforeSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        />

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg">
            <svg className="h-5 w-5 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 z-10 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
          До
        </div>
        <div className="absolute bottom-3 right-3 z-10 rounded bg-accent-500/90 px-2 py-1 text-xs font-medium text-white">
          После
        </div>
      </div>
    </div>
  );
}

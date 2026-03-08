"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  label?: string;
  subtitle?: string;
}

export default function BeforeAfterToggle({ beforeSrc, afterSrc, label, subtitle }: Props) {
  // position: 0% = full BEFORE, 100% = full AFTER
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // --- Auto-animation on scroll into viewport ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(el);
          runEntryAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const runEntryAnimation = () => {
    // Start from BEFORE (0%), sweep right to show AFTER, then settle at 50%
    // Keyframes: 0% → 80% → 35% → 50%
    const keyframes = [
      { from: 0, to: 80, duration: 700 },
      { from: 80, to: 35, duration: 500 },
      { from: 35, to: 50, duration: 400 },
    ];

    let currentKeyframe = 0;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const kf = keyframes[currentKeyframe];
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / kf.duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = kf.from + (kf.to - kf.from) * easedProgress;

      setPosition(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        currentKeyframe++;
        if (currentKeyframe < keyframes.length) {
          startTime = null;
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };

    // Small delay before animation starts
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 250);
  };

  // --- Drag handling (horizontal) ---
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // Cancel any running animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Also allow clicking anywhere on the container to move the slider
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/3] w-full overflow-hidden cursor-ew-resize select-none bg-neutral-800"
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: AFTER image (result) — always fully visible as base (right side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt="После"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Layer 2: BEFORE image (original) — clipped from right, showing on left side */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt="До"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider handle — vertical line at position% */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.4)]" />

        {/* Handle — symmetric pill capsule Было|Стало */}
        <div
          className={`
            absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2
            grid grid-cols-[1fr_1px_1fr] items-center
            rounded-full border border-white/50
            bg-black/30 backdrop-blur-xl
            shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            transition-all duration-200 ease-out
            ${isDragging
              ? "scale-110 border-white/80 bg-black/40"
              : isHovered
                ? "scale-105 border-white/60"
                : ""
            }
          `}
        >
          {/* Left: arrow + Было */}
          <div className="flex items-center justify-center gap-1.5 py-2 px-3 whitespace-nowrap">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-white/80 shrink-0">
              <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] font-medium text-white/90">Было</span>
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-white/25" />

          {/* Right: Стало + arrow */}
          <div className="flex items-center justify-center gap-1.5 py-2 px-3 whitespace-nowrap">
            <span className="text-[11px] font-medium text-white/90">Стало</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-white/80 shrink-0">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Dark gradient overlays for text readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Label + Subtitle */}
      {label && (
        <div
          className="pointer-events-none absolute left-4 top-4"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          <div className="text-xs font-medium uppercase tracking-widest text-white">
            {label}
          </div>
          {subtitle && (
            <div className="mt-1 text-[13px] font-normal normal-case tracking-normal text-white/80">
              {subtitle}
            </div>
          )}
        </div>
      )}

      {/* Corner labels: Было (left) / Стало (right) */}
      <div
        className="pointer-events-none absolute bottom-3 left-3"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
      >
        <span className="rounded-md bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          Было
        </span>
      </div>
      <div
        className="pointer-events-none absolute bottom-3 right-3"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
      >
        <span className="rounded-md bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          Стало
        </span>
      </div>
    </div>
  );
}

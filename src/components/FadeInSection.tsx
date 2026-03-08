"use client";

import { useEffect, useRef } from "react";

type AnimationVariant = "default" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: AnimationVariant;
  /** Lower threshold = triggers earlier (default 0.08) */
  threshold?: number;
}

export default function FadeInSection({
  children,
  className = "",
  style,
  variant = "default",
  threshold = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const variantClass = variant === "default" ? "" : variant;

  return (
    <section
      ref={ref}
      className={`fade-in-section ${variantClass} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

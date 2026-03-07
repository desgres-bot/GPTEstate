"use client";

import { useState } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  label?: string;
  subtitle?: string;
}

export default function BeforeAfterToggle({ beforeSrc, afterSrc, label, subtitle }: Props) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden"
      onClick={() => setShowAfter(!showAfter)}
    >
      {/* After image — always in background */}
      <div
        className="aspect-[4/3] w-full bg-neutral-800"
        style={{
          backgroundImage: `url(${afterSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Before image — overlay with opacity transition */}
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-spring"
        style={{
          backgroundImage: `url(${beforeSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: showAfter ? 0 : 1,
        }}
      />

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Label + Subtitle */}
      {label && (
        <div className="absolute top-4 left-4" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          <div className="text-xs uppercase tracking-widest text-white font-medium">
            {label}
          </div>
          {subtitle && (
            <div className="text-[13px] text-white/80 mt-1 font-normal tracking-normal normal-case">
              {subtitle}
            </div>
          )}
        </div>
      )}

      {/* Before / After indicator */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <span className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
          !showAfter ? "bg-white text-[#1E1B18]" : "bg-black/40 text-white backdrop-blur-sm"
        }`}>
          До
        </span>
        <span className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
          showAfter ? "bg-white text-[#1E1B18]" : "bg-black/40 text-white backdrop-blur-sm"
        }`}>
          После
        </span>
      </div>
    </div>
  );
}

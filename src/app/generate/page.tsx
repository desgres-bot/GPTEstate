"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Mode } from "@/types";
import { VALID_MODES } from "./_data/services";
import { useGenerateService } from "./_hooks/useGenerateService";
import ServiceCatalog from "./_components/ServiceCatalog";
import ServiceWorkspace from "./_components/ServiceWorkspace";

export default function GeneratePage() {
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const service = useGenerateService();
  const scrollPosRef = useRef(0);

  // On mount: check URL for ?mode= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode && VALID_MODES.includes(urlMode)) {
      setActiveMode(urlMode as Mode);
      service.setMode(urlMode as Mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // popstate listener for browser back button
  useEffect(() => {
    const handlePop = () => {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get("mode");
      if (urlMode && VALID_MODES.includes(urlMode)) {
        setDirection("forward");
        setActiveMode(urlMode as Mode);
        service.setMode(urlMode as Mode);
      } else {
        setDirection("back");
        setActiveMode(null);
        service.reset();
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollPosRef.current));
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openService = useCallback((mode: Mode) => {
    scrollPosRef.current = window.scrollY;
    setDirection("forward");
    setActiveMode(mode);
    service.setMode(mode);
    service.reset();
    window.scrollTo(0, 0);
    window.history.pushState({}, "", `/generate?mode=${mode}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToCatalog = useCallback(() => {
    setDirection("back");
    setActiveMode(null);
    service.reset();
    window.history.pushState({}, "", "/generate");
    requestAnimationFrame(() => window.scrollTo(0, scrollPosRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1B18] text-white pt-24">
      {/* Catalog view */}
      <div
        className={`transition-all duration-300 ${
          activeMode === null
            ? "opacity-100 translate-x-0"
            : direction === "forward"
              ? "opacity-0 -translate-x-8 pointer-events-none h-0 overflow-hidden"
              : "opacity-0 translate-x-8 pointer-events-none h-0 overflow-hidden"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {activeMode === null && (
          <ServiceCatalog onSelectService={openService} />
        )}
      </div>

      {/* Service view */}
      <div
        className={`transition-all duration-300 ${
          activeMode !== null
            ? "opacity-100 translate-x-0"
            : direction === "back"
              ? "opacity-0 translate-x-8 pointer-events-none h-0 overflow-hidden"
              : "opacity-0 -translate-x-8 pointer-events-none h-0 overflow-hidden"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {activeMode !== null && (
          <ServiceWorkspace
            mode={activeMode}
            service={service}
            onBack={backToCatalog}
          />
        )}
      </div>
    </div>
  );
}

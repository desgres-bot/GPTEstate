"use client";

import { useEffect, useRef, useCallback } from "react";
import type { TourScene } from "@/types";
import { TOUR_CONFIG } from "@/lib/constants";

interface Props {
  scenes: TourScene[];
  activeSceneId: string;
  onSceneChange?: (sceneId: string) => void;
  className?: string;
}

export default function PanoramaViewer({
  scenes,
  activeSceneId,
  onSceneChange,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const onSceneChangeRef = useRef(onSceneChange);

  // Keep callback ref in sync without re-running the effect
  useEffect(() => {
    onSceneChangeRef.current = onSceneChange;
  }, [onSceneChange]);

  const buildConfig = useCallback(() => {
    const scenesConfig: Record<string, any> = {};

    scenes.forEach((scene) => {
      const hotspots = scene.hotspots.map((hs) => ({
        pitch: hs.pitch,
        yaw: hs.yaw,
        type: "scene",
        sceneId: hs.targetSceneId,
        text: hs.text,
      }));

      scenesConfig[scene.id] = {
        title: scene.title,
        type: "equirectangular",
        panorama: scene.imageUrl,
        autoLoad: true,
        hfov: TOUR_CONFIG.defaultHfov,
        hotSpots: hotspots,
      };
    });

    return scenesConfig;
  }, [scenes]);

  // Initialize / rebuild viewer when scenes change
  useEffect(() => {
    if (!containerRef.current) return;
    if (scenes.length === 0) return;

    const pannellum = (window as any).pannellum;
    if (!pannellum) return;

    // Destroy previous instance
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch {
        // ignore
      }
      viewerRef.current = null;
    }

    const scenesConfig = buildConfig();

    const viewer = pannellum.viewer(containerRef.current, {
      default: {
        firstScene: activeSceneId,
        sceneFadeDuration: 1000,
        autoRotate: TOUR_CONFIG.autoRotateSpeed,
        compass: TOUR_CONFIG.compass,
      },
      scenes: scenesConfig,
    });

    viewer.on("scenechange", (sceneId: string) => {
      onSceneChangeRef.current?.(sceneId);
    });

    viewerRef.current = viewer;

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch {
          // ignore
        }
        viewerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenes, buildConfig]);

  // Switch scene when activeSceneId changes externally
  useEffect(() => {
    if (!viewerRef.current) return;
    try {
      const currentScene = viewerRef.current.getScene();
      if (currentScene !== activeSceneId) {
        viewerRef.current.loadScene(activeSceneId);
      }
    } catch {
      // viewer may not be ready yet
    }
  }, [activeSceneId]);

  return (
    <div
      ref={containerRef}
      className={`w-full aspect-video rounded-xl overflow-hidden ${className}`}
    />
  );
}

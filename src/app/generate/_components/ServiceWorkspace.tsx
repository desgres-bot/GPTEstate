"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import type { Mode } from "@/types";
import type { GenerateService } from "../_hooks/useGenerateService";
import { getServiceById, modeSubtitle, modeDescription, buttonLabel, loadingLabel, modeTips } from "../_data/services";
import ModeControls from "./ModeControls";
import ResultDisplay from "./ResultDisplay";

interface Props {
  mode: Mode;
  service: GenerateService;
  onBack: () => void;
}

export default function ServiceWorkspace({ mode, service, onBack }: Props) {
  const [descExpanded, setDescExpanded] = useState(false);
  const svc = getServiceById(mode);
  const desc = modeDescription[mode];
  const tips = modeTips[mode];

  return (
    <div className="mx-auto max-w-3xl px-5 pb-32 md:pb-12">
      {/* Sticky service header */}
      <div
        className="sticky top-[64px] z-50 -mx-5 px-5 py-3 border-b border-white/[0.06]"
        style={{
          backgroundColor: "rgba(30, 27, 24, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] active:bg-white/[0.12] transition-colors flex-shrink-0"
            aria-label="Назад к сервисам"
          >
            <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Service title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-semibold text-white truncate">
              {svc?.icon} {svc?.label}
            </h1>
            <p className="text-[12px] text-white/40 truncate">
              {modeSubtitle[mode]}
            </p>
          </div>
        </div>
      </div>

      {/* Description card — collapsible */}
      {!service.preview && (
        <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/[0.08] p-4">
          <p className="text-[14px] text-white/80 leading-relaxed">
            {desc.what}
          </p>
          {descExpanded && (
            <div className="mt-3 space-y-2 text-[13px] text-white/50">
              <p><span className="text-white/70 font-medium">Как: </span>{desc.how}</p>
              <p><span className="text-white/70 font-medium">Лучше для: </span>{desc.best}</p>
            </div>
          )}
          <button
            onClick={() => setDescExpanded(!descExpanded)}
            className="mt-2 text-[12px] text-white/30 hover:text-white/50 transition-colors"
          >
            {descExpanded ? "Свернуть" : "Подробнее..."}
          </button>
        </div>
      )}

      {/* Mode-specific controls */}
      <ModeControls mode={mode} service={service} />

      {/* Upload / Preview / Result area */}
      <div className="mt-5">
        {!service.preview ? (
          <ImageUploader onImageSelect={service.handleImageSelect} />
        ) : (
          <ResultDisplay mode={mode} service={service} />
        )}
      </div>

      {/* Tips section — only when no image uploaded */}
      {!service.preview && (
        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="text-sm text-neutral-400 font-medium">Советы</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            {tips.map((tip, i) => (
              <li key={i}>— {tip}</li>
            ))}
          </ul>

          {/* FOMO element */}
          <div className="mt-6 rounded-xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terra-400" />
            </span>
            <span className="text-sm text-neutral-400">47 риелторов обрабатывают фото прямо сейчас</span>
          </div>
        </div>
      )}

      {/* Fixed bottom generate button — mobile only, shown when image uploaded but no result */}
      {service.preview && !service.hasResult && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[999] md:hidden"
          style={{
            paddingBottom: "calc(60px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="mx-4 mb-2 flex gap-2">
            <button
              onClick={service.handleGenerate}
              disabled={service.loading || (service.style === "custom" && !service.customStyle.trim() && (mode === "redesign" || mode === "staging")) || (mode === "exterior" && service.exteriorStyle === "custom" && !service.customExterior.trim()) || (mode === "wallcolor" && service.wallColor === "custom" && !service.customWallColor.trim()) || (mode === "furnish" && !service.furnishDescription.trim()) || (mode === "flooring" && service.flooringType === "custom" && !service.customFlooring.trim()) || (mode === "kitchen" && service.kitchenStyle === "custom" && !service.customKitchen.trim()) || (mode === "textrender" && !service.textrenderPrompt.trim()) || (mode === "bathroom" && service.bathroomStyle === "custom" && !service.customBathroom.trim()) || (mode === "additem" && !service.additemDescription.trim())}
              className="btn-generate flex-1"
            >
              {service.loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {loadingLabel[mode]}
                </span>
              ) : (
                buttonLabel[mode]
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import MaskPainter from "@/components/MaskPainter";
import { COMPARE_STYLES, PLATFORMS, TONES, SOCIAL_PLATFORMS } from "@/lib/constants";
import type { Mode } from "@/types";
import type { GenerateService } from "../_hooks/useGenerateService";
import { buttonLabel, loadingLabel } from "../_data/services";

interface Props {
  mode: Mode;
  service: GenerateService;
}

export default function ResultDisplay({ mode, service }: Props) {
  const { preview, result, textResult, compareResults, showResult, hasResult } = service;

  if (!preview) return null;

  return (
    <div className="space-y-4">
      {/* Compare results (2x2 grid) */}
      {compareResults ? (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={preview} alt="Оригинал" className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="text-sm text-white font-medium">4 варианта стиля готовы</p>
              <p className="text-xs text-neutral-400">Нажмите на любой для скачивания</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {compareResults.map((url, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={url}
                  alt={COMPARE_STYLES[idx]?.name || `Стиль ${idx + 1}`}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg" />
                <span className="absolute bottom-2 left-3 text-xs font-medium text-white">
                  {COMPARE_STYLES[idx]?.emoji} {COMPARE_STYLES[idx]?.name || `Стиль ${idx + 1}`}
                </span>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white"
                >
                  Скачать
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : result ? (
        /* Image result with before/after toggle */
        <div>
          <div
            className="relative cursor-pointer overflow-hidden"
            onClick={() => service.setShowResult(!showResult)}
          >
            <img
              src={showResult ? result : preview}
              alt={showResult ? "Результат" : "Оригинал"}
              className="w-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                !showResult ? "bg-white text-[#1E1B18]" : "bg-black/40 text-white backdrop-blur-sm"
              }`}>До</span>
              <span className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                showResult ? "bg-white text-[#1E1B18]" : "bg-black/40 text-white backdrop-blur-sm"
              }`}>После</span>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-neutral-400">Нажмите на фото для сравнения</p>
        </div>
      ) : textResult ? (
        /* Text result */
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={preview} alt="Фото" className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="text-sm text-white font-medium">
                {mode === "describe" ? "Описание готово" : mode === "score" ? "Оценка готова" : mode === "analyze" ? "Анализ готов" : mode === "checklist" ? "Список готов" : mode === "social" ? "Пост готов" : mode === "floorplan" ? "Планировка готова" : mode === "compliance" ? "Проверка готова" : mode === "repaircost" ? "Расчёт готов" : "Объявление готово"}
              </p>
              <p className="text-xs text-neutral-400">
                {mode === "describe" && (
                  <>{PLATFORMS.find(p => p.id === service.platform)?.name} &middot; {TONES.find(t => t.id === service.tone)?.name} стиль</>
                )}
                {mode === "score" && "Оценка качества по 5 критериям"}
                {mode === "analyze" && "Характеристики помещения"}
                {mode === "checklist" && "Что сделать перед продажей"}
                {mode === "listing" && (
                  <>{PLATFORMS.find(p => p.id === service.platform)?.name} &middot; Полный пакет текстов</>
                )}
                {mode === "social" && (
                  <>{SOCIAL_PLATFORMS.find(p => p.id === service.socialPlatform)?.name} &middot; Готовый пост</>
                )}
                {mode === "floorplan" && "Описание планировки помещения"}
                {mode === "compliance" && "Проверка на соответствие площадкам"}
                {mode === "repaircost" && "Стоимость ремонта по фото"}
              </p>
            </div>
          </div>
          <div className="bg-white/[0.06] border border-white/10 rounded-xl p-5">
            <p className="text-base text-white/90 whitespace-pre-wrap leading-relaxed">{textResult}</p>
          </div>
          <button
            onClick={service.copyToClipboard}
            className="mt-3 w-full rounded-lg bg-white/8 py-3 text-sm text-white/70 hover:bg-white/12 transition-all"
          >
            {service.copied ? "Скопировано!" : "Копировать текст"}
          </button>
        </div>
      ) : (
        /* Preview of uploaded image (no result yet) */
        <div>
          {mode === "remove" && !result ? (
            <>
              <MaskPainter imageSrc={preview} onMaskChange={service.setMaskDataUrl} />
              <p className="mt-3 text-sm text-neutral-400">Закрасьте объекты, которые нужно убрать</p>
            </>
          ) : mode === "declutter" && !result ? (
            <div
              className="relative overflow-hidden"
              onMouseMove={(e) => {
                if (!service.declutterDetected) return;
                // Hit-test: find object whose bbox contains cursor
                const rect = e.currentTarget.getBoundingClientRect();
                const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                const yPct = ((e.clientY - rect.top) / rect.height) * 100;
                const allObjects = [...service.declutterRemove, ...service.declutterKeep];
                const hit = allObjects.find(o => {
                  const [l, t, r, b] = o.bboxPct;
                  return xPct >= l && xPct <= r && yPct >= t && yPct <= b;
                });
                service.setHoveredObjectId(hit?.id ?? null);
              }}
              onMouseLeave={() => service.setHoveredObjectId(null)}
            >
              <img src={preview} alt="Оригинальное фото" className="w-full" />
              {/* SAM mask overlays — show all detected objects with colored contours */}
              {service.declutterDetected && [...service.declutterRemove, ...service.declutterKeep].map(obj => {
                const isRemove = service.declutterRemove.some(o => o.id === obj.id);
                const isHovered = service.hoveredObjectId === obj.id;
                const opacity = isHovered ? 0.5 : 0.15;
                if (obj.maskPng) {
                  // SAM precise mask — use as CSS mask on colored overlay
                  const color = isRemove ? "rgba(239,68,68,1)" : "rgba(34,197,94,1)";
                  return (
                    <div
                      key={obj.id}
                      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150"
                      style={{
                        opacity,
                        backgroundColor: color,
                        WebkitMaskImage: `url(${obj.maskPng})`,
                        WebkitMaskSize: "100% 100%",
                        WebkitMaskRepeat: "no-repeat",
                        maskImage: `url(${obj.maskPng})`,
                        maskSize: "100% 100%",
                        maskRepeat: "no-repeat",
                      }}
                    />
                  );
                }
                // Fallback: bbox rectangle
                if (!obj.bboxPct) return null;
                const [left, top, right, bottom] = obj.bboxPct;
                return (
                  <div
                    key={obj.id}
                    className={`absolute border-2 rounded-sm pointer-events-none transition-all duration-150 ${
                      isRemove ? "border-red-500" : "border-green-500"
                    }`}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${right - left}%`,
                      height: `${bottom - top}%`,
                      backgroundColor: isRemove ? `rgba(239,68,68,${opacity})` : `rgba(34,197,94,${opacity})`,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden">
              <img src={preview} alt="Оригинальное фото" className="w-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* Declutter step wizard */}
      {mode === "declutter" && !hasResult && preview && (
        <div className="space-y-3">
          {/* Step indicator */}
          {service.declutterStep > 0 && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className={service.declutterStep >= 1 ? "text-accent-400 font-medium" : ""}>1. Объекты</span>
              <span>→</span>
              <span className={service.declutterStep >= 2 ? "text-accent-400 font-medium" : ""}>2. Промпт</span>
              <span>→</span>
              <span className={service.loading ? "text-accent-400 font-medium" : ""}>3. Генерация</span>
            </div>
          )}

          {/* Step 0: Start button */}
          {service.declutterStep === 0 && (
            <button
              onClick={service.handleDeclutterDetect}
              disabled={service.declutterDetecting}
              className="w-full rounded-lg bg-white/8 border border-white/10 py-3 text-sm text-white/80 hover:bg-white/12 transition-all"
            >
              {service.declutterDetecting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {service.declutterProgress || "Анализируем фото..."}
                </span>
              ) : (
                "Расхламить"
              )}
            </button>
          )}

          {/* Step 1: Review detected objects */}
          {service.declutterStep === 1 && (
            <div className="space-y-3">
              {/* REMOVE list (red) */}
              {service.declutterRemove.length > 0 && (
                <div className="rounded-xl bg-red-500/[0.06] border border-red-500/[0.15] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-red-400 font-medium">Убрать ({service.declutterRemove.length})</span>
                    <span className="text-xs text-white/30">нажмите чтобы оставить</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.declutterRemove.map(obj => (
                      <button
                        key={obj.id}
                        onClick={() => service.toggleDeclutterObject(obj.id)}
                        onMouseEnter={() => service.setHoveredObjectId(obj.id)}
                        onMouseLeave={() => service.setHoveredObjectId(null)}
                        className={`rounded-full px-3 py-1 text-xs border transition-all cursor-pointer ${
                          service.hoveredObjectId === obj.id
                            ? "bg-red-500/40 text-red-200 border-red-400 ring-2 ring-red-500/50 scale-105"
                            : "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
                        }`}
                      >
                        {obj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* KEEP list (green) */}
              {service.declutterKeep.length > 0 && (
                <div className="rounded-xl bg-green-500/[0.06] border border-green-500/[0.15] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-green-400 font-medium">Оставить ({service.declutterKeep.length})</span>
                    <span className="text-xs text-white/30">нажмите чтобы убрать</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.declutterKeep.map(obj => (
                      <button
                        key={obj.id}
                        onClick={() => service.toggleDeclutterObject(obj.id)}
                        onMouseEnter={() => service.setHoveredObjectId(obj.id)}
                        onMouseLeave={() => service.setHoveredObjectId(null)}
                        className={`rounded-full px-3 py-1 text-xs border transition-all cursor-pointer ${
                          service.hoveredObjectId === obj.id
                            ? "bg-green-500/40 text-green-200 border-green-400 ring-2 ring-green-500/50 scale-105"
                            : "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                        }`}
                      >
                        {obj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Next button */}
              <button
                onClick={service.advanceDeclutterStep}
                disabled={service.declutterRemove.length === 0}
                className="w-full rounded-lg bg-accent-600 py-3 text-sm text-white font-medium hover:bg-accent-500 disabled:opacity-40 transition-all"
              >
                Далее — проверить промпт
              </button>
            </div>
          )}

          {/* Step 2: Review/edit prompt */}
          {service.declutterStep === 2 && (
            <div className="space-y-3">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50 font-medium">Промпт для Kontext</span>
                  <button
                    onClick={() => service.setDeclutterStep(1)}
                    className="text-xs text-accent-400 hover:text-accent-300"
                  >
                    ← Назад к объектам
                  </button>
                </div>
                <textarea
                  value={service.declutterPrompt}
                  onChange={(e) => service.setDeclutterPrompt(e.target.value)}
                  rows={5}
                  className="w-full bg-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none resize-y font-mono"
                />
                <p className="mt-2 text-xs text-white/30">
                  {service.declutterPrompt.length} символов — можно отредактировать перед генерацией
                </p>
              </div>

              {/* Generate button */}
              <button
                onClick={service.handleGenerate}
                disabled={service.loading || !service.declutterPrompt.trim()}
                className="w-full rounded-lg bg-accent-600 py-3 text-sm text-white font-medium hover:bg-accent-500 disabled:opacity-40 transition-all"
              >
                {service.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Генерируем...
                  </span>
                ) : (
                  "Генерировать"
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Remove mode text input */}
      {mode === "remove" && !hasResult && preview && (
        <textarea
          value={service.removeDescription}
          onChange={(e) => service.setRemoveDescription(e.target.value)}
          placeholder="Что убрать? Например: посуду со стола, коробки в углу"
          rows={2}
          className="w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/50 focus:bg-white/12 focus:outline-none resize-none"
        />
      )}

      {/* Error display */}
      {service.error && (
        <div className="rounded-lg bg-red-500/20 border border-red-500/30 p-4 text-sm text-red-300">
          {service.error}
        </div>
      )}

      {/* Action buttons */}
      {preview && (
        <div className="flex gap-3 pt-2">
          {!hasResult ? (
            <>
              {/* Generate button — on desktop inline, on mobile it's fixed bottom (in ServiceWorkspace) */}
              {/* Hidden for declutter mode — wizard handles generation */}
              <button
                onClick={service.handleGenerate}
                disabled={service.loading || (service.style === "custom" && !service.customStyle.trim() && (mode === "redesign" || mode === "staging")) || (mode === "exterior" && service.exteriorStyle === "custom" && !service.customExterior.trim()) || (mode === "wallcolor" && service.wallColor === "custom" && !service.customWallColor.trim()) || (mode === "furnish" && !service.furnishDescription.trim()) || (mode === "flooring" && service.flooringType === "custom" && !service.customFlooring.trim()) || (mode === "kitchen" && service.kitchenStyle === "custom" && !service.customKitchen.trim()) || (mode === "textrender" && !service.textrenderPrompt.trim())}
                className={`btn-generate flex-1 hidden ${mode === "declutter" ? "" : "md:flex"} items-center justify-center`}
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
              <button
                onClick={service.reset}
                className="rounded-lg bg-white/8 px-5 py-4 text-base text-white/70 transition-all hover:bg-white/12"
              >
                Другое фото
              </button>
            </>
          ) : (
            <>
              {result && (
                <a href={result} download target="_blank" rel="noopener noreferrer" className="btn-generate flex-1 text-center">
                  Скачать
                </a>
              )}
              {textResult && (
                <button onClick={service.copyToClipboard} className="btn-generate flex-1">
                  {service.copied ? "Скопировано!" : "Копировать"}
                </button>
              )}
              {compareResults && (
                <button
                  onClick={() => {
                    compareResults.forEach((url, idx) => {
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `style-${COMPARE_STYLES[idx]?.id || idx}.jpg`;
                      link.click();
                    });
                  }}
                  className="btn-generate flex-1"
                >
                  Скачать все 4
                </button>
              )}
              <button
                onClick={service.reset}
                className="rounded-lg bg-white/8 px-5 py-4 text-base text-white/70 transition-all hover:bg-white/12"
              >
                Ещё фото
              </button>
            </>
          )}
        </div>
      )}

      {/* ✨ AI Chat Editor — refine result with text */}
      {result && !service.isTextMode && mode !== "compare" && (
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-terra-400 font-medium">
              ✨ Доработать AI-чатом
            </span>
            {service.refineHistory.length > 0 && (
              <span className="text-xs text-neutral-500">
                (версия {service.refineHistory.length + 1})
              </span>
            )}
          </div>
          <textarea
            value={service.refinePrompt}
            onChange={(e) => service.setRefinePrompt(e.target.value)}
            placeholder="Сделать стены белыми, добавить больше света, убрать картину..."
            rows={2}
            className="w-full bg-white/8 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 focus:bg-white/12 focus:outline-none resize-none"
            disabled={service.refineLoading}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={service.handleRefine}
              disabled={service.refineLoading || !service.refinePrompt.trim()}
              className="btn-generate flex-1 text-sm !py-3"
            >
              {service.refineLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Дорабатываю...
                </span>
              ) : (
                "Доработать ✨"
              )}
            </button>
            {service.refineHistory.length > 0 && (
              <button
                onClick={service.undoRefine}
                className="rounded-lg bg-white/8 px-4 py-3 text-sm text-white/60 hover:bg-white/12 transition-all"
                title="Вернуть предыдущую версию"
              >
                ↩ Назад
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cross-sell after result */}
      {hasResult && (
        <div className="mt-2 rounded-lg bg-terra-500/10 border border-terra-500/20 p-4 text-center">
          <p className="text-sm text-terra-300">Понравился результат? Получите 50 фото за 2 490₽</p>
          <a href="/pricing" className="text-sm text-terra-400 underline mt-1 inline-block">
            Смотреть тарифы →
          </a>
        </div>
      )}
    </div>
  );
}

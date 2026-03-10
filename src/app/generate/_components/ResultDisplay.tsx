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
            <div className="relative overflow-hidden">
              <img src={preview} alt="Оригинальное фото" className="w-full" />
              {/* Bbox highlight overlay on hover */}
              {service.declutterDetected && service.hoveredObjectId !== null && (() => {
                const allObjects = [...service.declutterRemove, ...service.declutterKeep];
                const obj = allObjects.find(o => o.id === service.hoveredObjectId);
                if (!obj?.bboxPct) return null;
                const isRemove = service.declutterRemove.some(o => o.id === obj.id);
                const [left, top, right, bottom] = obj.bboxPct;
                return (
                  <div
                    className={`absolute border-2 rounded-sm transition-all pointer-events-none ${
                      isRemove ? "border-red-500 bg-red-500/20" : "border-green-500 bg-green-500/20"
                    }`}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${right - left}%`,
                      height: `${bottom - top}%`,
                    }}
                  />
                );
              })()}
            </div>
          ) : (
            <div className="overflow-hidden">
              <img src={preview} alt="Оригинальное фото" className="w-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* Declutter object selection — two lists */}
      {mode === "declutter" && !hasResult && preview && (
        <div className="space-y-3">
          {!service.declutterDetected ? (
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
                  Анализируем фото...
                </span>
              ) : (
                "🧹 Расхламить"
              )}
            </button>
          ) : (
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
                        className="rounded-full px-3 py-1 text-xs bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all cursor-pointer"
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
                        className="rounded-full px-3 py-1 text-xs bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-all cursor-pointer"
                      >
                        {obj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
              <button
                onClick={service.handleGenerate}
                disabled={service.loading || (service.style === "custom" && !service.customStyle.trim() && (mode === "redesign" || mode === "staging")) || (mode === "exterior" && service.exteriorStyle === "custom" && !service.customExterior.trim()) || (mode === "wallcolor" && service.wallColor === "custom" && !service.customWallColor.trim()) || (mode === "furnish" && !service.furnishDescription.trim()) || (mode === "flooring" && service.flooringType === "custom" && !service.customFlooring.trim()) || (mode === "kitchen" && service.kitchenStyle === "custom" && !service.customKitchen.trim()) || (mode === "textrender" && !service.textrenderPrompt.trim())}
                className="btn-generate flex-1 hidden md:flex items-center justify-center"
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

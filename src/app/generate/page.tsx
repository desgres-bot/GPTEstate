"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";
import MaskPainter from "@/components/MaskPainter";
import { STYLES, SKY_OPTIONS, RENOVATION_OPTIONS, PLATFORMS, TONES } from "@/lib/constants";
import type { Mode, Style, SkyType, RenovationType, Platform, Tone } from "@/types";

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>("enhance");
  const [style, setStyle] = useState<Style>("modern");
  const [customStyle, setCustomStyle] = useState("");
  const [skyType, setSkyType] = useState<SkyType>("sunny");
  const [renovationType, setRenovationType] = useState<RenovationType>("white_walls");
  const [platform, setPlatform] = useState<Platform>("avito");
  const [tone, setTone] = useState<Tone>("selling");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode && VALID_MODES.includes(urlMode)) {
      setMode(urlMode as Mode);
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeDescription, setRemoveDescription] = useState("");
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(true);
  const [copied, setCopied] = useState(false);

  const VALID_MODES = [
    "enhance", "staging", "redesign", "remove",
    "describe", "dusk", "sky",
    "score", "analyze", "renovation",
  ];

  const TEXT_MODES: Mode[] = ["describe", "score", "analyze"];
  const isTextMode = TEXT_MODES.includes(mode);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setResult(null);
    setTextResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    if (mode === "remove" && !removeDescription.trim() && !maskDataUrl) {
      setError("Опишите текстом что убрать или закрасьте объекты на фото");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("mode", mode);
      if (mode === "redesign" || mode === "staging") {
        formData.append("style", style);
        if (style === "custom" && customStyle.trim()) {
          formData.append("customStyle", customStyle.trim());
        }
      }
      if (mode === "remove") {
        if (removeDescription.trim()) formData.append("description", removeDescription.trim());
        if (maskDataUrl) formData.append("mask", maskDataUrl);
      }
      if (mode === "describe") {
        formData.append("platform", platform);
        formData.append("tone", tone);
      }
      if (mode === "sky") {
        formData.append("skyType", skyType);
      }
      if (mode === "renovation") {
        formData.append("renovationType", renovationType);
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка генерации");
      }

      const data = await res.json();
      if (isTextMode) {
        setTextResult(data.text);
      } else {
        setResult(data.output_url);
        setShowResult(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setTextResult(null);
    setError(null);
    setRemoveDescription("");
    setMaskDataUrl(null);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!textResult) return;
    await navigator.clipboard.writeText(textResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modes = [
    { id: "enhance" as Mode, label: "Уборка", desc: "Убрать бардак" },
    { id: "staging" as Mode, label: "Мебель", desc: "Обставить пустую" },
    { id: "redesign" as Mode, label: "Новый стиль", desc: "Сменить интерьер" },
    { id: "remove" as Mode, label: "Удаление", desc: "Убрать объекты" },
    { id: "renovation" as Mode, label: "Ремонт", desc: "Стены и полы" },
    { id: "describe" as Mode, label: "Описание", desc: "Текст для Авито" },
    { id: "score" as Mode, label: "Оценка", desc: "Рейтинг фото" },
    { id: "analyze" as Mode, label: "Анализ", desc: "Что на фото" },
    { id: "dusk" as Mode, label: "Закат", desc: "День → вечер" },
    { id: "sky" as Mode, label: "Небо", desc: "Заменить небо" },
  ];

  const modeSubtitle: Record<Mode, string> = {
    enhance: "Уборка фото",
    staging: "Добавить мебель",
    redesign: "Новый стиль интерьера",
    remove: "Удаление объектов",
    renovation: "Виртуальный ремонт",
    describe: "AI-описание для объявления",
    score: "Оценка качества фото",
    analyze: "Анализ характеристик комнаты",
    dusk: "Дневное фото → закатное",
    sky: "Замена неба на фото",
  };

  const buttonLabel: Record<Mode, string> = {
    enhance: "Убрать бардак",
    staging: "Добавить мебель",
    redesign: "Сменить стиль",
    remove: "Убрать объекты",
    renovation: "Сделать ремонт",
    describe: "Написать описание",
    score: "Оценить фото",
    analyze: "Анализировать",
    dusk: "Сделать закат",
    sky: "Заменить небо",
  };

  const loadingLabel: Record<Mode, string> = {
    enhance: "Убираем...",
    staging: "Расставляем мебель...",
    redesign: "Меняем стиль...",
    remove: "Удаляем...",
    renovation: "Делаем ремонт...",
    describe: "Пишем...",
    score: "Оцениваем...",
    analyze: "Анализируем...",
    dusk: "Создаём закат...",
    sky: "Меняем небо...",
  };

  const hasResult = result || textResult;

  return (
    <div className="min-h-screen bg-[#1E1B18] text-white pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-24 md:pb-12">
        {/* Page title */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="heading-display text-[32px] sm:text-[48px]">Улучшение фото</h1>
            <p className="mt-2 text-[#BFBFBF] text-base">{modeSubtitle[mode]}</p>
          </div>
          <Link
            href="/batch"
            className="rounded-lg bg-white/8 px-4 py-2 text-sm text-white/70 hover:bg-white/12 transition-all mt-2"
          >
            Пакетная обработка
          </Link>
        </div>

        {/* Mode tabs — 5 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-lg px-3 py-3 min-h-[48px] text-center transition-all ${
                mode === m.id
                  ? "bg-white text-[#1E1B18]"
                  : "bg-white/8 text-white/70 hover:bg-white/12"
              }`}
            >
              <div className="text-sm font-medium">{m.label}</div>
              <div className={`text-xs mt-0.5 ${mode === m.id ? "text-[#6B6560]" : "text-white/50"}`}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* Style chips (redesign & staging modes) */}
        {(mode === "redesign" || mode === "staging") && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id as Style)}
                  className={`rounded-lg px-3 py-2 text-sm transition-all ${
                    style === s.id
                      ? "bg-white text-[#1E1B18]"
                      : "bg-white/8 text-white/70 hover:bg-white/12"
                  }`}
                >
                  {s.emoji} {s.name}
                </button>
              ))}
            </div>
            {/* Custom style text input */}
            {style === "custom" && (
              <input
                type="text"
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                placeholder="Опишите стиль: марокканский с арками, лаунж-бар, детская..."
                className="mt-3 w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/40 focus:bg-white/12 focus:outline-none"
              />
            )}
          </div>
        )}

        {/* Sky type chips */}
        {mode === "sky" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SKY_OPTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSkyType(s.id as SkyType)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  skyType === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Renovation type chips */}
        {mode === "renovation" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {RENOVATION_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRenovationType(r.id as RenovationType)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  renovationType === r.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {r.emoji} {r.name}
              </button>
            ))}
          </div>
        )}

        {/* Platform & tone selectors for describe mode */}
        {mode === "describe" && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-neutral-500 mb-2">Площадка</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id as Platform)}
                    className={`rounded-lg px-4 py-2 text-sm transition-all ${
                      platform === p.id
                        ? "bg-white text-[#1E1B18]"
                        : "bg-white/8 text-white/70 hover:bg-white/12"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-2">Стиль текста</p>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id as Tone)}
                    className={`rounded-lg px-4 py-2 text-sm transition-all ${
                      tone === t.id
                        ? "bg-white text-[#1E1B18]"
                        : "bg-white/8 text-white/70 hover:bg-white/12"
                    }`}
                  >
                    {t.emoji} {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trust strip */}
        {!preview && (
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-neutral-500">
            <span>4.9/5 ★</span>
            <span className="w-px h-3 bg-white/20" />
            <span>12 847 фото обработано</span>
            <span className="w-px h-3 bg-white/20" />
            <span>30 секунд</span>
          </div>
        )}

        {/* Main content area */}
        <div className="mt-8">
          {!preview ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-4">
              {/* Image result (for image modes) */}
              {result ? (
                <div>
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => setShowResult(!showResult)}
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
                      }`}>
                        До
                      </span>
                      <span className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                        showResult ? "bg-white text-[#1E1B18]" : "bg-black/40 text-white backdrop-blur-sm"
                      }`}>
                        После
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-sm text-neutral-400">
                    Нажмите на фото для сравнения
                  </p>
                </div>
              ) : textResult ? (
                /* Text result (for describe/score/analyze modes) */
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={preview}
                      alt="Фото"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-sm text-white font-medium">
                        {mode === "describe" ? "Описание готово" : mode === "score" ? "Оценка готова" : "Анализ готов"}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {mode === "describe" && (
                          <>{PLATFORMS.find(p => p.id === platform)?.name} &middot; {TONES.find(t => t.id === tone)?.name} стиль</>
                        )}
                        {mode === "score" && "Оценка качества по 5 критериям"}
                        {mode === "analyze" && "Характеристики помещения"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-xl p-5">
                    <p className="text-base text-white/90 whitespace-pre-wrap leading-relaxed">
                      {textResult}
                    </p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="mt-3 w-full rounded-lg bg-white/8 py-3 text-sm text-white/70 hover:bg-white/12 transition-all"
                  >
                    {copied ? "Скопировано!" : "Копировать текст"}
                  </button>
                </div>
              ) : (
                /* Preview of uploaded image */
                <div>
                  {mode === "remove" && !result ? (
                    <>
                      <MaskPainter imageSrc={preview} onMaskChange={setMaskDataUrl} />
                      <p className="mt-3 text-sm text-neutral-400">
                        Закрасьте объекты, которые нужно убрать
                      </p>
                    </>
                  ) : (
                    <div className="overflow-hidden">
                      <img
                        src={preview}
                        alt="Оригинальное фото"
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Remove mode text input */}
              {mode === "remove" && !hasResult && (
                <textarea
                  value={removeDescription}
                  onChange={(e) => setRemoveDescription(e.target.value)}
                  placeholder="Что убрать? Например: посуду со стола, коробки в углу"
                  rows={2}
                  className="w-full bg-white/8 rounded-lg px-4 py-3 text-base text-white placeholder:text-white/50 focus:bg-white/12 focus:outline-none resize-none"
                />
              )}

              {error && (
                <div className="rounded-lg bg-red-500/20 border border-red-500/30 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                {!hasResult ? (
                  <>
                    <button
                      onClick={handleGenerate}
                      disabled={loading || (style === "custom" && !customStyle.trim() && (mode === "redesign" || mode === "staging"))}
                      className="btn-generate flex-1"
                    >
                      {loading ? (
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
                      onClick={reset}
                      className="rounded-lg bg-white/8 px-5 py-4 text-base text-white/70 transition-all hover:bg-white/12"
                    >
                      Другое фото
                    </button>
                  </>
                ) : (
                  <>
                    {result && (
                      <a
                        href={result}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-generate flex-1 text-center"
                      >
                        Скачать
                      </a>
                    )}
                    {textResult && (
                      <button
                        onClick={copyToClipboard}
                        className="btn-generate flex-1"
                      >
                        {copied ? "Скопировано!" : "Копировать"}
                      </button>
                    )}
                    <button
                      onClick={reset}
                      className="rounded-lg bg-white/8 px-5 py-4 text-base text-white/70 transition-all hover:bg-white/12"
                    >
                      Ещё фото
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        {!preview && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-base text-neutral-400">Советы</h3>
            <ul className="mt-4 space-y-3 text-base text-neutral-400">
              {mode === "describe" ? (
                <>
                  <li>— Фото должно хорошо показывать комнату</li>
                  <li>— Чем больше деталей видно, тем лучше описание</li>
                  <li>— Попробуйте разные стили текста для сравнения</li>
                </>
              ) : mode === "score" ? (
                <>
                  <li>— Загрузите фото перед публикацией объявления</li>
                  <li>— AI оценит освещение, композицию, порядок</li>
                  <li>— Получите конкретные рекомендации что улучшить</li>
                </>
              ) : mode === "analyze" ? (
                <>
                  <li>— Загрузите фото комнаты для полного анализа</li>
                  <li>— AI определит тип помещения, площадь, ремонт</li>
                  <li>— Используйте результат для заполнения объявления</li>
                </>
              ) : mode === "renovation" ? (
                <>
                  <li>— Выберите тип ремонта: стены, полы или полная реновация</li>
                  <li>— Покажите покупателю потенциал квартиры</li>
                  <li>— Идеально для квартир с устаревшим ремонтом</li>
                </>
              ) : mode === "dusk" || mode === "sky" ? (
                <>
                  <li>— Используйте фото фасада здания</li>
                  <li>— Горизонтальные фото работают лучше</li>
                  <li>— Должно быть видно небо на фото</li>
                </>
              ) : (
                <>
                  <li>— Горизонтальные фото работают лучше</li>
                  <li>— Минимум 512x512 пикселей</li>
                  <li>— Снимайте с хорошим охватом комнаты</li>
                </>
              )}
            </ul>

            {/* FOMO element */}
            <div className="mt-8 rounded-xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terra-400" />
              </span>
              <span className="text-sm text-neutral-400">47 риелторов обрабатывают фото прямо сейчас</span>
            </div>
          </div>
        )}

        {/* Cross-sell after result */}
        {hasResult && (
          <div className="mt-6 rounded-lg bg-terra-500/10 border border-terra-500/20 p-4 text-center">
            <p className="text-sm text-terra-300">Понравился результат? Получите 50 фото за 2 490₽</p>
            <a href="/pricing" className="text-sm text-terra-400 underline mt-1 inline-block">
              Смотреть тарифы →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

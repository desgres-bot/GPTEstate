"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import MaskPainter from "@/components/MaskPainter";
import { STYLES } from "@/lib/constants";
import type { Mode, Style } from "@/types";

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>("enhance");
  const [style, setStyle] = useState<Style>("modern");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode && ["enhance", "staging", "redesign", "remove"].includes(urlMode)) {
      setMode(urlMode as Mode);
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeDescription, setRemoveDescription] = useState("");
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(true);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreview(previewUrl);
    setResult(null);
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
      if (mode === "redesign" || mode === "staging") formData.append("style", style);
      if (mode === "remove") {
        if (removeDescription.trim()) formData.append("description", removeDescription.trim());
        if (maskDataUrl) formData.append("mask", maskDataUrl);
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
      setResult(data.output_url);
      setShowResult(true);
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
    setError(null);
    setRemoveDescription("");
    setMaskDataUrl(null);
  };

  const modes = [
    { id: "enhance" as Mode, label: "Уборка", desc: "Убрать бардак" },
    { id: "staging" as Mode, label: "Мебель", desc: "Обставить пустую" },
    { id: "redesign" as Mode, label: "Новый стиль", desc: "Сменить интерьер" },
    { id: "remove" as Mode, label: "Удаление", desc: "Убрать объекты" },
  ];

  return (
    <div className="min-h-screen bg-[#1E1B18] text-white pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-12">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="heading-display text-[32px] sm:text-[48px]">Улучшение фото</h1>
          <p className="mt-2 text-[#BFBFBF] text-base">
            {mode === "enhance" ? "Уборка фото" : mode === "staging" ? "Добавить мебель" : mode === "redesign" ? "Новый стиль интерьера" : "Удаление объектов"}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-lg px-3 py-3 text-center transition-all ${
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

        {/* Style chips (redesign mode) */}
        {(mode === "redesign" || mode === "staging") && (
          <div className="mt-4 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id as Style)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  style === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Main content area */}
        <div className="mt-8">
          {!preview ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-4">
              {/* Photo — tap to toggle before/after */}
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
                    {/* Dark gradient for text readability */}
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
              ) : (
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
              {mode === "remove" && !result && (
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
                {!result ? (
                  <>
                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="flex-1 rounded-lg bg-white py-4 text-base font-medium text-[#1E1B18] transition-all hover:bg-neutral-100 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Улучшаем...
                        </span>
                      ) : (
                        mode === "enhance" ? "Убрать бардак" : mode === "staging" ? "Добавить мебель" : mode === "redesign" ? "Сменить стиль" : "Убрать объекты"
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
                    <a
                      href={result}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-white py-4 text-center text-base font-medium text-[#1E1B18] transition-all hover:bg-neutral-100"
                    >
                      Скачать
                    </a>
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
              <li>— Горизонтальные фото работают лучше</li>
              <li>— Минимум 512x512 пикселей</li>
              <li>— Снимайте с хорошим охватом комнаты</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

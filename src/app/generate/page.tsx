"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import MaskPainter from "@/components/MaskPainter";
import { STYLES } from "@/lib/constants";
import type { Mode, Style } from "@/types";

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>("enhance");
  const [style, setStyle] = useState<Style>("modern");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeDescription, setRemoveDescription] = useState("");
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);

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
      if (mode === "redesign") formData.append("style", style);
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

  const generateButtonLabel = () => {
    if (mode === "enhance") return "🧹 Убрать бардак";
    if (mode === "redesign") return "🎨 Редизайн";
    return "✂️ Убрать объекты";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Генерация фото</h1>
        <p className="mt-2 text-gray-500">
          Загрузите фото и выберите режим обработки
        </p>
      </div>

      {/* Mode selector */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setMode("enhance")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
            mode === "enhance"
              ? "bg-navy-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🧹 Уборка фото
        </button>
        <button
          onClick={() => setMode("redesign")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
            mode === "redesign"
              ? "bg-navy-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🎨 Редизайн интерьера
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
            mode === "remove"
              ? "bg-navy-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ✂️ Убрать объекты
        </button>
      </div>

      {/* Style selector (redesign mode) */}
      {mode === "redesign" && (
        <div className="mt-6">
          <p className="mb-3 text-center text-sm font-medium text-gray-600">
            Выберите стиль дизайна
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id as Style)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  style === s.id
                    ? "bg-accent-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upload / Preview area */}
      <div className="mt-8">
        {!preview ? (
          <ImageUploader onImageSelect={handleImageSelect} />
        ) : (
          <div className="space-y-6">
            <div className={`grid gap-6 ${result ? "md:grid-cols-2" : ""}`}>
              {/* Original / Mask Painter */}
              <div>
                <div className="mb-2 text-sm font-medium text-gray-500">
                  {mode === "remove" && !result ? "Закрасьте объекты для удаления" : "Оригинал"}
                </div>
                {mode === "remove" && !result ? (
                  <MaskPainter imageSrc={preview} onMaskChange={setMaskDataUrl} />
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <img
                      src={preview}
                      alt="Оригинальное фото"
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Result */}
              {result && (
                <div>
                  <div className="mb-2 text-sm font-medium text-accent-500">Результат</div>
                  <div className="overflow-hidden rounded-2xl border-2 border-accent-200">
                    <img
                      src={result}
                      alt="Результат генерации"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Remove mode: text description */}
            {mode === "remove" && !result && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Опишите что убрать (необязательно)
                </label>
                <textarea
                  value={removeDescription}
                  onChange={(e) => setRemoveDescription(e.target.value)}
                  placeholder="Например: убери посуду со стола и коробки в углу"
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 resize-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Закрасьте объекты на фото и/или опишите текстом что нужно убрать
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              {!result ? (
                <>
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="btn-primary !py-3 !px-8 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Генерация...
                      </span>
                    ) : (
                      generateButtonLabel()
                    )}
                  </button>
                  <button onClick={reset} className="btn-secondary !py-3 !px-8">
                    Выбрать другое фото
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={result}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-3 !px-8"
                  >
                    Скачать результат
                  </a>
                  <button onClick={reset} className="btn-secondary !py-3 !px-8">
                    Новое фото
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-12 rounded-2xl bg-gray-50 p-6">
        <h3 className="text-lg font-bold">Советы для лучшего результата</h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li>&#8226; Используйте горизонтальные фото с хорошим охватом комнаты</li>
          <li>&#8226; Минимальное разрешение — 512x512 пикселей</li>
          <li>&#8226; Для редизайна лучше подходят фото пустых или полупустых комнат</li>
          <li>&#8226; Избегайте сильно затемнённых или размытых фото</li>
          {mode === "remove" && (
            <li>&#8226; Для удаления объектов закрасьте их кистью и/или опишите текстом</li>
          )}
        </ul>
      </div>
    </div>
  );
}

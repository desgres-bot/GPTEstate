"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { STYLES, SKY_OPTIONS } from "@/lib/constants";
import type { Mode, Style, SkyType } from "@/types";

interface BatchFile {
  file: File;
  preview: string;
  status: "pending" | "processing" | "done" | "error";
  result?: string;
  error?: string;
}

export default function BatchPage() {
  const [mode, setMode] = useState<Mode>("enhance");
  const [style, setStyle] = useState<Style>("modern");
  const [skyType, setSkyType] = useState<SkyType>("sunny");
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const modes = [
    { id: "enhance" as Mode, label: "Уборка", desc: "Убрать бардак" },
    { id: "staging" as Mode, label: "Мебель", desc: "Обставить пустую" },
    { id: "redesign" as Mode, label: "Новый стиль", desc: "Сменить интерьер" },
    { id: "dusk" as Mode, label: "Закат", desc: "День → вечер" },
    { id: "sky" as Mode, label: "Небо", desc: "Заменить небо" },
  ];

  const handleFiles = useCallback((selectedFiles: FileList | File[]) => {
    const newFiles: BatchFile[] = Array.from(selectedFiles)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 20)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));
    setFiles((prev) => [...prev, ...newFiles].slice(0, 20));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const processAll = async () => {
    if (files.length === 0) return;
    setProcessing(true);

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === "done") continue;

      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: "processing" } : f)),
      );

      try {
        const formData = new FormData();
        formData.append("image", files[i].file);
        formData.append("mode", mode);
        if (mode === "redesign" || mode === "staging")
          formData.append("style", style);
        if (mode === "sky") formData.append("skyType", skyType);

        const res = await fetch("/api/generate", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Ошибка генерации");
        }

        const data = await res.json();
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: "done", result: data.output_url } : f,
          ),
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  status: "error",
                  error:
                    err instanceof Error ? err.message : "Ошибка обработки",
                }
              : f,
          ),
        );
      }
    }

    setProcessing(false);
  };

  const downloadZip = async () => {
    const doneFiles = files.filter((f) => f.status === "done" && f.result);
    if (doneFiles.length === 0) return;

    setDownloading(true);
    try {
      const zip = new JSZip();
      for (let i = 0; i < doneFiles.length; i++) {
        const base64 = doneFiles[i].result!.split(",")[1];
        zip.file(`photo-${i + 1}.jpg`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gptestate-batch-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const processingIndex = files.findIndex((f) => f.status === "processing");

  return (
    <div className="min-h-screen bg-[#1E1B18] text-white pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="heading-display text-[32px] sm:text-[48px]">
              Пакетная обработка
            </h1>
            <p className="mt-2 text-[#BFBFBF] text-base">
              Загрузите до 20 фото — обработаем все разом
            </p>
          </div>
          <Link
            href="/generate"
            className="rounded-lg bg-white/8 px-4 py-2 text-sm text-white/70 hover:bg-white/12 transition-all mt-2"
          >
            Одно фото
          </Link>
        </div>

        {/* Mode tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              disabled={processing}
              className={`rounded-lg px-3 py-3 text-center transition-all ${
                mode === m.id
                  ? "bg-white text-[#1E1B18]"
                  : "bg-white/8 text-white/70 hover:bg-white/12"
              } disabled:opacity-50`}
            >
              <div className="text-sm font-medium">{m.label}</div>
              <div
                className={`text-xs mt-0.5 ${mode === m.id ? "text-[#6B6560]" : "text-white/50"}`}
              >
                {m.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Style chips */}
        {(mode === "redesign" || mode === "staging") && (
          <div className="mt-4 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id as Style)}
                disabled={processing}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  style === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                } disabled:opacity-50`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Sky type chips */}
        {mode === "sky" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SKY_OPTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSkyType(s.id as SkyType)}
                disabled={processing}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  skyType === s.id
                    ? "bg-white text-[#1E1B18]"
                    : "bg-white/8 text-white/70 hover:bg-white/12"
                } disabled:opacity-50`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Upload zone */}
        {files.length < 20 && !processing && (
          <div
            className="mt-8 rounded-xl border-2 border-dashed border-white/20 p-12 text-center cursor-pointer hover:border-white/40 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.accept = "image/*";
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) handleFiles(target.files);
              };
              input.click();
            }}
          >
            <div className="text-4xl mb-4 opacity-50">📸</div>
            <p className="text-base text-white/70">
              Перетащите фото сюда или нажмите для выбора
            </p>
            <p className="text-sm text-white/40 mt-2">
              До 20 фото &middot; JPG, PNG, WebP
            </p>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-neutral-400">
                {files.length} фото
                {doneCount > 0 && ` · ${doneCount} готово`}
                {errorCount > 0 && ` · ${errorCount} ошибок`}
              </p>
              {!processing && files.length > 0 && (
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Очистить
                </button>
              )}
            </div>

            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg bg-white/[0.04] border border-white/10 p-3"
              >
                <img
                  src={f.result || f.preview}
                  alt={f.file.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 truncate">
                    {f.file.name}
                  </p>
                  <p className="text-xs text-white/40">
                    {(f.file.size / 1024).toFixed(0)} KB
                  </p>
                </div>

                {/* Status */}
                {f.status === "pending" && (
                  <span className="text-xs text-white/30">Ожидание</span>
                )}
                {f.status === "processing" && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-terra-400"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span className="text-xs text-terra-400">
                      Обработка...
                    </span>
                  </div>
                )}
                {f.status === "done" && (
                  <span className="text-xs text-green-400">Готово</span>
                )}
                {f.status === "error" && (
                  <span className="text-xs text-red-400" title={f.error}>
                    Ошибка
                  </span>
                )}

                {/* Remove button */}
                {!processing && (
                  <button
                    onClick={() => removeFile(i)}
                    className="text-white/20 hover:text-white/60 transition-colors text-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {processing && (
          <div className="mt-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-terra-400 transition-all duration-300 rounded-full"
                style={{
                  width: `${((doneCount + errorCount) / files.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-neutral-400 mt-2 text-center">
              {processingIndex >= 0
                ? `Обрабатываем ${processingIndex + 1} из ${files.length}...`
                : "Завершено"}
            </p>
          </div>
        )}

        {/* Action buttons */}
        {files.length > 0 && (
          <div className="mt-6 flex gap-3">
            {doneCount === files.length && files.length > 0 ? (
              <button
                onClick={downloadZip}
                disabled={downloading}
                className="flex-1 rounded-lg bg-white py-4 text-base font-medium text-[#1E1B18] transition-all hover:bg-neutral-100 disabled:opacity-50"
              >
                {downloading
                  ? "Создаём архив..."
                  : `Скачать ZIP (${doneCount} фото)`}
              </button>
            ) : (
              <button
                onClick={processAll}
                disabled={processing || files.length === 0}
                className="flex-1 rounded-lg bg-white py-4 text-base font-medium text-[#1E1B18] transition-all hover:bg-neutral-100 disabled:opacity-50"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Обрабатываем...
                  </span>
                ) : (
                  `Обработать ${files.length} фото`
                )}
              </button>
            )}
          </div>
        )}

        {/* Cross-sell */}
        {doneCount > 0 && !processing && (
          <div className="mt-6 rounded-lg bg-terra-500/10 border border-terra-500/20 p-4 text-center">
            <p className="text-sm text-terra-300">
              Обрабатываете много фото? Получите 150 фото за 1990₽
            </p>
            <Link
              href="/pricing"
              className="text-sm text-terra-400 underline mt-1 inline-block"
            >
              Смотреть тарифы →
            </Link>
          </div>
        )}

        {/* Empty state info */}
        {files.length === 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-base text-neutral-400">
              Как работает пакетная обработка
            </h3>
            <ul className="mt-4 space-y-3 text-base text-neutral-400">
              <li>— Загрузите до 20 фото одного объекта</li>
              <li>— Выберите режим и стиль</li>
              <li>— Все фото обработаются автоматически</li>
              <li>— Скачайте результаты одним ZIP-архивом</li>
            </ul>

            <div className="mt-8 rounded-xl bg-white/[0.04] border border-white/10 p-4 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terra-400" />
              </span>
              <span className="text-sm text-neutral-400">
                Экономия времени: 10 фото за 5 минут вместо 30
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

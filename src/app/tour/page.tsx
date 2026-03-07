"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Script from "next/script";
import type { TourScene, TourHotspot } from "@/types";
import { TOUR_CONFIG } from "@/lib/constants";
import PanoramaViewer from "@/components/PanoramaViewer";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function TourPage() {
  /* ---------- state ---------- */
  const [scenes, setScenes] = useState<TourScene[]>([]);
  const [activeSceneId, setActiveSceneId] = useState<string>("");
  const [pannellumReady, setPannellumReady] = useState(false);
  const [addingHotspot, setAddingHotspot] = useState(false);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);

  // Hotspot form state
  const [hotspotPitch, setHotspotPitch] = useState(0);
  const [hotspotYaw, setHotspotYaw] = useState(0);
  const [hotspotTarget, setHotspotTarget] = useState("");

  // Inline editing
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Embed copy feedback
  const [embedCopied, setEmbedCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- check pannellum availability on mount ---------- */
  useEffect(() => {
    if ((window as any).pannellum) {
      setPannellumReady(true);
    }
  }, []);

  /* ---------- upload handler ---------- */
  const handleFilesSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newScenes: TourScene[] = [];

      Array.from(files).forEach((file, idx) => {
        if (!file.type.startsWith("image/")) return;
        if (scenes.length + newScenes.length >= TOUR_CONFIG.maxScenes) return;

        const url = URL.createObjectURL(file);
        newScenes.push({
          id: generateId(),
          title: `Комната ${scenes.length + newScenes.length + 1}`,
          imageUrl: url,
          hotspots: [],
        });
      });

      if (newScenes.length > 0) {
        setScenes((prev) => {
          const updated = [...prev, ...newScenes];
          // auto-select first scene if none active
          if (!activeSceneId || !prev.find((s) => s.id === activeSceneId)) {
            setActiveSceneId(newScenes[0].id);
          }
          return updated;
        });
      }

      // reset input so the same file can be re-selected
      e.target.value = "";
    },
    [scenes, activeSceneId]
  );

  /* ---------- delete scene ---------- */
  const deleteScene = useCallback(
    (id: string) => {
      setScenes((prev) => {
        const updated = prev.filter((s) => s.id !== id);
        if (activeSceneId === id) {
          setActiveSceneId(updated[0]?.id ?? "");
        }
        return updated;
      });
    },
    [activeSceneId]
  );

  /* ---------- inline title edit ---------- */
  const startEditingTitle = useCallback((scene: TourScene) => {
    setEditingSceneId(scene.id);
    setEditingTitle(scene.title);
  }, []);

  const saveTitle = useCallback(() => {
    if (!editingSceneId) return;
    setScenes((prev) =>
      prev.map((s) =>
        s.id === editingSceneId
          ? { ...s, title: editingTitle.trim() || s.title }
          : s
      )
    );
    setEditingSceneId(null);
  }, [editingSceneId, editingTitle]);

  /* ---------- add hotspot ---------- */
  const addHotspot = useCallback(() => {
    if (!activeSceneId || !hotspotTarget) return;

    const newHotspot: TourHotspot = {
      id: generateId(),
      pitch: hotspotPitch,
      yaw: hotspotYaw,
      targetSceneId: hotspotTarget,
      text: scenes.find((s) => s.id === hotspotTarget)?.title ?? "Переход",
    };

    setScenes((prev) =>
      prev.map((s) =>
        s.id === activeSceneId
          ? { ...s, hotspots: [...s.hotspots, newHotspot] }
          : s
      )
    );

    setAddingHotspot(false);
    setHotspotPitch(0);
    setHotspotYaw(0);
    setHotspotTarget("");
  }, [activeSceneId, hotspotPitch, hotspotYaw, hotspotTarget, scenes]);

  /* ---------- embed code ---------- */
  const embedCode = `<iframe src="https://fotoestate.ru/tour/embed" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`;

  const copyEmbed = useCallback(() => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    });
  }, [embedCode]);

  /* ---------- other scenes for hotspot target ---------- */
  const otherScenes = scenes.filter((s) => s.id !== activeSceneId);

  // Set default target when opening hotspot form
  useEffect(() => {
    if (addingHotspot && otherScenes.length > 0 && !hotspotTarget) {
      setHotspotTarget(otherScenes[0].id);
    }
  }, [addingHotspot, otherScenes, hotspotTarget]);

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      {/* Pannellum JS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        strategy="beforeInteractive"
        onLoad={() => setPannellumReady(true)}
      />

      {/* Pannellum CSS — injected via DOM API in a helper component */}
      <PannellumCSS />

      <section className="min-h-screen bg-[#1E1B18] text-white">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-8 lg:pt-36">
          <h1 className="heading-display text-[36px] leading-[1.08] sm:text-[52px] lg:text-[72px]">
            Виртуальный тур 360°
          </h1>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl">
            Загрузите панорамные фото комнат — создайте интерактивный тур
          </p>
        </div>

        {/* Main layout */}
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ===== Left sidebar ===== */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="rounded-xl bg-white/[0.05] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Комнаты</h2>
                  <span className="text-xs text-neutral-500">
                    {scenes.length}/{TOUR_CONFIG.maxScenes}
                  </span>
                </div>

                {/* Upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-terra w-full mb-4 text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Загрузить фото
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFilesSelected}
                />

                {/* Scene list */}
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {scenes.map((scene) => (
                    <div
                      key={scene.id}
                      className={`group flex items-center gap-3 rounded-lg p-2 cursor-pointer transition-all ${
                        activeSceneId === scene.id
                          ? "bg-white/[0.12] border border-terra-500/50"
                          : "bg-white/[0.06] hover:bg-white/[0.1] border border-transparent"
                      }`}
                      onClick={() => setActiveSceneId(scene.id)}
                    >
                      {/* Thumbnail */}
                      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={scene.imageUrl}
                          alt={scene.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title / editable */}
                      <div className="flex-1 min-w-0">
                        {editingSceneId === scene.id ? (
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onBlur={saveTitle}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveTitle();
                            }}
                            autoFocus
                            className="w-full bg-transparent border-b border-terra-400 text-sm text-white outline-none py-0.5"
                          />
                        ) : (
                          <span
                            className="text-sm text-white truncate block cursor-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingTitle(scene);
                            }}
                            title="Нажмите для редактирования"
                          >
                            {scene.title}
                          </span>
                        )}
                        {scene.hotspots.length > 0 && (
                          <span className="text-[11px] text-neutral-500">
                            {scene.hotspots.length} переход
                            {scene.hotspots.length > 1 ? "а" : ""}
                          </span>
                        )}
                      </div>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteScene(scene.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-red-400 flex-shrink-0"
                        title="Удалить"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {scenes.length === 0 && (
                  <p className="text-sm text-neutral-500 text-center py-4">
                    Нет загруженных комнат
                  </p>
                )}
              </div>
            </div>

            {/* ===== Main area ===== */}
            <div className="flex-1 min-w-0">
              {scenes.length === 0 ? (
                /* Empty state */
                <div
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 p-16 text-center cursor-pointer hover:border-terra-500/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg
                    className="w-16 h-16 text-neutral-600 mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xl text-neutral-300 mb-2">
                    Загрузите панорамные фото
                  </p>
                  <p className="text-sm text-neutral-500 mb-6">
                    Перетащите или нажмите для выбора. JPG, PNG до 20 МБ.
                  </p>
                  <span className="btn-terra text-sm">
                    Выбрать файлы
                  </span>
                </div>
              ) : !pannellumReady ? (
                /* Loading spinner */
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/[0.05] aspect-video">
                  <div className="w-10 h-10 border-2 border-terra-400 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm text-neutral-400">
                    Загрузка просмотрщика...
                  </p>
                </div>
              ) : (
                /* Viewer */
                <PanoramaViewer
                  scenes={scenes}
                  activeSceneId={activeSceneId}
                  onSceneChange={setActiveSceneId}
                />
              )}

              {/* Action buttons */}
              {scenes.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (otherScenes.length === 0) return;
                      setAddingHotspot(!addingHotspot);
                    }}
                    disabled={otherScenes.length === 0}
                    className={`btn-terra text-sm ${
                      otherScenes.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    title={
                      otherScenes.length === 0
                        ? "Загрузите ещё одну комнату для создания перехода"
                        : ""
                    }
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                      />
                    </svg>
                    Добавить переход
                  </button>

                  <button
                    type="button"
                    onClick={() => setEmbedModalOpen(true)}
                    className="rounded-lg bg-white/10 px-5 py-3 text-sm text-white transition-all hover:bg-white/20"
                  >
                    <svg
                      className="w-4 h-4 mr-2 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Embed-код
                  </button>

                  {/* Active scene hotspots count */}
                  {(() => {
                    const activeScene = scenes.find(
                      (s) => s.id === activeSceneId
                    );
                    if (!activeScene || activeScene.hotspots.length === 0)
                      return null;
                    return (
                      <span className="text-xs text-neutral-500 ml-2">
                        {activeScene.hotspots.length} переход
                        {activeScene.hotspots.length > 1 ? "а" : ""} в этой
                        комнате
                      </span>
                    );
                  })()}
                </div>
              )}

              {/* Hotspot adding form */}
              {addingHotspot && (
                <div className="mt-4 rounded-xl bg-white/[0.08] border border-white/10 p-5">
                  <h3 className="text-sm font-medium mb-4 text-terra-400">
                    Новый переход
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Pitch (вертикаль, -90...90)
                      </label>
                      <input
                        type="number"
                        min={-90}
                        max={90}
                        value={hotspotPitch}
                        onChange={(e) =>
                          setHotspotPitch(Number(e.target.value))
                        }
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-terra-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Yaw (горизонталь, -180...180)
                      </label>
                      <input
                        type="number"
                        min={-180}
                        max={180}
                        value={hotspotYaw}
                        onChange={(e) =>
                          setHotspotYaw(Number(e.target.value))
                        }
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-terra-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Целевая комната
                      </label>
                      <select
                        value={hotspotTarget}
                        onChange={(e) => setHotspotTarget(e.target.value)}
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-terra-500 transition-colors"
                      >
                        {otherScenes.map((s) => (
                          <option
                            key={s.id}
                            value={s.id}
                            className="bg-[#1E1B18] text-white"
                          >
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addHotspot}
                      disabled={!hotspotTarget}
                      className="btn-terra text-sm"
                    >
                      Добавить
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddingHotspot(false)}
                      className="rounded-lg bg-white/10 px-5 py-3 text-sm text-white transition-all hover:bg-white/20"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Embed Modal ===== */}
      {embedModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setEmbedModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#2A2724] border border-white/10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium text-white">
                Embed-код
              </h3>
              <button
                type="button"
                onClick={() => setEmbedModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-neutral-400 mb-4">
              Скопируйте код и вставьте на ваш сайт или в объявление,
              чтобы показать виртуальный тур.
            </p>

            <div className="rounded-lg bg-black/40 p-4 font-mono text-xs text-neutral-300 break-all select-all">
              {embedCode}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={copyEmbed}
                className="btn-terra text-sm"
              >
                {embedCopied ? "Скопировано!" : "Копировать"}
              </button>
              <button
                type="button"
                onClick={() => setEmbedModalOpen(false)}
                className="rounded-lg bg-white/10 px-5 py-3 text-sm text-white transition-all hover:bg-white/20"
              >
                Закрыть
              </button>
            </div>

            <div className="mt-5 rounded-lg bg-white/[0.05] p-4 text-xs text-neutral-500 leading-relaxed">
              <p className="font-medium text-neutral-400 mb-1">
                Как использовать:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Загрузите панорамные фото на хостинг (Google Drive, Яндекс
                  Диск, ваш сервер)
                </li>
                <li>
                  Используйте Pannellum для отображения тура на вашем сайте
                </li>
                <li>
                  Или используйте embed-код выше для быстрой вставки
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PannellumCSS — injects Pannellum stylesheet via DOM API            */
/*  Uses safe DOM manipulation instead of raw HTML insertion           */
/* ------------------------------------------------------------------ */

function PannellumCSS() {
  useEffect(() => {
    const id = "pannellum-css";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return null;
}

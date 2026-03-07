"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  images: string[];
  onClose: () => void;
}

export default function SlideshowExporter({ images, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [durationPerSlide, setDurationPerSlide] = useState(3);
  const [transition, setTransition] = useState<"fade" | "slide" | "zoom">("fade");
  const [overlayText, setOverlayText] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Preview auto-advance
  useEffect(() => {
    if (isExporting) return;
    const interval = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % images.length);
    }, durationPerSlide * 1000);
    return () => clearInterval(interval);
  }, [images.length, durationPerSlide, isExporting]);

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const drawFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      w: number,
      h: number,
      alpha: number,
      scale: number,
      offsetX: number,
      text: string
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      // Calculate cover dimensions
      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let drawW: number, drawH: number, sx: number, sy: number;
      if (imgRatio > canvasRatio) {
        drawH = h * scale;
        drawW = drawH * imgRatio;
      } else {
        drawW = w * scale;
        drawH = drawW / imgRatio;
      }
      sx = (w - drawW) / 2 + offsetX;
      sy = (h - drawH) / 2;

      ctx.drawImage(img, sx, sy, drawW, drawH);
      ctx.restore();

      // Text overlay
      if (text) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, h - 60, w, 60);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, w / 2, h - 25);
        ctx.restore();
      }
    },
    []
  );

  const exportSlideshow = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setProgress(0);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 1280;
    const h = 720;
    canvas.width = w;
    canvas.height = h;

    const fps = 30;
    const transitionFrames = Math.floor(fps * 0.5); // 0.5s transition
    const slideFrames = Math.floor(fps * durationPerSlide);
    const totalFrames = images.length * slideFrames;

    // Load all images
    const loadedImages: HTMLImageElement[] = [];
    for (const src of images) {
      try {
        loadedImages.push(await loadImage(src));
      } catch {
        // Skip failed images
      }
    }

    if (loadedImages.length === 0) {
      setIsExporting(false);
      return;
    }

    // Use MediaRecorder if available
    const stream = canvas.captureStream(fps);
    const chunks: Blob[] = [];

    let mimeType = "video/webm;codecs=vp9";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/webm";
    }

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 4000000,
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gptestate-slideshow-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      setProgress(100);
    };

    recorder.start();

    // Render frames
    for (let frame = 0; frame < totalFrames; frame++) {
      const globalSlideIndex = Math.floor(frame / slideFrames);
      const frameInSlide = frame % slideFrames;
      const currentIdx = globalSlideIndex % loadedImages.length;
      const nextIdx = (currentIdx + 1) % loadedImages.length;
      const currentImg = loadedImages[currentIdx];
      const nextImg = loadedImages[nextIdx];

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const isInTransition = frameInSlide >= slideFrames - transitionFrames;
      const transProgress = isInTransition
        ? (frameInSlide - (slideFrames - transitionFrames)) / transitionFrames
        : 0;

      if (transition === "fade") {
        drawFrame(ctx, currentImg, w, h, 1 - transProgress, 1, 0, overlayText);
        if (isInTransition) {
          drawFrame(ctx, nextImg, w, h, transProgress, 1, 0, "");
        }
      } else if (transition === "slide") {
        const offset = isInTransition ? -transProgress * w : 0;
        drawFrame(ctx, currentImg, w, h, 1, 1, offset, overlayText);
        if (isInTransition) {
          drawFrame(ctx, nextImg, w, h, 1, 1, w + offset, "");
        }
      } else {
        // zoom (Ken Burns)
        const scale = 1 + frameInSlide / slideFrames * 0.1;
        drawFrame(ctx, currentImg, w, h, 1 - transProgress, scale, 0, overlayText);
        if (isInTransition) {
          drawFrame(ctx, nextImg, w, h, transProgress, 1, 0, "");
        }
      }

      // Overlay text on last frame too
      if (overlayText && isInTransition) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, h - 60, w, 60);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(overlayText, w / 2, h - 25);
        ctx.restore();
      }

      setProgress(Math.round((frame / totalFrames) * 100));

      // Wait for next frame
      await new Promise((resolve) => setTimeout(resolve, 1000 / fps));
    }

    recorder.stop();
  }, [images, durationPerSlide, transition, overlayText, loadImage, drawFrame]);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70" style={{ backdropFilter: "blur(8px)" }}>
      <div className="bg-[#1E1B18] rounded-2xl border border-white/10 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white text-xl font-normal">Создать слайдшоу</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors text-2xl">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            {images[previewIndex] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[previewIndex]}
                alt={`Slide ${previewIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            )}
            {overlayText && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-3 text-center text-white text-sm">
                {overlayText}
              </div>
            )}
            <div className="absolute top-3 right-3 bg-black/50 rounded-lg px-3 py-1 text-xs text-white">
              {previewIndex + 1} / {images.length}
            </div>
          </div>

          {/* Hidden canvas for export */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Settings */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Длительность слайда
              </label>
              <select
                value={durationPerSlide}
                onChange={(e) => setDurationPerSlide(Number(e.target.value))}
                className="w-full rounded-lg bg-white/10 border border-white/10 text-white px-4 py-2.5 text-sm"
              >
                <option value={2}>2 секунды</option>
                <option value={3}>3 секунды</option>
                <option value={4}>4 секунды</option>
                <option value={5}>5 секунд</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Переход
              </label>
              <select
                value={transition}
                onChange={(e) => setTransition(e.target.value as "fade" | "slide" | "zoom")}
                className="w-full rounded-lg bg-white/10 border border-white/10 text-white px-4 py-2.5 text-sm"
              >
                <option value="fade">Затухание</option>
                <option value="slide">Слайд</option>
                <option value="zoom">Зум (Ken Burns)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Текст на видео
              </label>
              <input
                type="text"
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
                placeholder="Адрес, цена..."
                className="w-full rounded-lg bg-white/10 border border-white/10 text-white px-4 py-2.5 text-sm placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Info */}
          <div className="rounded-lg bg-white/5 p-4 text-sm text-neutral-400">
            {images.length} фото &middot; ~{images.length * durationPerSlide} сек &middot; 1280&times;720 &middot; WebM
          </div>

          {/* Progress */}
          {isExporting && (
            <div>
              <div className="flex items-center justify-between text-sm text-neutral-400 mb-2">
                <span>Экспорт видео...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-terra-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={exportSlideshow}
              disabled={isExporting || images.length < 2}
              className="btn-terra flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? "Экспорт..." : "Скачать видео (WebM)"}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-white/10 px-6 py-3 text-white hover:bg-white/15 transition-all"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

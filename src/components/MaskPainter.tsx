"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface MaskPainterProps {
  imageSrc: string;
  onMaskChange: (maskDataUrl: string | null) => void;
}

export default function MaskPainter({ imageSrc, onMaskChange }: MaskPainterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [brushSize, setBrushSize] = useState(40);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const pinchStartRef = useRef<{ dist: number; scale: number; cx: number; cy: number; tx: number; ty: number } | null>(null);

  // Load image and setup canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !cursorCanvasRef.current || !containerRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;

    const containerWidth = container.clientWidth;
    const aspect = img.naturalHeight / img.naturalWidth;
    const displayHeight = containerWidth * aspect;

    canvas.width = containerWidth;
    canvas.height = displayHeight;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    cursorCanvas.width = containerWidth;
    cursorCanvas.height = displayHeight;
    cursorCanvas.style.width = `${containerWidth}px`;
    cursorCanvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageLoaded]);

  // Helper: get distance between two touches
  const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Account for scale/translate transforms
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale,
    };
  }, [scale]);

  const drawDot = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255, 60, 80, 0.45)";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }, [brushSize]);

  // Show brush cursor preview
  const showCursor = useCallback((x: number, y: number) => {
    const cursorCanvas = cursorCanvasRef.current;
    if (!cursorCanvas) return;
    const ctx = cursorCanvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.stroke();
    // Inner dot
    ctx.fillStyle = "rgba(255, 60, 80, 0.2)";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }, [brushSize]);

  const hideCursor = useCallback(() => {
    const cursorCanvas = cursorCanvasRef.current;
    if (!cursorCanvas) return;
    const ctx = cursorCanvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  }, []);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > 30) historyRef.current.shift();
  }, []);

  const exportMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) {
      onMaskChange(null);
      return;
    }

    const exportCanvas = document.createElement("canvas");
    const img = imgRef.current;
    exportCanvas.width = img.naturalWidth;
    exportCanvas.height = img.naturalHeight;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, img.naturalWidth, img.naturalHeight);

    onMaskChange(exportCanvas.toDataURL("image/png"));
  }, [onMaskChange]);

  // Mouse handlers (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    saveHistory();
    setIsDrawing(true);
    const pos = getPos(e);
    drawDot(pos.x, pos.y);
    showCursor(pos.x, pos.y);
  }, [saveHistory, getPos, drawDot, showCursor]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = getPos(e);
    showCursor(pos.x, pos.y);
    if (!isDrawing) return;
    e.preventDefault();
    drawDot(pos.x, pos.y);
  }, [isDrawing, getPos, drawDot, showCursor]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      setHasStrokes(true);
      exportMask();
    }
    hideCursor();
  }, [isDrawing, exportMask, hideCursor]);

  // Touch handlers (mobile) — 1 finger = draw, 2 fingers = pinch-zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Start pinch-zoom
      setIsPinching(true);
      setIsDrawing(false);
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      pinchStartRef.current = { dist, scale, cx, cy, tx: translate.x, ty: translate.y };
    } else if (e.touches.length === 1 && !isPinching) {
      // Start drawing
      saveHistory();
      setIsDrawing(true);
      const pos = getPos(e);
      drawDot(pos.x, pos.y);
    }
  }, [scale, translate, isPinching, saveHistory, getPos, drawDot]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchStartRef.current) {
      // Pinch-zoom in progress
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const newScale = Math.min(4, Math.max(1, pinchStartRef.current.scale * (dist / pinchStartRef.current.dist)));
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const dx = cx - pinchStartRef.current.cx;
      const dy = cy - pinchStartRef.current.cy;
      setScale(newScale);
      setTranslate({
        x: pinchStartRef.current.tx + dx,
        y: pinchStartRef.current.ty + dy,
      });
    } else if (e.touches.length === 1 && isDrawing && !isPinching) {
      // Drawing
      const pos = getPos(e);
      drawDot(pos.x, pos.y);
    }
  }, [isDrawing, isPinching, getPos, drawDot]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      if (isDrawing) {
        setIsDrawing(false);
        setHasStrokes(true);
        exportMask();
      }
      setIsPinching(false);
      pinchStartRef.current = null;
    } else if (e.touches.length === 1 && isPinching) {
      // Went from 2 fingers to 1 — don't start drawing yet
      setIsPinching(false);
      pinchStartRef.current = null;
    }
  }, [isDrawing, isPinching, exportMask]);

  const clearMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
    historyRef.current = [];
    onMaskChange(null);
  }, [onMaskChange]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prev = historyRef.current.pop();
    if (prev) {
      ctx.putImageData(prev, 0, 0);
      exportMask();
      if (historyRef.current.length === 0) setHasStrokes(false);
    } else {
      clearMask();
    }
  }, [exportMask, clearMask]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  if (!imageLoaded) return null;

  return (
    <div className="space-y-3">
      {/* Canvas area with pinch-zoom */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-white/10"
        style={{ touchAction: "none" }}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isPinching ? "none" : "transform 0.2s ease-out",
          }}
        >
          <img
            src={imageSrc}
            alt="Фото для редактирования"
            className="block w-full"
            draggable={false}
          />
          {/* Mask canvas */}
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          {/* Cursor preview canvas (desktop) */}
          <canvas
            ref={cursorCanvasRef}
            className="absolute left-0 top-0 pointer-events-none"
          />
        </div>
      </div>

      {/* Zoom indicator */}
      {scale > 1.05 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Масштаб: {Math.round(scale * 100)}%
          </span>
          <button
            onClick={resetZoom}
            className="rounded-lg bg-white/8 px-3 py-2 text-xs font-medium text-neutral-400 hover:bg-white/12 active:scale-95 transition-all"
          >
            Сбросить зум
          </button>
        </div>
      )}

      {/* Controls — mobile-friendly */}
      <div className="space-y-3">
        {/* Brush size slider — full width on mobile */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-400 shrink-0">Кисть</label>
          <input
            type="range"
            min={10}
            max={80}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-white/10
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-red-400
              [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,60,80,0.4)]
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20
              [&::-webkit-slider-thumb]:active:scale-125
              [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-400
              [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20"
          />
          <span className="text-sm text-neutral-500 tabular-nums w-10 text-right">{brushSize}px</span>
        </div>

        {/* Action buttons — large touch targets */}
        {hasStrokes && (
          <div className="flex gap-2">
            <button
              onClick={undo}
              className="flex-1 rounded-lg bg-white/8 px-4 py-3 text-sm font-medium text-neutral-300 hover:bg-white/12 active:scale-[0.97] transition-all"
            >
              ↩ Отменить
            </button>
            <button
              onClick={clearMask}
              className="flex-1 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/20 active:scale-[0.97] transition-all"
            >
              Очистить маску
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-500">
        Закрасьте кистью объекты для удаления. На телефоне: двумя пальцами — приблизить.
      </p>
    </div>
  );
}

"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface MaskPainterProps {
  imageSrc: string;
  onMaskChange: (maskDataUrl: string | null) => void;
}

export default function MaskPainter({ imageSrc, onMaskChange }: MaskPainterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const historyRef = useRef<ImageData[]>([]);

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
    if (!imageLoaded || !canvasRef.current || !containerRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;

    // Match canvas to displayed image size
    const containerWidth = container.clientWidth;
    const aspect = img.naturalHeight / img.naturalWidth;
    const displayHeight = containerWidth * aspect;

    canvas.width = containerWidth;
    canvas.height = displayHeight;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageLoaded]);

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

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

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

    // Create a composite: original image + red mask overlay
    const exportCanvas = document.createElement("canvas");
    const img = imgRef.current;
    exportCanvas.width = img.naturalWidth;
    exportCanvas.height = img.naturalHeight;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    // Scale and draw the mask on top
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, img.naturalWidth, img.naturalHeight);

    onMaskChange(exportCanvas.toDataURL("image/png"));
  }, [onMaskChange]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    saveHistory();
    setIsDrawing(true);
    const pos = getPos(e);
    drawDot(pos.x, pos.y);
  }, [saveHistory, getPos, drawDot]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    drawDot(pos.x, pos.y);
  }, [isDrawing, getPos, drawDot]);

  const handleEnd = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      setHasStrokes(true);
      exportMask();
    }
  }, [isDrawing, exportMask]);

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

  if (!imageLoaded) return null;

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-gray-200"
        style={{ touchAction: "none" }}
      >
        <img
          src={imageSrc}
          alt="Фото для редактирования"
          className="block w-full"
          draggable={false}
        />
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 cursor-crosshair"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Кисть:</label>
          <input
            type="range"
            min={10}
            max={80}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-red-400"
          />
          <span className="text-xs text-gray-400">{brushSize}px</span>
        </div>

        {hasStrokes && (
          <div className="flex gap-2">
            <button
              onClick={undo}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Отменить
            </button>
            <button
              onClick={clearMask}
              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors"
            >
              Очистить маску
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Закрасьте кистью объекты, которые нужно убрать
      </p>
    </div>
  );
}

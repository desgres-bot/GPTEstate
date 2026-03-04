"use client";

import { useCallback, useState } from "react";

interface Props {
  onImageSelect: (file: File, preview: string) => void;
}

export default function ImageUploader({ onImageSelect }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-colors ${
        dragActive
          ? "border-accent-500 bg-accent-50"
          : "border-gray-200 bg-gray-50 hover:border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <svg
        className="mb-4 h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="mb-2 text-base font-medium text-gray-700">
        Перетащите фото сюда
      </p>
      <p className="mb-4 text-sm text-gray-500">или</p>
      <label className="btn-primary cursor-pointer !text-sm">
        Выбрать файл
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
          }}
        />
      </label>
      <p className="mt-3 text-xs text-gray-400">JPG, PNG до 10 МБ</p>
    </div>
  );
}

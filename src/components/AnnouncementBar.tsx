"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

function getMidnightMSK(): number {
  const now = new Date();
  // Текущее время в UTC
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  // Время в МСК (UTC+3)
  const mskMs = utcMs + 3 * 3600_000;
  const mskNow = new Date(mskMs);

  // Полночь следующего дня МСК
  const mskMidnight = new Date(mskNow);
  mskMidnight.setHours(24, 0, 0, 0);

  // Разница в миллисекундах
  const diffMs = mskMidnight.getTime() - mskNow.getTime();
  return diffMs;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getTodayKey(): string {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const mskMs = utcMs + 3 * 3600_000;
  const mskNow = new Date(mskMs);
  return `${mskNow.getFullYear()}-${String(mskNow.getMonth() + 1).padStart(2, "0")}-${String(mskNow.getDate()).padStart(2, "0")}`;
}

export default function AnnouncementBar() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("announcement-dismissed");
    if (stored === getTodayKey()) {
      setDismissed(true);
    } else {
      setDismissed(false);
    }
    setRemaining(getMidnightMSK());
  }, []);

  useEffect(() => {
    if (dismissed || remaining === null) return;

    const interval = setInterval(() => {
      setRemaining(getMidnightMSK());
    }, 1000);

    return () => clearInterval(interval);
  }, [dismissed, remaining]);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem("announcement-dismissed", getTodayKey());
    setDismissed(true);
  }, []);

  if (dismissed || remaining === null) return null;

  const timeStr = formatTime(remaining);

  return (
    <div className="bg-gradient-to-r from-[#e07460] to-[#c05a43] text-white h-9 flex items-center justify-center relative text-sm font-medium">
      <Link
        href="/pricing"
        className="flex items-center gap-1 hover:underline underline-offset-2"
      >
        <span className="hidden sm:inline">
          🔥 +10 фото бесплатно к любому тарифу — осталось {timeStr}
        </span>
        <span className="sm:hidden">
          🔥 +10 фото бесплатно — {timeStr}
        </span>
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors text-base leading-none"
        aria-label="Закрыть"
      >
        ×
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const NAMES = [
  "Анна К.", "Сергей М.", "Елена В.", "Дмитрий П.", "Ольга С.",
  "Максим Д.", "Наталья Б.", "Андрей Т.", "Мария Р.", "Алексей Н.",
  "Ирина Г.", "Павел Л.", "Светлана Ф.", "Виктор Ш.", "Юлия К.",
  "Роман А.", "Татьяна М.", "Игорь В.", "Валентина С.", "Николай П.",
];

const CITIES = [
  "Москва", "Санкт-Петербург", "Казань", "Новосибирск", "Екатеринбург",
  "Краснодар", "Самара", "Тюмень", "Сочи", "Нижний Новгород",
];

const PLANS = ["Риелтор", "Агентство", "Профи"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

interface Purchase {
  name: string;
  city: string;
  plan: string;
  minutes: number;
}

function generatePurchase(): Purchase {
  return {
    name: pick(NAMES),
    city: pick(CITIES),
    plan: pick(PLANS),
    minutes: randomBetween(2, 15),
  };
}

export default function LivePurchaseToast() {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("toast-dismissed");
    if (stored === getTodayKey()) {
      setDismissed(true);
    } else {
      setDismissed(false);
    }
  }, []);

  const showToast = useCallback(() => {
    const p = generatePurchase();
    setPurchase(p);
    setVisible(true);

    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, []);

  const scheduleNext = useCallback(() => {
    const delay = randomBetween(20_000, 40_000);
    timeoutRef.current = setTimeout(() => {
      showToast();
      scheduleNext();
    }, delay);
  }, [showToast]);

  useEffect(() => {
    if (dismissed) return;

    // Первый показ через 20-40 секунд
    const initialDelay = randomBetween(20_000, 40_000);
    timeoutRef.current = setTimeout(() => {
      showToast();
      scheduleNext();
    }, initialDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [dismissed, showToast, scheduleNext]);

  const handleDismiss = useCallback(() => {
    localStorage.setItem("toast-dismissed", getTodayKey());
    setVisible(false);
    setDismissed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  }, []);

  if (dismissed || !purchase) return null;

  return (
    <div className="hidden lg:block fixed bottom-6 left-6 z-50">
      <div
        className={`
          bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-4 max-w-xs
          transition-all duration-500
          ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 pointer-events-none"
          }
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-neutral-700">
              <span className="font-medium">{purchase.name}</span>{" "}
              из {purchase.city} купил тариф{" "}
              <span className="font-medium">{purchase.plan}</span>{" "}
              · {purchase.minutes} мин назад
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors text-sm leading-none -mt-0.5"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

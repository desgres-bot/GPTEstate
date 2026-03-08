"use client";

import { useState, useCallback, useMemo } from "react";

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}

interface PlanResult {
  name: string;
  cost: number;
}

function selectPlan(totalPhotos: number): PlanResult {
  if (totalPhotos <= 2) return { name: "Бесплатный", cost: 0 };
  if (totalPhotos <= 50) return { name: "Риелтор", cost: 2490 };
  if (totalPhotos <= 100) return { name: "Профи", cost: 5990 };
  if (totalPhotos <= 150) return { name: "Агентство", cost: 6990 };
  const packs = Math.ceil(totalPhotos / 150);
  return { name: `Агентство x${packs}`, cost: 6990 * packs };
}

const SLIDER_CLASSES = `w-full h-2 rounded-full appearance-none cursor-pointer
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-[#D4654B]
  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,101,75,0.4)]
  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20
  [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:hover:scale-125
  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-[#D4654B]
  [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20
  [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(212,101,75,0.4)]`;

export default function SavingsCalculator() {
  const [objects, setObjects] = useState(5);
  const [photosPerObject, setPhotosPerObject] = useState(5);

  const handleObjects = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setObjects(Number(e.target.value)),
    [],
  );
  const handlePhotos = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPhotosPerObject(Number(e.target.value)),
    [],
  );

  const calc = useMemo(() => {
    const totalPhotos = objects * photosPerObject;
    const photographerCost = objects * 3000;
    const plan = selectPlan(totalPhotos);
    const savings = photographerCost - plan.cost;
    return { totalPhotos, photographerCost, plan, savings };
  }, [objects, photosPerObject]);

  return (
    <div
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Heading */}
      <h3
        className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-8"
        style={{ letterSpacing: "-0.03em" }}
      >
        Посчитайте вашу экономию
      </h3>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        {/* Objects per month */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-400">
              Объектов в месяц
            </label>
            <span className="text-lg font-semibold text-white tabular-nums">
              {objects}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={objects}
            onChange={handleObjects}
            className={SLIDER_CLASSES}
            style={{ accentColor: "#D4654B", background: "rgba(255,255,255,0.12)" }}
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Photos per object */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-400">
              Фото на объект
            </label>
            <span className="text-lg font-semibold text-white tabular-nums">
              {photosPerObject}
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={15}
            step={1}
            value={photosPerObject}
            onChange={handlePhotos}
            className={SLIDER_CLASSES}
            style={{ accentColor: "#D4654B", background: "rgba(255,255,255,0.12)" }}
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>3</span>
            <span>15</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className="rounded-xl p-5 lg:p-6 space-y-3 mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, rgba(212,101,75,0.04) 100%)",
          border: "1px solid rgba(212,101,75,0.2)",
        }}
      >
        {/* Total photos info */}
        <p className="text-xs text-neutral-500 mb-1">
          Итого фото: {calc.totalPhotos} / мес
        </p>

        {/* Photographer cost */}
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 text-sm">Фотограф:</span>
          <span className="text-red-400 line-through text-lg tabular-nums">
            {formatNumber(calc.photographerCost)} &#8381; / мес
          </span>
        </div>

        {/* GPT Estate cost */}
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 text-sm">GPT Estate:</span>
          <span className="text-emerald-400 font-bold text-lg tabular-nums">
            {formatNumber(calc.plan.cost)} &#8381; / мес
          </span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />

        {/* Savings */}
        <div className="flex items-center justify-between">
          <span className="text-neutral-300 font-medium text-sm">Ваша экономия:</span>
          <span
            className="text-2xl lg:text-3xl font-bold tabular-nums"
            style={{ color: "#D4654B", letterSpacing: "-0.02em" }}
          >
            {formatNumber(Math.max(0, calc.savings))} &#8381; / мес
          </span>
        </div>

        {/* Recommended plan */}
        <p className="text-sm text-neutral-500 pt-1">
          Рекомендуем тариф:{" "}
          <span className="font-semibold text-white">{calc.plan.name}</span>
        </p>
      </div>

      {/* CTA */}
      <a
        href="/auth"
        className="btn-terra w-full text-center"
      >
        Подключить {calc.plan.name}
      </a>
    </div>
  );
}

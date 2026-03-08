"use client";

import { useState, useCallback } from "react";

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}

export default function LossCalculator() {
  const [objects, setObjects] = useState(5);
  const [commission, setCommission] = useState(150_000);

  const losses = objects * commission * 0.15;

  const handleObjects = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setObjects(Number(e.target.value)),
    [],
  );
  const handleCommission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setCommission(Number(e.target.value)),
    [],
  );

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
        Посчитайте ваши потери
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
            className="w-full h-2 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-[#D4654B]
                       [&::-webkit-slider-thumb]:shadow-md
                       [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2a2723]
                       [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-[#D4654B]
                       [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#2a2723]
                       [&::-moz-range-thumb]:shadow-md"
            style={{ accentColor: "#D4654B", background: "rgba(255,255,255,0.12)" }}
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Average commission */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-400">
              Средняя комиссия, &#8381;
            </label>
            <span className="text-lg font-semibold text-white tabular-nums">
              {formatNumber(commission)} &#8381;
            </span>
          </div>
          <input
            type="range"
            min={50_000}
            max={300_000}
            step={10_000}
            value={commission}
            onChange={handleCommission}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-[#D4654B]
                       [&::-webkit-slider-thumb]:shadow-md
                       [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2a2723]
                       [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-[#D4654B]
                       [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#2a2723]
                       [&::-moz-range-thumb]:shadow-md"
            style={{ accentColor: "#D4654B", background: "rgba(255,255,255,0.12)" }}
          />
          <div className="flex justify-between text-xs text-neutral-600 mt-1">
            <span>50 000</span>
            <span>300 000</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className="rounded-xl p-5 lg:p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(212,101,75,0.15) 0%, rgba(212,101,75,0.05) 100%)",
          border: "1px solid rgba(212,101,75,0.2)",
        }}
      >
        <p
          className="text-3xl lg:text-4xl font-bold tracking-tight"
          style={{ color: "#e07460", letterSpacing: "-0.03em" }}
        >
          Вы теряете ~{formatNumber(Math.round(losses))} &#8381; / месяц
        </p>
        <p className="text-neutral-500 mt-1 text-sm lg:text-base">
          из-за плохих фото в объявлениях
        </p>
      </div>

      {/* CTA */}
      <a
        href="/generate"
        className="btn-terra w-full text-center"
      >
        Начать экономить — первые 2 фото бесплатно
      </a>
    </div>
  );
}

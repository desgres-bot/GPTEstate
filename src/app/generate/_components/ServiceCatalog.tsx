"use client";

import Link from "next/link";
import { SERVICES, SERVICE_CATEGORIES } from "../_data/services";
import type { Mode } from "@/types";

interface Props {
  onSelectService: (mode: Mode) => void;
}

export default function ServiceCatalog({ onSelectService }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 md:pb-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[40px] font-semibold tracking-tight">Сервисы</h1>
        <p className="mt-1 text-[15px] text-white/50">
          38 AI-инструментов для риелторов
        </p>
      </div>

      {/* Category sections */}
      {SERVICE_CATEGORIES.map((cat) => {
        const catServices = SERVICES.filter((s) => s.category === cat.id);
        return (
          <div key={cat.id} className="mb-6">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{cat.icon}</span>
              <h2 className="text-[13px] font-medium text-white/40 uppercase tracking-wider">
                {cat.label}
              </h2>
            </div>

            {/* 2-col card grid (mobile), 3-4 col (desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {catServices.map((svc) => {
                if (svc.isLink && svc.href) {
                  return (
                    <Link
                      key={svc.id}
                      href={svc.href}
                      className="touch-feedback relative flex flex-col items-start rounded-2xl
                                 bg-white/[0.04] border border-white/[0.08]
                                 p-4 min-h-[100px]
                                 active:scale-[0.97] transition-transform"
                    >
                      <span className="text-[28px] mb-2">{svc.icon}</span>
                      <span className="text-[15px] font-medium text-white">
                        {svc.label}
                      </span>
                      <span className="text-[12px] text-white/40 mt-0.5 leading-snug">
                        {svc.desc}
                      </span>
                      {/* External arrow */}
                      <span className="absolute top-3 right-3 text-white/20 text-xs">↗</span>
                    </Link>
                  );
                }
                return (
                  <button
                    key={svc.id}
                    onClick={() => onSelectService(svc.id as Mode)}
                    className="touch-feedback relative flex flex-col items-start rounded-2xl
                               bg-white/[0.04] border border-white/[0.08]
                               p-4 min-h-[100px] text-left
                               active:scale-[0.97] transition-transform"
                  >
                    {svc.isNew && (
                      <span className="absolute top-2.5 right-2.5 bg-terra-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                        new
                      </span>
                    )}
                    <span className="text-[28px] mb-2">{svc.icon}</span>
                    <span className="text-[15px] font-medium text-white">
                      {svc.label}
                    </span>
                    <span className="text-[12px] text-white/40 mt-0.5 leading-snug">
                      {svc.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Trust strip */}
      <div className="mt-8 flex items-center justify-center gap-4 text-sm text-neutral-500">
        <span>4.9/5 ★</span>
        <span className="w-px h-3 bg-white/20" />
        <span>12 847 фото</span>
        <span className="w-px h-3 bg-white/20" />
        <span>30 сек</span>
      </div>
    </div>
  );
}

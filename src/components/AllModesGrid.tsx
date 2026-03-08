"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type ServiceDef,
} from "@/app/generate/_data/services";

interface Props {
  exclude?: string[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

const TOTAL_SERVICES = 38;

export default function AllModesGrid({
  exclude,
  title = "38 возможностей",
  subtitle = "в одной подписке",
  dark = true,
}: Props) {
  const filtered = useMemo(() => {
    if (!exclude || exclude.length === 0) return SERVICES;
    const set = new Set(exclude);
    return SERVICES.filter((s) => !set.has(s.id));
  }, [exclude]);

  const grouped = useMemo(() => {
    const map = new Map<string, ServiceDef[]>();
    for (const cat of SERVICE_CATEGORIES) {
      map.set(cat.id, []);
    }
    for (const svc of filtered) {
      const arr = map.get(svc.category);
      if (arr) arr.push(svc);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      {/* Heading */}
      <div className="mb-10 lg:mb-14">
        <h2
          className={`text-3xl lg:text-5xl font-semibold ${dark ? "text-white" : "text-[#0E0E0E]"}`}
          style={{ letterSpacing: "-0.04em" }}
        >
          {title}{" "}
          <span style={{ color: "#D4654B" }}>{subtitle}</span>
        </h2>
      </div>

      {/* Category sections */}
      <div className="space-y-10 lg:space-y-14">
        {SERVICE_CATEGORIES.map((cat) => {
          const items = grouped.get(cat.id);
          if (!items || items.length === 0) return null;

          return (
            <section key={cat.id}>
              {/* Category heading */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{cat.icon}</span>
                <h3 className={`text-lg lg:text-xl font-semibold ${dark ? "text-white" : "text-[#0E0E0E]"}`}>
                  {cat.label}
                </h3>
                <span className="text-xs text-neutral-500 ml-1">
                  {items.length}
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {items.map((svc) => {
                  const href = svc.isLink && svc.href
                    ? svc.href
                    : `/generate?mode=${svc.id}`;

                  return (
                    <Link
                      key={svc.id}
                      href={href}
                      className={`group relative flex items-start gap-3 rounded-xl p-3.5 lg:p-4
                                 transition-all duration-200
                                 hover:-translate-y-[1px] ${
                                   dark
                                     ? "hover:bg-white/[0.08]"
                                     : "bg-white hover:bg-neutral-50 hover:shadow-sm border border-neutral-100"
                                 }`}
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        ...(dark
                          ? {
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                          : {}),
                      }}
                    >
                      {/* Icon */}
                      <span className="text-2xl leading-none shrink-0 mt-0.5">
                        {svc.icon}
                      </span>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-medium text-sm truncate ${dark ? "text-white" : "text-[#0E0E0E]"}`}>
                            {svc.label}
                          </span>
                          {svc.isNew && (
                            <span
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px]
                                         font-semibold uppercase tracking-wider shrink-0"
                              style={{
                                backgroundColor: dark ? "rgba(212,101,75,0.2)" : "rgba(212,101,75,0.1)",
                                color: dark ? "#e07460" : "#b8503a",
                              }}
                            >
                              Новое
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 truncate ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                          {svc.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <span
                        className={`shrink-0 group-hover:text-[#D4654B]
                                   transition-colors duration-200 text-sm mt-1 ${dark ? "text-neutral-600" : "text-neutral-300"}`}
                      >
                        &#8594;
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer count */}
      <p className="text-xs text-neutral-500 mt-8 text-center">
        Показано {filtered.length} из {TOTAL_SERVICES} возможностей
      </p>
    </div>
  );
}

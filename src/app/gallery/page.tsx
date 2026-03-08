"use client";

import { useState } from "react";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";
import LiveCounter from "@/components/LiveCounter";
import AllModesGrid from "@/components/AllModesGrid";

/* ───────── data ───────── */

const CATEGORIES = [
  { id: "all", label: "Все", icon: "🔥" },
  { id: "cleanup", label: "Уборка", icon: "✨" },
  { id: "furniture", label: "Мебель", icon: "🛋️" },
  { id: "style", label: "Новый стиль", icon: "🎨" },
  { id: "remove", label: "Удаление", icon: "🧹" },
  { id: "renovation", label: "Ремонт", icon: "🔨" },
  { id: "exterior", label: "Экстерьер", icon: "🏠" },
  { id: "text", label: "AI-тексты", icon: "📝" },
  { id: "scoring", label: "Оценка", icon: "🔍" },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

interface CaseItem {
  id: number;
  before: string;
  after: string;
  category: Exclude<Category, "all">;
  title: string;
  description: string;
  mode: string;
  isTextMode?: boolean;
  textExample?: string;
}

const CASES: CaseItem[] = [
  {
    id: 1,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "cleanup",
    title: "Уборка кухни",
    description: "Бардак исчезает за 30 секунд. Без хозяина, без уборщицы. Фото готово к публикации.",
    mode: "enhance",
  },
  {
    id: 2,
    before: "/demo/before-2.jpg",
    after: "/demo/after-2.jpg",
    category: "furniture",
    title: "Виртуальная мебель в гостиной",
    description: "Пустая комната стала уютной. Покупатель сразу видит потенциал. 26 стилей на выбор.",
    mode: "staging",
  },
  {
    id: 3,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "style",
    title: "Из советского — в современный",
    description: "Новый стиль без ремонта. Объявление выглядит на миллион. Покупатель видит квартиру мечты.",
    mode: "redesign",
  },
  {
    id: 4,
    before: "/demo/before-4.jpg",
    after: "/demo/after-4.jpg",
    category: "remove",
    title: "Удаление лишних объектов",
    description: "Лишнее исчезло без следа. Чистый кадр за секунды. Покупатель видит пространство.",
    mode: "remove",
  },
  {
    id: 5,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "cleanup",
    title: "Уборка гостиной",
    description: "Разбросанные вещи, посуда — всё убрано. Фото готово к публикации на Авито.",
    mode: "enhance",
  },
  {
    id: 6,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "style",
    title: "Спальня в скандинавском стиле",
    description: "Старая мебель заменена на современную. Квартира выглядит свежо и стильно.",
    mode: "redesign",
  },
  {
    id: 7,
    before: "/demo/before-2.jpg",
    after: "/demo/after-2.jpg",
    category: "renovation",
    title: "Новые стены и полы",
    description: "Светлые стены, паркет, современные плинтусы — полная визуализация ремонта.",
    mode: "renovation",
  },
  {
    id: 8,
    before: "/demo/before-4.jpg",
    after: "/demo/after-4.jpg",
    category: "exterior",
    title: "Золотой закат + зелёный газон",
    description: "Пасмурный день → золотой час. Серый газон → зелёная лужайка. Первое впечатление решает.",
    mode: "dusk",
  },
  {
    id: 9,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "furniture",
    title: "Мебель для новостройки",
    description: "Голые стены → уютная квартира. Покупатель представляет себя здесь.",
    mode: "staging",
  },
  {
    id: 10,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "renovation",
    title: "Кухня: до и после ремонта",
    description: "AI визуализирует новую кухню прямо на фото. Белый фасад, столешница, плитка.",
    mode: "kitchen",
  },
  {
    id: 11,
    before: "",
    after: "",
    category: "text",
    title: "AI-описание для Авито",
    description: "AI анализирует фото и пишет продающий текст за 10 секунд. Деловой, тёплый или продающий тон.",
    mode: "describe",
    isTextMode: true,
    textExample: "Уютная двушка 54 м² в тихом центре, 5 мин от метро. Свежий ремонт: светлая кухня с встроенной техникой, просторная гостиная с панорамным остеклением. Во дворе — парк и детская площадка.",
  },
  {
    id: 12,
    before: "",
    after: "",
    category: "scoring",
    title: "AI-оценка качества фото",
    description: "AI анализирует композицию, свет, ракурс и даёт рекомендации по улучшению.",
    mode: "scoring",
    isTextMode: true,
    textExample: "Оценка: 7.2/10\n\n+ Хороший ракурс, видна планировка\n+ Естественное освещение\n- Беспорядок на столе (-1.5)\n- Тёмные углы (-0.8)\n\nРекомендация: используйте режим «Уборка» для повышения до 9.0+",
  },
];

const CATEGORY_LABELS: Record<Exclude<Category, "all">, string> = {
  cleanup: "Уборка",
  furniture: "Мебель",
  style: "Новый стиль",
  remove: "Удаление",
  renovation: "Ремонт",
  exterior: "Экстерьер",
  text: "AI-тексты",
  scoring: "Оценка",
};

const STATS = [
  { value: "x3", label: "больше звонков по объявлению" },
  { value: "73%", label: "быстрее продажа с качественным фото" },
  { value: "20%", label: "выше предложения покупателей" },
];

/* ───────── page ───────── */

export default function GalleryPage() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered =
    filter === "all" ? CASES : CASES.filter((c) => c.category === filter);

  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section
        className="text-white pt-28 pb-16 lg:pt-36 lg:pb-24"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Портфолио
            </span>
          </div>

          <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[56px] lg:text-[72px] max-w-2xl">
            Увидеть, чтобы <span className="text-terra-400">поверить</span>
          </h1>

          <p className="mt-6 text-neutral-400 text-base max-w-lg">
            Реальные примеры обработки из 38 AI-сервисов. Нажмите на фото для сравнения &laquo;до и после&raquo;.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <div>
              <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                <LiveCounter end={47832} />
              </div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                фото обработано
              </div>
            </div>
            <div>
              <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                <LiveCounter end={38} />
              </div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                AI-сервисов
              </div>
            </div>
            <div>
              <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                98<span className="text-[24px]">%</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                довольны результатом
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ФИЛЬТР + КЕЙСЫ ===== */}
      <section style={{ background: "#1a1714" }}>
        {/* Sticky filter tabs */}
        <div
          className="sticky top-16 z-30"
          style={{
            background: "rgba(26,23,20,0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    filter === cat.id
                      ? "bg-terra-500 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  style={
                    filter !== cat.id
                      ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }
                      : {}
                  }
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cases grid */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="space-y-20 lg:space-y-28">
            {filtered.map((item, i) => {
              const isEven = i % 2 === 0;
              const num = String(i + 1).padStart(2, "0");

              if (item.isTextMode) {
                // Text-based mode card
                return (
                  <article key={item.id}>
                    <div
                      className="grid gap-8 lg:gap-16 items-center lg:grid-cols-2"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="heading-display text-[28px] text-neutral-600">
                            {num}
                          </span>
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                            style={{ backgroundColor: "rgba(212,101,75,0.15)", color: "#e07460" }}
                          >
                            {CATEGORY_LABELS[item.category]}
                          </span>
                        </div>

                        <h2 className="heading-display text-[24px] sm:text-[32px] leading-[1.1] text-white">
                          {item.title}
                        </h2>

                        <p className="mt-4 text-neutral-400 leading-relaxed text-base max-w-md">
                          {item.description}
                        </p>

                        <Link
                          href={`/generate?mode=${item.mode}`}
                          className="mt-6 inline-flex items-center gap-1.5 text-terra-400 text-sm font-medium hover:text-terra-300 transition-colors"
                        >
                          Попробовать <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>

                      {/* Text preview card */}
                      <div
                        className="rounded-xl p-6 lg:p-8"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                          Пример результата
                        </div>
                        <p className="text-neutral-200 leading-relaxed text-[15px] whitespace-pre-line">
                          {item.textExample}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          Сгенерировано за 10 секунд
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={item.id}
                  className={`grid gap-8 lg:gap-16 items-center ${
                    isEven
                      ? "lg:grid-cols-[1.4fr_1fr]"
                      : "lg:grid-cols-[1fr_1.4fr]"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`rounded-xl overflow-hidden ${
                      !isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <BeforeAfterToggle
                      beforeSrc={item.before}
                      afterSrc={item.after}
                      label={item.title}
                      subtitle={item.description}
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`flex flex-col justify-center ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="heading-display text-[28px] text-neutral-600">
                        {num}
                      </span>
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                        style={{ backgroundColor: "rgba(212,101,75,0.15)", color: "#e07460" }}
                      >
                        {CATEGORY_LABELS[item.category]}
                      </span>
                    </div>

                    <h2 className="heading-display text-[24px] sm:text-[32px] leading-[1.1] text-white">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-neutral-400 leading-relaxed text-base max-w-md">
                      {item.description}
                    </p>

                    <Link
                      href={`/generate?mode=${item.mode}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-terra-400 text-sm font-medium hover:text-terra-300 transition-colors self-start"
                    >
                      Попробовать <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-500">
              <p className="text-lg">Нет примеров в этой категории</p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-terra-400 hover:text-terra-300 text-sm"
              >
                Показать все
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== СТАТИСТИКА ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Результаты
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Цифры говорят сами
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stagger-scale rounded-2xl p-8 lg:p-10"
                style={{
                  background: "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, rgba(212,101,75,0.04) 100%)",
                  border: "1px solid rgba(212,101,75,0.2)",
                }}
              >
                <div className="heading-display text-[48px] sm:text-[56px] lg:text-[64px] text-terra-400 leading-none">
                  {stat.value}
                </div>
                <p className="mt-4 text-neutral-300 text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== ВСЕ 38 СЕРВИСОВ ===== */}
      <FadeInSection
        variant="fade-left"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Все сервисы
            </span>
          </div>

          <AllModesGrid
            title="Не только фото — ещё"
            subtitle="37 AI-сервисов"
          />

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner
        heading1={"2 фото бесплатно.\nПрямо сейчас."}
        heading2={"38 AI-сервисов.\nОдна подписка."}
        cta2="Выбрать тариф"
        cta2Href="/pricing"
        fomo="Присоединяйтесь к 2 480 риелторам, которые уже используют все 38 AI-сервисов"
      />
    </>
  );
}

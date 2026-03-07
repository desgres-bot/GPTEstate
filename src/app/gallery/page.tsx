"use client";

import { useState } from "react";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";

/* ───────── data ───────── */

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "cleanup", label: "Уборка" },
  { id: "furniture", label: "Мебель" },
  { id: "style", label: "Новый стиль" },
  { id: "remove", label: "Удаление" },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

const CASES: {
  id: number;
  before: string;
  after: string;
  category: Exclude<Category, "all">;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "cleanup",
    title: "Уборка кухни",
    description:
      "Бардак исчезает за 30 секунд. Без хозяина, без уборщицы.",
  },
  {
    id: 2,
    before: "/demo/before-2.jpg",
    after: "/demo/after-2.jpg",
    category: "furniture",
    title: "Виртуальная мебель в гостиной",
    description:
      "Пустая комната стала уютной. Покупатель сразу видит потенциал.",
  },
  {
    id: 3,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "style",
    title: "Из советского ремонта — в современный",
    description:
      "Новый стиль без ремонта. Объявление выглядит на миллион.",
  },
  {
    id: 4,
    before: "/demo/before-4.jpg",
    after: "/demo/after-4.jpg",
    category: "remove",
    title: "Удаление лишних объектов",
    description:
      "Лишнее исчезло без следа. Чистый кадр за секунды.",
  },
  {
    id: 5,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "cleanup",
    title: "Уборка гостиной",
    description:
      "Разбросанные вещи, посуда — всё убрано. Фото готово к публикации.",
  },
  {
    id: 6,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "style",
    title: "Спальня в скандинавском стиле",
    description:
      "Старая мебель заменена на современную. Квартира выглядит свежо.",
  },
];

const CATEGORY_LABELS: Record<Exclude<Category, "all">, string> = {
  cleanup: "Уборка",
  furniture: "Мебель",
  style: "Новый стиль",
  remove: "Удаление",
};

const TIPS = [
  {
    title: "Как фотографировать квартиру на телефон",
    description:
      "5 простых правил, которые помогут сделать продающие фото даже без профессиональной камеры.",
    href: "/uluchshenie-foto-nedvizhimosti",
  },
  {
    title: "Первое фото решает: 3 секунды на Авито",
    description:
      "73% покупателей принимают решение по обложке. Как попасть в эти 3 секунды.",
    href: "/foto-kvartiry-dlya-avito",
  },
  {
    title: "Виртуальный стейджинг vs реальный",
    description:
      "Сравнение стоимости и эффективности: 15 рублей против 50 000 за реальную мебель.",
    href: "/virtualnyj-stejdzhing",
  },
  {
    title: "Как увеличить просмотры на Авито в 3 раза",
    description:
      "Практические советы по оформлению объявления и работе с фотографиями.",
    href: "/foto-kvartiry-dlya-avito",
  },
  {
    title: "5 ошибок при фотосъёмке квартир",
    description:
      "Типичные промахи риелторов, из-за которых объявления не работают. И как их избежать.",
    href: "/uluchshenie-foto-nedvizhimosti",
  },
  {
    title: "AI-дизайн интерьера: что это и как работает",
    description:
      "Разбираемся, как нейросети помогают визуализировать ремонт до его начала.",
    href: "/dizajn-interera-online",
  },
];

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
      {/* ===== 1. HERO ===== */}
      <section className="bg-[#1E1B18] text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Портфолио
            </span>
          </div>

          <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[56px] lg:text-[72px] max-w-2xl">
            Увидеть, чтобы поверить
          </h1>

          <p className="mt-6 text-neutral-400 text-base max-w-lg">
            Реальные примеры обработки. Нажмите на фото для сравнения.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            <span className="text-terra-400 font-medium">4 500+ обработанных фото</span>
            <span aria-hidden="true" className="hidden sm:inline">&middot;</span>
            <span>98% клиентов довольны результатом</span>
          </div>
        </div>
      </section>

      {/* ===== 2. FILTER + CASES ===== */}
      <section className="bg-[#fbf9f5]">
        {/* Sticky filter tabs */}
        <div className="sticky top-16 z-30 bg-[#fbf9f5]/90 backdrop-blur-sm border-b border-neutral-200/60">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-1 py-3 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat.id
                      ? "bg-terra-500 text-white"
                      : "bg-white text-[#6B6560] hover:bg-neutral-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cases grid — staggered editorial layout */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="space-y-20 lg:space-y-32">
            {filtered.map((item, i) => {
              const isEven = i % 2 === 0;
              const num = String(i + 1).padStart(2, "0");

              return (
                <article
                  key={item.id}
                  className={`stagger-child grid gap-8 lg:gap-16 items-center ${
                    isEven
                      ? "lg:grid-cols-[1.4fr_1fr]"
                      : "lg:grid-cols-[1fr_1.4fr]"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`rounded-xl overflow-hidden shadow-lg shadow-black/[0.06] ${
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
                      <span className="heading-display text-[28px] text-[#bfbfbf]">
                        {num}
                      </span>
                      <span className="inline-block rounded-full bg-terra-50 text-terra-600 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                    </div>

                    <h2 className="heading-display text-[24px] sm:text-[32px] leading-[1.1]">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-[#6B6560] leading-relaxed text-base max-w-md">
                      {item.description}
                    </p>

                    <Link
                      href={`/generate?mode=${
                        item.category === "cleanup"
                          ? "enhance"
                          : item.category === "furniture"
                          ? "staging"
                          : item.category === "remove"
                          ? "remove"
                          : "redesign"
                      }`}
                      className="mt-6 text-terra-500 text-sm font-medium hover:text-terra-600 transition-colors inline-flex items-center gap-1.5 self-start"
                    >
                      Попробовать
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. ROI STATISTICS ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
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
                className="stagger-child rounded-2xl p-8 lg:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, rgba(212,101,75,0.04) 100%)",
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

      {/* ===== 4. TIPS / ARTICLES ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">03</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Советы
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Полезные статьи
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((tip) => (
              <Link
                key={tip.title}
                href={tip.href}
                className="stagger-child group rounded-2xl bg-[#fbf9f5] p-8 transition-all hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-1"
              >
                <h3 className="text-lg font-normal leading-snug group-hover:text-terra-500 transition-colors">
                  {tip.title}
                </h3>
                <p className="mt-3 text-[#6B6560] text-sm leading-relaxed">
                  {tip.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-terra-500 font-medium">
                  Читать
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 5. CTA SPLIT BANNER ===== */}
      <CTASplitBanner />
    </>
  );
}

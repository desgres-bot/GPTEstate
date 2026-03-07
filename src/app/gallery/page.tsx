"use client";

import { useState } from "react";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "cleanup", label: "Уборка" },
  { id: "furniture", label: "Мебель" },
  { id: "style", label: "Новый стиль" },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

const CASES = [
  {
    id: 1,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    category: "cleanup" as Category,
    title: "Кухня после показа",
    desc: "Грязная посуда, разбросанные вещи — сервис убрал всё за 25 секунд",
    featured: true,
  },
  {
    id: 2,
    before: "/demo/before-2.jpg",
    after: "/demo/after-2.jpg",
    category: "furniture" as Category,
    title: "Пустая гостиная стала уютной",
    desc: "Добавили мебель в скандинавском стиле для новостройки",
    featured: false,
  },
  {
    id: 3,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    category: "style" as Category,
    title: "Спальня: из 90-х в 2025",
    desc: "Старая мебель заменена на современный интерьер",
    featured: false,
  },
  {
    id: 4,
    before: "/demo/before-4.jpg",
    after: "/demo/after-4.jpg",
    category: "cleanup" as Category,
    title: "Кухня-столовая",
    desc: "Убрали хлам со столов и полок, исправили свет",
    featured: true,
  },
];

const TIPS = [
  {
    title: "Как фотографировать квартиру на телефон",
    desc: "5 простых правил, чтобы получить лучший результат",
    tag: "Совет",
  },
  {
    title: "Почему первое фото решает всё",
    desc: "Данные Авито: 73% покупателей решают по обложке",
    tag: "Статистика",
  },
  {
    title: "Виртуальная мебель vs реальная",
    desc: "Сравнение стоимости: 15₽ против 50 000₽",
    tag: "Сравнение",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered = filter === "all" ? CASES : CASES.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-[#fbf9f5]">
      {/* Hero */}
      <section className="bg-[#1E1B18] text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-4">Блог</p>
          <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[56px] lg:text-[72px] max-w-2xl">
            Примеры работ и советы
          </h1>
          <p className="mt-6 text-neutral-400 text-base max-w-lg">
            Реальные кейсы обработки фото квартир. Нажмите на фото, чтобы увидеть оригинал.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
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

      {/* Cases — staggered editorial layout */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {filtered.map((item, i) => (
            <article
              key={item.id}
              className={`grid gap-8 items-start ${
                item.featured
                  ? "lg:grid-cols-1"
                  : i % 2 === 0
                  ? "lg:grid-cols-[1.4fr_1fr]"
                  : "lg:grid-cols-[1fr_1.4fr]"
              }`}
            >
              {/* Image */}
              <div className={`${!item.featured && i % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="rounded-xl overflow-hidden shadow-lg shadow-black/[0.06]">
                  <BeforeAfterToggle
                    beforeSrc={item.before}
                    afterSrc={item.after}
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center ${item.featured ? "max-w-xl" : ""} ${!item.featured && i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <span className="text-terra-500 text-xs uppercase tracking-widest font-medium">
                  {CATEGORIES.find((c) => c.id === item.category)?.label}
                </span>
                <h2 className={`mt-3 heading-display leading-[1.1] ${
                  item.featured ? "text-[28px] sm:text-[36px] lg:text-[48px]" : "text-[24px] sm:text-[32px]"
                }`}>
                  {item.title}
                </h2>
                <p className="mt-4 text-[#6B6560] leading-relaxed text-base">
                  {item.desc}
                </p>
                <Link
                  href={`/generate?mode=${item.category === "cleanup" ? "enhance" : item.category === "furniture" ? "staging" : "redesign"}`}
                  className="mt-6 text-terra-500 text-sm font-medium hover:text-terra-600 transition-colors inline-flex items-center gap-1.5 self-start"
                >
                  Попробовать
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tips / Articles section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] mb-12">
            Полезное для риелторов
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                className="group rounded-xl bg-[#fbf9f5] p-8 transition-all hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <span className="inline-block rounded-full bg-terra-50 text-terra-600 px-3 py-1 text-xs font-medium">
                  {tip.tag}
                </span>
                <h3 className="mt-5 text-lg font-normal leading-snug">{tip.title}</h3>
                <p className="mt-3 text-[#6B6560] text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E1B18] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="heading-display text-[32px] sm:text-[48px] text-white">
            Хотите такой же результат?
          </h2>
          <p className="mt-4 text-neutral-400 text-base">
            Первые 2 фото — бесплатно, без регистрации
          </p>
          <Link href="/generate" className="btn-terra mt-8">
            Попробовать бесплатно
          </Link>
        </div>
      </section>
    </div>
  );
}

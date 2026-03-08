import Link from "next/link";
import type { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "GPT Estate vs Virtual Staging AI — сравнение 2025",
  description:
    "Сравнение GPT Estate и Virtual Staging AI. Оба используют AI, но GPT Estate предлагает 10 режимов вместо 3, AI-описания и работу с русским рынком. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "Virtual Staging AI альтернатива, GPT Estate vs Virtual Staging AI, виртуальный стейджинг AI, virtual staging сравнение",
  alternates: { canonical: "https://fotoestate.ru/gptestate-vs-virtual-staging-ai" },
  openGraph: {
    title: "GPT Estate vs Virtual Staging AI — кто лучше?",
    description:
      "Оба AI-сервиса. Но GPT Estate — 10 режимов, 25 стилей, русский рынок.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Virtual Staging AI — это тоже AI?",
    a: "Да. Оба сервиса используют AI. Virtual Staging AI работает с американским рынком. GPT Estate — с российским (Авито, ЦИАН, ДомКлик).",
  },
  {
    q: "У кого больше стилей?",
    a: "Virtual Staging AI заявляет 50+ стилей, но многие похожи. GPT Estate — 25 уникальных + возможность описать свой стиль текстом.",
  },
  {
    q: "Какой сервис дешевле?",
    a: "GPT Estate: от 50₽ ($0.50). Virtual Staging AI: от $0.28. GPT Estate почти в 2 раза дешевле.",
  },
  {
    q: "Что есть у GPT Estate, чего нет у Virtual Staging AI?",
    a: "AI-описание объявления, оценка качества фото, анализ комнаты, виртуальный ремонт, свободный стиль текстом, русский рынок.",
  },
];

export default function VsVirtualStagingAI() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Сравнение AI-сервисов
            </p>
            <h1 className="heading-display text-[36px] leading-[1.08] sm:text-[56px] lg:text-[76px]">
              GPT Estate vs
              <br />
              <span className="text-terra-400">Virtual Staging AI</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Оба сервиса используют AI. Но GPT Estate предлагает 10 режимов
              вместо 3 и работает с русскоязычным рынком.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать GPT Estate бесплатно
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "2x", label: "дешевле" },
              { value: "10", label: "режимов vs 3" },
              { value: "RU", label: "Авито + ЦИАН + ДомКлик" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="heading-display text-[36px] sm:text-[48px] lg:text-[64px] text-terra-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 01 СРАВНИТЕЛЬНАЯ ТАБЛИЦА ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Сравнение</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Подробное сравнение{" "}
            <span className="text-terra-500">функций</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Virtual Staging AI</div>
              <div className="space-y-5">
                {[
                  { item: "Цена за фото", cost: "от $0.28 (28₽)" },
                  { item: "Скорость", cost: "10-30 секунд" },
                  { item: "Стили", cost: "50+ (много похожих)" },
                  { item: "Свой стиль текстом", cost: "Нет" },
                  { item: "Уборка фото", cost: "Да" },
                  { item: "Виртуальный ремонт", cost: "Нет" },
                  { item: "AI-описание", cost: "Нет" },
                  { item: "Оценка фото", cost: "Нет" },
                  { item: "Анализ комнаты", cost: "Нет" },
                  { item: "Рынок", cost: "США, Англия" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium text-sm">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)", border: "1px solid rgba(212,101,75,0.25)" }}>
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">GPT Estate</div>
              <div className="space-y-5">
                {[
                  { item: "Цена за фото", cost: "от 50₽ ($0.50)" },
                  { item: "Скорость", cost: "30 секунд" },
                  { item: "Стили", cost: "25 уникальных" },
                  { item: "Свой стиль текстом", cost: "Да (уникально!)" },
                  { item: "Уборка фото", cost: "Да" },
                  { item: "Виртуальный ремонт", cost: "Да, 8 вариантов" },
                  { item: "AI-описание", cost: "Да, 3 площадки" },
                  { item: "Оценка фото", cost: "Да, 1-10" },
                  { item: "Анализ комнаты", cost: "Да, 15+ параметров" },
                  { item: "Рынок", cost: "Россия + мир" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-200/40">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-terra-500 font-medium text-sm">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 УНИКАЛЬНЫЕ ПРЕИМУЩЕСТВА ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Уникальное</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Что есть только{" "}
            <span className="text-terra-500">у GPT Estate</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Свой стиль текстом", desc: "Опишите стиль словами: 'марокканский лаунж' или 'детская в пастельных тонах'. AI воплотит." },
              { title: "AI-описание объявления", desc: "Загрузите фото — получите текст для Авито, ЦИАН или ДомКлик в 3 стилях." },
              { title: "Оценка качества фото", desc: "AI оценивает 1-10 по 5 критериям с рекомендациями." },
              { title: "Анализ комнаты", desc: "AI определяет тип, площадь, ремонт, мебель для автозаполнения объявления." },
              { title: "Виртуальный ремонт", desc: "Перекрасьте стены и замените полы. 8 вариантов реновации." },
              { title: "Русский рынок", desc: "Описания для Авито, ЦИАН, ДомКлик. Форматирование под площадку." },
            ].map((item) => (
              <div key={item.title} className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-[20px] font-normal mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 FAQ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">03</span>
                <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Вопросы</span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">Частые вопросы</h2>
            </div>
            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">+</span>
                  </summary>
                  <p className="pb-6 text-neutral-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      
      {/* ===== ALL MODES ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid
            title="У нас ещё"
            subtitle="37 AI-сервисов"
            
          />
        </div>
      </FadeInSection>

      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Фото квартиры для Авито — AI-улучшение за 30 секунд",
  description:
    "Сделайте профессиональные фото квартиры для Авито без фотографа. AI улучшит свет, уберёт бардак и сделает фото продающим. 2 фото бесплатно. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "фото квартиры для авито, профессиональные фото авито, как фотографировать квартиру, фото для объявления",
  alternates: { canonical: "https://fotoestate.ru/foto-kvartiry-dlya-avito" },
  openGraph: {
    title: "Фото квартиры для Авито — GPT Estate",
    description:
      "AI улучшит фото квартиры для Авито за 30 секунд. 2 фото бесплатно.",
  },
};

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Фото квартиры для Авито", url: "https://fotoestate.ru/foto-kvartiry-dlya-avito" },
]);

export default function FotoKvartiryDlyaAvito() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Фото для объявлений на Авито
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фото, которые
              <br />
              <span className="text-terra-400">продают на Авито</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              У вас 3 секунды, чтобы зацепить покупателя.
              Сделайте их идеальными.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Улучшить фото бесплатно — 2 фото
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Фото для Авито"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "x3", label: "больше просмотров" },
              { value: "30 сек", label: "до результата" },
              { value: "50₽", label: "вместо 5 000₽ за фотографа" },
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

      {/* ===== 01 ПРОБЛЕМА ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Проблема
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            70% покупателей листают объявления за 3 секунды.
            <br />
            <span className="text-terra-500">Плохое фото = потерянный звонок.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Тёмные и мрачные фото</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Снимок с телефона в пасмурный день выглядит уныло. Покупатель видит
                    тёмную комнату и листает дальше — к конкуренту с яркими фото.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Бардак в кадре</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Разбросанные вещи, грязная посуда, старая мебель. Хозяин не убрался,
                    а вы не можете ждать. Фото с бардаком отпугивает покупателей.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Объявление теряется в ленте</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    На Авито сотни однотипных объявлений. Без профессиональных фото ваше
                    объявление не выделяется — и просто тонет в потоке.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 РЕШЕНИЕ ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            AI делает фото{" "}
            <span className="text-terra-500">продающими</span>
          </h2>

          {/* 4 AI capabilities */}
          <div className="grid gap-4 sm:grid-cols-2 mb-16">
            {[
              {
                title: "Коррекция освещения",
                desc: "Автоматически выравнивает свет, убирает тёмные углы и делает комнату просторной и светлой.",
              },
              {
                title: "Цифровая уборка",
                desc: "Убирает бардак, лишние вещи и беспорядок с фото. Квартира выглядит чистой и ухоженной.",
              },
              {
                title: "HDR-обработка",
                desc: "Делает фото ярким и объёмным — как у профессионального фотографа с дорогой техникой.",
              },
              {
                title: "Увеличение резкости",
                desc: "Детали интерьера становятся чёткими и выразительными. Даже с бюджетного телефона.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-[20px] font-normal text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Platform badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-neutral-500">Публикуйте на</span>
            {["Авито", "ЦИАН", "ДомКлик", "Яндекс"].map((p) => (
              <span
                key={p}
                className="rounded-full px-4 py-2 text-sm text-white font-medium"
                style={{
                  background: "rgba(212,101,75,0.08)",
                  border: "1px solid rgba(212,101,75,0.15)",
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Улучшить фото для Авито
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 ДО / ПОСЛЕ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Было — стало.{" "}
            <span className="text-terra-400">30 секунд разницы.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Уборка + свет" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "HDR-обработка" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Кухня #2", subtitle: "Коррекция цвета" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Полное улучшение" },
            ].map((item) => (
              <div key={item.label} className="stagger-child rounded-xl overflow-hidden">
                <BeforeAfterToggle
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  label={item.label}
                  subtitle={item.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 СРАВНЕНИЕ СТОИМОСТИ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Фотограф: 5 000₽. <span className="text-terra-500">GPT Estate: 50₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Фотограф */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Фотограф</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "3 000 – 5 000₽" },
                  { item: "Ожидание", cost: "2-3 дня" },
                  { item: "Уборка квартиры", cost: "ваше время" },
                  { item: "Пересъёмка", cost: "ещё 3 000₽" },
                  { item: "Результат", cost: "1 комплект фото" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GPT Estate */}
            <div
              className="rounded-xl p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)",
                border: "1px solid rgba(212,101,75,0.25)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">GPT Estate</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50₽ за фото" },
                  { item: "Ожидание", cost: "30 секунд" },
                  { item: "Уборка", cost: "не нужна — AI уберёт" },
                  { item: "Повтор", cost: "50₽" },
                  { item: "Результат", cost: "неограниченно" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-200/40">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-terra-500 font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] text-terra-500 mb-6">
              Экономия: от 4 985₽ на объекте
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      
      {/* ===== ALL MODES ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid
            title="Не только фото для Авито — ещё"
            subtitle="37 AI-сервисов"
            exclude={["enhance"]}
          />
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}

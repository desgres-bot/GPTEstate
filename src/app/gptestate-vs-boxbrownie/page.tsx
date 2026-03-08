import Link from "next/link";
import type { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "GPT Estate vs BoxBrownie — сравнение AI стейджинга 2025",
  description:
    "Сравнение GPT Estate и BoxBrownie. AI за 30 секунд и 50₽ vs живые дизайнеры за 24 часа и $5. 10 режимов vs 4. Полный обзор. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "BoxBrownie альтернатива, GPT Estate vs BoxBrownie, виртуальный стейджинг сравнение, BoxBrownie аналог",
  alternates: { canonical: "https://fotoestate.ru/gptestate-vs-boxbrownie" },
  openGraph: {
    title: "GPT Estate vs BoxBrownie — кто лучше?",
    description:
      "AI за 30 секунд vs дизайнеры за 24 часа. 10 режимов vs 4. Подробное сравнение.",
  },
};

const FAQ_ITEMS = [
  {
    q: "BoxBrownie работает с живыми дизайнерами?",
    a: "Да. BoxBrownie использует команду дизайнеров. Каждое фото обрабатывается вручную за 24-48 часов. GPT Estate использует AI — результат за 30 секунд.",
  },
  {
    q: "Качество BoxBrownie лучше?",
    a: "BoxBrownie гарантирует ручную доработку. Но в 2025 году AI-генерация достигла того же уровня. Для 95% объявлений разницу не заметить.",
  },
  {
    q: "Почему GPT Estate дешевле?",
    a: "BoxBrownie платит зарплату дизайнерам — $1.60-5 за фото. GPT Estate использует AI-модели автоматически — 50₽ за фото.",
  },
  {
    q: "У BoxBrownie есть AI-описания объявлений?",
    a: "Нет. BoxBrownie только фото. GPT Estate — комплексный сервис: фото, текст, оценка качества, анализ комнаты.",
  },
];

export default function VsBoxBrownie() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Сравнение сервисов
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[80px]">
              GPT Estate vs BoxBrownie
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI за 30 секунд или живые дизайнеры за 24 часа?
              Сравниваем цены, скорость и возможности.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать GPT Estate бесплатно
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "10x", label: "дешевле BoxBrownie" },
              { value: "2880x", label: "быстрее" },
              { value: "10", label: "режимов vs 4" },
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
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Сравнение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Подробное сравнение{" "}
            <span className="text-terra-500">по 10 параметрам</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">BoxBrownie</div>
              <div className="space-y-5">
                {[
                  { item: "Технология", cost: "Живые дизайнеры" },
                  { item: "Цена за фото", cost: "$1.60-5 (160-500₽)" },
                  { item: "Скорость", cost: "24-48 часов" },
                  { item: "Стили мебели", cost: "На усмотрение" },
                  { item: "Виртуальный ремонт", cost: "$4 за фото" },
                  { item: "Day-to-Dusk", cost: "$4 за фото" },
                  { item: "AI-описание", cost: "Нет" },
                  { item: "Оценка фото", cost: "Нет" },
                  { item: "Анализ комнаты", cost: "Нет" },
                  { item: "Русский рынок", cost: "Нет" },
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
                  { item: "Технология", cost: "AI (GPT-4o + Flux)" },
                  { item: "Цена за фото", cost: "от 50₽ ($0.50)" },
                  { item: "Скорость", cost: "30 секунд" },
                  { item: "Стили мебели", cost: "25 + свой стиль" },
                  { item: "Виртуальный ремонт", cost: "от 50₽, 8 вариантов" },
                  { item: "Day-to-Dusk", cost: "от 50₽" },
                  { item: "AI-описание", cost: "Да, 3 площадки" },
                  { item: "Оценка фото", cost: "Да, 1-10 + советы" },
                  { item: "Анализ комнаты", cost: "Да, 15+ параметров" },
                  { item: "Русский рынок", cost: "Авито, ЦИАН, ДомКлик" },
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

      {/* ===== 02 ПРЕИМУЩЕСТВА ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Преимущества</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Почему риелторы переходят{" "}
            <span className="text-terra-500">на GPT Estate</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Мгновенный результат", desc: "30 секунд вместо 24 часов. Выложите объявление сразу после показа." },
              { title: "В 10 раз дешевле", desc: "50₽ vs 160-500₽. Экономия на каждом фото." },
              { title: "25 стилей + свой", desc: "BoxBrownie делает на своё усмотрение. У нас — 25 стилей + ваш собственный." },
              { title: "Комплексный сервис", desc: "Фото + AI-описание + оценка качества + анализ комнаты — всё в одном." },
              { title: "Русский рынок", desc: "Описания для Авито, ЦИАН, ДомКлик. BoxBrownie не работает с русским рынком." },
              { title: "Пакетная обработка", desc: "До 20 фото за раз с ZIP-скачиванием. Весь объект за 5 минут." },
            ].map((item) => (
              <div key={item.title} className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-[20px] font-normal mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 FAQ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
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
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
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

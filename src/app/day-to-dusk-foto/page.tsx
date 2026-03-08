import Link from "next/link";
import type { Metadata } from "next";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Day to Dusk фото недвижимости — AI-обработка за 30 секунд",
  description:
    "Превратите дневное фото фасада в закатное. AI добавит тёплое освещение окон, закатное небо и ландшафтную подсветку. В 20 раз дешевле BoxBrownie. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "day to dusk фото, закатное фото дома, twilight фото недвижимости, обработка фото фасада, вечернее фото дома",
  alternates: { canonical: "https://fotoestate.ru/day-to-dusk-foto" },
  openGraph: {
    title: "Day to Dusk фото — GPT Estate",
    description:
      "Дневное фото → закатное за 30 секунд. AI-обработка фасадов недвижимости.",
  },
};

// Static data from our own codebase, safe to serialize as JSON-LD
const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Day to Dusk фото", url: "https://fotoestate.ru/day-to-dusk-foto" },
]);

const FAQ_ITEMS = [
  {
    q: "Что такое Day-to-Dusk обработка?",
    a: "Day-to-Dusk — это превращение дневного фото фасада здания в вечернее/закатное. AI добавляет закатное небо, тёплое свечение окон и ландшафтную подсветку.",
  },
  {
    q: "Какие фото подходят для обработки?",
    a: "Лучше всего подходят горизонтальные фото фасадов домов и зданий, сделанные днём. Важно чтобы на фото было видно небо и окна.",
  },
  {
    q: "Сколько стоит Day-to-Dusk обработка?",
    a: "Всего 50₽ за фото. Для сравнения: BoxBrownie берёт $4-5 за одно фото, что в 20-30 раз дороже.",
  },
  {
    q: "Как быстро я получу результат?",
    a: "Обработка занимает около 30 секунд. Результат можно скачать сразу — без ожидания и очереди.",
  },
];

const faqSchemaData = getFAQSchema(FAQ_ITEMS);
// Pre-serialized static JSON-LD data
const breadcrumbJson = JSON.stringify(breadcrumbData);
const faqSchemaJson = JSON.stringify(faqSchemaData);

export default function DayToDuskFoto() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Day to Dusk
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              День &rarr; закат
              <br />
              <span className="text-terra-400">за 30 секунд</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Превратите дневное фото фасада в эффектное закатное.
              Тёплые окна, закатное небо, ландшафтная подсветка.
            </p>
            <Link href="/generate?mode=dusk" className="btn-terra mt-8 inline-flex">
              Сделать закатное фото — бесплатно
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "30 сек", label: "до результата" },
              { value: "50₽", label: "вместо $5 за BoxBrownie" },
              { value: "x2", label: "больше просмотров" },
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

      {/* ===== 01 ЗАЧЕМ ЭТО НУЖНО ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Зачем
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            Закатные фото{" "}
            <span className="text-terra-500">продают быстрее.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            {[
              {
                num: "01",
                title: "Эмоциональный эффект",
                desc: "Закатные фото вызывают ощущение тепла и уюта. Покупатель подсознательно представляет себя дома вечером — это мощный триггер.",
              },
              {
                num: "02",
                title: "Выделение из конкурентов",
                desc: "95% объявлений используют обычные дневные фото. Закатный вариант мгновенно привлекает внимание в ленте.",
              },
              {
                num: "03",
                title: "Премиальное восприятие",
                desc: "Twilight-фотография ассоциируется с элитной недвижимостью. Даже обычный дом выглядит дороже при закатном освещении.",
              },
            ].map((item) => (
              <div key={item.num} className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">{item.num}</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">{item.title}</h3>
                    <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ЧТО AI ДЕЛАЕТ ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Как работает
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            AI создаёт{" "}
            <span className="text-terra-500">идеальный закат</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Закатное небо",
                desc: "Градиент от глубокого синего к тёплому оранжевому с мягкими облаками.",
              },
              {
                title: "Свечение окон",
                desc: "Тёплый жёлтый свет из окон создаёт ощущение уюта внутри.",
              },
              {
                title: "Ландшафтная подсветка",
                desc: "Подсветка дорожек, кустарников и элементов фасада.",
              },
              {
                title: "Структура здания",
                desc: "Все архитектурные детали сохраняются идеально.",
              },
            ].map((item) => (
              <div key={item.title} className="stagger-child rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-[18px] font-normal text-white mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate?mode=dusk" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 СРАВНЕНИЕ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            BoxBrownie: $5. <span className="text-terra-500">GPT Estate: 50₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Конкуренты</div>
              <div className="space-y-5">
                {[
                  { item: "BoxBrownie", cost: "$4-5 за фото" },
                  { item: "REimagineHome", cost: "$14-99/мес" },
                  { item: "Фотограф (twilight)", cost: "$100-300" },
                  { item: "Ожидание", cost: "24 часа" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

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
                  { item: "Стоимость", cost: "50₽ (~$0.50)" },
                  { item: "Скорость", cost: "30 секунд" },
                  { item: "Качество", cost: "Professional Twilight" },
                  { item: "Ожидание", cost: "мгновенно" },
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
              В 20-30 раз дешевле конкурентов
            </p>
            <Link href="/generate?mode=dusk" className="btn-terra">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 FAQ ===== */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              FAQ
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Частые вопросы
          </h2>

          <div className="mx-auto max-w-3xl space-y-0">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="faq-item stagger-child group border-b border-white/[0.08] py-6">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-normal text-white hover:text-terra-500 transition-colors">
                  {item.q}
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-neutral-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </FadeInSection>

      
      {/* ===== ALL MODES ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid
            title="Не только Day-to-Dusk — ещё"
            subtitle="37 AI-сервисов"
            exclude={["dusk"]}
          />
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />

      {/* JSON-LD: pre-serialized static data from our own codebase */}
      <script type="application/ld+json" suppressHydrationWarning>{breadcrumbJson}</script>
      <script type="application/ld+json" suppressHydrationWarning>{faqSchemaJson}</script>
    </>
  );
}

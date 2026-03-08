import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Увеличить продажи недвижимости — AI для агентств",
  description:
    "38 AI-инструментов для агентств недвижимости: обработка фото, виртуальный стейджинг, AI-тексты. Продажи на 73% быстрее, в 3 раза больше звонков. Экономия 1 100 000 руб/год.",
  keywords:
    "увеличить продажи недвижимости, AI для агентства недвижимости, автоматизация продаж недвижимости",
  alternates: { canonical: "https://fotoestate.ru/uvelichit-prodazhi-nedvizhimosti" },
  openGraph: {
    title: "Увеличить продажи недвижимости — GPT Estate",
    description:
      "38 AI-инструментов для агентств. Продажи на 73% быстрее, экономия 1 100 000 руб/год.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Как внедрить AI в работу агентства?",
    a: "Просто: зарегистрируйтесь, выберите тариф Агентство (150 фото/месяц). Покажите агентам 5-минутный пайплайн: загрузить фото \u2192 обработать \u2192 добавить мебель \u2192 сгенерировать текст \u2192 скопировать в объявление. Через неделю каждый агент сэкономит 3 часа на объекте.",
  },
  {
    q: "Какой тариф подходит для агентства?",
    a: "Тариф Агентство: 6 990\u20BD/мес за 150 фото. Хватает на 15\u201320 объектов. При большем объёме \u2014 тариф Профи: 5 990\u20BD/мес за 100 фото с возможностью докупки. Для начала попробуйте бесплатно \u2014 2 фото без регистрации.",
  },
  {
    q: "Сколько времени экономит AI?",
    a: "В среднем 3 часа на объект. Обработка фото: 30 секунд вместо 2 дней. Стейджинг: 30 секунд вместо недели. Описание и объявление: 30 секунд вместо часа. За месяц при 20 объектах это 60 часов \u2014 полная рабочая неделя.",
  },
  {
    q: "AI подходит для элитной недвижимости?",
    a: "Да. AI работает с любым сегментом: эконом, комфорт, бизнес, элит. Для элитной недвижимости используйте стили Art Deco, Neoclassic, Baroque. Описания генерируются с учётом класса объекта и целевой аудитории.",
  },
  {
    q: "Можно ли использовать для коммерческой недвижимости?",
    a: "Да. Режим Commercial поддерживает 8 типов помещений: офисы, рестораны, кафе, магазины, отели, коворкинги, спортзалы, салоны. AI расставит профильную мебель и оборудование.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Увеличить продажи недвижимости", url: "https://fotoestate.ru/uvelichit-prodazhi-nedvizhimosti" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function UvelichitProdazhiNedvizhimosti() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI для агентств недвижимости
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Увеличить продажи
              <br />
              недвижимости{" "}
              <span className="text-terra-400">с AI</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-2xl mx-auto">
              Агентства, которые используют AI для подготовки объектов,
              продают на 73% быстрее и получают в 3 раза больше звонков.
              38 AI-инструментов для каждого этапа: от обработки фото
              до написания объявлений. Масштабируйте без найма.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Начать продавать больше
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="AI для агентств"
              subtitle="38 инструментов"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "38", label: "AI-инструментов" },
              { value: "73%", label: "быстрее продажа" },
              { value: "x3", label: "больше звонков" },
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

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Рынок сжимается.{" "}
            <span className="text-terra-500">
              Побеждают те, кто работает эффективнее.
            </span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Каждый объект = часы ручной работы",
                desc: "Фотосъёмка, обработка фото, написание текста, создание объявления. На один объект уходит 3\u20134 часа работы агента. При потоке 20 объектов в месяц это полная занятость одного сотрудника \u2014 только на рутину.",
              },
              {
                num: "02",
                title: "Фотографы и стейджеры съедают маржу",
                desc: "Фотограф: 5 000\u20BD. Стейджинг: 50 000\u20BD. Копирайтер: 3 000\u20BD. На 20 объектов это 1 160 000\u20BD в год. Комиссия агентства \u2014 2\u20133%, и большая часть уходит на подготовку, а не в прибыль.",
              },
              {
                num: "03",
                title: "Невозможно масштабироваться",
                desc: "Чтобы обработать в 2 раза больше объектов \u2014 нужно нанять в 2 раза больше людей. AI снимает это ограничение: один агент с AI обрабатывает столько же объектов, сколько команда из 5 человек.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-xs text-neutral-600 uppercase tracking-widest mb-3">
                  {item.num}
                </div>
                <h3 className="text-[20px] font-normal text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
            38 AI-инструментов \u2014{" "}
            <span className="text-terra-500">один сервис</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                title: "Обработка фото",
                desc: "HDR, перспектива, свет, небо. Телефонные фото \u2192 профессиональный уровень за 30 секунд. Весь пакет обработки вместо фотографа.",
                modes: ["Enhance", "Lighting", "Sky", "Perspective"],
              },
              {
                title: "Виртуальный стейджинг",
                desc: "Мебель в 25 стилях для пустых квартир. Замена старой мебели, добавление отдельных предметов. Вместо 50 000\u20BD за реальный стейджинг.",
                modes: ["Staging", "Furnish", "Additem"],
              },
              {
                title: "Тексты и описания",
                desc: "AI напишет описание квартиры, объявление для Авито и ЦИАН, пост для соцсетей. Текст оптимизирован под каждую площадку.",
                modes: ["Describe", "Listing", "Social"],
              },
              {
                title: "Дизайн и визуализация",
                desc: "Редизайн в 25 стилях, сравнение 4 стилей, смена стен, пола, кухни. Для презентации потенциала объекта покупателю.",
                modes: ["Redesign", "Compare", "Wallcolor"],
              },
              {
                title: "Аналитика и чек-листы",
                desc: "AI оценит качество фото (скоринг), проанализирует комнату, проверит соответствие требованиям площадок, составит чек-лист.",
                modes: ["Score", "Analyze", "Compliance"],
              },
              {
                title: "AI-редактор",
                desc: "После любой генерации доработайте результат текстом: \u00ABсделать стены белее\u00BB, \u00ABдобавить растения\u00BB, \u00ABубрать ковёр\u00BB. Итеративно, без повторной загрузки.",
                modes: ["Refine"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-[20px] font-normal text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.modes.map((mode) => (
                    <span
                      key={mode}
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: "rgba(212,101,75,0.08)",
                        border: "1px solid rgba(212,101,75,0.15)",
                        color: "#D4654B",
                      }}
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 ПРИМЕРЫ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Было \u2014 продаём месяцами.{" "}
            <span className="text-terra-400">Стало \u2014 звонят сразу.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Квартира-студия", subtitle: "Enhance + Staging" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Двушка", subtitle: "HDR + Мебель" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Элитная", subtitle: "Редизайн" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Коммерческая", subtitle: "Office staging" },
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

      {/* ===== 04 ЭКОНОМИЯ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Традиционно: 58 000&#8381; за объект.{" "}
            <span className="text-terra-500">GPT Estate: 250&#8381;.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Традиционный подход */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Традиционный подход
              </div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "5 000\u20BD" },
                  { item: "Стейджинг мебелью", cost: "50 000\u20BD" },
                  { item: "Копирайтер", cost: "3 000\u20BD" },
                  { item: "Время на объект", cost: "3\u20134 часа" },
                  { item: "ИТОГО за объект", cost: "от 58 000\u20BD" },
                  { item: "20 объектов/мес", cost: "1 160 000\u20BD/год" },
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
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">
                GPT Estate (тариф Агентство)
              </div>
              <div className="space-y-5">
                {[
                  { item: "Все 38 режимов", cost: "от 50\u20BD/фото" },
                  { item: "Стейджинг", cost: "включён" },
                  { item: "AI-тексты", cost: "включены" },
                  { item: "Время на объект", cost: "10 минут" },
                  { item: "ИТОГО за объект", cost: "от 250\u20BD" },
                  { item: "20 объектов/мес", cost: "60 000\u20BD/год" },
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
              Экономия: 1 100 000&#8381; в год
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">05</span>
                <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
                  Вопросы
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы
              </h2>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">
                      +
                    </span>
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
            title="Все наши"
            subtitle="37 AI-сервисов"
            
          />
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        // Static server-rendered JSON-LD for SEO, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        // Static server-rendered JSON-LD for SEO, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

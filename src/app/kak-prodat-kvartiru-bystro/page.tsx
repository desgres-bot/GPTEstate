import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Как продать квартиру быстро — AI-инструменты для продажи",
  description:
    "Подготовьте квартиру к продаже за 10 минут с помощью AI. Профессиональные фото, описание и объявление для Авито и ЦИАН. Квартиры с AI-фото продаются на 73% быстрее. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "как продать квартиру быстро, быстрая продажа квартиры, ускорить продажу квартиры, продать квартиру дороже",
  alternates: { canonical: "https://fotoestate.ru/kak-prodat-kvartiru-bystro" },
  openGraph: {
    title: "Как продать квартиру быстро — GPT Estate",
    description:
      "AI подготовит фото, описание и объявление за 10 минут. Продажа на 73% быстрее.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Как AI помогает продать квартиру быстрее?",
    a: "AI обрабатывает фото за 30 секунд: улучшает свет, убирает бардак, добавляет мебель в пустые комнаты. Также генерирует продающее описание и готовое объявление для площадок. Профессиональная подача привлекает в 3 раза больше звонков.",
  },
  {
    q: "Можно ли использовать AI-фото для Авито и ЦИАН?",
    a: "Да. AI-улучшение фото и виртуальный стейджинг — стандартная практика на рынке недвижимости. Площадки не запрещают обработанные фото, если они отражают реальное состояние квартиры.",
  },
  {
    q: "Сколько стоит подготовка квартиры через AI?",
    a: "От 250 рублей за полный комплект: обработка фото, виртуальная мебель и описание. Это в 200 раз дешевле традиционного подхода с фотографом и стейджингом.",
  },
  {
    q: "Нужно ли убирать квартиру перед съёмкой?",
    a: "Нет. AI умеет убирать беспорядок с фото: лишние вещи, грязную посуду, разбросанную одежду. Снимайте как есть — AI сделает фото презентабельным.",
  },
  {
    q: "За какое время можно подготовить объявление?",
    a: "10 минут. Загрузите фото, выберите режимы обработки, получите готовые изображения и текст описания. Скопируйте в объявление на Авито или ЦИАН и опубликуйте.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Как продать квартиру быстро", url: "https://fotoestate.ru/kak-prodat-kvartiru-bystro" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function KakProdatKvartiruBystro() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-подготовка объявления
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Как продать квартиру
              <br />
              <span className="text-terra-400">быстро с помощью AI</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI подготовит фото, напишет описание и создаст объявление
              для Авито и ЦИАН. Квартиры с профессиональными фото продаются на 73% быстрее.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Подготовить квартиру — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Подготовка фото"
              subtitle="AI-обработка за 30 секунд"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "73%", label: "быстрее продажа с AI-фото" },
              { value: "x3", label: "больше звонков" },
              { value: "10 мин", label: "вместо 3 часов на объект" },
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
            Средний срок продажи квартиры — 3-6 месяцев.
            <br />
            <span className="text-terra-500">Можно быстрее.</span>
          </h2>

          <p className="mt-8 text-neutral-400 leading-relaxed max-w-2xl text-lg">
            Покупатель принимает решение за 3 секунды: листает объявления,
            видит тёмное фото с бардаком — и переходит к конкуренту. Без
            профессиональных фото и цепляющего описания ваша квартира
            теряется среди сотен одинаковых объявлений. Вы ждёте месяцами,
            снижаете цену — и всё равно нет звонков. Проблема не в квартире.
            Проблема в том, как она подана.
          </p>
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
            5 шагов к быстрой продаже —{" "}
            <span className="text-terra-500">за 10 минут</span>
          </h2>

          {/* 5-step pipeline */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                step: "01",
                title: "Уберите беспорядок",
                desc: "AI удалит лишние вещи, грязную посуду и бардак с фото. Квартира будет выглядеть чистой и ухоженной.",
                mode: "Режим: Enhance",
              },
              {
                step: "02",
                title: "Добавьте мебель",
                desc: "Пустая квартира не продаётся. AI расставит мебель в нужном стиле — покупатель сразу увидит, как жить.",
                mode: "Режим: Staging",
              },
              {
                step: "03",
                title: "Создайте описание",
                desc: "AI напишет продающий текст по фото: площадь, планировка, преимущества. Готово для копирования в объявление.",
                mode: "Режим: Describe",
              },
              {
                step: "04",
                title: "Сделайте объявление",
                desc: "AI сгенерирует полное объявление для Авито или ЦИАН: заголовок, описание, ключевые характеристики.",
                mode: "Режим: Listing",
              },
              {
                step: "05",
                title: "Проверьте чек-лист",
                desc: "AI проверит готовность объявления: качество фото, полнота описания, ключевые слова. Ничего не забудете.",
                mode: "Режим: Checklist",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-xs text-neutral-600 uppercase tracking-widest mb-3">
                  {item.step}
                </div>
                <h3 className="text-[20px] font-normal text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-4">{item.desc}</p>
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: "rgba(212,101,75,0.08)",
                    border: "1px solid rgba(212,101,75,0.15)",
                    color: "#D4654B",
                  }}
                >
                  {item.mode}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Начать подготовку
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
            Было грустно.{" "}
            <span className="text-terra-400">Стало — звонят.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Уборка + свет" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Виртуальная мебель" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "HDR-обработка" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Кухня #2", subtitle: "Полное улучшение" },
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
            Традиционно: 58 000₽. <span className="text-terra-500">GPT Estate: 250₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Традиционный подход */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Традиционный подход
              </div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "5 000₽" },
                  { item: "Стейджинг мебелью", cost: "50 000₽" },
                  { item: "Копирайтер", cost: "3 000₽" },
                  { item: "Время подготовки", cost: "5-7 дней" },
                  { item: "ИТОГО", cost: "от 58 000₽" },
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
                  { item: "Обработка фото", cost: "от 50₽/фото" },
                  { item: "Виртуальная мебель", cost: "от 50₽/фото" },
                  { item: "Описание и текст", cost: "бесплатно" },
                  { item: "Время подготовки", cost: "10 минут" },
                  { item: "ИТОГО", cost: "от 250₽" },
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
              Экономия: от 57 750₽ на объекте
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
            title="Не только подготовка к продаже — ещё"
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

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

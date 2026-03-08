import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Подготовка квартиры к продаже — AI-инструменты за 50₽",
  description:
    "Предпродажная подготовка квартиры за 10 минут вместо недели. AI уберёт беспорядок с фото, улучшит свет, добавит мебель и проверит готовность по чек-листу. Экономия от 59 750₽ на объекте. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "подготовка квартиры к продаже, предпродажная подготовка, как подготовить квартиру к продаже, предпродажная подготовка квартиры",
  alternates: { canonical: "https://fotoestate.ru/podgotovka-kvartiry-k-prodazhe" },
  openGraph: {
    title: "Подготовка квартиры к продаже — GPT Estate",
    description:
      "AI заменяет клининг, фотографа и стейджинг. Полная подготовка квартиры за 10 минут и 250₽ вместо 60 000₽.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Когда начинать подготовку квартиры к продаже?",
    a: "Идеально — до размещения объявления. Но AI позволяет улучшить фото в любой момент: даже если объявление уже висит 2 месяца без звонков, обновите фото за 10 минут и получите свежий поток откликов.",
  },
  {
    q: "Что даёт больше эффекта — ремонт или AI-подготовка?",
    a: "AI-подготовка в 99% случаев. Ремонт за 500 000₽ повысит цену на 200 000₽ — вы в минусе. AI-обработка за 250₽ привлечёт покупателей, которые сами сделают ремонт под себя.",
  },
  {
    q: "Нужно ли убирать квартиру перед съёмкой?",
    a: "Нет. AI-режим Declutter удаляет беспорядок с фото: лишние вещи, грязную посуду, разбросанную одежду. Снимайте как есть — AI сделает фото презентабельным.",
  },
  {
    q: "Можно ли использовать виртуальную мебель в объявлениях?",
    a: "Да. Виртуальный стейджинг — стандартная практика на рынке недвижимости по всему миру. Рекомендуем указать в описании, что мебель виртуальная.",
  },
  {
    q: "Подходит для вторичного жилья?",
    a: "Особенно для вторички. AI скроет следы старого ремонта, уберёт лишнее, покажет потенциал квартиры. Именно на вторичном рынке подготовка даёт максимальный эффект — ваше объявление будет выглядеть как новостройка бизнес-класса.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Подготовка квартиры к продаже", url: "https://fotoestate.ru/podgotovka-kvartiry-k-prodazhe" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function PodgotovkaKvartiryKProdazhe() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="text-white" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Предпродажная подготовка AI
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Подготовка квартиры
              <br />
              к продаже — <span className="text-terra-400">без затрат</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Подготовка — фактор №1, определяющий скорость и цену продажи.
              AI заменяет фотографа, клининг и стейджинг: вы получаете продающие
              фото за 10 минут вместо недели подготовки.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Подготовить квартиру — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-3.jpg"
              afterSrc="/demo/after-3.jpg"
              label="Предпродажная подготовка"
              subtitle="AI-обработка за 30 секунд"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "93%", label: "покупателей начинают поиск онлайн" },
              { value: "2x", label: "быстрее продажа с подготовкой" },
              { value: "50₽", label: "вместо 60 000₽ на подготовку" },
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

      {/* ===== 01 PROBLEM ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Проблема
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            Непривлекательная квартира стоит на рынке месяцами.{" "}
            <span className="text-terra-500">Покупатели выбирают глазами.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Первое впечатление формируется за 7 секунд
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Покупатель листает ленту и за 7 секунд решает — кликнуть
                    или пролистать. Тёмные углы, старая плитка, раковина
                    с разводами — и объявление проиграло, даже если квартира
                    идеальна по планировке и цене.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Конкуренты уже готовят свои объекты
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    На ЦИАН выставлено 50 000+ квартир в Москве. Ваш объект
                    соревнуется не только ценой, но и визуальной привлекательностью.
                    Агентства с бюджетом 100 000₽ на подготовку забирают лучших
                    покупателей.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Каждый месяц простоя = потерянные деньги
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Ипотечные платежи, коммуналка, налоги — пустая квартира
                    обходится в 30 000-50 000₽ в месяц. Быстрая продажа экономит
                    больше, чем скидка на 200 000₽.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 SOLUTION ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Полная подготовка за 10 минут —{" "}
            <span className="text-terra-500">4 шага</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-16">
            {[
              {
                step: "01",
                title: "Уберите беспорядок с фото",
                desc: "AI удалит лишние вещи: обувь в прихожей, посуду на столе, разбросанные игрушки. Не нужно тратить день на генеральную уборку — просто загрузите фото как есть.",
                mode: "Режим: Declutter",
              },
              {
                step: "02",
                title: "Улучшите свет и цвет",
                desc: "AI выровняет освещение, уберёт жёлтый оттенок от ламп накаливания, сделает комнату просторнее и светлее. Даже съёмка на телефон будет выглядеть профессионально.",
                mode: "Режим: Enhance",
              },
              {
                step: "03",
                title: "Добавьте мебель в пустые комнаты",
                desc: "Пустые комнаты кажутся маленькими и холодными. AI расставит мебель в 25 стилях — покупатель увидит потенциал и сможет представить свою жизнь в этой квартире.",
                mode: "Режим: Staging",
              },
              {
                step: "04",
                title: "Проверьте готовность по чек-листу",
                desc: "AI проанализирует каждое фото: качество, свет, композиция, ракурс. Подскажет что улучшить, чтобы объявление получало максимум откликов.",
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

      {/* ===== 03 EXAMPLES ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Было обычно.{" "}
            <span className="text-terra-400">Стало — продаётся.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Уборка + улучшение света" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Виртуальная мебель" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Предпродажная подготовка" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Студия", subtitle: "Полная обработка" },
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

      {/* ===== 04 SAVINGS ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Традиционно: 60 000₽ и неделя.{" "}
            <span className="text-terra-500">GPT Estate: 50₽ и 10 минут.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Traditional */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Традиционный подход
              </div>
              <div className="space-y-5">
                {[
                  { item: "Клининг", cost: "5 000₽" },
                  { item: "Фотограф", cost: "5 000₽" },
                  { item: "Стейджинг мебелью", cost: "45 000₽" },
                  { item: "Ретушь фото", cost: "5 000₽" },
                  { item: "Срок", cost: "5-7 дней" },
                  { item: "ИТОГО", cost: "от 60 000₽" },
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
                  { item: "Уборка с фото", cost: "от 50₽/фото" },
                  { item: "AI-обработка", cost: "от 50₽/фото" },
                  { item: "Виртуальная мебель", cost: "от 50₽/фото" },
                  { item: "AI чек-лист", cost: "бесплатно" },
                  { item: "Срок", cost: "10 минут" },
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
              Экономия: от 59 750₽ на объекте
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
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
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid
            title="Не только подготовка квартиры — ещё"
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

import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Фото для ЦИАН — AI-подготовка за 30 секунд",
  description:
    "AI-подготовка фото для ЦИАН: HDR-обработка, коррекция света, проверка качества и AI-описание. От 50₽ за фото вместо 10 000₽ за фотографа. 2 фото бесплатно. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "фото для циан, требования к фото циан, фото квартиры для циан, обработка фото для циан",
  alternates: { canonical: "https://fotoestate.ru/foto-dlya-cian" },
  openGraph: {
    title: "Фото для ЦИАН — GPT Estate",
    description:
      "AI подготовит фото для ЦИАН за 30 секунд: HDR, свет, проверка качества, описание. 2 фото бесплатно.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Какие требования ЦИАН к фото?",
    a: "ЦИАН рекомендует минимум 10 фото в горизонтальной ориентации с высоким разрешением. Фото должны быть без водяных знаков, логотипов и текста. AI-режим Compliance автоматически проверяет все эти требования и подсказывает что исправить.",
  },
  {
    q: "Как получить отметку «Качественные фото» на ЦИАН?",
    a: "ЦИАН автоматически отмечает объявления с профессиональными фото. AI-обработка делает телефонные фото профессиональными: правильный свет, ровная перспектива, натуральные цвета. Это повышает шансы получить отметку качества.",
  },
  {
    q: "Можно использовать одновременно для ЦИАН и Авито?",
    a: "Да. Обработанные фото подходят для всех площадок: ЦИАН, Авито, ДомКлик, Яндекс.Недвижимость. AI-описание можно сгенерировать отдельно для каждой площадки — с учётом формата и требований.",
  },
  {
    q: "Обработка изменит реальный вид квартиры?",
    a: "Нет. AI-обработка улучшает свет, цвет и перспективу — раскрывает реальный потенциал квартиры. Мы не добавляем несуществующие объекты и не скрываем дефекты. Квартира выглядит так, как при идеальном дневном освещении.",
  },
  {
    q: "Сколько фото нужно для ЦИАН?",
    a: "ЦИАН рекомендует минимум 10 фото. Оптимально — 15-20: все комнаты, кухня, санузел, вид из окна, подъезд, двор. С AI обработка 20 фото займёт 10 минут и будет стоить от 1 000₽ — дешевле одного часа фотографа.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Фото для ЦИАН", url: "https://fotoestate.ru/foto-dlya-cian" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function FotoDlyaCian() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-подготовка фото для ЦИАН
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фото для ЦИАН, которые
              <br />
              <span className="text-terra-400">выделяют объявление</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              На ЦИАН 150 000+ объявлений в Москве. Покупатель выбирает
              глазами — первая фотография решает кликнет он или пролистает.
              AI подготовит фото за 30 секунд: свет, перспектива, уборка,
              небо — чтобы ваш объект стоял первым в выдаче по
              привлекательности.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Подготовить фото — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Фото для ЦИАН"
              subtitle="AI-обработка"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "150K+", label: "объявлений на ЦИАН — конкуренция" },
              { value: "x3", label: "больше кликов с AI-фото" },
              { value: "30 сек", label: "обработка одного фото" },
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
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Проблема
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            На ЦИАН тысячи объявлений.
            <br />
            <span className="text-terra-500">Ваше — теряется.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Покупатель видит 50 объявлений за минуту
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    ЦИАН показывает объявления лентой. Покупатель листает, и
                    решение «кликнуть или пролистать» принимается за 1-2 секунды
                    по первой фотографии. Тёмное, размытое фото = ноль шансов.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Требования ЦИАН к фото растут
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    ЦИАН рекомендует минимум 10 фото, горизонтальную ориентацию,
                    высокое разрешение и отсутствие водяных знаков. Объявления с
                    качественными фото получают отметку «Качественные фото» и
                    больше показов.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">
                    Конкуренты нанимают фотографов
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Крупные агентства тратят 5 000-10 000₽ на фотографа для
                    каждого объекта. У одиночного риелтора или собственника нет
                    такого бюджета — AI уравнивает шансы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 РЕШЕНИЕ ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            4 AI-инструмента для идеальных фото{" "}
            <span className="text-terra-500">на ЦИАН</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 mb-16">
            {[
              {
                title: "HDR-обработка",
                desc: "AI выравнивает свет: тёмные углы осветляются, пересветы от окон убираются, цвета становятся натуральными. ЦИАН отмечает такие фото знаком качества.",
                mode: "Enhance",
              },
              {
                title: "Коррекция света",
                desc: "Снимали вечером с жёлтым светом? AI переведёт фото в дневной свет — комната будет выглядеть яркой и просторной, как при дневной съёмке.",
                mode: "Lighting",
              },
              {
                title: "Проверка качества",
                desc: "AI проанализирует каждое фото по стандартам ЦИАН: разрешение, композиция, свет, ракурс. Подскажет какие фото заменить и что улучшить.",
                mode: "Compliance",
              },
              {
                title: "Описание для объявления",
                desc: "AI напишет продающее описание по фото: площадь, планировка, преимущества расположения. Оптимизировано для поиска ЦИАН.",
                mode: "Describe",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
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

          <div className="text-center">
            <Link href="/generate" className="btn-terra">
              Подготовить фото
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
            Было — обычное фото.{" "}
            <span className="text-terra-400">Стало — кликают.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "HDR + свет" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Полная обработка" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Освещение" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Столовая", subtitle: "Перспектива" },
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
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Фотограф: 5 000₽ за объект.{" "}
            <span className="text-terra-500">AI: 50₽ за фото.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Фотограф */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Фотограф
              </div>
              <div className="space-y-5">
                {[
                  { item: "Выезд на объект", cost: "5 000₽" },
                  { item: "Ретушь фото", cost: "2 000₽" },
                  { item: "Описание", cost: "3 000₽" },
                  { item: "Время", cost: "2-3 дня" },
                  { item: "ИТОГО", cost: "от 10 000₽" },
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
                  { item: "AI-обработка", cost: "от 50₽/фото" },
                  { item: "Все режимы", cost: "включены" },
                  { item: "AI-описание", cost: "включено" },
                  { item: "Время", cost: "10 минут" },
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
              Экономия: от 9 750₽ на объекте
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
            title="Не только фото для ЦИАН — ещё"
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

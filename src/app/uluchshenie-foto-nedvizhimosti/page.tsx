import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Улучшение фото недвижимости — AI-обработка для риелторов",
  description:
    "Профессиональная обработка фото квартир и домов для риелторов, собственников и агентств. AI улучшает свет, цвета и композицию за 30 секунд. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "улучшение фото недвижимости, обработка фото квартир, фото для риелторов, AI обработка фото",
  alternates: { canonical: "https://fotoestate.ru/uluchshenie-foto-nedvizhimosti" },
  openGraph: {
    title: "Улучшение фото недвижимости — GPT Estate",
    description: "AI-обработка фото квартир и домов за 30 секунд. От 50₽.",
  },
};

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Улучшение фото недвижимости", url: "https://fotoestate.ru/uluchshenie-foto-nedvizhimosti" },
]);

export default function UluchshenieFotoNedvizhimosti() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-обработка фото недвижимости
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Профессиональные фото
              <br />
              <span className="text-terra-400">без фотографа</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI превращает любой снимок с телефона в продающее фото
              за 30 секунд. Без выезда, без ожидания, без переплат.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Улучшение фото"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "47 832", label: "фото обработано" },
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
            Фотограф = 5 000₽ + 2-3 дня ожидания.
            <br />
            <span className="text-terra-500">У вас 10 объектов? Это 50 000₽ и месяц.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Дорого масштабировать</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Один выезд фотографа — от 5 000₽. При 10+ объектах в месяц расходы
                    на фото становятся неподъёмными. А без хороших фото объявления не работают.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Долго ждать</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Согласовать выезд, дождаться съёмки, получить обработанные фото —
                    2-3 дня минимум. За это время конкурент уже выложил объявление.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Непостоянное качество</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Разные фотографы — разный стиль. У агентства нет единого стандарта,
                    портфолио выглядит разнородно и непрофессионально.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ДЛЯ КОГО ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Для кого
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Кому это{" "}
            <span className="text-terra-500">нужно</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3 mb-16">
            {[
              {
                title: "Риелторы",
                desc: "Быстро готовьте фото для десятков объектов без найма фотографа. Экономьте 4 985₽ на каждом объекте и выкладывайте объявления в тот же день.",
              },
              {
                title: "Собственники",
                desc: "Продайте или сдайте квартиру быстрее с привлекательными фото. Не нужно убираться — AI сделает это за вас на фото.",
              },
              {
                title: "Агентства",
                desc: "Стандартизируйте качество фото по всему портфелю объектов. Единый стиль, единое качество — от 47₽ за фото на тарифе Агентство.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-[20px] font-normal text-white mb-4">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 РЕШЕНИЕ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Возможности
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Что умеет{" "}
            <span className="text-terra-500">AI GPT Estate</span>
          </h2>

          {/* 5 AI capabilities checklist */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              "Автоматическая коррекция баланса белого и экспозиции",
              "HDR-обработка для максимальной детализации",
              "Цифровая уборка — удаление бардака и лишних вещей",
              "Увеличение резкости и удаление шума",
              "Виртуальная мебель — обставьте пустую комнату",
            ].map((feature) => (
              <div key={feature} className="stagger-child flex items-start gap-3">
                <span className="mt-1 text-terra-500 text-sm flex-shrink-0">+</span>
                <span className="text-white text-base leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-xl p-8 lg:p-10 max-w-2xl">
            <p className="text-neutral-400 leading-relaxed text-lg italic">
              &ldquo;Раньше тратил час на уговоры хозяев убраться. Теперь фоткаю как есть
              и через 30 секунд у меня продающее фото.&rdquo;
            </p>
            <div className="mt-6">
              <div className="text-base text-white">Алексей Морозов</div>
              <div className="text-sm text-neutral-500 mt-1">Риелтор, Москва</div>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/generate" className="btn-terra">
              Улучшить фото сейчас
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 ДО / ПОСЛЕ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Та же квартира.{" "}
            <span className="text-terra-400">Другие деньги.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Уборка кухни", subtitle: "Бардак исчезает за 30 секунд" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Улучшение спальни", subtitle: "Свет и цвет" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Виртуальная мебель", subtitle: "Пустая комната стала жилой" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "HDR-обработка", subtitle: "Профессиональное качество" },
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

      {/* ===== 05 СРАВНЕНИЕ СТОИМОСТИ ===== */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
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
                  { item: "10 объектов", cost: "50 000₽" },
                  { item: "Качество", cost: "зависит от фотографа" },
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
                  { item: "10 объектов", cost: "от 150₽" },
                  { item: "Качество", cost: "стабильно высокое" },
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
            title="Не только улучшение фото — ещё"
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

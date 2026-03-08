import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Хоум стейджинг онлайн — виртуальная меблировка за 30 секунд",
  description:
    "Виртуальный хоум стейджинг для риелторов и собственников. Расставьте мебель в пустой квартире за 30 секунд — покупатели увидят потенциал. 25 стилей, от 50₽. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "хоум стейджинг, home staging, хоум стейджинг онлайн, виртуальный хоум стейджинг, стейджинг недвижимости",
  alternates: { canonical: "https://fotoestate.ru/homestaging" },
  openGraph: {
    title: "Хоум стейджинг онлайн — GPT Estate",
    description:
      "Виртуальный home staging: расставьте мебель в пустой квартире за 30 секунд. 25 стилей на выбор.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Что такое хоум стейджинг?",
    a: "Хоум стейджинг (home staging) — это подготовка недвижимости к продаже с помощью оформления интерьера. Виртуальный хоум стейджинг позволяет добавить мебель и декор на фото с помощью AI, без реальной мебели.",
  },
  {
    q: "Законно ли использовать виртуальный стейджинг в объявлениях?",
    a: "Да. Виртуальный хоум стейджинг — стандартная практика на рынке недвижимости по всему миру. Рекомендуется указывать в объявлении, что фото содержат виртуальную меблировку.",
  },
  {
    q: "Какие стили мебели доступны?",
    a: "25 готовых стилей: современный, скандинавский, лофт, классика, минимализм, прованс, бохо, mid-century и другие. Также можно описать свой стиль текстом — AI воплотит любую идею.",
  },
  {
    q: "Насколько реалистично выглядит результат?",
    a: "AI создаёт фотореалистичную мебель с правильными тенями, освещением и перспективой. Покупатели не отличают виртуальную мебель от реальной.",
  },
  {
    q: "Сколько стоит виртуальный хоум стейджинг?",
    a: "От 50₽ за фото. Первые 2 фото — бесплатно, без регистрации. Это в 1000 раз дешевле реального стейджинга.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Хоум стейджинг", url: "https://fotoestate.ru/homestaging" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function HomeStaging() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Виртуальный home staging
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Хоум стейджинг онлайн
              <br />
              <span className="text-terra-400">за 30 секунд</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Виртуальный хоум стейджинг для риелторов и собственников.
              Расставьте мебель в пустой квартире за 30 секунд — покупатели увидят потенциал.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать home staging бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-2.jpg"
              afterSrc="/demo/after-2.jpg"
              label="Home staging"
              subtitle="AI-меблировка за 30 секунд"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "73%", label: "быстрее продажа с мебелью" },
              { value: "25", label: "стилей мебели" },
              { value: "30 сек", label: "до готового фото" },
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
            Пустые квартиры продаются на 73% дольше.
            <br />
            <span className="text-terra-500">Покупатели не видят потенциал.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Холодные пустые стены</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Пустая комната на фото выглядит маленькой, холодной и нежилой.
                    Покупатель не понимает масштаб помещения и не может представить
                    свою жизнь в этих стенах.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Объявление теряется в ленте</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    На площадках недвижимости тысячи объявлений. Фото пустых комнат
                    не цепляют взгляд — покупатель пролистывает их за секунду
                    и уходит к конкурентам с обставленными интерьерами.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Реальный стейджинг — дорого и долго</h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">
                    Аренда мебели, доставка, расстановка, вывоз — от 75 000₽
                    и неделя ожидания. Для каждого объекта заново. Это съедает
                    маржу и замедляет работу.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ЧТО ТАКОЕ HOME STAGING ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Результат
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Что такое хоум стейджинг и{" "}
            <span className="text-terra-500">зачем он нужен</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3 mb-16">
            {[
              {
                value: "01",
                label: "Визуальная привлекательность",
                desc: "Мебель и декор помогают покупателю представить свою жизнь в квартире. Обставленная комната вызывает эмоциональный отклик и желание купить.",
              },
              {
                value: "02",
                label: "Продажа быстрее",
                desc: "По данным NAR, квартиры с хоум стейджингом продаются на 73% быстрее. Покупатель принимает решение быстрее, когда видит уютный интерьер.",
              },
              {
                value: "03",
                label: "Выше цена продажи",
                desc: "Покупатели готовы платить на 6-20% больше за квартиру с обставленным интерьером. Хоум стейджинг окупается многократно.",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stagger-child rounded-xl p-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="heading-display text-[40px] sm:text-[56px] text-terra-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                  {stat.label}
                </div>
                <p className="text-neutral-400 leading-relaxed text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 РЕШЕНИЕ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Виртуальный стейджинг —{" "}
            <span className="text-terra-500">вместо реального</span>
          </h2>

          {/* Process steps */}
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Сфотографируйте пустую квартиру",
                desc: "На телефон, при любом освещении. AI справится даже с плохим светом и широким углом.",
              },
              {
                step: "02",
                title: "Выберите стиль мебели",
                desc: "25 стилей от минимализма до классики. Или опишите свой стиль текстом — AI воплотит любую идею.",
              },
              {
                step: "03",
                title: "Получите обставленное фото",
                desc: "Фотореалистичная мебель с тенями и правильной перспективой. Готово за 30 секунд.",
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center p-8 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xs text-neutral-600 uppercase tracking-widest mb-3">
                  {item.step}
                </div>
                <h3 className="text-[20px] font-normal mb-2">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Расставить мебель бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 ПРИМЕРЫ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            До и после{" "}
            <span className="text-terra-400">home staging.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Современный стиль" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Скандинавский стиль" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Стиль минимализм" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Столовая", subtitle: "Классический стиль" },
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
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Реальный стейджинг: 75 000₽.{" "}
            <span className="text-terra-500">Виртуальный: 50₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Реальный стейджинг */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Реальный хоум стейджинг
              </div>
              <div className="space-y-5">
                {[
                  { item: "Аренда мебели", cost: "от 50 000₽" },
                  { item: "Доставка и сборка", cost: "от 10 000₽" },
                  { item: "Аренда в месяц", cost: "от 15 000₽/мес" },
                  { item: "Количество стилей", cost: "1" },
                  { item: "Срок подготовки", cost: "3-7 дней" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Виртуальный стейджинг */}
            <div
              className="rounded-xl p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)",
                border: "1px solid rgba(212,101,75,0.25)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">
                Виртуальный home staging
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50₽ за фото" },
                  { item: "Доставка", cost: "не нужна" },
                  { item: "Ежемесячная плата", cost: "не нужна" },
                  { item: "Количество стилей", cost: "25 + свой стиль" },
                  { item: "Срок подготовки", cost: "30 секунд" },
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
              Экономия: от 74 985₽ на объекте
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 06 FAQ ===== */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">06</span>
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
            title="Не только home staging — ещё"
            subtitle="37 AI-сервисов"
            exclude={["staging"]}
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

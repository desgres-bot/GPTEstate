import Link from "next/link";
import type { Metadata } from "next";
import { STYLES } from "@/lib/constants";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Виртуальный стейджинг квартиры — мебель за 30 секунд",
  description:
    "Виртуальный стейджинг квартиры с помощью AI. Добавьте мебель в пустую комнату за 15 рублей вместо 50 000₽ за реальную мебель. 25 стилей интерьера.",
  keywords:
    "виртуальный стейджинг, стейджинг квартиры, виртуальная меблировка, AI мебель, виртуальная мебель для фото",
  alternates: { canonical: "https://fotoestate.ru/virtualnyj-stejdzhing" },
  openGraph: {
    title: "Виртуальный стейджинг — GPT Estate",
    description:
      "Добавьте мебель в пустую комнату за 50₽ и 30 секунд. 25 стилей на выбор.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Покупатель заметит что мебель виртуальная?",
    a: "Нет. AI создаёт фотореалистичную мебель с правильными тенями, светом и перспективой.",
  },
  {
    q: "Какие стили доступны?",
    a: "25 стилей: от современного до барокко. Плюс можно описать свой стиль текстом — AI воплотит любую идею.",
  },
  {
    q: "Можно использовать для коммерческой недвижимости?",
    a: "Да. Офисы, кафе, магазины — AI расставит мебель в любом пространстве.",
  },
  {
    q: "Это законно для объявлений?",
    a: "Да. Виртуальный стейджинг — стандартная практика на рынке недвижимости по всему миру.",
  },
  {
    q: "Сколько стоит?",
    a: "От 50₽ за фото. Первые 2 — бесплатно, без регистрации.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Виртуальный стейджинг", url: "https://fotoestate.ru/virtualnyj-stejdzhing" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function VirtualnyjStejdzhing() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Виртуальный стейджинг квартиры
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Пустая квартира
              <br />
              <span className="text-terra-400">не продаётся</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Добавьте мебель за 50₽ вместо 50 000₽. AI расставит мебель
              в вашем стиле за 30 секунд.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-2.jpg"
              afterSrc="/demo/after-2.jpg"
              label="Виртуальный стейджинг"
              subtitle="Нажмите, чтобы увидеть пустую комнату"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "25", label: "стилей мебели" },
              { value: "30 сек", label: "до результата" },
              { value: "50₽", label: "вместо 50 000₽ за реальную мебель" },
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
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Проблема
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            83% покупателей не могут представить себя в пустых стенах.
            <br />
            <span className="text-terra-500">Вы теряете их.</span>
          </h2>

          <p className="mt-8 text-[#6B6560] leading-relaxed max-w-2xl text-lg">
            Пустая комната на фото выглядит маленькой, холодной и безжизненной.
            Покупатель не понимает, куда поставить диван и поместится ли кровать.
            Он закрывает объявление и переходит к следующему — с обставленными фото.
          </p>
        </div>
      </FadeInSection>

      {/* ===== 02 ROI СТАТИСТИКА ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Результат
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Виртуальный стейджинг{" "}
            <span className="text-terra-500">работает</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3 mb-16">
            {[
              {
                value: "73%",
                label: "быстрее продажа",
                desc: "Квартиры с виртуальной мебелью продаются значительно быстрее, чем пустые.",
              },
              {
                value: "20%",
                label: "выше предложения",
                desc: "Покупатели готовы платить больше за квартиру, в которой могут себя представить.",
              },
              {
                value: "x3",
                label: "больше звонков",
                desc: "Объявления с обставленными комнатами получают в 3 раза больше откликов.",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stagger-child rounded-xl border border-neutral-200 p-8 text-center"
              >
                <div className="heading-display text-[40px] sm:text-[56px] text-terra-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-4">
                  {stat.label}
                </div>
                <p className="text-[#6B6560] leading-relaxed text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 РЕШЕНИЕ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">03</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            25 стилей. Ваша комната.{" "}
            <span className="text-terra-500">30 секунд.</span>
          </h2>

          {/* Style chips */}
          <div className="flex flex-wrap gap-3 mb-16">
            {STYLES.map((style) => (
              <span
                key={style.id}
                className="rounded-lg px-5 py-3 text-sm text-[#1E1B18] font-medium"
                style={{
                  background: "rgba(212,101,75,0.08)",
                  border: "1px solid rgba(212,101,75,0.15)",
                }}
              >
                {style.emoji} {style.name}
              </span>
            ))}
          </div>

          {/* Process steps */}
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Сфотографируйте пустую комнату",
                desc: "На телефон, при любом освещении. AI справится даже с плохим светом.",
              },
              {
                step: "02",
                title: "Выберите стиль мебели",
                desc: "25 стилей от минимализма до барокко. Или опишите свой стиль текстом.",
              },
              {
                step: "03",
                title: "Получите обставленную комнату",
                desc: "Фотореалистичная мебель с тенями и перспективой. За 30 секунд.",
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center p-8 rounded-xl bg-white">
                <div className="text-xs text-[#bfbfbf] uppercase tracking-widest mb-3">
                  {item.step}
                </div>
                <h3 className="text-[20px] font-normal mb-2">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Добавить мебель бесплатно
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
            Пустая комната.{" "}
            <span className="text-terra-400">Обставленная комната.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Современный стиль" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Скандинавский стиль" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Кухня", subtitle: "Классический стиль" },
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня #2", subtitle: "Стиль лофт" },
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
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">05</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Реальная мебель: 50 000₽.{" "}
            <span className="text-terra-500">Виртуальная: 50₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Реальная мебель */}
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">
                Реальный стейджинг
              </div>
              <div className="space-y-5">
                {[
                  { item: "Мебель", cost: "от 50 000₽" },
                  { item: "Доставка и сборка", cost: "от 10 000₽" },
                  { item: "Уборка после", cost: "от 3 000₽" },
                  { item: "Стили", cost: "1" },
                  { item: "Срок", cost: "3-7 дней" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-[#1E1B18] font-medium">{row.cost}</span>
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
                Виртуальный стейджинг
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50₽ за фото" },
                  { item: "Доставка", cost: "не нужна" },
                  { item: "Уборка", cost: "не нужна" },
                  { item: "Стили", cost: "25 + свой стиль" },
                  { item: "Срок", cost: "30 секунд" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-200/40">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-terra-500 font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] text-terra-500 mb-6">
              Экономия: от 62 985₽
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 06 FAQ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">06</span>
                <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
                  Вопросы
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы
              </h2>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group">
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-[#7D756E]">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-[#6B6560] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner />

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

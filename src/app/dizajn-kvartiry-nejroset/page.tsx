import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Дизайн квартиры нейросетью — визуализация онлайн",
  description:
    "Дизайн квартиры нейросетью за 30 секунд. Загрузите фото комнаты — AI покажет 25 стилей интерьера. Сравните 4 варианта, измените стены, пол, кухню. Экономия 150 000₽ на дизайн-проекте.",
  keywords:
    "дизайн квартиры нейросеть, AI дизайн интерьера, нейросеть для дизайна, дизайн-проект нейросетью",
  alternates: { canonical: "https://fotoestate.ru/dizajn-kvartiry-nejroset" },
  openGraph: {
    title: "Дизайн квартиры нейросетью — GPT Estate",
    description:
      "Загрузите фото комнаты — нейросеть покажет 25 вариантов дизайна за 30 секунд. Сравнение стилей, замена стен, пола, кухни.",
  },
};

const FAQ_ITEMS = [
  {
    q: "AI заменит дизайнера интерьера?",
    a: "Для визуализации идей — да. AI покажет 25 вариантов за 5 минут вместо 2 месяцев ожидания. Для сложных авторских проектов с индивидуальной мебелью дизайнер по-прежнему нужен, но AI поможет определиться со стилем до начала работы.",
  },
  {
    q: "Насколько точна визуализация?",
    a: "AI сохраняет точные пропорции комнаты, расположение окон и дверей. Мебель и отделка выглядят фотореалистично. Это не 3D-рендер, а нейросетевая обработка реального фото — результат максимально приближен к реальности.",
  },
  {
    q: "Можно использовать для ремонта?",
    a: "Да. Покажите подрядчику визуализацию AI вместо описания на словах. Это экономит время на согласование и снижает риск ошибок. Подрядчик видит конкретный результат, к которому нужно стремиться.",
  },
  {
    q: "Как сравнить несколько стилей?",
    a: "Используйте режим Compare: загрузите фото и получите 4 варианта одной комнаты в разных стилях. Или обработайте одно фото в разных режимах — Redesign, Wallcolor, Flooring — чтобы менять элементы по отдельности.",
  },
  {
    q: "Подходит для коммерческих помещений?",
    a: "Да. AI работает с любыми помещениями: квартиры, офисы, кафе, магазины. Режим Commercial специально создан для коммерческой недвижимости — 8 типов помещений с профильной мебелью.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Дизайн квартиры нейросетью", url: "https://fotoestate.ru/dizajn-kvartiry-nejroset" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function DizajnKvartiryNejroset() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-дизайн интерьера
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Дизайн квартиры нейросетью
              <br />
              <span className="text-terra-400">за 30 секунд</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Не платите 150 000₽ за дизайн-проект. Загрузите фото комнаты —
              AI покажет, как она будет выглядеть в любом из 25 стилей.
              Сравните 4 стиля рядом. Измените стены, пол, кухню в один клик.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Создать дизайн — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-4.jpg"
              afterSrc="/demo/after-4.jpg"
              label="Редизайн интерьера"
              subtitle="Современный стиль"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "25", label: "стилей интерьера" },
              { value: "30 сек", label: "до визуализации" },
              { value: "150 000₽", label: "экономия на дизайн-проект" },
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

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-3xl">
            Дизайн-проект стоит 150 000₽ и занимает 2 месяца.{" "}
            <span className="text-terra-500">Можно за 30 секунд.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Дорогой дизайн-проект</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Дизайнер берёт от 2 000₽/м². Для квартиры 60 м² — 120 000-200 000₽.
                    И это только визуализация, без мебели и ремонта. Многим собственникам
                    нужно просто посмотреть варианты — не тратя бюджет.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Невозможно представить результат</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Вы хотите лофт или скандинавский стиль? Классику или минимализм?
                    Без визуализации это лотерея — вы тратите сотни тысяч на ремонт
                    и рискуете получить не то, что представляли.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Долгое согласование</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    3-5 итераций с дизайнером, каждая правка — неделя ожидания.
                    AI показывает результат за 30 секунд — не нравится? Меняйте
                    стиль мгновенно, пока не найдёте свой.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 РЕШЕНИЕ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Решение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            5 инструментов AI-дизайна —{" "}
            <span className="text-terra-500">в одном сервисе</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                title: "Редизайн комнаты",
                desc: "Загрузите фото — AI покажет как будет выглядеть комната в любом из 25 стилей. Современный, сканди, лофт, классика, японский, бохо и ещё 20 вариантов.",
                mode: "Redesign",
              },
              {
                title: "Сравнение 4 стилей",
                desc: "Не можете выбрать? AI сгенерирует 4 варианта одной комнаты в разных стилях — сравните и выберите лучший.",
                mode: "Compare",
              },
              {
                title: "Изменение стен",
                desc: "Примерьте любой цвет стен: белый, бежевый, серый, синий, зелёный, терракота, лаванда, шалфей. Или опишите свой оттенок.",
                mode: "Wallcolor",
              },
              {
                title: "Замена пола",
                desc: "Ламинат, паркет, плитка, мрамор, бетон — посмотрите как будет выглядеть комната с новым полом. Без ремонта.",
                mode: "Flooring",
              },
              {
                title: "Дизайн кухни",
                desc: "6 стилей кухонных гарнитуров: современный белый, тёмный, классика, сканди, шейкер, индастриал. AI покажет как впишется в вашу кухню.",
                mode: "Kitchen",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl border border-neutral-200 p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-normal text-[#1E1B18]">{item.title}</h3>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      background: "rgba(212,101,75,0.08)",
                      border: "1px solid rgba(212,101,75,0.15)",
                      color: "#D4654B",
                    }}
                  >
                    {item.mode}
                  </span>
                </div>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/generate" className="btn-terra">
              Создать дизайн
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
            Ваша комната —{" "}
            <span className="text-terra-400">в новом стиле.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Современный" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Сканди" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Минимализм" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Столовая", subtitle: "Лофт" },
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
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">04</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Дизайнер: 150 000₽.{" "}
            <span className="text-terra-500">AI: 250₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Дизайнер */}
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">Дизайнер</div>
              <div className="space-y-5">
                {[
                  { item: "Визуализация", cost: "от 150 000₽" },
                  { item: "Количество стилей", cost: "1-2" },
                  { item: "Правки", cost: "3-5 дней" },
                  { item: "Стены / пол / кухня", cost: "за доплату" },
                  { item: "ИТОГО", cost: "от 150 000₽" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-[#1E1B18] font-medium">{row.cost}</span>
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
                  { item: "AI-визуализация", cost: "от 50₽/фото" },
                  { item: "Количество стилей", cost: "25 + свой" },
                  { item: "Правки", cost: "мгновенно" },
                  { item: "Стены / пол / кухня", cost: "включены" },
                  { item: "ИТОГО", cost: "от 250₽" },
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
              Экономия: от 149 750₽
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">05</span>
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

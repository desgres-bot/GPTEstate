import Link from "next/link";
import type { Metadata } from "next";
import { STYLES } from "@/lib/constants";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getBreadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Дизайн интерьера онлайн — AI-визуализация за 30 секунд",
  description:
    "Визуализируйте новый дизайн интерьера онлайн с помощью AI. 5 стилей: современный, скандинавский, лофт, классика, японский. Бесплатная проба.",
  keywords:
    "дизайн интерьера онлайн, визуализация интерьера, AI дизайн комнаты, редизайн квартиры, стили интерьера",
  alternates: { canonical: "https://fotoestate.ru/dizajn-interera-online" },
  openGraph: {
    title: "AI-дизайн интерьера онлайн — GPT Estate",
    description:
      "Загрузите фото комнаты — получите новый стиль за 30 секунд. 5 стилей на выбор.",
  },
};

const STYLE_DESCRIPTIONS: Record<string, string> = {
  modern: "Чистые линии, нейтральные тона, функциональная мебель",
  scandinavian: "Светлое дерево, белые стены, уют и минимализм",
  loft: "Кирпич, металл, открытое пространство, индустриальный шик",
  classic: "Элегантная мебель, тёплые тона, симметрия и роскошь",
  japanese: "Натуральные материалы, низкая мебель, гармония и покой",
};

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Дизайн интерьера онлайн", url: "https://fotoestate.ru/dizajn-interera-online" },
]);

export default function DizajnInteraOnline() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-визуализация интерьера
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Новый дизайн интерьера
              <br />
              <span className="text-terra-400">за 30 секунд</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Загрузите фото комнаты — AI покажет, как она будет выглядеть
              в другом стиле. 5 стилей на выбор, результат мгновенно.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-3.jpg"
              afterSrc="/demo/after-3.jpg"
              label="Редизайн интерьера"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "5", label: "стилей дизайна" },
              { value: "30 сек", label: "до результата" },
              { value: "15₽", label: "вместо 50 000₽ за дизайнера" },
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
            Дизайнер берёт 50 000₽ и 2 недели.
            <br />
            <span className="text-terra-500">Мы — 15₽ и 30 секунд.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Долго и дорого</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Дизайн-проект одной комнаты стоит от 50 000₽ и занимает
                    2-4 недели. Хотите попробовать 3 стиля? Умножайте на три.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Сложно представить результат</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Вы листаете Pinterest часами, но не можете понять, как стиль
                    будет смотреться именно в вашей комнате. Рендеры дизайнера
                    абстрактны и далеки от реальности.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Риск ошибки</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Заказали ремонт в стиле лофт, а получилось не то. Переделка
                    обойдётся ещё дороже. Лучше увидеть результат заранее.
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

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            5 стилей. Ваша комната.{" "}
            <span className="text-terra-500">30 секунд.</span>
          </h2>

          {/* Style chips */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-16">
            {STYLES.map((style) => (
              <div
                key={style.id}
                className="stagger-child rounded-xl border border-neutral-200 p-6 text-center"
              >
                <div className="text-3xl mb-3">{style.emoji}</div>
                <h3 className="text-base font-medium text-[#1E1B18] mb-2">{style.name}</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">
                  {STYLE_DESCRIPTIONS[style.id]}
                </p>
              </div>
            ))}
          </div>

          {/* 3-step process */}
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Сфотографируйте комнату", desc: "На телефон, при любом освещении. AI справится." },
              { step: "02", title: "Выберите стиль", desc: "Современный, скандинавский, лофт, классика или японский." },
              { step: "03", title: "Получите визуализацию", desc: "Фотореалистичный результат за 30 секунд. Скачайте и сравните." },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center p-8 rounded-xl bg-[#fbf9f5]">
                <div className="text-xs text-[#bfbfbf] uppercase tracking-widest mb-3">{item.step}</div>
                <h3 className="text-[20px] font-normal mb-2">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать AI-дизайн
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 ДО / ПОСЛЕ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Та же комната. <span className="text-terra-400">Другой стиль.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Редизайн спальни", subtitle: "Современный стиль" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Редизайн кухни", subtitle: "Скандинавский стиль" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Редизайн гостиной", subtitle: "Виртуальная мебель" },
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Обновление кухни", subtitle: "Из старого в новое" },
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
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">04</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Экономия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Дизайнер: 50 000₽. <span className="text-terra-500">GPT Estate: 15₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Дизайнер */}
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">Дизайнер интерьера</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "50 000 – 150 000₽" },
                  { item: "Срок", cost: "2-4 недели" },
                  { item: "Количество стилей", cost: "1" },
                  { item: "Правки", cost: "от 5 000₽" },
                  { item: "Повторный визит", cost: "от 10 000₽" },
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
                  { item: "Стоимость", cost: "от 15₽ за фото" },
                  { item: "Срок", cost: "30 секунд" },
                  { item: "Количество стилей", cost: "5" },
                  { item: "Правки", cost: "бесплатно" },
                  { item: "Повторная визуализация", cost: "15₽" },
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
              Экономия: от 49 985₽
            </p>
            <Link href="/generate" className="btn-terra">
              Начать экономить
            </Link>
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
    </>
  );
}

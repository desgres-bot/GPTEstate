import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Обработка фото недвижимости — AI за 30 секунд",
  description:
    "Профессиональная обработка фото недвижимости нейросетью: HDR, коррекция перспективы, замена неба, улучшение света. От 50₽ за фото вместо 5 000₽ за фотографа.",
  keywords:
    "обработка фото недвижимости, улучшить фото квартиры, ретушь фото интерьера, фото для объявления",
  alternates: { canonical: "https://fotoestate.ru/obrabotka-foto-nedvizhimosti" },
  openGraph: {
    title: "Обработка фото недвижимости — GPT Estate",
    description:
      "AI-обработка фото квартир и домов за 30 секунд. HDR, перспектива, небо, свет — всё в одном сервисе. От 50₽.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Чем AI-обработка отличается от фильтров в телефоне?",
    a: "Фильтры накладывают цветовой профиль поверх фото — результат выглядит искусственно. AI анализирует каждый пиксель: раздельно обрабатывает тени и свет, восстанавливает детали в тёмных углах, корректирует баланс белого. Результат — как от профессионального фотографа с HDR-оборудованием.",
  },
  {
    q: "Какое качество фото нужно для обработки?",
    a: "Любое. Снимайте на телефон при любом освещении. AI справится даже с тёмными и шумными фото. Для лучшего результата рекомендуем горизонтальную ориентацию и съёмку из угла комнаты.",
  },
  {
    q: "Подходит для коммерческой недвижимости?",
    a: "Да. AI обрабатывает офисы, торговые помещения, склады, рестораны. Те же инструменты: HDR, перспектива, свет, небо.",
  },
  {
    q: "Сколько фото можно обработать за раз?",
    a: "Нет ограничений. Обрабатывайте хоть 100 фото подряд. Каждое обрабатывается за 30 секунд — целый объект за 10 минут.",
  },
  {
    q: "Площадки принимают обработанные фото?",
    a: "Да. Авито, ЦИАН, ДомКлик, Яндекс.Недвижимость — все площадки принимают обработанные фото. AI-улучшение не добавляет несуществующих объектов, а раскрывает реальный потенциал квартиры.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Обработка фото недвижимости", url: "https://fotoestate.ru/obrabotka-foto-nedvizhimosti" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

export default function ObrabotkaFotoNedvizhimosti() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-обработка фото
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Обработка фото недвижимости
              <br />
              <span className="text-terra-400">нейросетью</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Профессиональная съёмка стоит от 5 000₽ за объект. AI обрабатывает
              фото с телефона до профессионального уровня за 30 секунд. HDR,
              коррекция перспективы, замена неба, улучшение света — в один клик.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Обработать фото — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Обработка фото"
              subtitle="AI за 30 секунд"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "5 000\u20BD", label: "стоит фотограф за 1 объект" },
              { value: "30 сек", label: "обработка одного фото AI" },
              { value: "x4", label: "больше просмотров с качественными фото" },
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
            Фото на телефон = потерянные покупатели.
            <br />
            <span className="text-terra-500">Качество фото решает всё.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">01</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Тёмные углы и жёлтый свет</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Камера телефона не справляется с освещением квартиры: углы
                    проваливаются в тень, лампы дают жёлтый оттенок, окна
                    пересвечены. Покупатель видит мрачную квартиру, хотя в
                    реальности она светлая и уютная.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">02</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Искажённая перспектива</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    Широкоугольный объектив телефона искажает пропорции комнат:
                    стены заваливаются, потолок кажется низким, комната —
                    маленькой. Покупатель не понимает реальный размер помещения.
                  </p>
                </div>
              </div>
            </div>

            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="flex items-start gap-6">
                <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">03</span>
                <div>
                  <h3 className="text-[20px] sm:text-[24px] font-normal">Фотограф = 5 000₽ за каждый объект</h3>
                  <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">
                    При потоке 10 квартир в месяц это 50 000₽ в год только на
                    фото. Плюс время на согласование, выезд и ожидание
                    обработки — 2-3 дня на объект.
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
            5 AI-инструментов обработки —{" "}
            <span className="text-terra-500">вместо фотографа</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                title: "HDR-улучшение",
                desc: "AI выравнивает свет как профессиональный HDR: тени осветляются, пересветы убираются, цвета становятся натуральными.",
                mode: "Enhance",
              },
              {
                title: "Коррекция перспективы",
                desc: "AI выпрямляет заваленные стены и линии. Комната выглядит ровно и просторно, как на снимках архитектурного фотографа.",
                mode: "Perspective",
              },
              {
                title: "Замена неба",
                desc: "Серое небо за окном или на фасаде? AI заменит на голубое, закатное или драматическое. 4 варианта неба.",
                mode: "Sky",
              },
              {
                title: "Улучшение освещения",
                desc: "AI добавляет естественный свет: комнаты становятся ярче и воздушнее, как при дневной съёмке с софтбоксами.",
                mode: "Lighting",
              },
              {
                title: "Увеличение разрешения",
                desc: "Маленькое фото? AI увеличит до 4K без потери качества. Идеально для площадок, требующих высокое разрешение.",
                mode: "Upscale",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl border border-neutral-200 p-8"
              >
                <h3 className="text-[20px] font-normal text-[#1E1B18] mb-3">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed mb-4">{item.desc}</p>
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
              Попробовать все режимы
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
            Телефонное фото →{" "}
            <span className="text-terra-400">профессиональный снимок</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "HDR + свет" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Перспектива + цвет" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Освещение" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Столовая", subtitle: "Полная обработка" },
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
            Фотограф: 5 000₽ за объект.{" "}
            <span className="text-terra-500">AI: 50₽ за фото.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Традиционный способ */}
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">
                Традиционный способ
              </div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "5 000₽/объект" },
                  { item: "Ретушь", cost: "2 000₽" },
                  { item: "Замена неба", cost: "1 000₽" },
                  { item: "Время", cost: "2-3 дня" },
                  { item: "ИТОГО", cost: "от 8 000₽" },
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
                  { item: "AI-обработка", cost: "от 50₽/фото" },
                  { item: "Все режимы", cost: "включены" },
                  { item: "Замена неба", cost: "включена" },
                  { item: "Время", cost: "30 секунд" },
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
              Экономия: от 7 750₽ на объекте
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

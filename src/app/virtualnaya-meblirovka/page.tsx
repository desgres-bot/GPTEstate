import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Виртуальная меблировка — мебель в пустую комнату AI",
  description:
    "Виртуальная меблировка квартиры за 30 секунд. AI расставит мебель в пустой комнате: 25 стилей, фотореалистичные тени и перспектива. От 50₽ вместо 75 000₽ за реальную мебель. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "виртуальная меблировка, мебель в пустую комнату, мебель на фото, виртуальная расстановка мебели",
  alternates: { canonical: "https://fotoestate.ru/virtualnaya-meblirovka" },
  openGraph: {
    title: "Виртуальная меблировка — GPT Estate",
    description:
      "AI расставит мебель в пустой комнате за 30 секунд. 25 стилей, от 50₽ за фото.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Чем виртуальная меблировка отличается от 3D-визуализации?",
    a: "3D-визуализация требует 3D-модели комнаты, занимает дни и стоит от 5 000\u20BD за рендер. Виртуальная меблировка AI работает с обычным фото: загрузите снимок с телефона \u2014 и через 30 секунд получите обставленную комнату с фотореалистичной мебелью, тенями и правильным освещением.",
  },
  {
    q: "Можно расставить мебель по своему вкусу?",
    a: "Да. Опишите текстом что хотите: \u00ABсерый угловой диван слева, стеклянный журнальный столик по центру, высокий книжный шкаф у стены\u00BB. AI расставит мебель по вашему описанию. Также доступен режим Furnish для замены конкретных предметов.",
  },
  {
    q: "Подходит для новостроек?",
    a: "Идеально. Застройщики используют виртуальную меблировку для продажи квартир с чистовой отделкой. AI покажет покупателю как будет выглядеть квартира после заселения \u2014 с мебелью в его стиле.",
  },
  {
    q: "Покупатель узнает что мебель виртуальная?",
    a: "AI создаёт фотореалистичную мебель с правильными тенями и перспективой \u2014 отличить от реальной практически невозможно. Рекомендуем указать в описании объявления, что фото содержат виртуальную меблировку \u2014 это честно и повышает доверие.",
  },
  {
    q: "Сколько комнат можно обставить?",
    a: "Без ограничений. Обставьте все комнаты квартиры: гостиную, спальни, кухню, детскую, кабинет. Каждая обработка \u2014 30 секунд и от 50\u20BD. Целая квартира \u2014 за 10 минут.",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Виртуальная меблировка", url: "https://fotoestate.ru/virtualnaya-meblirovka" },
]);

const faqData = getFAQSchema(FAQ_ITEMS);

const breadcrumbJson = JSON.stringify(breadcrumbData);
const faqJson = JSON.stringify(faqData);

export default function VirtualnayaMeblirovka() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-меблировка для недвижимости
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Виртуальная меблировка
              <br />
              <span className="text-terra-400">за 30 секунд</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Пустая квартира не продаётся — покупатели не видят потенциал.
              AI расставит мебель в любом стиле за 30 секунд.
              Фотореалистичная мебель с тенями, правильной перспективой и освещением.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Расставить мебель — бесплатно
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-2.jpg"
              afterSrc="/demo/after-2.jpg"
              label="Виртуальная меблировка"
              subtitle="AI за 30 секунд"
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "25+", label: "стилей мебели" },
              { value: "30 сек", label: "от загрузки до результата" },
              { value: "50\u20BD", label: "вместо 75 000\u20BD за реальную мебель" },
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
            Пустые комнаты убивают продажи.{" "}
            <span className="text-terra-500">Покупатель уходит за 3 секунды.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            {[
              {
                num: "01",
                title: "Пустая комната кажется маленькой",
                desc: "Без мебели покупатель не понимает масштаб: 20-метровая гостиная выглядит как 12-метровая. Он не знает куда поставить диван и поместится ли шкаф. Результат \u2014 звонков нет, объявление висит месяцами.",
              },
              {
                num: "02",
                title: "Нет эмоциональной связи",
                desc: "Покупатель принимает решение эмоционально: он покупает не метры, а образ жизни. Уютная гостиная с диваном и книжными полками продаёт мечту. Голые стены \u2014 нет.",
              },
              {
                num: "03",
                title: "Реальная меблировка неподъёмна",
                desc: "Аренда мебели: 50 000\u201D100 000\u20BD. Доставка и сборка: 10 000\u20BD. Аренда в месяц: 15 000\u20BD. И это один стиль на весь срок продажи. Виртуальная меблировка стоит 50\u20BD и позволяет менять стили мгновенно.",
              },
            ].map((item) => (
              <div key={item.num} className="stagger-child border-b border-white/[0.08] py-10 lg:py-12">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-neutral-600 hidden sm:block">{item.num}</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">{item.title}</h3>
                    <p className="mt-3 text-neutral-400 leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
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
            4 способа добавить мебель \u2014{" "}
            <span className="text-terra-500">без реальной мебели</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Полная меблировка",
                desc: "AI полностью обставит пустую комнату: диван, стол, стулья, шкафы, декор, текстиль. 25 стилей от минимализма до барокко. Или опишите стиль текстом.",
                mode: "Staging",
              },
              {
                title: "Замена мебели",
                desc: "Не нравится старый диван? AI заменит на новый. Опишите что заменить: \u00ABзаменить старый диван на современный серый угловой\u00BB \u2014 AI сделает.",
                mode: "Furnish",
              },
              {
                title: "Добавить один предмет",
                desc: "Нужен только камин у стены или растение в углу? AI добавит конкретный предмет в нужное место, не трогая остальное.",
                mode: "Additem",
              },
              {
                title: "Коммерческая меблировка",
                desc: "Офис, ресторан, кафе, магазин, отель, коворкинг \u2014 AI расставит профильную мебель. 8 типов коммерческих помещений.",
                mode: "Commercial",
              },
            ].map((item) => (
              <div key={item.title} className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-[20px] sm:text-[24px] font-normal">{item.title}</h3>
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
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Расставить мебель
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
            Пустая комната &rarr;{" "}
            <span className="text-terra-400">обставленный интерьер.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня", subtitle: "Современный стиль" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Скандинавский стиль" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Минимализм" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Столовая", subtitle: "Классика" },
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

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Реальная мебель: 75 000\u20BD.{" "}
            <span className="text-terra-500">Виртуальная: 50\u20BD.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Реальная меблировка */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Реальная меблировка
              </div>
              <div className="space-y-5">
                {[
                  { item: "Аренда мебели", cost: "от 50 000\u20BD" },
                  { item: "Доставка и сборка", cost: "от 10 000\u20BD" },
                  { item: "Аренда в месяц", cost: "от 15 000\u20BD/мес" },
                  { item: "Стили", cost: "1" },
                  { item: "Замена стиля", cost: "от 50 000\u20BD" },
                  { item: "Итого", cost: "от 75 000\u20BD" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Виртуальная меблировка */}
            <div
              className="rounded-xl p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)",
                border: "1px solid rgba(212,101,75,0.25)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">
                Виртуальная меблировка
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50\u20BD/фото" },
                  { item: "Доставка", cost: "не нужна" },
                  { item: "Ежемесячная плата", cost: "не нужна" },
                  { item: "Стили", cost: "25 + свой" },
                  { item: "Замена стиля", cost: "50\u20BD и 30 сек" },
                  { item: "Итого", cost: "от 250\u20BD" },
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
              Экономия: от 74 750\u20BD на объекте
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
            title="Не только меблировка — ещё"
            subtitle="37 AI-сервисов"
            exclude={["staging"]}
          />
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />

      {/* JSON-LD: pre-serialized static data from our own codebase */}
      <script type="application/ld+json" suppressHydrationWarning>{breadcrumbJson}</script>
      <script type="application/ld+json" suppressHydrationWarning>{faqJson}</script>
    </>
  );
}

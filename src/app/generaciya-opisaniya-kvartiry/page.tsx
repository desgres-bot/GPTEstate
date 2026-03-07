import Link from "next/link";
import type { Metadata } from "next";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI-генерация описания квартиры для Авито и ЦИАН — GPT Estate",
  description:
    "Загрузите фото квартиры — AI напишет продающее описание для Авито, ЦИАН или ДомКлик за 30 секунд. Три стиля текста: деловой, тёплый, продающий. 2 фото бесплатно.",
  keywords:
    "описание квартиры для авито, текст объявления авито, ai генерация описания, описание для циан, продающий текст недвижимость",
  alternates: { canonical: "https://fotoestate.ru/generaciya-opisaniya-kvartiry" },
  openGraph: {
    title: "AI-генерация описания квартиры — GPT Estate",
    description:
      "Фото → продающее описание за 30 секунд. Для Авито, ЦИАН и ДомКлик.",
  },
};

// Static data from our own codebase, safe to serialize as JSON-LD
const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Генерация описания квартиры", url: "https://fotoestate.ru/generaciya-opisaniya-kvartiry" },
]);

const FAQ_ITEMS = [
  {
    q: "Как AI генерирует описание по фото?",
    a: "GPT-4 Vision анализирует фото: определяет тип комнаты, отделку, мебель, освещение и особенности. На основе анализа создаёт продающее описание с учётом площадки и выбранного стиля.",
  },
  {
    q: "Для каких площадок подходит описание?",
    a: "Описания оптимизированы по длине и формату для Авито, ЦИАН и ДомКлик. Каждая площадка имеет свои требования к длине — AI учитывает это.",
  },
  {
    q: "Можно ли редактировать сгенерированное описание?",
    a: "Да, описание копируется в буфер обмена одним кликом. Вы можете отредактировать текст перед публикацией — добавить цену, этаж, адрес и другие детали.",
  },
  {
    q: "Какие стили текста доступны?",
    a: "Три стиля: деловой (сдержанный профессиональный тон), тёплый (уютное эмоциональное описание) и продающий (акцент на выгодах, call-to-action, создание срочности).",
  },
  {
    q: "Сколько фото нужно для хорошего описания?",
    a: "Достаточно одного фото — AI опишет видимую комнату. Для полного описания квартиры загрузите фото каждой комнаты и объедините описания.",
  },
];

// Static FAQ data, safe to serialize
const faqSchemaData = getFAQSchema(FAQ_ITEMS);
const breadcrumbJson = JSON.stringify(breadcrumbData);
const faqSchemaJson = JSON.stringify(faqSchemaData);

export default function GeneraciyaOpisaniyaKvartiry() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-генерация описаний
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фото &rarr; готовое
              <br />
              <span className="text-terra-400">описание за 30 сек</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Загрузите фото квартиры — AI напишет продающий текст
              для Авито, ЦИАН или ДомКлик. Три стиля на выбор.
            </p>
            <Link href="/generate?mode=describe" className="btn-terra mt-8 inline-flex">
              Написать описание бесплатно — 2 фото
            </Link>
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "30 сек", label: "до готового текста" },
              { value: "3", label: "стиля на выбор" },
              { value: "50₽", label: "вместо 500₽ за копирайтера" },
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
            Хорошие фото —{" "}
            <span className="text-terra-500">скучное описание.</span>
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            {[
              {
                num: "01",
                title: "Описания пишутся по шаблону",
                desc: "«Квартира в хорошем состоянии, рядом метро» — такое описание не выделяет ваше объявление из тысяч похожих.",
              },
              {
                num: "02",
                title: "На копирайтера нет бюджета",
                desc: "Профессиональный текст для объявления стоит 500-1500₽. При 10 объектах в месяц — это серьёзная статья расходов.",
              },
              {
                num: "03",
                title: "Нет времени писать",
                desc: "У риелтора 10-20 объектов. Писать уникальное описание для каждого — час работы. AI делает это за 30 секунд.",
              },
            ].map((item) => (
              <div key={item.num} className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">{item.num}</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">{item.title}</h3>
                    <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 КАК ЭТО РАБОТАЕТ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Как работает
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Три шага к{" "}
            <span className="text-terra-500">идеальному описанию</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Загрузите фото",
                desc: "Перетащите фото квартиры. AI распознаёт комнату, мебель, отделку и освещение.",
              },
              {
                step: "02",
                title: "Выберите стиль",
                desc: "Деловой для элитных объектов, тёплый для семейных квартир, продающий для быстрой сделки.",
              },
              {
                step: "03",
                title: "Скопируйте текст",
                desc: "Готовое описание одним кликом копируется в буфер. Вставьте в Авито, ЦИАН или ДомКлик.",
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child rounded-xl border border-neutral-200 p-8">
                <span className="heading-display text-[36px] text-terra-400/30">{item.step}</span>
                <h3 className="text-[20px] font-normal text-[#1E1B18] mt-4 mb-3">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate?mode=describe" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 СТИЛИ ТЕКСТА ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Стили
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Три стиля —{" "}
            <span className="text-terra-400">одно фото</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "💼",
                title: "Деловой",
                desc: "Сдержанный профессиональный тон. Идеален для элитной недвижимости и бизнес-аудитории.",
                example: "«Просторная квартира с панорамным остеклением...»",
              },
              {
                emoji: "🏡",
                title: "Тёплый",
                desc: "Уютное описание с эмоциональной окраской. Подходит для семейных квартир и домов.",
                example: "«Здесь утреннее солнце заливает кухню...»",
              },
              {
                emoji: "🔥",
                title: "Продающий",
                desc: "Акцент на выгодах, срочность, call-to-action. Максимально конвертирующий текст.",
                example: "«Такие квартиры не задерживаются на рынке...»",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl border border-white/10 bg-white/[0.04] p-8"
              >
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="text-[20px] font-normal text-white mt-4 mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-sm text-terra-400 italic">{item.example}</p>
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
            Копирайтер: 500₽. <span className="text-terra-500">AI: 50₽.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">Копирайтер</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "500 – 1 500₽" },
                  { item: "Ожидание", cost: "1-2 дня" },
                  { item: "Правки", cost: "ещё 500₽" },
                  { item: "Знание площадки", cost: "не всегда" },
                  { item: "Скорость", cost: "1-2 часа" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-[#1E1B18] font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

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
                  { item: "Стоимость", cost: "от 50₽" },
                  { item: "Ожидание", cost: "30 секунд" },
                  { item: "Правки", cost: "бесплатно — перегенерируйте" },
                  { item: "Знание площадки", cost: "Авито, ЦИАН, ДомКлик" },
                  { item: "Скорость", cost: "мгновенно" },
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
            <Link href="/generate?mode=describe" className="btn-terra">
              Написать описание
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">05</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              FAQ
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Частые вопросы
          </h2>

          <div className="mx-auto max-w-3xl space-y-0">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="faq-item stagger-child group border-b border-neutral-200 py-6">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-normal text-[#1E1B18] hover:text-terra-500 transition-colors">
                  {item.q}
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-[#6B6560] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner />

      {/* JSON-LD: static data from our own codebase, safe to serialize */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
    </>
  );
}

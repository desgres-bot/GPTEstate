import Link from "next/link";
import type { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";

export const metadata: Metadata = {
  title: "GPT Estate vs фотограф недвижимости — сравнение 2025",
  description:
    "Сравнение AI-обработки фото GPT Estate и услуг профессионального фотографа. Цена, скорость, качество — что выгоднее для риелтора.",
  keywords:
    "фотограф недвижимости, фото квартиры, AI обработка фото, GPT Estate, виртуальный стейджинг vs фотограф",
  alternates: { canonical: "https://fotoestate.ru/gptestate-vs-fotograf" },
  openGraph: {
    title: "GPT Estate vs Фотограф — что выгоднее?",
    description:
      "AI обрабатывает фото за 30 секунд и 50₽. Фотограф — за 3 дня и 5000₽. Полное сравнение.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Может ли AI заменить фотографа полностью?",
    a: "Для 90% объявлений — да. AI убирает бардак, добавляет мебель и улучшает освещение на фото с телефона. Профессиональный фотограф нужен для элитной недвижимости и коммерческих каталогов.",
  },
  {
    q: "Какое качество AI-обработки по сравнению с фотографом?",
    a: "AI даёт результат на уровне профессиональной постобработки. Фотореалистичная мебель, правильные тени и перспектива. Разницу заметит только специалист.",
  },
  {
    q: "Сколько стоит AI-обработка?",
    a: "От 50₽ за фото. Первые 2 фото — бесплатно. Для сравнения: фотограф берёт от 3000₽ за выезд + 1000-2000₽ за обработку.",
  },
  {
    q: "А если квартира совсем в плохом состоянии?",
    a: "Тем более AI. Режим 'Уборка' уберёт бардак, 'Виртуальный ремонт' покрасит стены и поменяет пол, 'Мебель' обставит пустую комнату. Фотограф покажет как есть.",
  },
];

export default function VsPhotographer() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Сравнение
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фотограф: 5 000₽.
              <br />
              <span className="text-terra-400">AI: 50₽.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Профессиональные фото для объявлений без выезда фотографа,
              без ожидания и без переплат.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "333x", label: "дешевле фотографа" },
              { value: "30 сек", label: "вместо 3 дней" },
              { value: "10", label: "режимов обработки" },
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

      {/* ===== 01 СРАВНЕНИЕ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Сравнение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Полное сравнение{" "}
            <span className="text-terra-500">по 7 критериям</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">
                Фотограф
              </div>
              <div className="space-y-5">
                {[
                  { item: "Выезд", cost: "от 3 000₽" },
                  { item: "Обработка", cost: "1 000-2 000₽" },
                  { item: "Срок", cost: "1-3 дня" },
                  { item: "Виртуальная мебель", cost: "Нет" },
                  { item: "Уборка на фото", cost: "Нет" },
                  { item: "Виртуальный ремонт", cost: "Нет" },
                  { item: "Текст объявления", cost: "Нет" },
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
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">
                GPT Estate
              </div>
              <div className="space-y-5">
                {[
                  { item: "Выезд", cost: "Не нужен" },
                  { item: "Обработка", cost: "от 50₽" },
                  { item: "Срок", cost: "30 секунд" },
                  { item: "Виртуальная мебель", cost: "25 стилей" },
                  { item: "Уборка на фото", cost: "Да, AI" },
                  { item: "Виртуальный ремонт", cost: "8 вариантов" },
                  { item: "Текст объявления", cost: "Да, AI" },
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
              Экономия: от 4 985₽ за объект
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 КОГДА НУЖЕН ФОТОГРАФ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Честно
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Когда фотограф всё-таки{" "}
            <span className="text-terra-500">нужен</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="stagger-child rounded-xl border border-neutral-200 p-8">
              <h3 className="text-[20px] font-normal mb-4">AI лучше, когда:</h3>
              <ul className="space-y-3 text-[#6B6560] leading-relaxed">
                <li>— Нужно быстро выложить объявление</li>
                <li>— Бюджет ограничен</li>
                <li>— Квартира не убрана или пустая</li>
                <li>— Нужно показать разные стили мебели</li>
                <li>— Много объектов (10+ в месяц)</li>
                <li>— Нужен текст объявления</li>
              </ul>
            </div>

            <div className="stagger-child rounded-xl border border-neutral-200 p-8">
              <h3 className="text-[20px] font-normal mb-4">Фотограф лучше, когда:</h3>
              <ul className="space-y-3 text-[#6B6560] leading-relaxed">
                <li>— Элитная недвижимость (от 30 млн₽)</li>
                <li>— Нужна аэросъёмка дроном</li>
                <li>— Коммерческий каталог застройщика</li>
                <li>— Нужны фото экстерьера с разных ракурсов</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 FAQ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">03</span>
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
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-[#7D756E]">+</span>
                  </summary>
                  <p className="pb-6 text-[#6B6560] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <CTASplitBanner />
    </>
  );
}

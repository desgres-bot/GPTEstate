import Link from "next/link";
import type { Metadata } from "next";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "Виртуальный стейджинг vs реальный — сравнение стоимости 2025",
  description:
    "Что выгоднее: виртуальный или реальный стейджинг квартиры? Сравнение цены, сроков и результата. Виртуальный — от 50₽, реальный — от 50 000₽. 38 AI-сервисов — фото, которые продают дома и квартиры",
  keywords:
    "виртуальный стейджинг, реальный стейджинг, стейджинг квартиры сравнение, виртуальная меблировка, home staging",
  alternates: { canonical: "https://fotoestate.ru/virtualnyj-vs-realnyj-stejdzhing" },
  openGraph: {
    title: "Виртуальный vs Реальный стейджинг — полное сравнение",
    description:
      "Виртуальный стейджинг в 3000 раз дешевле реального. Подробное сравнение по 8 параметрам.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Виртуальный стейджинг — это обман покупателя?",
    a: "Нет. Это стандартная маркетинговая практика по всему миру. Главное — указать в объявлении, что мебель виртуальная.",
  },
  {
    q: "Какой стейджинг лучше продаёт?",
    a: "По статистике, оба варианта одинаково эффективны. 73% квартир с любым стейджингом продаются быстрее.",
  },
  {
    q: "Можно ли комбинировать оба подхода?",
    a: "Да. Можно поставить ключевую мебель реально, а остальное добавить виртуально.",
  },
  {
    q: "Как быстро готовится виртуальный стейджинг?",
    a: "30 секунд. Загрузите фото, выберите стиль из 25 вариантов и получите результат.",
  },
  {
    q: "Покупатель увидит, что мебель виртуальная?",
    a: "Нет. AI создаёт фотореалистичную мебель с правильными тенями, перспективой и освещением.",
  },
];

export default function VirtualVsRealStaging() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Сравнение стейджинга
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              50 000₽ за мебель?
              <br />
              <span className="text-terra-400">Или 50₽ за AI.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Виртуальный стейджинг даёт тот же результат продаж,
              что и реальная мебель — но в 3000 раз дешевле.
            </p>
            <Link href="/generate?mode=staging" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото
            </Link>
          </div>

          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-2.jpg"
              afterSrc="/demo/after-2.jpg"
              label="Виртуальный стейджинг"
              subtitle="Пустая комната → обставленная за 30 секунд"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "3000x", label: "дешевле реального" },
              { value: "73%", label: "быстрее продажа" },
              { value: "25", label: "стилей мебели" },
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
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Сравнение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            8 параметров.{" "}
            <span className="text-terra-500">Честное сравнение.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Реальный стейджинг
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50 000₽" },
                  { item: "Доставка мебели", cost: "от 10 000₽" },
                  { item: "Уборка после", cost: "от 3 000₽" },
                  { item: "Срок подготовки", cost: "3-7 дней" },
                  { item: "Стили", cost: "1 (купленный)" },
                  { item: "Изменить стиль", cost: "Купить заново" },
                  { item: "Количество объектов", cost: "1 за раз" },
                  { item: "Эффект на продажи", cost: "+73% скорость" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
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
                Виртуальный стейджинг
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50₽" },
                  { item: "Доставка мебели", cost: "Не нужна" },
                  { item: "Уборка после", cost: "Не нужна" },
                  { item: "Срок подготовки", cost: "30 секунд" },
                  { item: "Стили", cost: "25 на выбор" },
                  { item: "Изменить стиль", cost: "1 клик, бесплатно" },
                  { item: "Количество объектов", cost: "Неограниченно" },
                  { item: "Эффект на продажи", cost: "+73% скорость" },
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
              Тот же результат. В 3000 раз дешевле.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ПРИМЕРЫ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Примеры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Пустая.{" "}
            <span className="text-terra-400">Обставленная.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная", subtitle: "Современный стиль" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня", subtitle: "Скандинавский стиль" },
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

      {/* ===== 03 ПЛЮСЫ И МИНУСЫ ===== */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Объективно
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Плюсы и минусы{" "}
            <span className="text-terra-500">каждого подхода</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="stagger-child rounded-xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-[20px] font-normal mb-2">Реальный стейджинг</h3>
              <p className="text-sm text-green-600 mb-4">Плюсы:</p>
              <ul className="space-y-2 text-neutral-400 mb-6">
                <li>+ Покупатель видит мебель вживую</li>
                <li>+ Тактильные ощущения при показе</li>
                <li>+ Подходит для элитных объектов</li>
              </ul>
              <p className="text-sm text-red-500 mb-4">Минусы:</p>
              <ul className="space-y-2 text-neutral-400">
                <li>- Дорого: от 50 000₽</li>
                <li>- Долго: 3-7 дней на подготовку</li>
                <li>- Один стиль — нельзя поменять</li>
                <li>- Нужна логистика и уборка</li>
              </ul>
            </div>

            <div className="stagger-child rounded-xl border border-terra-200 p-8" style={{ background: "rgba(212,101,75,0.03)" }}>
              <h3 className="text-[20px] font-normal mb-2">Виртуальный стейджинг</h3>
              <p className="text-sm text-green-600 mb-4">Плюсы:</p>
              <ul className="space-y-2 text-neutral-400 mb-6">
                <li>+ Дёшево: от 50₽</li>
                <li>+ Быстро: 30 секунд</li>
                <li>+ 25 стилей — меняйте одним кликом</li>
                <li>+ Неограниченное количество объектов</li>
                <li>+ Не нужна логистика</li>
              </ul>
              <p className="text-sm text-red-500 mb-4">Минусы:</p>
              <ul className="space-y-2 text-neutral-400">
                <li>- Мебель только на фото</li>
                <li>- Нужно указать в объявлении</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 FAQ ===== */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.04) 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">04</span>
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
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">+</span>
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
            title="Не только стейджинг — ещё"
            subtitle="37 AI-сервисов"
            exclude={["staging"]}
          />
        </div>
      </FadeInSection>

      <CTASplitBanner fomo="38 AI-сервисов для недвижимости. Присоединяйтесь к 2 870 риелторам, которые уже экономят время и деньги" />
    </>
  );
}

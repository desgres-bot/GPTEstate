import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import LiveCounter from "@/components/LiveCounter";
import LossCalculator from "@/components/LossCalculator";
import AllModesGrid from "@/components/AllModesGrid";
import { getFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "GPT Estate — Фото, которые продают дома и квартиры. 38 AI-сервисов",
  description:
    "Фото, которые продают дома и квартиры. 38 AI-инструментов: улучшение фото, виртуальный стейджинг, ремонт, описания, аналитика. Результат за 30 секунд. 2 фото бесплатно.",
  alternates: { canonical: "https://fotoestate.ru" },
};

const FAQ_ITEMS = [
  {
    q: "Покупатель заметит, что фото обработано?",
    a: "Нет. Наш сервис убирает бардак и улучшает свет — фото выглядит как после настоящей уборки. Планировка, мебель, окна — всё остаётся на месте. Это не фотошоп, а цифровая уборка.",
  },
  {
    q: "Сколько стоит обработка?",
    a: "От 15 рублей за фото. Первые 2 — бесплатно, без регистрации. Дешевле чашки кофе, а объявление работает на порядок лучше.",
  },
  {
    q: "Что входит в 38 AI-сервисов?",
    a: "Уборка, виртуальная мебель, новый стиль интерьера, удаление объектов, ремонт стен и полов, кухня, ванная, экстерьер, ландшафт, закат, небо, освещение, HD-качество, AI-описания для Авито, оценка фото, планировка и многое другое.",
  },
  {
    q: "Какие фото подходят?",
    a: "Любые фото с телефона. Наш сервис справляется даже с тёмными и кривыми снимками. Но чем лучше ракурс — тем эффектнее результат.",
  },
  {
    q: "Как быстро получу результат?",
    a: "30 секунд. Загрузили фото — получили результат. Быстрее, чем написать сообщение хозяину с просьбой убраться.",
  },
  {
    q: "Можно обработать много фото сразу?",
    a: "Да, режим «Batch» позволяет загрузить до 20 фото одновременно. Все обработаются в одном стиле за минуту.",
  },
  {
    q: "Можно выкладывать на Авито и ЦИАН?",
    a: "Да. Никаких ограничений — публикуйте на любых площадках. Фото полностью ваше.",
  },
  {
    q: "Это законно? Не введёт ли покупателя в заблуждение?",
    a: "Мы улучшаем фото, а не меняем квартиру. Планировка, окна, размер комнат — всё остаётся реальным. Это как сделать уборку перед показом, только быстрее.",
  },
  {
    q: "Что такое AI Chat Editor?",
    a: "Это режим диалога с AI: вы загружаете результат и просите «убери вазу слева», «добавь ковёр», «сделай стены светлее». Сервис вносит точечные правки без повторной генерации.",
  },
  {
    q: "Почему это дешевле фотографа?",
    a: "Фотограф тратит время на выезд, съёмку, обработку. Наш сервис делает всё это за 30 секунд автоматически. Поэтому 50₽ вместо 5 000₽.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═════════════════════════════════════════════════════════
          ГЕРОЙ — тёмная секция с H1, BeforeAfter, LiveCounter
          ═════════════════════════════════════════════════════════ */}
      <section className="text-white" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Для риелторов, агентств и собственников недвижимости
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фото, которые продают
              <br />
              <span className="text-terra-400">дома и квартиры</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              38 AI-сервисов: уборка, мебель, стиль, тексты, аналитика — всё для продающего объявления.
              <br className="hidden sm:block" />
              Результат за 30 секунд. Первые 2 фото бесплатно.
            </p>
            <Link href="/generate" className="btn-terra-glow mt-8 inline-flex">
              Попробовать бесплатно — 2 фото без регистрации
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/hero-before.jpg"
              afterSrc="/demo/hero-after.jpg"
              label="До / После"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>

          {/* LiveCounter stats */}
          <div className="mt-12 lg:mt-16 grid grid-cols-3 gap-4 text-center">
            {[
              { end: 47832, suffix: "", label: "фото за месяц" },
              { end: 38, suffix: "", label: "AI-сервисов" },
              { end: 30, suffix: " сек", label: "до результата" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="heading-display text-[36px] sm:text-[48px] lg:text-[64px] text-terra-400">
                  <LiveCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 6 быстрых карточек популярных сервисов */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 pb-8">
            {[
              { icon: "✨", problem: "Бардак в квартире?", solution: "Уберём за 30 секунд", href: "/generate?mode=enhance" },
              { icon: "🛋️", problem: "Пустые комнаты?", solution: "Расставим мебель виртуально", href: "/generate?mode=staging" },
              { icon: "🎨", problem: "Старый ремонт?", solution: "Покажем новый стиль", href: "/generate?mode=redesign" },
              { icon: "🧹", problem: "Лишние вещи?", solution: "Удалим без следа", href: "/generate?mode=remove" },
              { icon: "📝", problem: "Нет описания?", solution: "AI напишет текст для Авито", href: "/generate?mode=describe" },
              { icon: "🔨", problem: "Нужен ремонт?", solution: "Покажем стены и полы", href: "/generate?mode=renovation" },
            ].map((item) => (
              <Link
                key={item.problem}
                href={item.href}
                className="group rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(212,101,75,0.06) 50%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-2 text-sm font-medium text-terra-400">{item.problem}</h3>
                <p className="mt-1 text-base text-white">{item.solution}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Социальное доказательство */}
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terra-400"></span>
              </span>
              <span className="text-sm text-neutral-400">
                2 480 риелторов — <span className="text-terra-400">127 подключились на этой неделе</span>
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Публикуйте на</span>
              <div className="flex gap-2">
                {["Авито", "ЦИАН", "Домклик", "Яндекс"].map((p) => (
                  <span key={p} className="rounded-full px-3 py-1 text-xs text-neutral-300" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          01 КАТАЛОГ — Все 38 AI-сервисов
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Каталог</span>
          </div>

          <AllModesGrid
            title="Все 38 AI-сервисов"
            subtitle="для недвижимости"
          />

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          02 БОЛЬ — Проблемы + LossCalculator
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #1E1B18 0%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Проблема</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            Вы теряете деньги. Каждый день.
          </h2>

          <div className="mt-16 lg:mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Левая колонка — 3 боли */}
            <div className="space-y-0">
              {[
                {
                  num: "01",
                  title: "Хозяин не убрался. Опять.",
                  desc: "Вы приехали через весь город, а в квартире гора посуды. Снимать стыдно. Не снимать — потерять время.",
                },
                {
                  num: "02",
                  title: "Покупатель ушёл к конкуренту",
                  desc: "На Авито у объявления 3 секунды. Покупатель видит бардак — листает дальше. А у конкурента — продающее фото.",
                },
                {
                  num: "03",
                  title: "Каждый день простоя = потерянная комиссия",
                  desc: "Объект висит неделями. Хозяин нервничает, вы теряете деньги. А всё потому, что первое впечатление — это фото.",
                },
              ].map((pain) => (
                <div key={pain.num} className="stagger-child border-b border-white/10 py-8 lg:py-10">
                  <div className="flex items-start gap-5">
                    <span className="heading-display text-[20px] text-neutral-600 hidden sm:block">{pain.num}</span>
                    <div>
                      <h3 className="text-[20px] sm:text-[24px] font-normal text-white">{pain.title}</h3>
                      <p className="mt-3 text-neutral-400 leading-relaxed max-w-md">{pain.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* FOMO */}
              <div className="pt-8">
                <div className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "rgba(212,101,75,0.1)", border: "1px solid rgba(212,101,75,0.25)" }}>
                  <p className="text-white text-base font-medium">
                    Пока вы читаете это — ваши конкуренты уже загрузили 3 фото
                  </p>
                  <Link href="/generate" className="btn-terra whitespace-nowrap">
                    Не отставать
                  </Link>
                </div>
              </div>
            </div>

            {/* Правая колонка — LossCalculator */}
            <div className="self-start lg:sticky lg:top-28">
              <LossCalculator />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          03 РЕЗУЛЬТАТ — 6 BeforeAfterToggle
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1E1B18 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Результат</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-lg">
              Та же квартира. Другие деньги.
            </h2>
            <p className="text-neutral-400 max-w-sm text-base">
              Нажмите на фото — увидите, как было. И представьте это в вашем объявлении.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Уборка", subtitle: "Бардак исчезает за 30 секунд", mode: "enhance" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Мебель", subtitle: "Пустая комната стала жилой", mode: "staging" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Новый стиль", subtitle: "Из советского — в современный", mode: "redesign" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Удаление", subtitle: "Лишнее исчезло без следа", mode: "remove" },
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Ремонт", subtitle: "Новые стены и полы", mode: "renovation" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Закат", subtitle: "День превращается в вечер", mode: "dusk" },
            ].map((item) => (
              <div key={item.label} className="stagger-child">
                <BeforeAfterToggle
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  label={item.label}
                  subtitle={item.subtitle}
                />
                <Link
                  href={`/generate?mode=${item.mode}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-terra-400 hover:text-terra-300 transition-colors"
                >
                  Попробовать <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Конверсионный баннер */}
          <div className="mt-16 rounded-xl bg-terra-500 p-8 sm:p-10 text-center text-white">
            <p className="text-xl sm:text-2xl font-medium">Первые 2 фото — бесплатно. Без регистрации. Без карты.</p>
            <Link href="/generate" className="btn-white mt-6 inline-flex">
              Попробовать сейчас
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          04 ПРОЦЕСС — 3 шага + дополнительные возможности
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at bottom right, rgba(212,101,75,0.04) 0%, #1E1B18 40%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Процесс</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Быстрее, чем <span className="text-terra-400">написать хозяину</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Сфотографируйте",
                desc: "На телефон. Даже с плохим светом.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Выберите из 38 сервисов",
                desc: "Уборка, мебель, ремонт, текст, аналитика — всё в одном месте.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Скачайте за 30 секунд",
                desc: "Публикуйте на Авито, ЦИАН, Домклик.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center p-8 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-terra-400 mb-6" style={{ background: "rgba(212,101,75,0.12)" }}>
                  {item.icon}
                </div>
                <div className="text-xs text-neutral-600 uppercase tracking-widest mb-3">{item.step}</div>
                <h3 className="text-[20px] font-normal text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Дополнительные возможности: Batch, Tour, AI Chat */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📦",
                title: "Batch-обработка",
                desc: "До 20 фото за раз. Один стиль, одна минута.",
                href: "/batch",
                tag: "NEW",
              },
              {
                icon: "🏠",
                title: "Тур 360°",
                desc: "Виртуальный обход из панорамных фото.",
                href: "/tour",
                tag: "NEW",
              },
              {
                icon: "💬",
                title: "AI Chat Editor",
                desc: "Диалог с AI: «убери вазу», «добавь ковёр».",
                href: "/generate",
                tag: "NEW",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terra-400/30"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: "rgba(212,101,75,0.15)", color: "#e07460" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Загрузить первое фото бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          05 ЭКОНОМИЯ — Таблица сравнения
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1a1714 50%, #1E1B18 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Экономия</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Сколько стоит <span className="text-terra-400">НЕ</span> использовать
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Без нас */}
            <div className="rounded-xl bg-white/[0.05] border border-white/10 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Без нас</div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "3 000 – 5 000₽" },
                  { item: "Ожидание", cost: "2-3 дня" },
                  { item: "Уборка квартиры", cost: "ваше время" },
                  { item: "Мебель для стейджинга", cost: "50 000₽" },
                  { item: "Текст для Авито", cost: "ещё 1 000₽" },
                  { item: "38 сервисов", cost: "не существует" },
                  { item: "Результат", cost: "1 комплект фото" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* С нами */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(212,101,75,0.15) 0%, rgba(212,101,75,0.05) 100%)", border: "1px solid rgba(212,101,75,0.3)" }}>
              <div className="text-xs uppercase tracking-widest text-terra-400 mb-6">С нами</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 15₽ за фото" },
                  { item: "Ожидание", cost: "30 секунд" },
                  { item: "Уборка", cost: "не нужна" },
                  { item: "Мебель", cost: "виртуальная, бесплатно" },
                  { item: "Текст для Авито", cost: "AI напишет за вас" },
                  { item: "38 сервисов", cost: "всё включено" },
                  { item: "Результат", cost: "неограниченно" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-400/20">
                    <span className="text-neutral-300">{row.item}</span>
                    <span className="text-terra-400 font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] text-terra-400 mb-6">
              Экономия: от 4 985₽ на объекте
            </p>
            <Link href="/generate" className="btn-white">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          06 СТЕЙДЖИНГ + Доп.режимы
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-32 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at top left, rgba(212,101,75,0.05) 0%, #1E1B18 40%, #161311 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 space-y-24 lg:space-y-32">
          {/* Блок 1: Мебель */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Виртуальный стейджинг</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[56px]">
                Пустая квартира <span className="text-terra-400">не продаётся</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Покупатель не может представить себя в пустых стенах. Добавьте мебель за 15 рублей вместо 50 000 за реальную обстановку. 26 стилей на выбор.
              </p>
              <Link href="/generate?mode=staging" className="btn-terra mt-8">
                Добавить мебель
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden">
              <BeforeAfterToggle
                beforeSrc="/demo/before-2.jpg"
                afterSrc="/demo/after-2.jpg"
                label="Виртуальная мебель"
                subtitle="Нажмите для сравнения"
              />
            </div>
          </div>

          {/* Блок 2: Закат */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Экстерьер</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px]">
                Закат, небо и <span className="text-terra-400">зелёный газон</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Преобразите экстерьер: золотой закат, чистое небо, зелёный газон — даже зимой. Покупатели влюбятся с первого взгляда.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: "🌅", label: "Закат" },
                  { icon: "☁️", label: "Небо" },
                  { icon: "🌿", label: "Озеленение" },
                  { icon: "🏠", label: "Фасад" },
                  { icon: "🌳", label: "Ландшафт" },
                  { icon: "🍂", label: "Сезон" },
                ].map((t) => (
                  <span
                    key={t.label}
                    className="rounded-lg px-3 py-1.5 text-sm text-neutral-200"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
              <Link href="/generate?mode=dusk" className="btn-terra mt-8">
                Попробовать
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden lg:order-1">
              <BeforeAfterToggle
                beforeSrc="/demo/before-3.jpg"
                afterSrc="/demo/after-3.jpg"
                label="Закат"
                subtitle="День → золотой час"
              />
            </div>
          </div>

          {/* Блок 3: AI-описание */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Тексты</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px]">
                AI напишет <span className="text-terra-400">продающий текст</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Загрузите фото — AI создаст описание для Авито, ЦИАН или соцсетей. Деловой, тёплый или продающий тон. Готово за 10 секунд.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: "📝", label: "Описание" },
                  { icon: "📋", label: "Объявление" },
                  { icon: "📱", label: "Соцсети" },
                ].map((t) => (
                  <span
                    key={t.label}
                    className="rounded-lg px-3 py-1.5 text-sm text-neutral-200"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
              <Link href="/generate?mode=describe" className="btn-terra mt-8">
                Создать описание
              </Link>
            </div>
            <div className="rounded-xl bg-white/[0.05] border border-white/10 p-6 lg:p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Пример описания</div>
              <p className="text-neutral-200 leading-relaxed text-[15px]">
                Уютная двушка 54 м² в тихом центре, 5 мин от метро. Свежий ремонт: светлая кухня с встроенной техникой, просторная гостиная с панорамным остеклением. Во дворе — парк и детская площадка. Идеальна для семьи или инвестиций.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Сгенерировано за 8 секунд
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          07 ОТЗЫВЫ
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1E1B18 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">07</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Отзывы</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            2 480 риелторов. Вот что они говорят.
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Алексей Морозов",
                role: "Риелтор, Москва",
                text: "Раньше тратил час на уговоры хозяев убраться. Теперь фоткаю как есть и через 30 секунд у меня продающее фото.",
                metric: "+2 сделки/мес",
              },
              {
                name: "Марина Соколова",
                role: "Агентство «НовоСтрой»",
                text: "Виртуальная мебель для новостроек — находка. Пустые стены никто не хочет смотреть. С мебелью — другая история. Используем batch-режим на 20 фото.",
                metric: "x3 звонков",
              },
              {
                name: "Дмитрий Волков",
                role: "Частный риелтор, СПб",
                text: "За 15 рублей получаю фото, за которое фотограф просит пять тысяч. И не надо ждать — результат мгновенно.",
                metric: "экономия 4 985₽",
              },
              {
                name: "Елена Козлова",
                role: "Риелтор, Казань",
                text: "Удаление лишних вещей — спасение. Хозяева не убирают, а мне нужно срочно выложить объявление. Убираю всё с фото за секунды.",
                metric: "−3 часа/день",
              },
              {
                name: "Игорь Петров",
                role: "Агентство «Дом», Краснодар",
                text: "AI-описания для Авито — это просто магия. Загрузил фото, получил готовый текст. Раньше 20 минут писал, теперь 10 секунд.",
                metric: "−20 мин/объект",
              },
              {
                name: "Наталья Белова",
                role: "Риелтор, Тюмень",
                text: "38 сервисов за одну подписку — больше нигде такого нет. Использую ремонт стен, мебель и закат чаще всего. Клиенты в восторге.",
                metric: "38 инструментов",
              },
            ].map((review) => (
              <div key={review.name} className="stagger-child">
                <div className="inline-block rounded-lg px-3 py-1 text-sm font-medium text-terra-400 mb-4" style={{ background: "rgba(212,101,75,0.12)" }}>
                  {review.metric}
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="text-base text-white">{review.name}</div>
                  <div className="text-sm text-neutral-500 mt-1">{review.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Полоса доверия */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <span>Оценка: <strong className="text-white">4.9/5</strong></span>
              <span>2 480 пользователей</span>
              <span>47 832 фото обработано</span>
            </div>
            <span className="text-terra-400">~18 новых риелторов каждый день</span>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          08 ТАРИФЫ
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "radial-gradient(ellipse at center, rgba(212,101,75,0.04) 0%, #1E1B18 50%, #1a1714 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">08</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Тарифы</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl">
              38 сервисов. От&nbsp;0₽.
            </h2>
            <Link href="/pricing" className="btn-outline-light self-start">
              Все тарифы
            </Link>
          </div>

          {/* Блок бесплатного старта */}
          <div className="mb-8 rounded-xl p-5 text-center" style={{ background: "rgba(212,101,75,0.1)", border: "1px solid rgba(212,101,75,0.25)" }}>
            <p className="text-white font-medium">Не уверены? Начните бесплатно — 2 фото без регистрации и без карты</p>
          </div>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              {
                name: "Бесплатно", price: "0", per: "", credits: "2 фото", perPhoto: "",
                features: ["Уборка и улучшение", "Стандартное качество", "Без регистрации"],
                accent: false, badge: null, cta: "Попробовать", href: "/generate",
              },
              {
                name: "Риелтор", price: "2 490", per: "₽", credits: "50 фото", perPhoto: "50₽/фото",
                features: ["Все 38 AI-сервисов", "Виртуальная мебель и ремонт", "AI-описания объектов", "Высокое качество", "Приоритетная очередь"],
                accent: true, badge: "Выбирают 67%", cta: "Подключить", href: "/auth",
              },
              {
                name: "Агентство", price: "6 990", per: "₽", credits: "150 фото", perPhoto: "47₽/фото",
                features: ["Все 38 AI-сервисов", "Batch до 20 фото", "AI-описания + соцсети", "Макс. качество", "Поддержка 24/7"],
                accent: false, badge: null, cta: "Подключить", href: "/auth",
              },
              {
                name: "Профи", price: "5 990", per: "₽", credits: "100 фото", perPhoto: "60₽/фото",
                features: ["Все 38 AI-сервисов", "Точечное удаление", "AI Chat Editor", "Сравнение 4 стилей", "Персональная поддержка"],
                accent: false, badge: null, cta: "Подключить", href: "/auth",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="relative p-10 stagger-child"
                style={{
                  background: plan.accent
                    ? "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, #1E1B18 100%)"
                    : "#1E1B18",
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-terra-500 px-3 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </div>
                )}
                <div className="text-xs uppercase tracking-widest text-neutral-500">
                  {plan.name}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="heading-display text-[40px] sm:text-[48px] text-white">{plan.price}</span>
                  {plan.per && <span className="text-xl text-neutral-500">{plan.per}</span>}
                </div>
                <div className="mt-1 text-sm text-neutral-500">
                  {plan.credits}
                  {plan.perPhoto && <span className="ml-2 text-terra-400 font-medium">= {plan.perPhoto}</span>}
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-base text-neutral-300">
                      <span className="mt-0.5 text-xs text-terra-400">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full text-center ${
                    plan.accent ? "btn-terra-glow" : "btn-outline-light"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Гарантия */}
          <p className="mt-8 text-center text-neutral-500">
            Не понравится — вернём деньги. Без вопросов.
          </p>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          09 ВОПРОСЫ
          ═════════════════════════════════════════════════════════ */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #161311 0%, #1E1B18 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">09</span>
                <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Вопросы</span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы
              </h2>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg text-white">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">+</span>
                  </summary>
                  <p className="pb-6 text-neutral-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ═════════════════════════════════════════════════════════
          CTA BANNER
          ═════════════════════════════════════════════════════════ */}
      <CTASplitBanner
        heading1={"Фото, которые продают.\n2 бесплатно."}
        heading2={"38 AI-сервисов.\nОдна подписка."}
        cta2="Выбрать тариф"
        cta2Href="/pricing"
        fomo="Присоединяйтесь к 2 480 риелторам — фото, которые продают дома и квартиры"
      />

      {/* FAQ structured data for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(FAQ_ITEMS)),
        }}
      />
    </>
  );
}

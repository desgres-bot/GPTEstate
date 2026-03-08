import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import LiveCounter from "@/components/LiveCounter";
import AllModesGrid from "@/components/AllModesGrid";
import { getFAQSchema } from "@/lib/jsonld";
import { SERVICES, SERVICE_CATEGORIES, buttonLabel } from "@/app/generate/_data/services";

export const metadata: Metadata = {
  title: "GPT Estate — Фото, которые продают дома и квартиры. 38 возможностей для риелторов",
  description:
    "Фото с бардаком, пустыми стенами и плохим светом отпугивает покупателей. Сервис превращает их в продающие за 30 секунд. 38 возможностей: уборка, мебель, ремонт, тексты для Авито. Первые 2 фото бесплатно.",
  alternates: { canonical: "https://fotoestate.ru" },
};

const FAQ_ITEMS = [
  {
    q: "Покупатель заметит, что фото обработано?",
    a: "Нет. Сервис убирает бардак и улучшает свет — фото выглядит как после настоящей уборки. Планировка, мебель, окна — всё остаётся на месте. Это не подделка, а цифровая уборка.",
  },
  {
    q: "Сколько стоит обработка?",
    a: "От 15 рублей за фото. Первые 2 — бесплатно, без регистрации. Дешевле чашки кофе, а объявление работает на порядок лучше.",
  },
  {
    q: "Какие фото подходят?",
    a: "Любые фото с телефона. Сервис справляется даже с тёмными и кривыми снимками. Но чем лучше ракурс — тем эффектнее результат.",
  },
  {
    q: "Как быстро получу результат?",
    a: "30 секунд. Загрузили фото — получили результат. Быстрее, чем написать сообщение хозяину с просьбой убраться.",
  },
  {
    q: "Можно обработать много фото сразу?",
    a: "Да, пакетная обработка позволяет загрузить до 20 фото одновременно. Все обработаются в одном стиле за минуту.",
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
    q: "Что такое точечные правки?",
    a: "Вы загружаете результат и пишете: «убери вазу слева», «добавь ковёр», «сделай стены светлее». Сервис вносит точечные правки без повторной обработки.",
  },
  {
    q: "Почему это дешевле фотографа?",
    a: "Фотограф тратит время на выезд, съёмку, обработку. Наш сервис делает всё это за 30 секунд автоматически. Поэтому 50 рублей вместо 5 000.",
  },
  {
    q: "Что входит в 38 возможностей?",
    a: "Уборка, расстановка мебели, новый стиль интерьера, удаление лишнего, ремонт стен и полов, кухня, ванная, фасад, ландшафт, закат, небо, освещение, высокое качество, тексты для Авито, оценка фото, планировка и многое другое.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          ШАПКА — заголовок, до/после, статистика
          ═══════════════════════════════════════════ */}
      <section className="text-white" style={{ background: "#161311" }}>
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
              Фото с бардаком, пустыми стенами и плохим светом отпугивает покупателей.
              Сервис превращает их в продающие — за 30 секунд.
              <br className="hidden sm:block" />
              Первые 2 фото бесплатно.
            </p>
            <Link href="/generate" className="btn-terra-glow mt-8 inline-flex">
              Попробовать бесплатно — 2 фото без регистрации
            </Link>
          </div>

          {/* Главное до/после */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/hero-before.jpg"
              afterSrc="/demo/hero-after.jpg"
              label="До / После"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>

          {/* Счётчики */}
          <div className="mt-12 lg:mt-16 grid grid-cols-3 gap-4 text-center">
            {[
              { end: 47832, suffix: "", label: "фото обработано" },
              { end: 38, suffix: "", label: "возможностей" },
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

          {/* 6 карточек — результат, не функция */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 pb-8">
            {[
              { icon: "✨", problem: "Фото отпугивает?", solution: "Через 30 секунд — идеальное для показа", href: "/generate?mode=enhance" },
              { icon: "🛋️", problem: "Пустые стены?", solution: "Покупатель увидит уютный дом", href: "/generate?mode=staging" },
              { icon: "🎨", problem: "Старый ремонт?", solution: "Покупатель увидит квартиру мечты", href: "/generate?mode=redesign" },
              { icon: "🧹", problem: "Хлам на фото?", solution: "Чистое пространство без следа", href: "/generate?mode=remove" },
              { icon: "📝", problem: "Нужен текст для Авито?", solution: "Готов за 10 секунд", href: "/generate?mode=describe" },
              { icon: "🔨", problem: "Обшарпанные стены?", solution: "Свежий ремонт на фото", href: "/generate?mode=renovation" },
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
      </section>

      {/* ═══════════════════════════════════════════
          01 РЕЗУЛЬТАТ — все 38 сервисов с примерами
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Результат</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-lg">
              Одна и та же квартира. <span className="text-terra-400">Другие деньги.</span>
            </h2>
            <p className="text-neutral-400 max-w-sm text-base">
              Покупатель решает за 3 секунды. Вот что он видит — до и после. Все 38 возможностей.
            </p>
          </div>

          {/* ── Все 38 сервисов по категориям ── */}
          {(() => {
            const DEMO_PHOTOS: Record<string, { before: string; after: string; label: string; subtitle: string }> = {
              // ── Интерьер ──
              enhance:    { before: "/demo/before-enhance.jpg", after: "/demo/after-enhance.jpg", label: "Готово к показу", subtitle: "Было: хлам хозяев. Стало: продающее фото" },
              staging:    { before: "/demo/before-staging.jpg", after: "/demo/after-staging.jpg", label: "Уютный дом", subtitle: "Было: пустые стены. Стало: покупатель хочет жить тут" },
              redesign:   { before: "/demo/before-redesign.jpg", after: "/demo/after-redesign.jpg", label: "Квартира мечты", subtitle: "Было: советский ремонт. Стало: современный интерьер" },
              remove:     { before: "/demo/before-remove.jpg", after: "/demo/after-remove.jpg", label: "Чистое фото", subtitle: "Было: лишние вещи. Стало: только пространство" },
              vacant:     { before: "/demo/before-vacant.jpg", after: "/demo/after-vacant.jpg", label: "Пустая комната", subtitle: "Было: мебель хозяев. Стало: чистое пространство" },
              declutter:  { before: "/demo/before-declutter.jpg", after: "/demo/after-declutter.jpg", label: "Порядок", subtitle: "Было: вещи повсюду. Стало: аккуратно и чисто" },
              renovation: { before: "/demo/before-renovation.jpg", after: "/demo/after-renovation.jpg", label: "Свежий ремонт", subtitle: "Было: голые стены. Стало: как после ремонта" },
              wallcolor:  { before: "/demo/before-wallcolor.jpg", after: "/demo/after-wallcolor.jpg", label: "Новый цвет", subtitle: "Было: старые обои. Стало: свежие белые стены" },
              flooring:   { before: "/demo/before-flooring.jpg", after: "/demo/after-flooring.jpg", label: "Новый пол", subtitle: "Было: старый паркет. Стало: современный ламинат" },
              kitchen:    { before: "/demo/before-kitchen.jpg", after: "/demo/after-kitchen.jpg", label: "Новая кухня", subtitle: "Было: советская кухня. Стало: современный гарнитур" },
              bathroom:   { before: "/demo/before-bathroom.jpg", after: "/demo/after-bathroom.jpg", label: "Новая ванная", subtitle: "Было: старый кафель. Стало: современная ванная" },
              furnish:    { before: "/demo/before-furnish.jpg", after: "/demo/after-furnish.jpg", label: "Новая мебель", subtitle: "Было: старый буфет. Стало: стильная обстановка" },
              additem:    { before: "/demo/before-additem.jpg", after: "/demo/after-additem.jpg", label: "Уютный штрих", subtitle: "Было: пустой угол. Стало: зона отдыха с растениями" },
              commercial: { before: "/demo/before-commercial.jpg", after: "/demo/after-commercial.jpg", label: "Готовый офис", subtitle: "Было: пустое помещение. Стало: оборудованный офис" },
              // ── Экстерьер ──
              exterior:   { before: "/demo/before-exterior.jpg", after: "/demo/after-exterior.jpg", label: "Новый фасад", subtitle: "Было: старый кирпич. Стало: современный дом" },
              landscape:  { before: "/demo/before-landscape.jpg", after: "/demo/after-landscape.jpg", label: "Красивый сад", subtitle: "Было: голый участок. Стало: ландшафтный дизайн" },
              greenify:   { before: "/demo/before-greenify.jpg", after: "/demo/after-greenify.jpg", label: "Зелёный двор", subtitle: "Было: заросли. Стало: ухоженная зелень" },
              season:     { before: "/demo/before-season.jpg", after: "/demo/after-season.jpg", label: "Лето круглый год", subtitle: "Было: серая осень. Стало: солнечное лето" },
              decor:      { before: "/demo/before-decor.jpg", after: "/demo/after-decor.jpg", label: "Праздничный дом", subtitle: "Было: обычный дом. Стало: новогоднее настроение" },
              dusk:       { before: "/demo/before-dusk.jpg", after: "/demo/after-dusk.jpg", label: "Золотой час", subtitle: "Было: серый день. Стало: тёплый закат" },
              sky:        { before: "/demo/before-sky.jpg", after: "/demo/after-sky.jpg", label: "Голубое небо", subtitle: "Было: пасмурно. Стало: яркое голубое небо" },
              // ── Качество ──
              lighting:   { before: "/demo/before-lighting.jpg", after: "/demo/after-lighting.jpg", label: "Яркое фото", subtitle: "Было: тёмное фото. Стало: светлое и привлекательное" },
              perspective:{ before: "/demo/before-perspective.jpg", after: "/demo/after-perspective.jpg", label: "Ровные линии", subtitle: "Было: кривые стены. Стало: ровная перспектива" },
              upscale:    { before: "/demo/before-upscale.jpg", after: "/demo/after-upscale.jpg", label: "HD качество", subtitle: "Было: размытое фото. Стало: чёткое в 4× разрешении" },
              watermark:  { before: "/demo/before-watermark.jpg", after: "/demo/after-watermark.jpg", label: "Без логотипа", subtitle: "Было: логотип ЦИАН. Стало: чистое фото" },
            };
            const PLACEHOLDER_DESC: Record<string, string> = {
              // Текстовые сервисы (без фото до/после)
              describe: "Пустое поле → готовый текст для Авито",
              listing: "Фото квартиры → три заголовка + описание + хештеги",
              social: "Фото → готовый пост для ВК с эмодзи",
              score: "Фото → оценка 4/5 и рекомендации",
              analyze: "Фото → тип комнаты, площадь, состояние ремонта",
              checklist: "Фото → список: покрасить, убрать, починить",
              floorplan: "Фото комнаты → схема с примерными размерами",
              compliance: "Фото → ✅ Готово к Авито / ❌ Нужна доработка",
              repaircost: "Фото → бюджет ремонта: 85 000 ₽",
              // Продвинутые сервисы (пока без демо)
              compare: "Одна комната → 4 стиля на выбор",
              textrender: "Описание мечты → визуализация интерьера",
              batch: "20 фото → 20 результатов за минуту",
              tour: "Обычные фото → панорама квартиры",
            };

            const CAT_LABELS: Record<string, string> = {
              photo: "Фото",
              text: "Тексты",
              expert: "Экспертиза",
              advanced: "Продвинутое",
            };

            return (
              <div className="space-y-12 lg:space-y-16">
                {SERVICE_CATEGORIES.map((cat) => {
                  const items = SERVICES.filter((s) => s.category === cat.id);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-xl">{cat.icon}</span>
                        <h3 className="text-lg font-semibold text-white">{CAT_LABELS[cat.id] || cat.label}</h3>
                        <span className="text-xs text-neutral-500">{items.length}</span>
                      </div>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        {items.map((svc) => {
                          const demo = DEMO_PHOTOS[svc.id];
                          const placeholder = PLACEHOLDER_DESC[svc.id];
                          const href = svc.isLink && svc.href ? svc.href : `/generate?mode=${svc.id}`;
                          return (
                            <div key={svc.id} className="stagger-child">
                              {demo ? (
                                <BeforeAfterToggle
                                  beforeSrc={demo.before}
                                  afterSrc={demo.after}
                                  label={demo.label}
                                  subtitle={demo.subtitle}
                                />
                              ) : (
                                <div className="rounded-xl border-2 border-dashed border-white/10 aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
                                  <span className="text-2xl mb-2">{svc.icon}</span>
                                  <p className="text-neutral-500 text-xs leading-relaxed">
                                    {placeholder || `${svc.label}: ${svc.desc}`}
                                  </p>
                                </div>
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-white font-medium truncate">{svc.label}</span>
                                {svc.isNew && (
                                  <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(212,101,75,0.15)", color: "#e07460" }}>
                                    Новое
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-500 mt-0.5">{svc.desc}</p>
                              <Link
                                href={href}
                                className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium
                                           bg-terra-500 text-white
                                           hover:bg-terra-400 transition-all duration-200"
                              >
                                {buttonLabel[svc.id as keyof typeof buttonLabel] || svc.label} →
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Баннер */}
          <div className="mt-16 rounded-xl bg-terra-500 p-8 sm:p-10 text-center text-white">
            <p className="text-xl sm:text-2xl font-medium">Первые 2 фото — бесплатно. Без регистрации. Без карты.</p>
            <Link href="/generate" className="btn-white mt-6 inline-flex">
              Попробовать сейчас
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ДОВЕРИЕ — площадки + метрики (без номера)
          ═══════════════════════════════════════════ */}
      <section style={{ background: "#161311" }}>
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            {/* Метрики */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-400 mb-10">
              <span><strong className="text-white text-lg">47 832</strong> фото обработано</span>
              <span className="hidden sm:inline text-neutral-600">·</span>
              <span><strong className="text-white text-lg">2 480</strong> риелторов</span>
              <span className="hidden sm:inline text-neutral-600">·</span>
              <span>Оценка: <strong className="text-white text-lg">4.9/5</strong></span>
            </div>

            {/* Площадки */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Публикуйте на</span>
              {["Авито", "ЦИАН", "Домклик", "Яндекс"].map((p) => (
                <span key={p} className="rounded-full px-4 py-1.5 text-sm text-neutral-300" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>{p}</span>
              ))}
            </div>

            {/* Плейсхолдер: логотипы площадок */}
            <div className="mt-10 rounded-xl border-2 border-dashed border-white/10 p-8 text-center">
              <p className="text-neutral-500 text-sm leading-relaxed max-w-lg mx-auto">
                [ФОТО] Серые логотипы площадок (Авито, ЦИАН, Домклик, Яндекс Недвижимость) в ряд.
                Показывают, что обработанные фото подходят для любой площадки размещения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 ПРОБЛЕМА — боли риелторов
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Проблема</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            Плохое фото <span className="text-terra-400">убивает продажу.</span>
          </h2>

          <div className="mt-16 lg:mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Левая колонка — 3 боли */}
            <div className="space-y-0">
              {[
                {
                  num: "01",
                  title: "Приехали — а в квартире бардак",
                  desc: "Хозяин не убрался. Раньше это потерянный день. Теперь снимаете как есть — и через 30 секунд фото идеальное для показа покупателям.",
                },
                {
                  num: "02",
                  title: "Покупатель пролистал ваше объявление",
                  desc: "На Авито у объявления 3 секунды. Грязное фото — пролистал. Чистое, светлое фото — позвонил.",
                },
                {
                  num: "03",
                  title: "Объект висит неделями — вы теряете деньги",
                  desc: "Каждый день простоя — потерянная комиссия. Хорошее фото сокращает срок продажи в 2-3 раза.",
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

              {/* Баннер срочности */}
              <div className="pt-8">
                <div className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "rgba(212,101,75,0.1)", border: "1px solid rgba(212,101,75,0.25)" }}>
                  <p className="text-white text-base font-medium">
                    Пока вы читаете — ваши конкуренты уже загрузили 3 фото
                  </p>
                  <Link href="/generate" className="btn-terra whitespace-nowrap">
                    Не отставать
                  </Link>
                </div>
              </div>
            </div>

            {/* Правая колонка — плейсхолдер вместо калькулятора */}
            <div className="self-start lg:sticky lg:top-28">
              <div className="rounded-xl border-2 border-dashed border-white/10 p-8 lg:p-10 text-center aspect-[4/3] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                  [ФОТО] Два объявления на Авито рядом: слева — с плохим фото (12 просмотров, 0 звонков за 2 недели), справа — с обработанным фото (340 просмотров, 8 звонков за 3 дня). Реальная разница в отклике покупателей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════
          03 КАК ЭТО РАБОТАЕТ — 3 шага + скриншот
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Как это работает</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Проще, чем попросить хозяина <span className="text-terra-400">убраться</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Сфотографируйте как есть",
                desc: "На телефон. Даже с плохим светом — сервис справится.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Выберите, что нужно",
                desc: "Убрать бардак, расставить мебель, обновить ремонт, написать текст — 38 возможностей.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Получите результат за 30 секунд",
                desc: "Скачайте и публикуйте на Авито, ЦИАН, Домклик.",
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

          {/* Плейсхолдер: скриншот интерфейса */}
          <div className="mt-12 rounded-xl border-2 border-dashed border-white/10 p-8 lg:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🖥️</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-lg mx-auto">
              [ФОТО] Скриншот сервиса: слева — фото с телефона (тёмное, с бардаком), по центру — выбор обработки из списка 38 возможностей, справа — готовый результат (светлое, чистое, продающее). Весь процесс на одном экране.
            </p>
          </div>

          {/* 3 дополнительные возможности */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "📦",
                title: "Пакетная обработка",
                desc: "До 20 фото за раз. Один стиль, одна минута.",
                href: "/batch",
                tag: "Новое",
              },
              {
                icon: "🏠",
                title: "Виртуальный обход",
                desc: "Панорама квартиры из обычных фото.",
                href: "/tour",
                tag: "Новое",
              },
              {
                icon: "💬",
                title: "Точечные правки",
                desc: "Напишите: «убери вазу», «добавь ковёр» — сервис сделает.",
                href: "/generate",
                tag: "Новое",
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

      {/* ═══════════════════════════════════════════
          04 ПРИМЕРЫ — мебель, закат, текст
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="fade-left" className="py-24 lg:py-32 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6 space-y-24 lg:space-y-32">
          {/* Блок 1: Мебель */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Расстановка мебели</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[56px]">
                Пустая квартира <span className="text-terra-400">не продаётся</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Покупатель не может представить себя в пустых стенах. Расставьте мебель на фото за 15 рублей вместо 50 000 за реальную обстановку. 26 стилей на выбор. Покупатель увидит уютный дом — и позвонит.
              </p>
              <Link href="/generate?mode=staging" className="btn-terra mt-8">
                Расставить мебель
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden">
              <BeforeAfterToggle
                beforeSrc="/demo/before-2.jpg"
                afterSrc="/demo/after-2.jpg"
                label="Было пусто — стало уютно"
                subtitle="Покупатель хочет жить здесь"
              />
            </div>
          </div>

          {/* Блок 2: Закат */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Фото фасада</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px]">
                Серое фото <span className="text-terra-400">отпугивает</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Золотой закат, чистое небо, зелёный газон — даже зимой. Покупатели влюбляются с первого взгляда. Первое впечатление решает всё.
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
                label="Было серо — стало золото"
                subtitle="Покупатель влюбляется"
              />
            </div>
          </div>

          {/* Блок 3: Текст для объявления */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Текст для объявления</div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px]">
                Текст за 20 минут? <span className="text-terra-400">Готов за 10 секунд</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Загрузите фото — сервис напишет описание для Авито, ЦИАН или соцсетей. Деловой, тёплый или продающий тон. Больше не нужно мучиться с текстом.
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
                Готово за 8 секунд
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════
          05 ЭКОНОМИЯ — таблица сравнения
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Экономия</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Сколько стоит <span className="text-terra-400">НЕ</span> пользоваться
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
                  { item: "Мебель для показа", cost: "50 000₽" },
                  { item: "Текст для Авито", cost: "ещё 1 000₽" },
                  { item: "38 возможностей", cost: "не существует" },
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
                  { item: "Текст для Авито", cost: "напишет за вас" },
                  { item: "38 возможностей", cost: "всё включено" },
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

      {/* ═══════════════════════════════════════════
          06 ОТЗЫВЫ
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="blur-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">06</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Отзывы</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            2 480 риелторов уже <span className="text-terra-400">продают быстрее</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Алексей Морозов",
                initials: "АМ",
                role: "Риелтор, Москва",
                text: "Раньше тратил час на уговоры хозяев убраться. Теперь фоткаю как есть и через 30 секунд у меня продающее фото. Покупатели звонят чаще.",
                metric: "+2 сделки/мес",
              },
              {
                name: "Марина Соколова",
                initials: "МС",
                role: "Агентство «НовоСтрой»",
                text: "Пустые квартиры в новостройках теперь продаются вдвое быстрее. Расставляем мебель на фото, и покупатели сразу видят, как тут можно жить.",
                metric: "×3 звонков",
              },
              {
                name: "Дмитрий Волков",
                initials: "ДВ",
                role: "Частный риелтор, СПб",
                text: "За 15 рублей получаю фото, за которое фотограф просит пять тысяч. И не надо ждать — результат мгновенно.",
                metric: "экономия 4 985₽",
              },
              {
                name: "Елена Козлова",
                initials: "ЕК",
                role: "Риелтор, Казань",
                text: "Хозяева не убирают, а мне нужно срочно выложить объявление. Убираю весь бардак с фото за секунды. Объявление уже работает.",
                metric: "−3 часа/день",
              },
              {
                name: "Игорь Петров",
                initials: "ИП",
                role: "Агентство «Дом», Краснодар",
                text: "Тексты для Авито — это волшебство. Загрузил фото, получил готовое описание. Раньше 20 минут писал, теперь 10 секунд.",
                metric: "−20 мин/объект",
              },
              {
                name: "Наталья Белова",
                initials: "НБ",
                role: "Риелтор, Тюмень",
                text: "38 возможностей за одну подписку — больше нигде такого нет. Использую ремонт стен, мебель и закат чаще всего. Клиенты в восторге.",
                metric: "38 возможностей",
              },
            ].map((review) => (
              <div key={review.name} className="stagger-child">
                <div className="inline-block rounded-lg px-3 py-1 text-sm font-medium text-terra-400 mb-4" style={{ background: "rgba(212,101,75,0.12)" }}>
                  {review.metric}
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {/* Аватар-плейсхолдер */}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-neutral-400">
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-base text-white">{review.name}</div>
                    <div className="text-sm text-neutral-500 mt-0.5">{review.role}</div>
                  </div>
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

      {/* ═══════════════════════════════════════════
          07 ТАРИФЫ
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">07</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Тарифы</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl">
              От 0 рублей. <span className="text-terra-400">Отмена в любой момент.</span>
            </h2>
            <Link href="/pricing" className="btn-outline-light self-start">
              Все тарифы
            </Link>
          </div>

          <div className="mb-8 rounded-xl p-5 text-center" style={{ background: "rgba(212,101,75,0.1)", border: "1px solid rgba(212,101,75,0.25)" }}>
            <p className="text-white font-medium">Не уверены? Начните бесплатно — 2 фото без регистрации и без карты</p>
          </div>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              {
                name: "Бесплатно", price: "0", per: "", credits: "2 фото", perPhoto: "",
                features: ["Уборка и улучшение", "Обычное качество", "Без регистрации"],
                accent: false, badge: null, cta: "Попробовать", href: "/generate",
              },
              {
                name: "Риелтор", price: "2 490", per: "₽", credits: "50 фото", perPhoto: "50₽/фото",
                features: ["Все 38 возможностей", "Расстановка мебели и ремонт", "Тексты для объявлений", "Высокое качество", "Быстрая очередь"],
                accent: true, badge: "Выбирают 67%", cta: "Подключить", href: "/auth",
              },
              {
                name: "Агентство", price: "6 990", per: "₽", credits: "150 фото", perPhoto: "47₽/фото",
                features: ["Все 38 возможностей", "Пакетная обработка до 20 фото", "Тексты + соцсети", "Максимальное качество", "Поддержка 24/7"],
                accent: false, badge: null, cta: "Подключить", href: "/auth",
              },
              {
                name: "Профи", price: "5 990", per: "₽", credits: "100 фото", perPhoto: "60₽/фото",
                features: ["Все 38 возможностей", "Точечное удаление", "Точечные правки", "Сравнение 4 стилей", "Персональная поддержка"],
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

          <p className="mt-8 text-center text-neutral-500">
            Не понравится — вернём деньги. Без вопросов.
          </p>
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════
          08 ВОПРОСЫ И ОТВЕТЫ
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="fade-right" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">08</span>
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

      {/* ═══════════════════════════════════════════
          09 ВСЕ 38 ВОЗМОЖНОСТЕЙ (перенесён в конец)
          ═══════════════════════════════════════════ */}
      <FadeInSection variant="scale-in" className="py-24 lg:py-40 text-white border-t border-white/[0.06]" style={{ background: "#161311" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">09</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">Все возможности</span>
          </div>

          <AllModesGrid
            title="38 возможностей"
            subtitle="в одной подписке"
          />

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════
          ФИНАЛЬНЫЙ БАННЕР
          ═══════════════════════════════════════════ */}
      <CTASplitBanner
        heading1={"Фото, которые продают.\n2 бесплатно."}
        heading2={"38 возможностей.\nОдна подписка."}
        cta2="Выбрать тариф"
        cta2Href="/pricing"
        fomo="Присоединяйтесь к 2 480 риелторам — фото, которые продают дома и квартиры"
      />

      {/* Разметка для поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(FAQ_ITEMS)),
        }}
      />
    </>
  );
}

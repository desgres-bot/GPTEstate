import type { Metadata } from "next";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import CTASplitBanner from "@/components/CTASplitBanner";

export const metadata: Metadata = {
  title: "API для разработчиков — GPT Estate",
  description:
    "REST API для AI-обработки фото недвижимости. 10 режимов: улучшение, стейджинг, редизайн, удаление объектов. Документация и примеры кода.",
  keywords:
    "API недвижимость, AI фото API, виртуальный стейджинг API, REST API обработка фото",
  alternates: { canonical: "https://fotoestate.ru/api-docs" },
  openGraph: {
    title: "API для разработчиков — GPT Estate",
    description:
      "Интегрируйте AI-обработку фото недвижимости в свой сервис. 10 режимов, 30 секунд.",
  },
};

const MODES = [
  { name: "enhance", desc: "Улучшение фото: коррекция света, уборка беспорядка" },
  { name: "staging", desc: "Виртуальная мебель в пустых комнатах" },
  { name: "redesign", desc: "Редизайн интерьера в выбранном стиле" },
  { name: "remove", desc: "Удаление объектов с фото по описанию или маске" },
  { name: "describe", desc: "Генерация текстового описания для объявления" },
  { name: "dusk", desc: "Перевод фото экстерьера в вечернее освещение" },
  { name: "sky", desc: "Замена неба на выбранный тип" },
  { name: "score", desc: "Оценка качества фото по 10-балльной шкале" },
  { name: "analyze", desc: "Детальный анализ фото: свет, композиция, рекомендации" },
  { name: "renovation", desc: "Виртуальный ремонт: стены, полы, отделка" },
];

const PARAMS = [
  { name: "image", type: "file", required: true, desc: "Исходное изображение (JPEG, PNG, WebP)" },
  { name: "mode", type: "string", required: true, desc: "Режим обработки (см. таблицу ниже)" },
  { name: "style", type: "string", required: false, desc: "Стиль интерьера для staging/redesign" },
  { name: "customStyle", type: "string", required: false, desc: "Произвольное описание стиля (вместо preset)" },
  { name: "skyType", type: "string", required: false, desc: "Тип неба для режима sky: sunny, sunset, dramatic, blue" },
  { name: "renovationType", type: "string", required: false, desc: "Тип ремонта: white_walls, beige_walls, gray_walls, laminate, tile, parquet, full_light, full_dark" },
  { name: "description", type: "string", required: false, desc: "Текстовое описание для remove (что удалить)" },
  { name: "mask", type: "file", required: false, desc: "Маска области для remove (чёрно-белое изображение)" },
  { name: "platform", type: "string", required: false, desc: "Площадка для describe: avito, cian, domclick" },
  { name: "tone", type: "string", required: false, desc: "Тон описания для describe: business, warm, selling" },
];

const STYLES_LIST = [
  "modern", "scandinavian", "loft", "classic", "japanese",
  "minimalist", "boho", "provence", "artdeco", "hightech",
  "country", "eco", "industrial", "mediterranean", "retro",
  "neoclassic", "midcentury", "coastal", "farmhouse", "rustic",
  "glam", "transitional", "baroque", "fusion", "ethnic", "custom",
];

const PLANS = [
  { name: "Бесплатно", calls: "2 запроса", price: "0\u20BD" },
  { name: "Риелтор", calls: "50 запросов", price: "2 490\u20BD" },
  { name: "Агентство", calls: "150 запросов", price: "6 990\u20BD" },
  { name: "Профи", calls: "100 запросов", price: "5 990\u20BD" },
];

const FAQ_ITEMS = [
  {
    q: "Как получить API-ключ?",
    a: "Зарегистрируйтесь на сайте и подключите любой платный тариф. API-ключ появится в личном кабинете в разделе «Настройки». Бесплатный тариф не включает доступ к API.",
  },
  {
    q: "Какой лимит запросов?",
    a: "Лимит зависит от тарифа: Риелтор — 50 запросов/месяц, Агентство — 150, Профи — 100. Запросы обновляются каждый месяц. Неиспользованные запросы не сгорают.",
  },
  {
    q: "Какие форматы изображений поддерживаются?",
    a: "JPEG, PNG и WebP. Максимальный размер файла — 20 МБ. Рекомендуемое разрешение — от 1024x768 пикселей для лучшего результата.",
  },
  {
    q: "Как долго обрабатывается запрос?",
    a: "Среднее время обработки — 15\u201330 секунд в зависимости от режима и размера изображения. Текстовые режимы (describe, score, analyze) обычно быстрее.",
  },
  {
    q: "Есть ли SDK для Python/JavaScript?",
    a: "Официальные SDK в разработке. Пока рекомендуем использовать стандартные HTTP-библиотеки: requests для Python, fetch или axios для JavaScript. Примеры кода приведены в документации выше.",
  },
];

const CURL_EXAMPLE = `curl -X POST https://fotoestate.ru/api/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg" \\
  -F "mode=enhance"`;

const JS_EXAMPLE = `const formData = new FormData();
formData.append("image", fileInput.files[0]);
formData.append("mode", "staging");
formData.append("style", "modern");

const response = await fetch(
  "https://fotoestate.ru/api/generate",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
    },
    body: formData,
  }
);

const data = await response.json();
console.log(data.output_url);`;

const PYTHON_EXAMPLE = `import requests

url = "https://fotoestate.ru/api/generate"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

with open("photo.jpg", "rb") as f:
    files = {"image": f}
    data = {
        "mode": "describe",
        "platform": "avito",
        "tone": "selling"
    }
    response = requests.post(
        url, headers=headers,
        files=files, data=data
    )

result = response.json()
print(result["text"])`;

export default function ApiDocsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-[#1E1B18] text-white pt-32 pb-24 lg:pt-44 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              REST API
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[80px]">
              API для разработчиков
            </h1>
            <p className="mt-8 text-lg text-neutral-300 leading-relaxed max-w-xl">
              Интегрируйте AI-обработку фото недвижимости в свой сервис.
              10 режимов, 25+ стилей, результат за 30 секунд. Простой REST API
              с multipart/form-data.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#getting-started" className="btn-terra">
                Начать интеграцию
              </a>
              <a href="#examples" className="btn-outline-light">
                Примеры кода
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 01 НАЧАЛО РАБОТЫ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div id="getting-started" className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Начало работы
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Подключение за 5 минут
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Base URL", value: "https://fotoestate.ru/api/generate" },
              { label: "Метод", value: "POST" },
              { label: "Content-Type", value: "multipart/form-data" },
              { label: "Авторизация", value: "Bearer YOUR_API_KEY" },
            ].map((item) => (
              <div
                key={item.label}
                className="stagger-child rounded-xl bg-white p-6 border border-neutral-200"
              >
                <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-3">
                  {item.label}
                </div>
                <code className="text-sm font-mono text-terra-500 break-all">
                  {item.value}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-white border border-neutral-200 p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-terra-500 text-lg">*</span>
              <div>
                <p className="text-[#1E1B18] font-medium">
                  Авторизация через заголовок
                </p>
                <p className="mt-2 text-[#6B6560] leading-relaxed">
                  Передайте API-ключ в заголовке{" "}
                  <code className="text-sm font-mono bg-[#fbf9f5] px-2 py-0.5 rounded border border-neutral-200">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                  . API-ключи доступны на платных тарифах. Получите ключ в личном
                  кабинете после подключения тарифа.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ПАРАМЕТРЫ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Параметры
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Параметры запроса
          </h2>

          {/* Parameters table */}
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#fbf9f5]">
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-[#7D756E] font-medium">
                      Параметр
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-[#7D756E] font-medium">
                      Тип
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-[#7D756E] font-medium">
                      Обяз.
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-[#7D756E] font-medium">
                      Описание
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PARAMS.map((param) => (
                    <tr
                      key={param.name}
                      className="border-t border-neutral-200"
                    >
                      <td className="px-6 py-4">
                        <code className="text-sm font-mono text-terra-500">
                          {param.name}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B6560]">
                        {param.type}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {param.required ? (
                          <span className="inline-block rounded-md bg-terra-50 px-2 py-0.5 text-xs font-medium text-terra-600">
                            да
                          </span>
                        ) : (
                          <span className="text-[#7D756E]">нет</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B6560]">
                        {param.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modes table */}
          <h3 className="mt-16 text-[20px] sm:text-[24px] font-normal mb-8">
            10 режимов обработки
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {MODES.map((mode) => (
              <div
                key={mode.name}
                className="stagger-child rounded-xl bg-[#fbf9f5] p-5 border border-neutral-200"
              >
                <code className="text-sm font-mono text-terra-500">
                  {mode.name}
                </code>
                <p className="mt-2 text-sm text-[#6B6560] leading-relaxed">
                  {mode.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Styles list */}
          <h3 className="mt-16 text-[20px] sm:text-[24px] font-normal mb-6">
            Доступные стили (параметр style)
          </h3>

          <div className="flex flex-wrap gap-2">
            {STYLES_LIST.map((style) => (
              <span
                key={style}
                className="rounded-lg px-3 py-1.5 text-sm font-mono text-[#6B6560] bg-[#fbf9f5] border border-neutral-200"
              >
                {style}
              </span>
            ))}
          </div>

          {/* Response format */}
          <h3 className="mt-16 text-[20px] sm:text-[24px] font-normal mb-6">
            Формат ответа
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#fbf9f5] p-6 border border-neutral-200">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-3">
                Режимы с изображением
              </div>
              <pre className="bg-[#1E1B18] rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {`{\n  "output_url": "https://..."\n}`}
                </code>
              </pre>
              <p className="mt-3 text-xs text-[#7D756E]">
                enhance, staging, redesign, remove, dusk, sky, renovation
              </p>
            </div>

            <div className="rounded-xl bg-[#fbf9f5] p-6 border border-neutral-200">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-3">
                Текстовые режимы
              </div>
              <pre className="bg-[#1E1B18] rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {`{\n  "text": "Описание..."\n}`}
                </code>
              </pre>
              <p className="mt-3 text-xs text-[#7D756E]">
                describe, score, analyze
              </p>
            </div>

            <div className="rounded-xl bg-[#fbf9f5] p-6 border border-neutral-200">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-3">
                Ошибка
              </div>
              <pre className="bg-[#1E1B18] rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {`{\n  "error": "Сообщение..."\n}`}
                </code>
              </pre>
              <p className="mt-3 text-xs text-[#7D756E]">
                HTTP-код 4xx или 5xx
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 ПРИМЕРЫ КОДА ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div id="examples" className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">03</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Примеры кода
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Готовые примеры
          </h2>

          <div className="space-y-8">
            {/* cURL */}
            <div className="stagger-child">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block rounded-md bg-[#1E1B18] px-3 py-1 text-xs font-medium text-white">
                  cURL
                </span>
                <span className="text-sm text-[#7D756E]">
                  Улучшение фото (enhance)
                </span>
              </div>
              <pre className="bg-[#1E1B18] rounded-xl p-6 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {CURL_EXAMPLE}
                </code>
              </pre>
            </div>

            {/* JavaScript */}
            <div className="stagger-child">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block rounded-md bg-[#f7df1e] px-3 py-1 text-xs font-medium text-[#1E1B18]">
                  JavaScript
                </span>
                <span className="text-sm text-[#7D756E]">
                  Виртуальный стейджинг (staging + modern)
                </span>
              </div>
              <pre className="bg-[#1E1B18] rounded-xl p-6 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {JS_EXAMPLE}
                </code>
              </pre>
            </div>

            {/* Python */}
            <div className="stagger-child">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block rounded-md bg-[#3776AB] px-3 py-1 text-xs font-medium text-white">
                  Python
                </span>
                <span className="text-sm text-[#7D756E]">
                  Генерация описания для Авито (describe)
                </span>
              </div>
              <pre className="bg-[#1E1B18] rounded-xl p-6 overflow-x-auto">
                <code className="text-sm text-neutral-300 font-mono whitespace-pre">
                  {PYTHON_EXAMPLE}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 ТАРИФЫ API ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Тарифы API
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Простые и прозрачные тарифы
          </h2>

          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.05]">
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-400 font-medium">
                      Тариф
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-400 font-medium">
                      API-запросов в месяц
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-400 font-medium">
                      Стоимость
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((plan) => (
                    <tr
                      key={plan.name}
                      className="stagger-child border-t border-white/10"
                    >
                      <td className="px-6 py-5 text-white font-medium">
                        {plan.name}
                      </td>
                      <td className="px-6 py-5 text-neutral-300">
                        {plan.calls}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-terra-400 font-medium">
                          {plan.price}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm">
              Неиспользованные запросы не сгорают. Нужно больше?{" "}
              <a
                href="mailto:support@fotoestate.ru"
                className="text-terra-400 hover:underline"
              >
                Напишите нам
              </a>
            </p>
            <Link href="/pricing" className="btn-white">
              Все тарифы
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
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
                Частые вопросы об API
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
                  <p className="pb-6 text-[#6B6560] leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner />
    </>
  );
}

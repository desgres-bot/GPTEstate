import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Виртуальный стейджинг квартиры — AI-редизайн интерьера | GPT Estate",
  description:
    "Виртуальный стейджинг недвижимости с помощью AI. Покажите покупателям потенциал квартиры — новая мебель, современный дизайн, 5 стилей на выбор.",
  keywords: "виртуальный стейджинг, стейджинг квартиры, виртуальная меблировка, AI стейджинг недвижимости",
};

export default function VirtualnyjStejdzhing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold lg:text-4xl">
        Виртуальный стейджинг — покажите потенциал квартиры
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Виртуальный стейджинг — это технология, которая позволяет «обставить»
        пустую квартиру мебелью и декором с помощью AI. Покупатели лучше
        представляют себя в пространстве, когда видят обустроенную комнату,
        а не голые стены.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Преимущества виртуального стейджинга</h2>
      <div className="mt-6 space-y-4">
        {[
          { title: "В 10 раз дешевле реального стейджинга", desc: "Физический стейджинг стоит от 50 000 ₽. AI-стейджинг — от 16 ₽ за фото." },
          { title: "Результат за 30 секунд", desc: "Не нужно ждать дизайнера и бригаду. Загрузили фото — получили результат." },
          { title: "5 стилей дизайна", desc: "Современный, скандинавский, лофт, классика, японский — выберите подходящий." },
          { title: "Повышает конверсию в 2-3 раза", desc: "Объявления с обставленными комнатами получают значительно больше откликов." },
        ].map((item) => (
          <div key={item.title} className="card">
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">Как это работает?</h2>
      <ol className="mt-4 space-y-3 text-gray-600">
        <li>1. Сфотографируйте пустую или полупустую комнату</li>
        <li>2. Загрузите фото и выберите режим «Редизайн»</li>
        <li>3. Выберите стиль дизайна интерьера</li>
        <li>4. Получите фотореалистичную визуализацию за 30 секунд</li>
      </ol>

      <div className="mt-12 rounded-2xl bg-accent-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Попробуйте виртуальный стейджинг</h2>
        <p className="mt-2 text-gray-600">
          2 бесплатных генерации для знакомства с сервисом
        </p>
        <Link href="/generate" className="btn-primary mt-4 inline-block">
          Попробовать стейджинг
        </Link>
      </div>
    </div>
  );
}

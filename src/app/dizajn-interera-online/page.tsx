import Link from "next/link";
import type { Metadata } from "next";
import { STYLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Дизайн интерьера онлайн — AI-визуализация комнаты | GPT Estate",
  description:
    "Онлайн-дизайн интерьера с помощью AI. Загрузите фото комнаты, выберите стиль — получите визуализацию нового дизайна за 30 секунд.",
  keywords: "дизайн интерьера онлайн, визуализация интерьера, AI дизайн комнаты, редизайн интерьера онлайн",
};

export default function DizajnInteraOnline() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold lg:text-4xl">
        Дизайн интерьера онлайн — визуализация за 30 секунд
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Хотите увидеть, как будет выглядеть ваша комната в новом стиле?
        Загрузите фото и выберите стиль дизайна — AI создаст фотореалистичную
        визуализацию, сохраняя планировку комнаты.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Доступные стили</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {STYLES.map((s) => (
          <div key={s.id} className="card text-center">
            <div className="text-3xl">{s.emoji}</div>
            <h3 className="mt-2 font-bold">{s.name}</h3>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">Как использовать?</h2>
      <ol className="mt-4 space-y-3 text-gray-600">
        <li>1. Сфотографируйте комнату (желательно при хорошем освещении)</li>
        <li>2. Загрузите фото на страницу генерации</li>
        <li>3. Выберите режим «Редизайн» и желаемый стиль</li>
        <li>4. Нажмите «Генерация» и подождите 30 секунд</li>
        <li>5. Скачайте готовую визуализацию</li>
      </ol>

      <div className="mt-12 rounded-2xl bg-accent-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Попробуйте AI-дизайн бесплатно</h2>
        <p className="mt-2 text-gray-600">2 бесплатных визуализации</p>
        <Link href="/generate" className="btn-primary mt-4 inline-block">
          Создать дизайн
        </Link>
      </div>
    </div>
  );
}

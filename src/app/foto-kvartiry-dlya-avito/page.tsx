import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Фото квартиры для Авито — AI-улучшение за 30 секунд | ФотоЭстейт",
  description:
    "Сделайте профессиональные фото квартиры для объявления на Авито с помощью AI. Улучшение света, HDR, удаление шума. Больше просмотров и откликов.",
  keywords: "фото квартиры для авито, фото для объявления авито, улучшить фото квартиры, профессиональные фото авито",
};

export default function FotoKvartiryDlyaAvito() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold lg:text-4xl">
        Фото квартиры для Авито — профессиональное качество за 30 секунд
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Качественные фотографии — главный фактор успеха объявления на Авито.
        По статистике, объявления с профессиональными фото получают в 3-5 раз
        больше просмотров и откликов. Наш AI-сервис <strong>ФотоЭстейт</strong>{" "}
        позволяет превратить обычное фото с телефона в привлекательное
        изображение за секунды.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Почему важны хорошие фото на Авито?</h2>
      <ul className="mt-4 space-y-3 text-gray-600">
        <li className="flex items-start gap-3">
          <span className="mt-1 text-accent-500">&#9679;</span>
          <span>Первое впечатление формируется по фото — покупатель решает за 2 секунды, открывать объявление или нет</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-accent-500">&#9679;</span>
          <span>Профессиональные фото повышают доверие к продавцу</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-accent-500">&#9679;</span>
          <span>Яркие и чистые фото выделяются в ленте среди сотен однотипных объявлений</span>
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold">Что делает наш AI?</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { title: "Коррекция освещения", desc: "Автоматически выравнивает свет, убирает тёмные углы" },
          { title: "HDR-эффект", desc: "Делает фото ярким и объёмным, как у профессионального фотографа" },
          { title: "Удаление шума", desc: "Убирает зернистость с фото, сделанных при слабом освещении" },
          { title: "Увеличение резкости", desc: "Детали интерьера становятся чёткими и выразительными" },
        ].map((item) => (
          <div key={item.title} className="card">
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-accent-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Попробуйте бесплатно</h2>
        <p className="mt-2 text-gray-600">
          2 бесплатных генерации без регистрации
        </p>
        <Link href="/generate" className="btn-primary mt-4 inline-block">
          Улучшить фото для Авито
        </Link>
      </div>
    </div>
  );
}

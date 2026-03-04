import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Улучшение фото недвижимости — AI-обработка для риелторов | ФотоЭстейт",
  description:
    "AI-улучшение фотографий недвижимости для риелторов и собственников. Профессиональное качество без фотографа. HDR, коррекция света, увеличение резкости.",
  keywords: "улучшение фото недвижимости, обработка фото квартир, фото для риелторов, AI обработка фото",
};

export default function UluchshenieFotoNedvizhimosti() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold lg:text-4xl">
        Улучшение фото недвижимости с помощью AI
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Профессиональный фотограф недвижимости берёт от 5 000 ₽ за съёмку
        одной квартиры. С ФотоЭстейт вы получите сравнимое качество за
        считанные рубли и секунды — просто загрузите фото с телефона.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Для кого этот сервис?</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: "Риелторы", desc: "Быстро готовьте фото для десятков объектов без найма фотографа" },
          { title: "Собственники", desc: "Продайте или сдайте квартиру быстрее с привлекательными фото" },
          { title: "Агентства", desc: "Стандартизируйте качество фото по всему портфелю объектов" },
        ].map((item) => (
          <div key={item.title} className="card text-center">
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">Что умеет AI ФотоЭстейт?</h2>
      <ul className="mt-4 space-y-2 text-gray-600">
        <li>&#10003; Автоматическая коррекция баланса белого и экспозиции</li>
        <li>&#10003; HDR-обработка для максимальной детализации</li>
        <li>&#10003; Увеличение разрешения до 2x</li>
        <li>&#10003; Удаление шума и артефактов сжатия</li>
        <li>&#10003; Выравнивание вертикалей (перспективная коррекция)</li>
      </ul>

      <div className="mt-12 rounded-2xl bg-accent-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Улучшите фото прямо сейчас</h2>
        <p className="mt-2 text-gray-600">Бесплатно, без регистрации, за 30 секунд</p>
        <Link href="/generate" className="btn-primary mt-4 inline-block">
          Улучшить фото
        </Link>
      </div>
    </div>
  );
}

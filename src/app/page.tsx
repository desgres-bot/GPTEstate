import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-1.5 text-sm font-medium text-accent-400">
                AI-технология нового поколения
              </div>
              <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl xl:text-6xl">
                Профессиональные фото для объявлений{" "}
                <span className="text-accent-400">за 30 секунд</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-300 lg:text-xl">
                Загрузите фото квартиры — получите идеальное изображение для
                Авито, ЦИАН или Домклик. Улучшение света, HDR-эффект и
                виртуальный стейджинг с помощью AI.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/generate" className="btn-primary !py-4 !px-8 !text-lg">
                  Попробовать бесплатно
                </Link>
                <Link href="/gallery" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 !py-4 !px-8 !text-lg">
                  Смотреть примеры
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2 бесплатных генерации
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Без регистрации
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Результат за 30 сек
                </div>
              </div>
            </div>

            <div className="relative">
              <BeforeAfterSlider
                beforeSrc="/demo/hero-before.jpg"
                afterSrc="/demo/hero-after.jpg"
                label="Кухня — улучшение фото"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Как это работает</h2>
            <p className="mt-3 text-lg text-gray-500">Три простых шага до идеального фото</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Загрузите фото",
                desc: "Сфотографируйте комнату на телефон или загрузите существующее фото",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
              },
              {
                step: "2",
                title: "Выберите режим",
                desc: 'Улучшение фото для объявления или редизайн комнаты в новом стиле',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                ),
              },
              {
                step: "3",
                title: "Скачайте результат",
                desc: "Получите профессиональное фото за 30 секунд и публикуйте объявление",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                ),
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <div className="mb-2 inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-600">
                  Шаг {item.step}
                </div>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Два мощных режима</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="card !p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                ✨
              </div>
              <h3 className="text-2xl font-bold">Улучшить фото</h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                AI автоматически улучшает освещение, убирает шум, добавляет HDR-эффект
                и делает фото визуально привлекательным для потенциальных покупателей и арендаторов.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Коррекция освещения
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> HDR-эффект
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Увеличение резкости
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Удаление шума
                </li>
              </ul>
            </div>
            <div className="card !p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                🎨
              </div>
              <h3 className="text-2xl font-bold">Редизайн интерьера</h3>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Виртуальный стейджинг — покажите, как будет выглядеть комната
                после ремонта. Выберите один из 5 стилей дизайна и получите
                фотореалистичную визуализацию.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> 5 стилей дизайна
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Сохранение планировки
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Фотореалистичный результат
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Виртуальная меблировка
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { value: "10 000+", label: "Обработанных фото" },
              { value: "30 сек", label: "Среднее время" },
              { value: "2 500+", label: "Риелторов" },
              { value: "4.8/5", label: "Средняя оценка" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold text-accent-500">{stat.value}</div>
                <div className="mt-1 text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Начните получать больше откликов на объявления
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Профессиональные фото увеличивают количество просмотров объявления в 3 раза.
            Попробуйте бесплатно прямо сейчас.
          </p>
          <Link href="/generate" className="btn-primary mt-8 !py-4 !px-10 !text-lg">
            Улучшить фото бесплатно
          </Link>
        </div>
      </section>
    </>
  );
}

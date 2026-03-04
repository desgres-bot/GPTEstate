import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { GALLERY_ITEMS } from "@/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея до/после — ФотоЭстейт",
  description: "Примеры AI-улучшения фотографий квартир и виртуального стейджинга",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold lg:text-4xl">Галерея до / после</h1>
        <p className="mt-3 text-lg text-gray-500">
          Реальные примеры работы нашего AI-сервиса
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {GALLERY_ITEMS.map((item) => (
          <BeforeAfterSlider
            key={item.id}
            beforeSrc={item.before}
            afterSrc={item.after}
            label={item.label}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-500">Хотите такой же результат?</p>
        <Link href="/generate" className="btn-primary mt-4 inline-block">
          Попробовать бесплатно
        </Link>
      </div>
    </div>
  );
}

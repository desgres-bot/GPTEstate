import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Примеры работ — до и после",
  description: "Реальные примеры AI-улучшения фото квартир. Уборка, виртуальная мебель, новый стиль — нажмите на фото, чтобы сравнить до и после. 4 500+ обработанных фото.",
  alternates: { canonical: "https://fotoestate.ru/gallery" },
  openGraph: {
    title: "Примеры работ GPT Estate — до и после",
    description: "Посмотрите как AI превращает обычные фото в продающие.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

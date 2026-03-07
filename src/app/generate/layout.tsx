import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Улучшить фото квартиры — AI-обработка за 30 секунд",
  description:
    "Загрузите фото и получите профессиональный результат за 30 секунд. Уборка, виртуальная мебель, новый стиль, удаление объектов. 2 фото бесплатно.",
  alternates: { canonical: "https://fotoestate.ru/generate" },
  openGraph: {
    title: "Улучшить фото — GPT Estate",
    description: "AI-обработка фото квартир за 30 секунд. Попробуйте бесплатно.",
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

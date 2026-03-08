import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сервисы для риелторов — AI-обработка фото за 30 секунд | GPT Estate",
  description:
    "15 AI-сервисов для риелторов: уборка фото, виртуальная мебель, новый стиль, подготовка к продаже, объявления, сравнение стилей. 2 фото бесплатно.",
  alternates: { canonical: "https://fotoestate.ru/generate" },
  openGraph: {
    title: "AI-сервисы для риелторов — GPT Estate",
    description: "15 AI-инструментов для продажи квартир. Фото, тексты, анализ — всё за 30 секунд.",
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

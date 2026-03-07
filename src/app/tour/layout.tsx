import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Виртуальный тур 360° — создайте панорамный тур бесплатно",
  description:
    "Создайте интерактивный 360° тур по квартире. Загрузите панорамные фото, добавьте переходы между комнатами, получите embed-код для объявления.",
  keywords:
    "виртуальный тур, 360 тур квартира, панорамный тур недвижимость, 3d тур бесплатно",
  alternates: { canonical: "https://fotoestate.ru/tour" },
  openGraph: {
    title: "Виртуальный тур 360° — GPT Estate",
    description:
      "Создайте панорамный тур по квартире за 5 минут. Бесплатно.",
  },
};

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пакетная обработка фото — до 20 фото за раз",
  description:
    "Загрузите до 20 фото квартиры и обработайте все разом. Выберите режим, запустите обработку и скачайте результаты ZIP-архивом.",
  alternates: { canonical: "https://fotoestate.ru/batch" },
  openGraph: {
    title: "Пакетная обработка — GPT Estate",
    description: "До 20 фото за раз. Скачайте результаты ZIP-архивом.",
  },
};

export default function BatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

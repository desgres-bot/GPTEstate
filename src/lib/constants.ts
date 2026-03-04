export const PLANS = [
  {
    id: "free",
    name: "Бесплатно",
    price: 0,
    credits: 2,
    features: [
      "2 генерации",
      "Улучшение фото",
      "Стандартное качество",
    ],
    popular: false,
  },
  {
    id: "basic",
    name: "Базовый",
    price: 299,
    credits: 15,
    features: [
      "15 генераций",
      "Улучшение фото",
      "HD качество",
      "Скачивание без водяного знака",
    ],
    popular: false,
  },
  {
    id: "realtor",
    name: "Риелтор",
    price: 799,
    credits: 50,
    features: [
      "50 генераций",
      "Улучшение фото + Редизайн",
      "HD качество",
      "Виртуальный стейджинг",
      "Приоритетная генерация",
    ],
    popular: true,
  },
  {
    id: "agency",
    name: "Агентство",
    price: 1990,
    credits: 150,
    features: [
      "150 генераций",
      "Все режимы",
      "Максимальное качество",
      "Виртуальный стейджинг",
      "Приоритетная генерация",
      "Поддержка 24/7",
    ],
    popular: false,
  },
] as const;

export const STYLES = [
  { id: "modern", name: "Современный", emoji: "🏢" },
  { id: "scandinavian", name: "Скандинавский", emoji: "🌿" },
  { id: "loft", name: "Лофт", emoji: "🏭" },
  { id: "classic", name: "Классика", emoji: "🏛️" },
  { id: "japanese", name: "Японский", emoji: "🎋" },
] as const;

export const GALLERY_ITEMS = [
  {
    id: 1,
    before: "/demo/before-1.jpg",
    after: "/demo/after-1.jpg",
    mode: "enhance" as const,
    label: "Улучшение фото кухни",
  },
  {
    id: 2,
    before: "/demo/before-2.jpg",
    after: "/demo/after-2.jpg",
    mode: "redesign" as const,
    style: "modern",
    label: "Редизайн гостиной — Современный",
  },
  {
    id: 3,
    before: "/demo/before-3.jpg",
    after: "/demo/after-3.jpg",
    mode: "enhance" as const,
    label: "Улучшение фото спальни",
  },
  {
    id: 4,
    before: "/demo/before-4.jpg",
    after: "/demo/after-4.jpg",
    mode: "redesign" as const,
    style: "scandinavian",
    label: "Редизайн кухни — Скандинавский",
  },
];

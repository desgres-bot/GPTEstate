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
    id: "realtor",
    name: "Риелтор",
    price: 799,
    credits: 50,
    features: [
      "50 генераций",
      "Уборка + Новый стиль",
      "Высокое качество",
      "Виртуальная мебель",
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
      "Виртуальная мебель",
      "Приоритетная генерация",
      "Поддержка каждый день",
    ],
    popular: false,
  },
  {
    id: "premium_pro",
    name: "Профи",
    price: 3990,
    credits: 100,
    features: [
      "100 генераций",
      "Указать что убрать с фото",
      "Точечное удаление объектов",
      "Все режимы + Лучшее качество",
      "Виртуальная мебель",
      "Приоритетная генерация",
      "Персональная поддержка",
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

export const SKY_OPTIONS = [
  { id: "sunny", name: "Солнечное", emoji: "☀️" },
  { id: "sunset", name: "Закатное", emoji: "🌅" },
  { id: "dramatic", name: "Драматичное", emoji: "⛈️" },
  { id: "blue", name: "Чистое голубое", emoji: "🌤️" },
] as const;

export const PLATFORMS = [
  { id: "avito", name: "Авито" },
  { id: "cian", name: "ЦИАН" },
  { id: "domclick", name: "ДомКлик" },
] as const;

export const TONES = [
  { id: "business", name: "Деловой", emoji: "💼" },
  { id: "warm", name: "Тёплый", emoji: "🏡" },
  { id: "selling", name: "Продающий", emoji: "🔥" },
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

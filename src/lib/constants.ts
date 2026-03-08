export const PLANS = [
  {
    id: "free",
    name: "Бесплатно",
    price: 0,
    credits: 2,
    features: [
      "2 генерации",
      "Уборка и улучшение фото",
      "Стандартное качество",
    ],
    popular: false,
  },
  {
    id: "realtor",
    name: "Риелтор",
    price: 2490,
    credits: 50,
    features: [
      "50 генераций",
      "Все 38 возможностей",
      "Виртуальная мебель и ремонт",
      "Описания объектов",
      "Высокое качество",
      "Приоритетная генерация",
    ],
    popular: true,
  },
  {
    id: "agency",
    name: "Агентство",
    price: 6990,
    credits: 150,
    features: [
      "150 генераций",
      "Все 38 возможностей",
      "Пакетная обработка до 20 фото",
      "Описания объектов + соцсети",
      "Максимальное качество",
      "Приоритетная генерация",
      "Поддержка каждый день",
    ],
    popular: false,
  },
  {
    id: "premium_pro",
    name: "Профи",
    price: 5990,
    credits: 100,
    features: [
      "100 генераций",
      "Все 38 возможностей",
      "Точечное удаление объектов",
      "Правки голосом (доработка)",
      "Сравнение 4 стилей",
      "Лучшее качество",
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
  { id: "minimalist", name: "Минимализм", emoji: "◻️" },
  { id: "boho", name: "Бохо", emoji: "🌸" },
  { id: "provence", name: "Прованс", emoji: "💐" },
  { id: "artdeco", name: "Арт-деко", emoji: "✨" },
  { id: "hightech", name: "Хай-тек", emoji: "🔲" },
  { id: "country", name: "Кантри", emoji: "🏡" },
  { id: "eco", name: "Эко", emoji: "🌱" },
  { id: "industrial", name: "Индустриальный", emoji: "⚙️" },
  { id: "mediterranean", name: "Средиземноморский", emoji: "🏖️" },
  { id: "retro", name: "Ретро", emoji: "📻" },
  { id: "neoclassic", name: "Неоклассика", emoji: "🏛️" },
  { id: "midcentury", name: "Мид-сенчури", emoji: "🪑" },
  { id: "coastal", name: "Морской", emoji: "🐚" },
  { id: "farmhouse", name: "Фермерский", emoji: "🌾" },
  { id: "rustic", name: "Рустик", emoji: "🪵" },
  { id: "glam", name: "Гламур", emoji: "💎" },
  { id: "transitional", name: "Переходный", emoji: "🔄" },
  { id: "baroque", name: "Барокко", emoji: "👑" },
  { id: "fusion", name: "Фьюжн", emoji: "🎨" },
  { id: "ethnic", name: "Этника", emoji: "🌍" },
  { id: "custom", name: "Свой стиль", emoji: "✏️" },
] as const;

export const SKY_OPTIONS = [
  { id: "sunny", name: "Солнечное", emoji: "☀️" },
  { id: "sunset", name: "Закатное", emoji: "🌅" },
  { id: "dramatic", name: "Драматичное", emoji: "⛈️" },
  { id: "blue", name: "Чистое голубое", emoji: "🌤️" },
] as const;

export const RENOVATION_OPTIONS = [
  { id: "white_walls", name: "Белые стены", emoji: "⬜" },
  { id: "beige_walls", name: "Бежевые стены", emoji: "🟡" },
  { id: "gray_walls", name: "Серые стены", emoji: "🔘" },
  { id: "laminate", name: "Ламинат", emoji: "🟫" },
  { id: "tile", name: "Плитка", emoji: "🔲" },
  { id: "parquet", name: "Паркет", emoji: "🪵" },
  { id: "full_light", name: "Полная (светлая)", emoji: "☀️" },
  { id: "full_dark", name: "Полная (тёмная)", emoji: "🌑" },
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

export const EXTERIOR_STYLES = [
  { id: "modern", name: "Современный", emoji: "🏢" },
  { id: "classic", name: "Классический", emoji: "🏛️" },
  { id: "minimalist", name: "Минималист", emoji: "◻️" },
  { id: "scandinavian", name: "Скандинавский", emoji: "🌿" },
  { id: "mediterranean", name: "Средиземноморский", emoji: "🏖️" },
  { id: "craftsman", name: "Крафтсман", emoji: "🪵" },
  { id: "colonial", name: "Колониальный", emoji: "🏘️" },
  { id: "custom", name: "Свой стиль", emoji: "✏️" },
] as const;

export const LANDSCAPE_OPTIONS = [
  { id: "garden", name: "Сад и цветы", emoji: "🌺" },
  { id: "lawn", name: "Газон", emoji: "🌿" },
  { id: "patio", name: "Патио и терраса", emoji: "🪑" },
  { id: "pool", name: "Бассейн", emoji: "🏊" },
  { id: "lights", name: "Освещение", emoji: "💡" },
  { id: "full", name: "Полный дизайн", emoji: "🏡" },
] as const;

export const WALL_COLORS = [
  { id: "white", name: "Белый", emoji: "⬜", hex: "#FFFFFF" },
  { id: "beige", name: "Бежевый", emoji: "🟡", hex: "#F5E6D3" },
  { id: "gray", name: "Серый", emoji: "🔘", hex: "#B0B0B0" },
  { id: "blue", name: "Голубой", emoji: "🔵", hex: "#A8C8E8" },
  { id: "green", name: "Оливковый", emoji: "🟢", hex: "#8B9A6B" },
  { id: "terracotta", name: "Терракота", emoji: "🟤", hex: "#C4735A" },
  { id: "lavender", name: "Лавандовый", emoji: "🟣", hex: "#B8A9C9" },
  { id: "sage", name: "Шалфей", emoji: "🌿", hex: "#B2AC88" },
  { id: "navy", name: "Тёмно-синий", emoji: "🫐", hex: "#2C3E6B" },
  { id: "custom", name: "Свой цвет", emoji: "✏️", hex: "#888888" },
] as const;

export const SOCIAL_PLATFORMS = [
  { id: "instagram", name: "Instagram", emoji: "📸" },
  { id: "vk", name: "ВКонтакте", emoji: "💬" },
  { id: "telegram", name: "Telegram", emoji: "✈️" },
  { id: "facebook", name: "Facebook", emoji: "👤" },
] as const;

export const FLOORING_OPTIONS = [
  { id: "laminate", name: "Ламинат", emoji: "🟫" },
  { id: "parquet", name: "Паркет", emoji: "🪵" },
  { id: "tile", name: "Плитка", emoji: "🔲" },
  { id: "marble", name: "Мрамор", emoji: "⬜" },
  { id: "vinyl", name: "Винил", emoji: "🟦" },
  { id: "concrete", name: "Бетон", emoji: "🔘" },
  { id: "carpet", name: "Ковролин", emoji: "🟤" },
  { id: "custom", name: "Свой вариант", emoji: "✏️" },
] as const;

export const KITCHEN_STYLES = [
  { id: "modern_white", name: "Белая современная", emoji: "⬜" },
  { id: "modern_dark", name: "Тёмная современная", emoji: "⬛" },
  { id: "classic_wood", name: "Классика дерево", emoji: "🪵" },
  { id: "scandinavian", name: "Скандинавская", emoji: "🌿" },
  { id: "industrial", name: "Индустриальная", emoji: "⚙️" },
  { id: "shaker", name: "Шейкер", emoji: "🏡" },
  { id: "custom", name: "Свой стиль", emoji: "✏️" },
] as const;

export const SEASON_OPTIONS = [
  { id: "spring", name: "Весна", emoji: "🌸" },
  { id: "summer", name: "Лето", emoji: "☀️" },
  { id: "autumn", name: "Осень", emoji: "🍂" },
  { id: "winter", name: "Зима", emoji: "❄️" },
] as const;

export const DECOR_OPTIONS = [
  { id: "newyear", name: "Новый год", emoji: "🎄" },
  { id: "christmas", name: "Рождество", emoji: "🎅" },
  { id: "halloween", name: "Хэллоуин", emoji: "🎃" },
  { id: "easter", name: "Пасха", emoji: "🐣" },
  { id: "birthday", name: "День рождения", emoji: "🎂" },
  { id: "romantic", name: "Романтика", emoji: "💕" },
] as const;

export const COMMERCIAL_TYPES = [
  { id: "office", name: "Офис", emoji: "🏢" },
  { id: "restaurant", name: "Ресторан", emoji: "🍽️" },
  { id: "cafe", name: "Кафе", emoji: "☕" },
  { id: "retail", name: "Магазин", emoji: "🛍️" },
  { id: "hotel", name: "Отель", emoji: "🏨" },
  { id: "coworking", name: "Коворкинг", emoji: "💻" },
  { id: "gym", name: "Фитнес", emoji: "🏋️" },
  { id: "salon", name: "Салон красоты", emoji: "💇" },
] as const;

export const BATHROOM_STYLES = [
  { id: "modern_white", name: "Белая современная", emoji: "⬜" },
  { id: "marble", name: "Мрамор", emoji: "🪨" },
  { id: "industrial", name: "Индустриальная", emoji: "⚙️" },
  { id: "wood", name: "Дерево", emoji: "🪵" },
  { id: "minimalist", name: "Минимализм", emoji: "◻️" },
  { id: "classic", name: "Классика", emoji: "🏛️" },
  { id: "custom", name: "Свой стиль", emoji: "✏️" },
] as const;

export const COMPARE_STYLES = [
  { id: "modern", name: "Современный", emoji: "🏢" },
  { id: "scandinavian", name: "Скандинавский", emoji: "🌿" },
  { id: "loft", name: "Лофт", emoji: "🏭" },
  { id: "classic", name: "Классика", emoji: "🏛️" },
] as const;

export const BLOG_CATEGORIES = [
  { id: "guides", name: "Руководства", emoji: "📖" },
  { id: "tips", name: "Советы", emoji: "💡" },
  { id: "comparisons", name: "Сравнения", emoji: "⚖️" },
  { id: "technology", name: "Технологии", emoji: "🤖" },
  { id: "market", name: "Рынок", emoji: "📊" },
] as const;

export const TOUR_CONFIG = {
  maxScenes: 20,
  defaultHfov: 110,
  autoRotateSpeed: 2,
  compass: true,
} as const;

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

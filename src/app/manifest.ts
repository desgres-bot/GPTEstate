import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPT Estate — AI-улучшение фото недвижимости",
    short_name: "GPT Estate",
    description:
      "Профессиональные фото для объявлений недвижимости за 30 секунд",
    start_url: "/generate",
    display: "standalone",
    background_color: "#1E1B18",
    theme_color: "#D4654B",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

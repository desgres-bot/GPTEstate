export type Mode =
  | "enhance" | "staging" | "redesign" | "remove"
  | "describe" | "dusk" | "sky"
  | "score" | "analyze" | "renovation";

export type Style =
  | "modern" | "scandinavian" | "loft" | "classic" | "japanese"
  | "minimalist" | "boho" | "provence" | "artdeco" | "hightech"
  | "country" | "eco" | "industrial" | "mediterranean" | "retro"
  | "neoclassic" | "midcentury" | "coastal" | "farmhouse" | "rustic"
  | "glam" | "transitional" | "baroque" | "fusion" | "ethnic"
  | "custom";

export type SkyType = "sunny" | "sunset" | "dramatic" | "blue";

export type RenovationType = "white_walls" | "beige_walls" | "gray_walls" | "laminate" | "tile" | "parquet" | "full_light" | "full_dark";

export type Platform = "avito" | "cian" | "domclick";

export type Tone = "business" | "warm" | "selling";

export type PlanId = "free" | "basic" | "realtor" | "agency";

export interface User {
  id: string;
  email: string;
  credits: number;
  plan: PlanId;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  input_image_url: string;
  output_image_url: string;
  mode: Mode;
  style?: Style;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  plan: PlanId;
  status: "pending" | "succeeded" | "canceled";
  created_at: string;
}

// Tour types
export interface TourHotspot {
  id: string;
  pitch: number;
  yaw: number;
  targetSceneId: string;
  text: string;
}

export interface TourScene {
  id: string;
  title: string;
  imageUrl: string;
  hotspots: TourHotspot[];
}

export interface Tour {
  id: string;
  title: string;
  scenes: TourScene[];
  createdAt: string;
}

// Blog types
export type BlogCategory = "guides" | "tips" | "comparisons" | "technology" | "market";

export interface BlogSection {
  type: "heading" | "paragraph" | "list" | "image" | "cta" | "quote";
  content: string;
  items?: string[];
  level?: 2 | 3;
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  heroImage: string;
  content: BlogSection[];
  relatedSlugs: string[];
  faq: { q: string; a: string }[];
}

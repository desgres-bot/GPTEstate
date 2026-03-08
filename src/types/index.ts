export type Mode =
  | "enhance" | "staging" | "redesign" | "remove"
  | "describe" | "dusk" | "sky"
  | "score" | "analyze" | "renovation"
  | "checklist" | "listing" | "compare"
  | "exterior" | "landscape" | "wallcolor" | "lighting"
  | "perspective" | "upscale" | "watermark" | "furnish"
  | "social" | "floorplan"
  | "flooring" | "kitchen" | "season" | "decor"
  | "commercial" | "compliance" | "textrender" | "repaircost"
  | "vacant" | "declutter"
  | "bathroom" | "additem" | "greenify"
  | "refine";

export type FlooringType = "laminate" | "parquet" | "tile" | "marble" | "vinyl" | "concrete" | "carpet" | "custom";
export type KitchenStyle = "modern_white" | "modern_dark" | "classic_wood" | "scandinavian" | "industrial" | "shaker" | "custom";
export type SeasonType = "spring" | "summer" | "autumn" | "winter";
export type DecorType = "newyear" | "christmas" | "halloween" | "easter" | "birthday" | "romantic";
export type CommercialType = "office" | "restaurant" | "cafe" | "retail" | "hotel" | "coworking" | "gym" | "salon";

export type BathroomStyle = "modern_white" | "marble" | "industrial" | "wood" | "minimalist" | "classic" | "custom";

export type Style =
  | "modern" | "scandinavian" | "loft" | "classic" | "japanese"
  | "minimalist" | "boho" | "provence" | "artdeco" | "hightech"
  | "country" | "eco" | "industrial" | "mediterranean" | "retro"
  | "neoclassic" | "midcentury" | "coastal" | "farmhouse" | "rustic"
  | "glam" | "transitional" | "baroque" | "fusion" | "ethnic"
  | "custom";

export type SkyType = "sunny" | "sunset" | "dramatic" | "blue";

export type RenovationType = "white_walls" | "beige_walls" | "gray_walls" | "laminate" | "tile" | "parquet" | "full_light" | "full_dark";

export type ExteriorStyle = "modern" | "classic" | "minimalist" | "scandinavian" | "mediterranean" | "craftsman" | "colonial" | "custom";

export type LandscapeType = "garden" | "lawn" | "patio" | "pool" | "lights" | "full";

export type WallColor = "white" | "beige" | "gray" | "blue" | "green" | "terracotta" | "lavender" | "sage" | "navy" | "custom";

export type SocialPlatform = "instagram" | "vk" | "telegram" | "facebook";

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

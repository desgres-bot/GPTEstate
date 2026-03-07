export type Mode = "enhance" | "redesign" | "remove";

export type Style = "modern" | "scandinavian" | "loft" | "classic" | "japanese";

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

export interface Post {
  day: number;
  platform: "instagram" | "linkedin" | "tiktok";
  category: string;
  topic: string;
  hook: string;
  body: string;
  hashtags: string[];
  imagePrompt: string;
  status?: "draft" | "ready" | "scheduled";
}

export interface BrandProfile {
  brandName: string;
  niche: string;
  description: string;
  audience: string;
  tone: string;
  platform: "instagram" | "linkedin" | "tiktok" | "all";
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  badge?: string;
}

export interface Testimonial {
  author: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface Problem {
  title: string;
  description: string;
  highlight?: boolean;
}

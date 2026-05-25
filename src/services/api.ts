import { Post, BrandProfile } from "../types";

export interface HealthCheckResponse {
  status: string;
  hasGemini: boolean;
  timestamp: string;
}

export interface GeneratePostsResponse {
  success: boolean;
  mode: string;
  posts: Post[];
  error?: string;
}

/**
 * Service Layer for DA VOZ client applications
 */
export const ApiService = {
  /**
   * Health Check with modern fallbacks
   */
  async checkHealth(): Promise<HealthCheckResponse> {
    const response = await fetch("/api/health");
    if (!response.ok) {
      throw new Error("Network health check failed");
    }
    return response.json();
  },

  /**
   * Post Copier / Copywriter generator request proxy
   */
  async generatePosts(
    profile: BrandProfile,
    count: number
  ): Promise<GeneratePostsResponse> {
    const response = await fetch("/api/generate-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandName: profile.brandName,
        niche: profile.niche,
        description: profile.description,
        audience: profile.audience,
        tone: profile.tone,
        platform: profile.platform,
        count: count,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate posts: ${response.statusText}`);
    }

    return response.json();
  },
};

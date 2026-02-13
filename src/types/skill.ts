export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  author: string;
  authorUrl?: string;
  githubUrl?: string;
  skillUrl: string; // SKILL.md 的 URL
  installCount: number;
  rating: number;
  ratingCount: number;
  platform: 'openclaw' | 'claude' | 'universal';
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count?: number;
}

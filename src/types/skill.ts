export interface SkillRequirements {
  env?: string[];           // 需要的环境变量，如 ['NOTION_API_KEY', 'OPENAI_API_KEY']
  tools?: string[];         // 需要的命令行工具，如 ['ffmpeg', 'imagemagick']
  platform?: string[];      // 支持的平台，如 ['macos', 'linux', 'windows']
  auth?: string[];          // 需要的认证/账号，如 ['GitHub account', 'Notion integration']
  config?: string[];        // 需要的配置文件，如 ['~/.config/notion/api_key']
  note?: string;            // 额外说明
}

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
  requires?: SkillRequirements;  // 安装/使用需求
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

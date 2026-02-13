import { Category } from '@/types/skill';

export const categories: Category[] = [
  {
    id: '1',
    name: '生产力',
    slug: 'productivity',
    icon: '🔧',
    description: '提升工作效率的工具',
  },
  {
    id: '2',
    name: '开发工具',
    slug: 'development',
    icon: '💻',
    description: '编程、部署、调试相关',
  },
  {
    id: '3',
    name: '数据分析',
    slug: 'data',
    icon: '📊',
    description: '数据处理、可视化、分析',
  },
  {
    id: '4',
    name: '内容创作',
    slug: 'creative',
    icon: '🎨',
    description: '写作、设计、多媒体',
  },
  {
    id: '5',
    name: '信息获取',
    slug: 'information',
    icon: '🌐',
    description: '天气、新闻、搜索、翻译',
  },
  {
    id: '6',
    name: '自动化',
    slug: 'automation',
    icon: '🤖',
    description: '定时任务、工作流、监控',
  },
  {
    id: '7',
    name: '金融财务',
    slug: 'finance',
    icon: '💰',
    description: '股票、加密货币、记账',
  },
  {
    id: '8',
    name: '通讯社交',
    slug: 'communication',
    icon: '💬',
    description: '消息、邮件、社交平台',
  },
  {
    id: '9',
    name: '智能家居',
    slug: 'smart-home',
    icon: '🏠',
    description: '设备控制、家庭自动化',
  },
  {
    id: '10',
    name: '娱乐',
    slug: 'entertainment',
    icon: '🎮',
    description: '游戏、音乐、趣味工具',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

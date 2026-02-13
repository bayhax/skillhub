import { MetadataRoute } from 'next';
import { skills } from '@/data/skills';
import { categories } from '@/data/categories';

const siteUrl = 'https://skillhub-teal.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'zh'];
  
  // Base pages for each locale
  const basePages = locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${locale}/skills`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/${locale}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]);

  // Category pages
  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${siteUrl}/${locale}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Skill detail pages
  const skillPages = locales.flatMap((locale) =>
    skills.map((skill) => ({
      url: `${siteUrl}/${locale}/skills/${skill.slug}`,
      lastModified: new Date(skill.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...basePages, ...categoryPages, ...skillPages];
}

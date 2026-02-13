'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Category } from '@/types/skill';

interface CategoryCardProps {
  category: Category;
  count?: number;
}

// Map slug to translation key
const slugToKey: Record<string, string> = {
  'productivity': 'productivity',
  'development': 'development',
  'data': 'data',
  'creative': 'creative',
  'information': 'information',
  'automation': 'automation',
  'finance': 'finance',
  'communication': 'communication',
  'smart-home': 'smartHome',
  'entertainment': 'entertainment',
};

export function CategoryCard({ category, count }: CategoryCardProps) {
  const t = useTranslations('category');
  const key = slugToKey[category.slug] || category.slug;
  
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-center">
        <div className="text-3xl mb-2">{category.icon}</div>
        <h3 className="font-medium text-gray-900 dark:text-white">{t(key)}</h3>
        {count !== undefined && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {count} skills
          </p>
        )}
      </div>
    </Link>
  );
}

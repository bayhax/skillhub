'use client';

import Link from 'next/link';
import { Category } from '@/types/skill';

interface CategoryCardProps {
  category: Category;
  count?: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-center">
        <div className="text-3xl mb-2">{category.icon}</div>
        <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
        {count !== undefined && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {count} skills
          </p>
        )}
      </div>
    </Link>
  );
}

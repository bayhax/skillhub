'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Skill } from '@/types/skill';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const t = useTranslations('skill');
  
  return (
    <Link href={`/skills/${skill.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {skill.name}
          </h3>
          {skill.featured && (
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
              {t('featured')}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
          {skill.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              ⭐ {skill.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              📥 {skill.installCount.toLocaleString()}
            </span>
          </div>
          <span className="text-xs">@{skill.author}</span>
        </div>
      </div>
    </Link>
  );
}

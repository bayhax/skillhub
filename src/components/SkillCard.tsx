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
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
            {skill.name}
          </h3>
          {skill.featured && (
            <span className="flex-shrink-0 text-xs px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded">
              {t('featured')}
            </span>
          )}
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 flex-grow line-clamp-2">
          {skill.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <span>⭐ {skill.rating.toFixed(1)}</span>
            <span>•</span>
            <span>{skill.installCount.toLocaleString()}</span>
          </div>
          <span>@{skill.author}</span>
        </div>
      </div>
    </Link>
  );
}

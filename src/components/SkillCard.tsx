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
      <div className="bg-[#1a1a1f] rounded-xl border border-[#2a2a35] p-5 card-hover h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-white line-clamp-1 text-[15px]">
            {skill.name}
          </h3>
          {skill.featured && (
            <span className="flex-shrink-0 text-[10px] px-2 py-1 gradient-bg text-white rounded-full font-medium">
              HOT
            </span>
          )}
        </div>
        
        <p className="text-[#a1a1aa] text-sm mb-4 flex-grow line-clamp-2 leading-relaxed">
          {skill.description}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 text-[#71717a]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {skill.rating.toFixed(1)}
            </span>
            <span>{skill.installCount.toLocaleString()} installs</span>
          </div>
          <span className="text-[#52525b]">@{skill.author}</span>
        </div>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#09090b] border-t border-[#27272a] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="font-semibold text-white">SkillHub</span>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <Link href="/skills" className="text-[#71717a] hover:text-white transition">
              Skills
            </Link>
            <Link href="/submit" className="text-[#71717a] hover:text-white transition">
              Submit
            </Link>
            <a 
              href="https://github.com/bayhax/skillhub" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#71717a] hover:text-white transition"
            >
              GitHub
            </a>
            <a 
              href="https://docs.openclaw.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#71717a] hover:text-white transition"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#18181b] text-center text-xs text-[#52525b]">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}

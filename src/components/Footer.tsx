'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛠️</span>
            <span className="font-bold text-white">SkillHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about" className="hover:text-white transition">{t('about')}</Link>
            <Link href="/docs" className="hover:text-white transition">{t('docs')}</Link>
            <a href="https://github.com/bayhax/skillhub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}

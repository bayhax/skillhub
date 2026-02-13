'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { searchSkills } from '@/data/skills';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchSkills(query) : [];
  
  const t = useTranslations('search');
  const tHome = useTranslations('home');

  return (
    <>
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <SearchBar placeholder={tHome('searchPlaceholder')} defaultValue={query} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {query ? (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('found', { count: results.length, query })}
            </p>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('noResults')}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                  {t('tryOther')}
                </p>
                <Link href="/skills" className="text-blue-600 hover:text-blue-700">
                  {t('browseAll')}
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t('enterKeyword')}
            </p>
            <Link href="/skills" className="text-blue-600 hover:text-blue-700">
              {t('browseAll')}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tCommon = useTranslations('common');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SkillHub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {tNav('browseSkills')}
            </Link>
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              {tNav('submitSkill')}
            </Link>
          </nav>
        </div>
      </header>

      <Suspense fallback={
        <div className="py-20 text-center text-gray-500">{tCommon('loading')}</div>
      }>
        <SearchContent />
      </Suspense>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          {tFooter('copyright')}
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <SearchBar placeholder={tHome('searchPlaceholder')} defaultValue={query} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {query ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {t('found', { count: results.length, query })}
            </p>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 mb-2">{t('noResults')}</p>
                <p className="text-sm text-gray-400 mb-4">{t('tryOther')}</p>
                <Link href="/skills" className="text-blue-600 hover:text-blue-700 text-sm">
                  {t('browseAll')}
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{t('enterKeyword')}</p>
            <Link href="/skills" className="text-blue-600 hover:text-blue-700 text-sm">
              {t('browseAll')}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  const tCommon = useTranslations('common');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <Suspense fallback={
        <div className="py-20 text-center text-gray-500">{tCommon('loading')}</div>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}

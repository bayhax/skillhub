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
    <div className="flex-1">
      {/* Page Header */}
      <div className="border-b border-[#18181b] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <div className="max-w-xl">
            <SearchBar placeholder={tHome('searchPlaceholder')} defaultValue={query} />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {query ? (
          <>
            <p className="text-sm text-[#71717a] mb-6">
              {t('found', { count: results.length, query })}
            </p>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#18181b] rounded-2xl border border-[#27272a]">
                <p className="text-[#a1a1aa] mb-2">{t('noResults')}</p>
                <p className="text-sm text-[#52525b] mb-6">{t('tryOther')}</p>
                <Link href="/skills" className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition">
                  {t('browseAll')}
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#a1a1aa] mb-6">{t('enterKeyword')}</p>
            <Link href="/skills" className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition">
              {t('browseAll')}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  const tCommon = useTranslations('common');
  
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center text-[#71717a]">{tCommon('loading')}</div>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}

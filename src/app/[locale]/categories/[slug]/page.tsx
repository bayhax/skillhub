'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getSkillsByCategory, skills } from '@/data/skills';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const categorySkills = getSkillsByCategory(slug);
  
  const t = useTranslations('skills');
  const tCat = useTranslations('category');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');

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

  if (!category) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <p className="text-gray-500 mb-6">Category {tCommon('notFound')}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              {tCommon('backHome')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const catKey = slugToKey[category.slug] || category.slug;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tCat(catKey)}
              </h1>
              <p className="text-sm text-gray-500">{tCat(`${catKey}Desc`)}</p>
            </div>
          </div>
          <SearchBar placeholder={tHome('searchPlaceholder')} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            {/* Mobile: Horizontal scroll */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <Link 
                href="/skills"
                className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-700"
              >
                {t('all')} ({skills.length})
              </Link>
              {categories.map(cat => {
                const count = skills.filter(s => s.category === cat.slug).length;
                const key = slugToKey[cat.slug] || cat.slug;
                const isActive = cat.slug === slug;
                return (
                  <Link 
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-full ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {cat.icon} {tCat(key)} ({count})
                  </Link>
                );
              })}
            </div>

            {/* Desktop: Vertical list */}
            <div className="hidden lg:block sticky top-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 px-2">{t('filterByCategory')}</h3>
              <ul className="space-y-0.5">
                <li>
                  <Link 
                    href="/skills"
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm transition"
                  >
                    <span>{t('all')}</span>
                    <span className="text-gray-400">{skills.length}</span>
                  </Link>
                </li>
                {categories.map(cat => {
                  const count = skills.filter(s => s.category === cat.slug).length;
                  const key = slugToKey[cat.slug] || cat.slug;
                  const isActive = cat.slug === slug;
                  return (
                    <li key={cat.id}>
                      <Link 
                        href={`/categories/${cat.slug}`}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition ${
                          isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <span>{cat.icon} {tCat(key)}</span>
                        <span className={isActive ? '' : 'text-gray-400'}>{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('totalSkills', { count: categorySkills.length })}
              </p>
            </div>
            
            {categorySkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categorySkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 mb-4">{t('noSkills')}</p>
                <Link href="/submit" className="text-blue-600 hover:text-blue-700 text-sm">
                  {t('submitFirst')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

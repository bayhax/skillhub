import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { categories } from '@/data/categories';
import { skills } from '@/data/skills';

export default function SkillsPage() {
  const t = useTranslations('skills');
  const tCat = useTranslations('category');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <SearchBar placeholder={tHome('searchPlaceholder')} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories (Hidden on mobile, shown at top) */}
          <aside className="lg:w-56 flex-shrink-0">
            {/* Mobile: Horizontal scroll */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <Link 
                href="/skills"
                className="flex-shrink-0 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full"
              >
                {t('all')} ({skills.length})
              </Link>
              {categories.map(cat => {
                const count = skills.filter(s => s.category === cat.slug).length;
                const key = slugToKey[cat.slug] || cat.slug;
                return (
                  <Link 
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-700"
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
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                  >
                    <span>{t('all')}</span>
                    <span>{skills.length}</span>
                  </Link>
                </li>
                {categories.map(cat => {
                  const count = skills.filter(s => s.category === cat.slug).length;
                  const key = slugToKey[cat.slug] || cat.slug;
                  return (
                    <li key={cat.id}>
                      <Link 
                        href={`/categories/${cat.slug}`}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm transition"
                      >
                        <span>{cat.icon} {tCat(key)}</span>
                        <span className="text-gray-400">{count}</span>
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
                {t('totalSkills', { count: skills.length })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

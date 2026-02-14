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
    <div className="min-h-screen bg-[#111114] flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Page Header */}
        <div className="border-b border-[#1a1a1f] py-10">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <div className="max-w-xl">
              <SearchBar placeholder={tHome('searchPlaceholder')} />
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-56 flex-shrink-0">
              {/* Mobile: Horizontal scroll */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <Link 
                  href="/skills"
                  className="flex-shrink-0 px-4 py-2 gradient-bg text-white text-sm rounded-full font-medium"
                >
                  {t('all')}
                </Link>
                {categories.map(cat => {
                  const key = slugToKey[cat.slug] || cat.slug;
                  return (
                    <Link 
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex-shrink-0 px-4 py-2 bg-[#1a1a1f] text-[#a1a1aa] hover:text-white text-sm rounded-full transition"
                    >
                      {cat.icon} {tCat(key)}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop: Vertical list */}
              <div className="hidden lg:block sticky top-20">
                <h3 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-4">
                  {t('filterByCategory')}
                </h3>
                <div className="space-y-1">
                  <Link 
                    href="/skills"
                    className="block px-4 py-2.5 gradient-bg text-white text-sm rounded-lg font-medium"
                  >
                    {t('all')} ({skills.length})
                  </Link>
                  {categories.map(cat => {
                    const key = slugToKey[cat.slug] || cat.slug;
                    const count = skills.filter(s => s.category === cat.slug).length;
                    return (
                      <Link 
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1f] text-sm rounded-lg transition"
                      >
                        <span>{cat.icon} {tCat(key)}</span>
                        <span className="text-[#52525b]">{count}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Skills Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#71717a]">
                  {t('totalSkills', { count: skills.length })}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

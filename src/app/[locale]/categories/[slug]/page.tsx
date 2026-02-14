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
      <div className="min-h-screen bg-[#13131a] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-[#71717a] mb-6">Category {tCommon('notFound')}</p>
            <Link href="/" className="text-[#6366f1] hover:text-[#818cf8] transition">
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
    <div className="min-h-screen bg-[#13131a] flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Page Header */}
        <div className="border-b border-[#1c1c24] py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#1c1c24] rounded-xl flex items-center justify-center text-3xl border border-[#2d2d3a]">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {tCat(catKey)}
                </h1>
                <p className="text-sm text-[#71717a] mt-1">{tCat(`${catKey}Desc`)}</p>
              </div>
            </div>
            <div className="max-w-xl">
              <SearchBar placeholder={tHome('searchPlaceholder')} />
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-56 flex-shrink-0">
              {/* Mobile: Horizontal scroll */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <Link 
                  href="/skills"
                  className="flex-shrink-0 px-4 py-2 bg-[#1c1c24] text-[#a1a1aa] text-sm rounded-full border border-[#2d2d3a]"
                >
                  {t('all')}
                </Link>
                {categories.map(cat => {
                  const key = slugToKey[cat.slug] || cat.slug;
                  const isActive = cat.slug === slug;
                  return (
                    <Link 
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className={`flex-shrink-0 px-4 py-2 text-sm rounded-full transition ${
                        isActive 
                          ? 'gradient-bg text-white font-medium' 
                          : 'bg-[#1c1c24] text-[#a1a1aa] border border-[#2d2d3a] hover:text-white'
                      }`}
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
                    className="flex items-center justify-between px-4 py-2.5 text-[#a1a1aa] hover:text-white hover:bg-[#1c1c24] text-sm rounded-lg transition"
                  >
                    <span>{t('all')}</span>
                    <span className="text-[#52525b]">{skills.length}</span>
                  </Link>
                  {categories.map(cat => {
                    const count = skills.filter(s => s.category === cat.slug).length;
                    const key = slugToKey[cat.slug] || cat.slug;
                    const isActive = cat.slug === slug;
                    return (
                      <Link 
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition ${
                          isActive 
                            ? 'gradient-bg text-white font-medium' 
                            : 'text-[#a1a1aa] hover:text-white hover:bg-[#1c1c24]'
                        }`}
                      >
                        <span>{cat.icon} {tCat(key)}</span>
                        <span className={isActive ? 'text-white/70' : 'text-[#52525b]'}>{count}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#71717a]">
                  {t('totalSkills', { count: categorySkills.length })}
                </p>
              </div>
              
              {categorySkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorySkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#1c1c24] rounded-2xl border border-[#2d2d3a]">
                  <p className="text-[#a1a1aa] mb-4">{t('noSkills')}</p>
                  <Link href="/submit" className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition">
                    {t('submitFirst')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WebsiteJsonLd, ItemListJsonLd } from '@/components/JsonLd';
import { categories } from '@/data/categories';
import { getFeaturedSkills, getPopularSkills, skills } from '@/data/skills';

const siteUrl = 'https://skillhub-teal.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: 'SkillHub - ' + t('title'),
    description: t('subtitle'),
  };
}

export default function Home() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const tCat = useTranslations('category');
  
  const featuredSkills = getFeaturedSkills().slice(0, 6);
  const popularSkills = getPopularSkills(6);
  
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <WebsiteJsonLd
        url={siteUrl}
        name="SkillHub - AI Agent Skills Marketplace"
        description="Discover and install 150+ AI Agent skills. Add new capabilities to your OpenClaw Agent with one click."
      />
      <ItemListJsonLd
        name="Featured AI Agent Skills"
        description="Top-rated skills for OpenClaw AI agents"
        items={featuredSkills.map((skill, index) => ({
          name: skill.name,
          url: `${siteUrl}/en/skills/${skill.slug}`,
          position: index + 1,
        }))}
      />
      <Header />

      {/* Hero - Cleaner */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar placeholder={t('searchPlaceholder')} />
          </div>
          <p className="mt-4 text-blue-200 text-sm">
            {t('skillsCount', { count: skills.length })} · {t('fromCommunity')}
          </p>
        </div>
      </section>

      {/* Categories - Horizontal scroll on mobile */}
      <section className="py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('browseCategories')}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible scrollbar-hide">
            {categories.map(cat => {
              const key = slugToKey[cat.slug] || cat.slug;
              const count = skills.filter(s => s.category === cat.slug).length;
              return (
                <Link 
                  key={cat.id} 
                  href={`/categories/${cat.slug}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition"
                >
                  <span>{cat.icon}</span>
                  <span>{tCat(key)}</span>
                  <span className="text-gray-400 dark:text-gray-500">({count})</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('featuredSkills')}</h2>
            <Link href="/skills?filter=featured" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {tCommon('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('popularSkills')}</h2>
            <Link href="/skills?sort=popular" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {tCommon('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Simplified */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-10">
            {t('howToUse')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
                🔍
              </div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{t('step1Title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
                📋
              </div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{t('step2Title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
                ✨
              </div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{t('step3Title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            {t('ctaDesc')}
          </p>
          <Link 
            href="/submit"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition text-sm"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

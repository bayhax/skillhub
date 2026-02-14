import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
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
    <div className="min-h-screen bg-[#13131a] flex flex-col">
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

      <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 blur-3xl rounded-full" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c24] border border-[#2d2d3a] text-xs text-[#a1a1aa] mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {skills.length}+ Skills Available
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Supercharge Your </span>
            <span className="gradient-text">AI Agent</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          
          <div className="max-w-xl mx-auto">
            <SearchBar placeholder={t('searchPlaceholder')} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-[#1c1c24]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">{t('browseCategories')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map(cat => {
              const key = slugToKey[cat.slug] || cat.slug;
              const count = skills.filter(s => s.category === cat.slug).length;
              return (
                <Link 
                  key={cat.id} 
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 bg-[#1c1c24] hover:bg-[#2d2d3a] border border-[#2d2d3a] hover:border-[#3d3d4a] rounded-xl transition-all"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="text-center">
                    <span className="block text-sm font-medium text-white group-hover:text-white">
                      {tCat(key)}
                    </span>
                    <span className="text-xs text-[#71717a]">{count} skills</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">{t('featuredSkills')}</h2>
              <p className="text-[#71717a] text-sm mt-1">Hand-picked by our team</p>
            </div>
            <Link 
              href="/skills?filter=featured" 
              className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition"
            >
              {tCommon('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-16 bg-[#0f0f11]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">{t('popularSkills')}</h2>
              <p className="text-[#71717a] text-sm mt-1">Most installed this month</p>
            </div>
            <Link 
              href="/skills?sort=popular" 
              className="text-[#6366f1] hover:text-[#818cf8] text-sm font-medium transition"
            >
              {tCommon('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">{t('howToUse')}</h2>
            <p className="text-[#71717a]">Get started in seconds</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-[#1c1c24] rounded-2xl border border-[#2d2d3a]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{t('step1Title')}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{t('step1Desc')}</p>
            </div>
            <div className="text-center p-8 bg-[#1c1c24] rounded-2xl border border-[#2d2d3a]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{t('step2Title')}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{t('step2Desc')}</p>
            </div>
            <div className="text-center p-8 bg-[#1c1c24] rounded-2xl border border-[#2d2d3a]">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{t('step3Title')}</h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-[#a1a1aa] mb-8 max-w-lg mx-auto">
            {t('ctaDesc')}
          </p>
          <Link 
            href="/submit"
            className="inline-block btn-primary text-white px-8 py-3.5 rounded-xl font-medium text-base"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}

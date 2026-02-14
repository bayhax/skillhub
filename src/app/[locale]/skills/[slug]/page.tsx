'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getSkillBySlug, getSkillsByCategory } from '@/data/skills';
import { getCategoryBySlug } from '@/data/categories';
import { SkillCard } from '@/components/SkillCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const skill = getSkillBySlug(slug);
  const [copied, setCopied] = useState(false);
  
  const t = useTranslations('skill');
  const tCommon = useTranslations('common');
  const tCat = useTranslations('category');

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

  if (!skill) {
    return (
      <div className="min-h-screen bg-[#09090b]">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-[#71717a] mb-6">Skill {tCommon('notFound')}</p>
            <Link href="/" className="text-[#6366f1] hover:text-[#818cf8] transition">
              {tCommon('backHome')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = getCategoryBySlug(skill.category);
  const relatedSkills = getSkillsByCategory(skill.category)
    .filter(s => s.id !== skill.id)
    .slice(0, 3);

  const installCommand = `Read ${skill.skillUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-[#18181b]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="text-sm text-[#52525b]">
            <Link href="/" className="hover:text-[#a1a1aa] transition">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/skills" className="hover:text-[#a1a1aa] transition">Skills</Link>
            {category && (
              <>
                <span className="mx-2">›</span>
                <Link href={`/categories/${category.slug}`} className="hover:text-[#a1a1aa] transition">
                  {tCat(slugToKey[category.slug] || category.slug)}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold text-white">
                  {skill.name}
                </h1>
                {skill.featured && (
                  <span className="flex-shrink-0 text-xs px-3 py-1 gradient-bg text-white rounded-full font-medium">
                    HOT
                  </span>
                )}
              </div>
              <p className="text-[#a1a1aa] mb-5 leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#71717a]">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {skill.rating.toFixed(1)}
                </span>
                <span>•</span>
                <span>{skill.installCount.toLocaleString()} {t('installs')}</span>
                <span>•</span>
                <span>@{skill.author}</span>
              </div>
            </div>

            {/* Install Card */}
            <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📋</span>
                {t('installCommand')}
              </h2>
              <div className="bg-[#0f0f11] rounded-xl p-4 mb-4 overflow-x-auto border border-[#27272a]">
                <code className="text-[#22c55e] text-sm font-mono">
                  {installCommand}
                </code>
              </div>
              <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl font-medium text-sm transition ${
                  copied 
                    ? 'bg-[#22c55e] text-white' 
                    : 'btn-primary text-white'
                }`}
              >
                {copied ? `✓ ${tCommon('copied')}` : t('copyCommand')}
              </button>
              <p className="text-xs text-[#52525b] mt-3 text-center">
                {t('sendToAgent')}
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-lg">🚀</span>
                {t('howToUse')}
              </h2>
              <ol className="space-y-3 text-sm text-[#a1a1aa]">
                {[t('step1'), t('step2'), t('step3'), t('step4')].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 gradient-bg text-white rounded-lg text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Requirements */}
            {skill.requires && (skill.requires.env || skill.requires.tools || skill.requires.platform || skill.requires.auth || skill.requires.config || skill.requires.note) && (
              <div className="bg-[#18181b] rounded-2xl border border-[#f59e0b]/30 p-6">
                <h2 className="font-semibold text-[#f59e0b] mb-4 flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  {t('requirements')}
                </h2>
                <div className="space-y-4 text-sm">
                  {skill.requires.env && skill.requires.env.length > 0 && (
                    <div>
                      <span className="font-medium text-[#a1a1aa]">{t('reqEnv')}:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skill.requires.env.map(env => (
                          <code key={env} className="px-3 py-1 bg-[#27272a] text-[#f59e0b] rounded-lg text-xs font-mono">
                            {env}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                  {skill.requires.auth && skill.requires.auth.length > 0 && (
                    <div>
                      <span className="font-medium text-[#a1a1aa]">{t('reqAuth')}:</span>
                      <ul className="mt-2 space-y-1 text-[#a1a1aa]">
                        {skill.requires.auth.map(auth => (
                          <li key={auth} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                            {auth}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {skill.requires.tools && skill.requires.tools.length > 0 && (
                    <div>
                      <span className="font-medium text-[#a1a1aa]">{t('reqTools')}:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skill.requires.tools.map(tool => (
                          <code key={tool} className="px-3 py-1 bg-[#27272a] text-[#f59e0b] rounded-lg text-xs font-mono">
                            {tool}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                  {skill.requires.config && skill.requires.config.length > 0 && (
                    <div>
                      <span className="font-medium text-[#a1a1aa]">{t('reqConfig')}:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skill.requires.config.map(cfg => (
                          <code key={cfg} className="px-3 py-1 bg-[#27272a] text-[#f59e0b] rounded-lg text-xs font-mono">
                            {cfg}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                  {skill.requires.platform && skill.requires.platform.length > 0 && (
                    <div>
                      <span className="font-medium text-[#a1a1aa]">{t('reqPlatform')}:</span>
                      <span className="ml-2 text-[#a1a1aa]">
                        {skill.requires.platform.join(', ')}
                      </span>
                    </div>
                  )}
                  {skill.requires.note && (
                    <div className="pt-3 border-t border-[#27272a]">
                      <p className="text-[#a1a1aa] italic">{skill.requires.note}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-5">
              <h3 className="font-semibold text-sm text-white mb-4">{t('links')}</h3>
              <div className="space-y-3">
                {skill.githubUrl && (
                  <a 
                    href={skill.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#a1a1aa] hover:text-white transition text-sm"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#27272a] flex items-center justify-center">📦</span>
                    GitHub
                  </a>
                )}
                <a 
                  href={skill.skillUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#a1a1aa] hover:text-white transition text-sm"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#27272a] flex items-center justify-center">📄</span>
                  SKILL.md
                </a>
              </div>
            </div>

            {/* Category */}
            {category && (
              <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-5">
                <h3 className="font-semibold text-sm text-white mb-4">{t('category')}</h3>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="flex items-center gap-3 p-3 -m-3 rounded-xl hover:bg-[#27272a] transition"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-sm text-[#a1a1aa]">{tCat(slugToKey[category.slug] || category.slug)}</span>
                </Link>
              </div>
            )}

            {/* Tags */}
            {skill.tags.length > 0 && (
              <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-5">
                <h3 className="font-semibold text-sm text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1.5 bg-[#27272a] text-[#71717a] rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">
              {t('relatedSkills')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedSkills.map(s => (
                <SkillCard key={s.id} skill={s} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

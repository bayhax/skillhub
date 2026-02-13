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
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <p className="text-gray-500 mb-6">Skill {tCommon('notFound')}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/skills" className="hover:text-gray-600">Skills</Link>
            {category && (
              <>
                <span className="mx-2">›</span>
                <Link href={`/categories/${category.slug}`} className="hover:text-gray-600">
                  {tCat(slugToKey[category.slug] || category.slug)}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {skill.name}
                </h1>
                {skill.featured && (
                  <span className="flex-shrink-0 text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded">
                    {t('featured')}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {skill.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>⭐ {skill.rating.toFixed(1)}</span>
                <span>•</span>
                <span>{skill.installCount.toLocaleString()} {t('installs')}</span>
                <span>•</span>
                <span>@{skill.author}</span>
              </div>
            </div>

            {/* Install Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
                {t('installCommand')}
              </h2>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 mb-3 overflow-x-auto">
                <code className="text-green-400 text-sm whitespace-nowrap">
                  {installCommand}
                </code>
              </div>
              <button
                onClick={handleCopy}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? `✓ ${tCommon('copied')}` : t('copyCommand')}
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {t('sendToAgent')}
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
                {t('howToUse')}
              </h2>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded text-xs flex items-center justify-center font-medium">1</span>
                  <span>{t('step1')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded text-xs flex items-center justify-center font-medium">2</span>
                  <span>{t('step2')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded text-xs flex items-center justify-center font-medium">3</span>
                  <span>{t('step3')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded text-xs flex items-center justify-center font-medium">4</span>
                  <span>{t('step4')}</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Links */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">{t('links')}</h3>
              <div className="space-y-2 text-sm">
                {skill.githubUrl && (
                  <a 
                    href={skill.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                  >
                    📦 GitHub
                  </a>
                )}
                <a 
                  href={skill.skillUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                >
                  📄 SKILL.md
                </a>
              </div>
            </div>

            {/* Category */}
            {category && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">{t('category')}</h3>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="flex items-center gap-2 p-2 -m-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tCat(slugToKey[category.slug] || category.slug)}</span>
                </Link>
              </div>
            )}

            {/* Tags */}
            {skill.tags.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded"
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
          <section className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
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

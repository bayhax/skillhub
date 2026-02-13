'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getSkillBySlug, getSkillsByCategory } from '@/data/skills';
import { getCategoryBySlug } from '@/data/categories';
import { SkillCard } from '@/components/SkillCard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const skill = getSkillBySlug(slug);
  const [copied, setCopied] = useState(false);
  
  const t = useTranslations('skill');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('footer');
  const tCat = useTranslations('category');

  // Map slug to translation key
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Skill {tCommon('notFound')}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            {tCommon('backHome')}
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(skill.category);
  const relatedSkills = getSkillsByCategory(skill.category)
    .filter(s => s.id !== skill.id)
    .slice(0, 4);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SkillHub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {tNav('browseSkills')}
            </Link>
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              {tNav('submitSkill')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/skills" className="hover:text-gray-700 dark:hover:text-gray-200">Skills</Link>
          <span className="mx-2">/</span>
          {category && (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-gray-700 dark:hover:text-gray-200">
                {category.icon} {tCat(slugToKey[category.slug] || category.slug)}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-900 dark:text-white">{skill.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Title & Meta */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
                {skill.featured && (
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                    {t('featured')}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  ⭐ {skill.rating.toFixed(1)} ({skill.ratingCount} {t('ratings')})
                </span>
                <span className="flex items-center gap-1">
                  📥 {skill.installCount.toLocaleString()} {t('installs')}
                </span>
                <span className="flex items-center gap-1">
                  📅 {t('updatedOn')} {skill.updatedAt}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Install Command */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('installCommand')}
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-green-400 text-sm break-all">
                  {installCommand}
                </code>
              </div>
              <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? `✓ ${tCommon('copied')}` : t('copyCommand')}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                {t('sendToAgent')}
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('howToUse')}
              </h2>
              <ol className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                  <span>{t('step1')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                  <span>{t('step2')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                  <span>{t('step3')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                  <span>{t('step4')}</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('developer')}</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">@{skill.author}</p>
                  {skill.authorUrl && (
                    <a href={skill.authorUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
                      {t('viewProfile')}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('links')}</h3>
              <div className="space-y-3">
                {skill.githubUrl && (
                  <a 
                    href={skill.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>📦</span> GitHub
                  </a>
                )}
                <a 
                  href={skill.skillUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <span>📄</span> SKILL.md
                </a>
              </div>
            </div>

            {/* Category */}
            {category && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('category')}</h3>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{tCat(slugToKey[category.slug] || category.slug)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tCat(`${slugToKey[category.slug] || category.slug}Desc`)}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('relatedSkills')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          {tFooter('copyright')}
        </div>
      </footer>
    </div>
  );
}

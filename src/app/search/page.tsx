'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { searchSkills } from '@/data/skills';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchSkills(query) : [];

  return (
    <>
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            搜索结果
          </h1>
          <SearchBar placeholder="搜索 Skills..." defaultValue={query} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {query ? (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              找到 {results.length} 个与 &quot;{query}&quot; 相关的 Skills
            </p>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  没有找到匹配的 Skills
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                  试试其他关键词，或者浏览全部 Skills
                </p>
                <Link href="/skills" className="text-blue-600 hover:text-blue-700">
                  浏览所有 Skills →
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              请输入搜索关键词
            </p>
            <Link href="/skills" className="text-blue-600 hover:text-blue-700">
              或浏览所有 Skills →
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SkillHub</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              浏览 Skills
            </Link>
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              提交 Skill
            </Link>
          </nav>
        </div>
      </header>

      <Suspense fallback={
        <div className="py-20 text-center text-gray-500">加载中...</div>
      }>
        <SearchContent />
      </Suspense>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © 2026 SkillHub. Built for the AI Agent community.
        </div>
      </footer>
    </div>
  );
}

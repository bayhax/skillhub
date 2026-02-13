import Link from 'next/link';
import { SkillCard } from '@/components/SkillCard';
import { SearchBar } from '@/components/SearchBar';
import { categories } from '@/data/categories';
import { skills } from '@/data/skills';

export default function SkillsPage() {
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
            <Link href="/skills" className="text-blue-600 font-medium">
              浏览 Skills
            </Link>
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              提交 Skill
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            浏览所有 Skills
          </h1>
          <SearchBar placeholder="搜索 Skills..." />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">分类筛选</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/skills"
                    className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    <span>全部</span>
                    <span className="text-sm">{skills.length}</span>
                  </Link>
                </li>
                {categories.map(cat => {
                  const count = skills.filter(s => s.category === cat.slug).length;
                  return (
                    <li key={cat.id}>
                      <Link 
                        href={`/categories/${cat.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <span>{cat.icon} {cat.name}</span>
                        <span className="text-sm text-gray-500">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content - Skills Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                共 {skills.length} 个 Skills
              </p>
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
                <option value="popular">按热度排序</option>
                <option value="recent">按最新排序</option>
                <option value="rating">按评分排序</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © 2026 SkillHub. Built for the AI Agent community.
        </div>
      </footer>
    </div>
  );
}

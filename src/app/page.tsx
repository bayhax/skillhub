import Link from 'next/link';
import { SkillCard } from '@/components/SkillCard';
import { CategoryCard } from '@/components/CategoryCard';
import { SearchBar } from '@/components/SearchBar';
import { categories } from '@/data/categories';
import { getFeaturedSkills, getPopularSkills, getRecentSkills, skills } from '@/data/skills';

export default function Home() {
  const featuredSkills = getFeaturedSkills();
  const popularSkills = getPopularSkills(8);
  const recentSkills = getRecentSkills(4);
  
  // Count skills per category
  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    count: skills.filter(s => s.category === cat.slug).length
  }));

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

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Agent Skills Marketplace
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            一键为你的 AI Agent 添加新能力 — 搜索、安装、开始使用
          </p>
          <SearchBar placeholder="搜索天气、GitHub、Notion..." />
          <div className="mt-6 text-blue-200 text-sm">
            已收录 <span className="font-semibold text-white">{skills.length}</span> 个 Skills · 
            来自 <span className="font-semibold text-white">OpenClaw</span> 及社区
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📂 分类浏览</h2>
          <Link href="/categories" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categoriesWithCount.map(category => (
            <CategoryCard key={category.id} category={category} count={category.count} />
          ))}
        </div>
      </section>

      {/* Featured Skills */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 精选 Skills</h2>
          <Link href="/skills?filter=featured" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSkills.slice(0, 8).map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Popular Skills */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📈 最受欢迎</h2>
            <Link href="/skills?sort=popular" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Updated */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🆕 最近更新</h2>
          <Link href="/skills?sort=recent" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            🚀 如何使用
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">1. 搜索 Skill</h3>
              <p className="text-gray-600 dark:text-gray-400">浏览分类或搜索你需要的功能</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">2. 复制命令</h3>
              <p className="text-gray-600 dark:text-gray-400">一键复制安装命令到剪贴板</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">3. 开始使用</h3>
              <p className="text-gray-600 dark:text-gray-400">发送给你的 Agent，立即获得新能力</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          有好用的 Skill？分享给社区！
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          提交你的 Skill 到 SkillHub，让更多人发现和使用
        </p>
        <Link 
          href="/submit"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition text-lg"
        >
          提交 Skill →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-2xl">🛠️</span>
              <span className="text-xl font-bold text-white">SkillHub</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="hover:text-white transition">关于</Link>
              <Link href="/docs" className="hover:text-white transition">文档</Link>
              <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                GitHub
              </a>
              <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Discord
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            © 2026 SkillHub. Built for the AI Agent community.
          </div>
        </div>
      </footer>
    </div>
  );
}

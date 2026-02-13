'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';

export function Header() {
  const tNav = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🛠️</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">SkillHub</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/skills" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            {tNav('browseSkills')}
          </Link>
          <LanguageSwitcher />
          <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition">
            {tNav('submitSkill')}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600 dark:text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-3">
          <Link 
            href="/skills" 
            className="block text-sm text-gray-600 dark:text-gray-400 py-2"
            onClick={() => setMenuOpen(false)}
          >
            {tNav('browseSkills')}
          </Link>
          <Link 
            href="/submit" 
            className="block text-sm bg-blue-600 text-white text-center py-2 rounded-lg font-medium"
            onClick={() => setMenuOpen(false)}
          >
            {tNav('submitSkill')}
          </Link>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}

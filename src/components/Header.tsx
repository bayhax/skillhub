'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';

export function Header() {
  const tNav = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#111114]/80 backdrop-blur-xl border-b border-[#2a2a35] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-[#a1a1aa] transition">
            SkillHub
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/skills" 
            className="text-sm text-[#a1a1aa] hover:text-white transition"
          >
            {tNav('browseSkills')}
          </Link>
          <LanguageSwitcher />
          <Link 
            href="/submit" 
            className="btn-primary text-white text-sm px-5 py-2.5 rounded-lg font-medium"
          >
            {tNav('submitSkill')}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[#a1a1aa] hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#2a2a35] bg-[#111114] px-6 py-4 space-y-4">
          <Link 
            href="/skills" 
            className="block text-sm text-[#a1a1aa] hover:text-white py-2 transition"
            onClick={() => setMenuOpen(false)}
          >
            {tNav('browseSkills')}
          </Link>
          <Link 
            href="/submit" 
            className="block btn-primary text-white text-sm text-center py-3 rounded-lg font-medium"
            onClick={() => setMenuOpen(false)}
          >
            {tNav('submitSkill')}
          </Link>
          <div className="pt-3 border-t border-[#2a2a35]">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}

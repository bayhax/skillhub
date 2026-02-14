'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { categories } from '@/data/categories';

export default function SubmitPage() {
  const t = useTranslations('submit');
  const tCat = useTranslations('category');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    githubUrl: '',
    author: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('errors.descriptionRequired');
    }
    if (!formData.category) {
      newErrors.category = t('errors.categoryRequired');
    }
    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = t('errors.githubRequired');
    } else if (!formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = t('errors.githubInvalid');
    }
    if (!formData.author.trim()) {
      newErrors.author = t('errors.authorRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitted skill:', formData);
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#13131a] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {t('success.title')}
            </h1>
            <p className="text-[#a1a1aa] mb-8">
              {t('success.message')}
            </p>
            <div className="bg-[#1c1c24] rounded-xl border border-[#2d2d3a] p-6 text-left">
              <h3 className="font-semibold text-white mb-4">{t('success.submitted')}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex">
                  <dt className="text-[#71717a] w-24">{t('form.name')}</dt>
                  <dd className="text-white">{formData.name}</dd>
                </div>
                <div className="flex">
                  <dt className="text-[#71717a] w-24">{t('form.author')}</dt>
                  <dd className="text-white">{formData.author}</dd>
                </div>
                <div className="flex">
                  <dt className="text-[#71717a] w-24">{t('form.category')}</dt>
                  <dd className="text-white">
                    {tCat(slugToKey[formData.category] || formData.category)}
                  </dd>
                </div>
              </dl>
            </div>
            <Link
              href="/"
              className="inline-block mt-8 text-[#6366f1] hover:text-[#818cf8] font-medium transition"
            >
              ← {t('success.backHome')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13131a] flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">
            {t('title')}
          </h1>
          <p className="text-[#a1a1aa]">
            {t('subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#a1a1aa] mb-2">
              {t('form.name')} <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('form.namePlaceholder')}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name 
                  ? 'border-[#ef4444] focus:border-[#ef4444]' 
                  : 'border-[#2d2d3a] focus:border-[#6366f1]'
              } bg-[#1c1c24] text-white placeholder-[#52525b] focus:outline-none transition`}
            />
            {errors.name && <p className="mt-2 text-sm text-[#ef4444]">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#a1a1aa] mb-2">
              {t('form.description')} <span className="text-[#ef4444]">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder={t('form.descriptionPlaceholder')}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.description 
                  ? 'border-[#ef4444] focus:border-[#ef4444]' 
                  : 'border-[#2d2d3a] focus:border-[#6366f1]'
              } bg-[#1c1c24] text-white placeholder-[#52525b] focus:outline-none transition resize-none`}
            />
            {errors.description && <p className="mt-2 text-sm text-[#ef4444]">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#a1a1aa] mb-2">
              {t('form.category')} <span className="text-[#ef4444]">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.category 
                  ? 'border-[#ef4444] focus:border-[#ef4444]' 
                  : 'border-[#2d2d3a] focus:border-[#6366f1]'
              } bg-[#1c1c24] text-white focus:outline-none transition cursor-pointer`}
            >
              <option value="" className="bg-[#1c1c24]">{t('form.categoryPlaceholder')}</option>
              {categories.map(cat => {
                const key = slugToKey[cat.slug] || cat.slug;
                return (
                  <option key={cat.id} value={cat.slug} className="bg-[#1c1c24]">
                    {cat.icon} {tCat(key)}
                  </option>
                );
              })}
            </select>
            {errors.category && <p className="mt-2 text-sm text-[#ef4444]">{errors.category}</p>}
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-[#a1a1aa] mb-2">
              {t('form.githubUrl')} <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder={t('form.githubPlaceholder')}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.githubUrl 
                  ? 'border-[#ef4444] focus:border-[#ef4444]' 
                  : 'border-[#2d2d3a] focus:border-[#6366f1]'
              } bg-[#1c1c24] text-white placeholder-[#52525b] focus:outline-none transition`}
            />
            {errors.githubUrl && <p className="mt-2 text-sm text-[#ef4444]">{errors.githubUrl}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-[#a1a1aa] mb-2">
              {t('form.author')} <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder={t('form.authorPlaceholder')}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.author 
                  ? 'border-[#ef4444] focus:border-[#ef4444]' 
                  : 'border-[#2d2d3a] focus:border-[#6366f1]'
              } bg-[#1c1c24] text-white placeholder-[#52525b] focus:outline-none transition`}
            />
            {errors.author && <p className="mt-2 text-sm text-[#ef4444]">{errors.author}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary text-white font-medium py-3.5 px-6 rounded-xl transition"
          >
            {t('form.submit')}
          </button>

          {/* Note */}
          <p className="text-center text-sm text-[#52525b]">
            {t('form.note')}
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}

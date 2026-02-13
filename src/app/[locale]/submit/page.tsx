'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
      // MVP: Just log and show success
      console.log('Submitted skill:', formData);
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('success.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('success.message')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('success.submitted')}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex">
                  <dt className="text-gray-500 dark:text-gray-400 w-24">{t('form.name')}</dt>
                  <dd className="text-gray-900 dark:text-white">{formData.name}</dd>
                </div>
                <div className="flex">
                  <dt className="text-gray-500 dark:text-gray-400 w-24">{t('form.author')}</dt>
                  <dd className="text-gray-900 dark:text-white">{formData.author}</dd>
                </div>
                <div className="flex">
                  <dt className="text-gray-500 dark:text-gray-400 w-24">{t('form.category')}</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {tCat(slugToKey[formData.category] || formData.category)}
                  </dd>
                </div>
              </dl>
            </div>
            <a
              href="/"
              className="inline-block mt-8 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← {t('success.backHome')}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('form.name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('form.namePlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('form.description')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder={t('form.descriptionPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 resize-none`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('form.category')} <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.category 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
            >
              <option value="">{t('form.categoryPlaceholder')}</option>
              {categories.map(cat => {
                const key = slugToKey[cat.slug] || cat.slug;
                return (
                  <option key={cat.id} value={cat.slug}>
                    {cat.icon} {tCat(key)}
                  </option>
                );
              })}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('form.githubUrl')} <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder={t('form.githubPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.githubUrl 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
            />
            {errors.githubUrl && <p className="mt-1 text-sm text-red-500">{errors.githubUrl}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('form.author')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder={t('form.authorPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.author 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
            />
            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            {t('form.submit')}
          </button>

          {/* Note */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t('form.note')}
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}

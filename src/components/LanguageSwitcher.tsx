'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale prefix if present
    let pathWithoutLocale = pathname.replace(/^\/(en|zh)/, '') || '/';
    
    // Navigate to new locale
    if (newLocale === 'en') {
      router.push(pathWithoutLocale);
    } else {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    }
  };

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-gray-300 dark:text-gray-600">/</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={`transition ${
              locale === loc
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {localeNames[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}

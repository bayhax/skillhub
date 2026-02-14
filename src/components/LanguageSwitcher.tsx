'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, localeNames, Locale } from '@/i18n/config';
import Link from 'next/link';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalePath = (newLocale: Locale) => {
    // Remove current locale prefix if present
    const pathWithoutLocale = pathname.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
    
    // For default locale (en), don't add prefix
    if (newLocale === 'en') {
      return pathWithoutLocale || '/';
    }
    // For other locales, add prefix
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-gray-300 dark:text-gray-600">/</span>}
          <Link
            href={getLocalePath(loc)}
            className={`transition ${
              locale === loc
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {localeNames[loc]}
          </Link>
        </span>
      ))}
    </div>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { locales, localeNames, Locale } from '@/i18n/config';
import { Link, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-gray-300 dark:text-gray-600">/</span>}
          <Link
            href={pathname}
            locale={loc}
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

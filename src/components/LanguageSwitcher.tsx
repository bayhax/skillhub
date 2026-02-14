'use client';

import { useLocale } from 'next-intl';
import { locales, localeNames, Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="text-xs bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white focus:outline-none focus:border-[#6366f1] cursor-pointer transition"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc} className="bg-[#18181b]">
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // 默认语言不显示前缀
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    '/((?!api|_next|static|.*\\..*).*)'
  ]
};

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing, Locale } from './routing';

function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

export default getRequestConfig(async ({ locale }) => {
  console.log('Locale from request:', locale); // Log the locale

  if (!isValidLocale(locale)) {
    console.log('Invalid locale:', locale);
    notFound();
  }

  // Validate the locale
  if (!routing.locales.includes(locale)) notFound();

  // Define the pages/components you have translations for
  const pages = ['LandingPage', 'Auth', 'Dashboard', 'Profile', 'Admin'];

  // Initialize messages object
  const messages: Record<string, any> = {};

  // Load translations for each page
  for (const page of pages) {
    try {
      messages[page] = (
        await import(`../dictionaries/${locale}/${page}.json`)
      ).default;
    } catch (error) {
      console.error(
        `Error loading ${page} messages for locale ${locale}:`,
        error
      );
      // Handle missing translations as needed
    }
  }

  return {
    messages,
  };
});

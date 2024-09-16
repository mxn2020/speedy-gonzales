import { useLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { BackToTopProvider } from '@/providers/BackToTopProvider';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import '@/styles/rtl.css';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr';

  // Retrieve messages
  const messages = await getMessages();

  //console.log('messages', messages);

  if (!messages) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir}>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <BackToTopProvider>
              {children}
            </BackToTopProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

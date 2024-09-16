import { useTranslations } from 'next-intl';
import LandingPage from '@/components/landing/LandingPage';
import { Locale } from '@/types';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('LandingPage');

  const dict = {
    metadata: t.raw('metadata') as any,
    header: t.raw('header') as any,
    hero: t.raw('hero') as any,
    features: t.raw('features') as any,
    howItWorks: t.raw('howItWorks') as any,
    pricing: t.raw('pricing') as any,
    testimonials: t.raw('testimonials') as any,
    faq: t.raw('faq') as any,
    blog: t.raw('blog') as any,
    newsletter: t.raw('newsletter') as any,
    cta: t.raw('cta') as any,
    footer: t.raw('footer') as any,
    chat: t.raw('chat') as any,
    backToTop: t.raw('backToTop') as any,
    cookieConsent: t.raw('cookieConsent') as any,
    parallax: t.raw('parallax') as any,
    progressBar: t.raw('progressBar') as any,
    contact: t.raw('contact') as any,
  };

  return <LandingPage dict={dict} locale={locale} />;
}
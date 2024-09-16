import { useTranslations } from 'next-intl';
import { VerifyEmailPage } from '@/components/auth/AuthComponents'
import { Locale } from '@/types'

export default function Page({ params: { locale } }: { params: { locale: Locale } }) {
    const t = useTranslations('Auth');
    const dict = {
        login: t.raw('login') as any,
        register: t.raw('register') as any,
        forgotPassword: t.raw('forgotPassword') as any,
        resetPassword: t.raw('resetPassword') as any,
        waitlist: t.raw('waitlist') as any,
        verifyEmail: t.raw('verifyEmail') as any,
    }
    const isRTL = locale === 'ar' || locale === 'fa'
    const locales = ['ar', 'de', 'en', 'es', 'fa', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh'] as Locale[];

    return <VerifyEmailPage dict={dict} isRTL={isRTL} lang={locale} locales={locales} />

}
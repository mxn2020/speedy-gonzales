import { useTranslations } from 'next-intl';
import { RegisterPage } from '@/components/auth/AuthComponents'
import { Locale } from '@/types'

export default function Page({ params: { locale } }: { params: { locale: Locale } }) {
    const t = useTranslations('Auth');
    const dict = {
        login: t.raw('login') as any,
        register: t.raw('register') as any,
        forgotPassword: t.raw('forgotPassword') as any,
        resetPassword: t.raw('resetPassword') as any,
    }
    const isRTL = locale === 'ar' || locale === 'fa'

    return <RegisterPage dict={dict} isRTL={isRTL} lang={locale} />
}
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Locale } from '@/types'

export const useLanguageSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}`
    router.push(newPath)
  }

  return { switchLanguage }
}
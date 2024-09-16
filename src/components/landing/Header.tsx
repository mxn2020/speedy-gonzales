import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Locale } from '@/types'
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch'
import { useThemeSwitch } from '@/hooks/useThemeSwitch'
import { ThemeSelector } from '../common/ThemeSelector'
import { ThemeToggle } from '../common/ThemeToggle'
import { supabase } from '@/lib/supabaseBrowserClient'
import { Session } from '@supabase/supabase-js'

const languageNames: Record<Locale, string> = {
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  zh: '中文'
}

interface HeaderProps {
  dict: any;
  locale: Locale;
  locales: Locale[];
}

export default function Header({ dict, locale, locales }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, switchTheme } = useThemeSwitch();
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const isRTL = locale === 'ar' || locale === 'fa'

  const { switchLanguage } = useLanguageSwitch();
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    window.location.href = `/${locale}`
  }
  
  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const renderAuthButtons = () => {
    console.log('[Header] Rendering auth buttons, session:', session ? 'Authenticated' : 'Not authenticated');
    if (session) {
      return (
        <Button variant="ghost" onClick={handleLogout}>{dict.logout}</Button>
      )
    } else {
      return (
        <>
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/auth/login`}>{dict.login}</Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/auth/register`}>{dict.signup}</Link>
          </Button>
        </>
      )
    }
  }

  return (
    <motion.header
      className={`w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm fixed top-0 z-50 border-b border-border ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">{dict.company}</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
        </nav>
        <div className="hidden md:flex space-x-4 items-center">
          <ThemeSelector align={isRTL ? "end" : "start"} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "end" : "start"} className="bg-white dark:bg-gray-800">
              {locales.map((l) => (
                <DropdownMenuItem key={l} onClick={() => switchLanguage(l)}>
                  {languageNames[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle size={20} />
          {renderAuthButtons()}
          <Button asChild>
            <Link href={`/${locale}/auth/waitlist`}>{dict.waitlist}</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b border-border w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4 p-4">
              <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
              <ThemeSelector align={isRTL ? "end" : "start"} side="bottom" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "end" : "start"} side="bottom" className="bg-white dark:bg-gray-800">
                  {locales.map((l) => (
                    <DropdownMenuItem key={l} onClick={() => switchLanguage(l)}>
                      {languageNames[l]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle size={20} />
              {renderAuthButtons()}
              <Button asChild>
                <Link href={`/${locale}/auth/waitlist`}>{dict.waitlist}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
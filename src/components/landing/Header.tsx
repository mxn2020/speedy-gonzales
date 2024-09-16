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
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const isRTL = locale === 'ar' || locale === 'fa'

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

  const changeLanguage = (newLocale: Locale) => {
    const { pathname, search, hash } = window.location;
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}${search}${hash}`;
    
    window.location.href = newPath;
  }

  return (
    <motion.header
      className={`w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm fixed top-0 z-50 border-b border-border ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container mx-auto flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
        <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <span className="font-bold text-xl">{dict.company}</span>
        </Link>
        <nav className={`hidden md:flex ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
          <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
        </nav>
        <div className={`hidden md:flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} items-center`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
              {locales.map((l) => (
                <DropdownMenuItem key={l} onClick={() => changeLanguage(l)}>
                  {languageNames[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/auth/login`}>{dict.login}</Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/auth/register`}>{dict.signup}</Link>
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
            className={`md:hidden absolute top-16 ${isRTL ? 'right-0' : 'left-0'} bg-background border-b border-border w-full`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'} space-y-4 p-4`}>
              <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
                  {locales.map((l) => (
                    <DropdownMenuItem key={l} onClick={() => changeLanguage(l)}>
                      {languageNames[l]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" asChild>
                 <Link href={`/${locale}/auth/login`}>{dict.login}</Link>
              </Button>
              <Button asChild>
                <Link href={`/${locale}/auth/register`}>{dict.signup}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
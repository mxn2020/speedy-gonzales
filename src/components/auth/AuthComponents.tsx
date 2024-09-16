'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle, Globe, Sun, Moon, CircleAlert, Facebook, Twitter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Locale } from '@/types'
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { createBrowserClient } from '@supabase/ssr'
import { logActivity } from '@/lib/activityLogger'
import { ACTIVITY_ACTIONS } from '@/constants/activityLog'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AuthPageProps {
  dict: any
  isRTL: boolean
  lang: Locale
  locales: Locale[]
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

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

const LanguageToggle = ({ lang, locales, changeLanguage }: { lang: Locale, locales: Locale[], changeLanguage: (newLocale: Locale) => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {locales.map((locale) => (
        <DropdownMenuItem key={locale} onClick={() => changeLanguage(locale)}>
          {languageNames[locale]}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Helper function to change language
const changeLanguage = (newLocale: Locale) => {
  const { pathname, search, hash } = window.location
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
  const newPath = `/${newLocale}${pathWithoutLocale || '/'}${search}${hash}`
  window.location.href = newPath
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length > 6) strength += 1;
  if (password.length > 10) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return (strength / 5) * 100;
};

const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export function LoginPage({ dict, isRTL, lang, locales }: AuthPageProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateEmail(email)) {
      setError(dict.login.invalidEmail)
      await logActivity(ACTIVITY_ACTIONS.LOGIN_FAILED)
      return
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      await logActivity(ACTIVITY_ACTIONS.USER_LOGIN)
      router.push(`/${lang}/dashboard`)
    } catch (error: any) {
      await logActivity(ACTIVITY_ACTIONS.LOGIN_FAILED)
      setError(error.message || dict.login.genericError)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{dict.login.title}</CardTitle>
            <div className="flex space-x-2">
              <LanguageToggle lang={lang} locales={locales} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>
          </div>
          <CardDescription>{dict.login.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{dict.login.emailPlaceholder}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.login.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{dict.login.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={dict.login.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dict.login.rememberMe}
                </label>
              </div>
            </div>
            {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button className="w-full mt-4" type="submit">{dict.login.signIn}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Google sign in logic */ }}>
              <CircleAlert className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Facebook sign in logic */ }}>
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Twitter sign in logic */ }}>
              <Twitter className="mr-2 h-4 w-4" /> Twitter
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline" onClick={() => router.push(`/${lang}/auth/forgot-password`)}>
              {dict.login.forgotPassword}
            </a>
          </div>
          <div className="mt-4 text-center text-sm">
            {dict.login.noAccount}{' '}
            <a href="#" className="text-primary hover:underline" onClick={() => router.push(`/${lang}/auth/register`)}>
              {dict.login.signUp}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function RegisterPage({ dict, isRTL, lang, locales }: AuthPageProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateEmail(email)) {
      setError(dict.register.invalidEmail)
      await logActivity(ACTIVITY_ACTIONS.REGISTER_FAILED)
      return
    }
    if (password !== confirmPassword) {
      setError(dict.register.passwordMismatch)
      await logActivity(ACTIVITY_ACTIONS.REGISTER_FAILED)
      return
    }
    if (!agreeTerms) {
      setError(dict.register.agreeTerms)
      await logActivity(ACTIVITY_ACTIONS.REGISTER_FAILED)
      return
    }
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: name,
            avatar_url: '' // You can add avatar selection in your form if needed
          }
        }
      })
      if (error) throw error
      if (data.user) {
        await supabase.from('profiles').upsert({ 
          id: data.user.id, 
          full_name: name,
          username: email.split('@')[0] // Simple username generation
        })
      }
      await logActivity(ACTIVITY_ACTIONS.USER_REGISTER)
      router.push(`/${lang}/auth/verify-email`)
    } catch (error: any) {
      setError(error.message || dict.register.genericError)
      await logActivity(ACTIVITY_ACTIONS.REGISTER_FAILED)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{dict.register.title}</CardTitle>
            <div className="flex space-x-2">
              <LanguageToggle lang={lang} locales={locales} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>
          </div>
          <CardDescription>{dict.register.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{dict.register.namePlaceholder}</Label>
                <Input
                  id="name"
                  placeholder={dict.register.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{dict.register.emailPlaceholder}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.register.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">{dict.register.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={dict.register.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Progress value={passwordStrength} className="w-full h-2" />
                <span className="text-sm text-muted-foreground">
                  {passwordStrength < 40 && dict.register.passwordWeak}
                  {passwordStrength >= 40 && passwordStrength < 80 && dict.register.passwordMedium}
                  {passwordStrength >= 80 && dict.register.passwordStrong}
                </span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">{dict.register.confirmPassword}</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={dict.register.confirmPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dict.register.agreeToTerms}{' '}
                  <a href="#" className="text-primary hover:underline">{dict.register.termsOfService}</a>{' '}
                  {dict.register.and}{' '}
                  <a href="#" className="text-primary hover:underline">{dict.register.privacyPolicy}</a>
                </label>
              </div>
            </div>
            {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button className="w-full mt-4" type="submit">{dict.register.createAccount}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Google sign up logic */ }}>
              <CircleAlert className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Facebook sign up logic */ }}>
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {/* Add Twitter sign up logic */ }}>
              <Twitter className="mr-2 h-4 w-4" /> Twitter
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {dict.register.alreadyHaveAccount}{' '}
            <a href="#" className="text-primary hover:underline" onClick={() => router.push(`/${lang}/auth/login`)}>
              {dict.register.signIn}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ForgotPasswordPage({ dict, isRTL, lang, locales }: AuthPageProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateEmail(email)) {
      setError(dict.forgotPassword.invalidEmail)
      await logActivity(ACTIVITY_ACTIONS.FORGOT_PASSWORD_FAILED)
      return
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      await logActivity(ACTIVITY_ACTIONS.FORGOT_PASSWORD)
      setSuccess(true)
    } catch (error: any) {
      await logActivity(ACTIVITY_ACTIONS.FORGOT_PASSWORD_FAILED)
      setError(error.message || dict.forgotPassword.genericError)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{dict.forgotPassword.title}</CardTitle>
            <div className="flex space-x-2">
              <LanguageToggle lang={lang} locales={locales} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>
          </div>
          <CardDescription>{dict.forgotPassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">{dict.forgotPassword.emailPlaceholder}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={dict.forgotPassword.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button className="w-full mt-4" type="submit">{dict.forgotPassword.sendResetLink}</Button>
            </form>
          ) : (
            <Alert className="mt-4">
              <AlertDescription>{dict.forgotPassword.resetLinkSent}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline" onClick={() => router.push(`/${lang}/auth/login`)}>
              {dict.forgotPassword.backToLogin}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ResetPasswordPage({ dict, isRTL, lang, locales }: AuthPageProps) {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) {
      setError(dict.resetPassword.passwordMismatch)
      await logActivity(ACTIVITY_ACTIONS.RESET_PASSWORD_FAILED)
      return
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      await logActivity(ACTIVITY_ACTIONS.RESET_PASSWORD)
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || dict.resetPassword.genericError)
      await logActivity(ACTIVITY_ACTIONS.RESET_PASSWORD_FAILED)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{dict.resetPassword.title}</CardTitle>
            <div className="flex space-x-2">
              <LanguageToggle lang={lang} locales={locales} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>
          </div>
          <CardDescription>{dict.resetPassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="new-password">{dict.resetPassword.newPassword}</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={dict.resetPassword.newPassword}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Progress value={passwordStrength} className="w-full h-2" />
                  <span className="text-sm text-muted-foreground">
                    {passwordStrength < 40 && dict.resetPassword.passwordWeak}
                    {passwordStrength >= 40 && passwordStrength < 80 && dict.resetPassword.passwordMedium}
                    {passwordStrength >= 80 && dict.resetPassword.passwordStrong}
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm-password">{dict.resetPassword.confirmPassword}</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={dict.resetPassword.confirmPassword}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button className="w-full mt-4" type="submit">{dict.resetPassword.resetPassword}</Button>
            </form>
          ) : (
            <Alert className="mt-4">
              <AlertDescription>{dict.resetPassword.passwordResetSuccess}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline" onClick={() => router.push(`/${lang}/auth/login`)}>
              {dict.resetPassword.backToLogin}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function WaitlistPage({ dict, isRTL, lang, locales }: AuthPageProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState(0)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
  
    const logActivityAsync = (action: string) => {
      logActivity(action).catch(error => {
        console.error('Failed to log activity:', error)
      })
    }
  
    if (!validateEmail(email)) {
      setError(dict.waitlist.invalidEmail)
      logActivityAsync(ACTIVITY_ACTIONS.WAITLIST_FAILED)
      return
    }
  
    if (!agreeTerms) {
      setError(dict.waitlist.agreeTerms)
      logActivityAsync(ACTIVITY_ACTIONS.WAITLIST_FAILED)
      return
    }
  
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
  
    // Simulate getting a waitlist position
    setWaitlistPosition(Math.floor(Math.random() * 1000) + 1)
    setIsSubmitted(true)
  
    logActivityAsync(ACTIVITY_ACTIONS.WAITLIST_JOINED)
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{dict.waitlist.title}</CardTitle>
            <div className="flex space-x-2">
              <LanguageToggle lang={lang} locales={locales} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>
          </div>
          <CardDescription>{dict.waitlist.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">{dict.waitlist.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={dict.waitlist.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {dict.waitlist.agreeToTerms}{' '}
                    <a href="#" className="text-primary hover:underline">{dict.waitlist.termsOfService}</a>{' '}
                    {dict.waitlist.and}{' '}
                    <a href="#" className="text-primary hover:underline">{dict.waitlist.privacyPolicy}</a>
                  </label>
                </div>
              </div>
              {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button className="w-full mt-4" type="submit">
                {dict.waitlist.joinButton}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-4 text-green-500 mb-4" />
              <p className="text-lg font-semibold">{dict.waitlist.successMessage}</p>
              <p className="mt-2">{dict.waitlist.waitlistPosition.replace('{position}', waitlistPosition.toString())}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">{dict.waitlist.privacyNotice}</p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function VerifyEmailPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email_confirmed_at) {
          setIsVerified(true)
          await logActivity(ACTIVITY_ACTIONS.EMAIL_VERIFIED)
        }
      } catch (error: any) {
        setError(error.message || dict.verifyEmail.genericError)
        await logActivity(ACTIVITY_ACTIONS.EMAIL_VERIFICATION_FAILED)
      }
    }

    checkEmailVerification()
    const interval = setInterval(checkEmailVerification, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [])


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{dict.verifyEmail.title}</CardTitle>
          <CardDescription>{dict.verifyEmail.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <div className="text-center">
              <p>{dict.verifyEmail.verifying}</p>
              {/* Add a loading spinner here */}
            </div>
          ) : (
            <Alert>
              <AlertDescription>{dict.verifyEmail.verified}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          {isVerified && (
            <Button className="w-full" onClick={() => router.push(`/${lang}/auth/login`)}>
              {dict.verifyEmail.proceedToLogin}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function TwoFactorAuthPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.length !== 6) {
      setError(dict.twoFactorAuth.invalidCode)
      await logActivity(ACTIVITY_ACTIONS.TWO_FACTOR_AUTH_FAILED)
      return
    }
    try {
      // Note: Supabase doesn't have built-in 2FA. You'd need to implement this yourself or use a third-party service.
      // This is a placeholder for where you'd verify the 2FA code
      console.log('Verifying 2FA code:', code)
      await logActivity(ACTIVITY_ACTIONS.TWO_FACTOR_AUTH)
      router.push(`/${lang}/dashboard`)
    } catch (error: any) {
      setError(error.message || dict.twoFactorAuth.genericError)
      await logActivity(ACTIVITY_ACTIONS.TWO_FACTOR_AUTH_FAILED)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{dict.twoFactorAuth.title}</CardTitle>
          <CardDescription>{dict.twoFactorAuth.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">{dict.twoFactorAuth.codePlaceholder}</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder={dict.twoFactorAuth.codePlaceholder}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
            </div>
            {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button className="w-full mt-4" type="submit">{dict.twoFactorAuth.verifyButton}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline" onClick={() => {/* Add logic to resend 2FA code */ }}>
              {dict.twoFactorAuth.resendCode}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
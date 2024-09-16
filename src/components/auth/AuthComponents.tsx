'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//import { Google } from 'lucide-react'

interface AuthPageProps {
  dict: any
  isRTL: boolean
  lang: string
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

export function LoginPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add login logic here
    console.log('Login with:', email, password)
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
          <CardTitle>{dict.login.title}</CardTitle>
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
                <Input 
                  id="password" 
                  type="password"
                  placeholder={dict.login.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">{dict.login.signIn}</Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => {/* Add Google sign in logic */}}>
            {dict.login.signInWithGoogle}
          </Button>
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

export function RegisterPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add registration logic here
    console.log('Register with:', name, email, password)
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
          <CardTitle>{dict.register.title}</CardTitle>
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
                <Input 
                  id="password" 
                  type="password"
                  placeholder={dict.register.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">{dict.register.confirmPassword}</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder={dict.register.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">{dict.register.createAccount}</Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => {/* Add Google sign up logic */}}>
            {dict.register.signUpWithGoogle}
          </Button>
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

export function ForgotPasswordPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add forgot password logic here
    console.log('Reset password for:', email)
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
          <CardTitle>{dict.forgotPassword.title}</CardTitle>
          <CardDescription>{dict.forgotPassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">{dict.forgotPassword.sendResetLink}</Button>
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

export function ResetPasswordPage({ dict, isRTL, lang }: AuthPageProps) {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add reset password logic here
    console.log('Reset password:', newPassword)
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
          <CardTitle>{dict.resetPassword.title}</CardTitle>
          <CardDescription>{dict.resetPassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="new-password">{dict.resetPassword.newPassword}</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder={dict.resetPassword.newPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">{dict.resetPassword.confirmPassword}</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder={dict.resetPassword.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">{dict.resetPassword.resetPassword}</Button>
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
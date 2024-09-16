'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Moon, Sun, Bell, Search, Menu, X, Home, BarChart, Users, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createBrowserClient } from '@supabase/ssr'

// Initialize Supabase client
const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations('Dashboard')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menuItems = [
    { icon: Home, label: t('home'), href: '/dashboard' },
    { icon: BarChart, label: t('analytics'), href: '/dashboard/analytics' },
    { icon: Users, label: t('users'), href: '/dashboard/users' },
    { icon: Settings, label: t('settings'), href: '/dashboard/settings' },
  ]

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 overflow-y-auto transition duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0 lg:block`}>
        <div className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-900">
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">SaaS Logo</span>
        </div>
        <nav className="mt-5 px-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
            >
              <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder={t('search')}
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3">
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('dashboard')}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('totalUsers')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">1,234</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('revenue')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">$12,345</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('activeProjects')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">42</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
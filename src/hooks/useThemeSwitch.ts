import { useEffect } from 'react'
import { useTheme } from 'next-themes'

type Theme = 'light' | 'dark' | 'system'

export const useThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // You can add any initialization logic here if needed
  }, [])

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return { theme, switchTheme }
}
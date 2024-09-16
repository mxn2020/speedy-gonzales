import React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  size?: number
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 20 }) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={size} /> : <Moon size={size} />}
    </Button>
  )
}
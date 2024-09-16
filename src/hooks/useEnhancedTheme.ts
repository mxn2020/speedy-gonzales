import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

type ColorTheme = 'red' | 'zinc' | 'slate' | 'blue' | 'violet' | 'stone' | 'gray' | 'neutral' | 'rose' | 'orange' | 'green' | 'yellow';
type LayoutStyle = 'modern' | 'classic' | 'minimalist';

export const useEnhancedTheme = () => {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useState<ColorTheme>('red')
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('modern')

  useEffect(() => {
    // Initialize color theme and layout style from localStorage or default values
    const storedColorTheme = localStorage.getItem('colorTheme') as ColorTheme
    const storedLayoutStyle = localStorage.getItem('layoutStyle') as LayoutStyle
    
    if (storedColorTheme) setColorTheme(storedColorTheme)
    if (storedLayoutStyle) setLayoutStyle(storedLayoutStyle)

    // Apply the stored color theme
    document.documentElement.setAttribute('data-color-theme', storedColorTheme || 'red')
  }, [])

  const switchTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  const switchColorTheme = (newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme)
    localStorage.setItem('colorTheme', newColorTheme)
    document.documentElement.setAttribute('data-color-theme', newColorTheme)
  }

  const switchLayoutStyle = (newStyle: LayoutStyle) => {
    setLayoutStyle(newStyle);
    localStorage.setItem('layoutStyle', newStyle);
  }

  return { theme, switchTheme, colorTheme, switchColorTheme, layoutStyle, switchLayoutStyle }
}
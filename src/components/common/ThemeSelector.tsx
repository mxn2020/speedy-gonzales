import React from 'react'
import { Sun, Moon, Palette, Layout } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useEnhancedTheme } from '@/hooks/useEnhancedTheme'

interface ThemeSelectorProps {
  align?: 'start' | 'end' | 'center'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ align = 'end', side = 'bottom' }) => {
  const { theme, switchTheme, colorTheme, switchColorTheme, layoutStyle, switchLayoutStyle } = useEnhancedTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette size={20} />
          <span className="sr-only">Open theme menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        side={side} 
        className="w-56 bg-white dark:bg-gray-800 border border-border shadow-md"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="focus:bg-accent">
            <Sun className="mr-2 h-4 w-4" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white dark:bg-gray-800 border border-border">
            <DropdownMenuRadioGroup value={theme} onValueChange={switchTheme}>
              <DropdownMenuRadioItem value="light" className="focus:bg-accent">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="focus:bg-accent">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system" className="focus:bg-accent">System</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="focus:bg-accent">
            <Palette className="mr-2 h-4 w-4" />
            <span>Color</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white dark:bg-gray-800 border border-border">
            <DropdownMenuRadioGroup value={colorTheme} onValueChange={switchColorTheme}>
            <DropdownMenuRadioItem value="zinc" className="focus:bg-accent">Zinc</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="slate" className="focus:bg-accent">Slate</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="stone" className="focus:bg-accent">Stone</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gray" className="focus:bg-accent">Gray</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="neutral" className="focus:bg-accent">Neutral</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="red" className="focus:bg-accent">Red</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rose" className="focus:bg-accent">Rose</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="orange" className="focus:bg-accent">Orange</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="green" className="focus:bg-accent">Green</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="blue" className="focus:bg-accent">Blue</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="yellow" className="focus:bg-accent">Yellow</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="violet" className="focus:bg-accent">Violet</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="focus:bg-accent">
            <Layout className="mr-2 h-4 w-4" />
            <span>Layout Style</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white dark:bg-gray-800 border border-border">
            <DropdownMenuRadioGroup value={layoutStyle} onValueChange={switchLayoutStyle}>
              <DropdownMenuRadioItem value="modern" className="focus:bg-accent">Modern</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="classic" className="focus:bg-accent">Classic</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="minimalist" className="focus:bg-accent">Minimalist</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
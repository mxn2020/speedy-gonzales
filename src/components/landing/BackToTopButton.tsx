'use client'

import { useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBackToTop } from '../../providers/BackToTopProvider'

interface BackToTopButtonProps {
  isRTL: boolean;
}

export default function BackToTopButton({ isRTL }: BackToTopButtonProps) {
  const { isBackToTopVisible, setIsBackToTopVisible } = useBackToTop()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsBackToTopVisible(true)
      } else {
        setIsBackToTopVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [setIsBackToTopVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isBackToTopVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className={`fixed bottom-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
          aria-label="Back to top"
        >
          <ArrowUp size={24} className={isRTL ? 'transform rotate-180' : ''} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
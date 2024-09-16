// CookieConsent.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CookieConsentProps {
  dict: any;
  isRTL: boolean;
}

export default function CookieConsent({ dict, isRTL }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-0 left-0 right-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <Card className="m-4 bg-background/80 backdrop-blur-sm border-background/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{dict.message}</p>
                <div className="flex gap-4">
                  <Button onClick={handleAccept} variant="default">
                    {dict.accept}
                  </Button>
                  <Button onClick={handleDecline} variant="outline">
                    {dict.decline}
                  </Button>
                </div>
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}
                  aria-label="Close"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
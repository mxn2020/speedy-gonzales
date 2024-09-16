// ChatWidget.tsx
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useBackToTop } from '../../providers/BackToTopProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatWidgetProps {
  dict: any;
  isRTL: boolean;
}

export default function ChatWidget({ dict, isRTL }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isBackToTopVisible } = useBackToTop()

  return (
    <div className={`fixed ${isBackToTopVisible ? 'bottom-20' : 'bottom-4'} ${isRTL ? 'left-4' : 'right-4'} z-50 transition-all duration-300`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="rounded-full shadow-lg"
            >
              <MessageCircle size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`w-80 h-96 shadow-lg ${isRTL ? 'rtl' : 'ltr'}`}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-semibold">{dict.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <p className="text-center text-muted-foreground">{dict.defaultMessage}</p>
              </CardContent>
              <CardFooter>
                <Input
                  type="text"
                  placeholder={dict.placeholder}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

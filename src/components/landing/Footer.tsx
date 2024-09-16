'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface FooterProps {
  dict: any;
  isRTL: boolean;
}

export default function Footer({ dict, isRTL }: FooterProps) {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail('')
  }

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <motion.footer
      className={`w-full py-12 bg-background border-t ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
              <span className="font-bold text-xl">{dict.company}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {dict.description}
            </p>
          </motion.div>
          <nav className="grid grid-cols-2 gap-8">
            {['product', 'company'].map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h3 className="font-semibold mb-3">{dict[section]}</h3>
                <ul className="space-y-2">
                  {['features', 'pricing', 'testimonials', 'faq'].map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {dict[item] || item.charAt(0).toUpperCase() + item.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold mb-3">{dict.subscribeTitle}</h3>
            <form onSubmit={handleSubmit} className={`mt-4 flex max-w-sm items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
              <Input
                type="email"
                placeholder={dict.subscribePlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                required
              />
              <Button type="submit" className="group">
                {dict.subscribeCta}
                <ArrowIcon className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
              </Button>
            </form>
          </motion.div>
        </div>
        <motion.div
          className={`mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">{dict.copyright}</p>
          <div className="flex gap-4">
            {[
              { name: 'Facebook', icon: Facebook },
              { name: 'Twitter', icon: Twitter },
              { name: 'LinkedIn', icon: Linkedin }
            ].map((social) => (
              <AnimatePresence key={social.name}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
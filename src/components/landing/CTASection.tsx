// CTASection.tsx
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  dict: any;
  isRTL: boolean;
}

export default function CTASection({ dict, isRTL }: CTASectionProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-primary-foreground/5 border-primary-foreground/10 shadow-lg">
          <CardContent className="p-6 md:p-10">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {dict.title}
              </motion.h2>
              <motion.p 
                className="max-w-[600px] text-primary-foreground/90 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {dict.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button asChild size="lg" variant="secondary" className="mt-4">
                  <Link href="/signup">
                    {dict.cta}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
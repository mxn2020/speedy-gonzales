// NewsletterSection.tsx
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NewsletterSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function NewsletterSection({ dict, isRTL }: NewsletterSectionProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-muted ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
      <Card className="bg-background/50 backdrop-blur-sm border-background/20">
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
                className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {dict.description}
              </motion.p>
              <motion.form 
                className="w-full max-w-sm space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Input
                  type="email"
                  placeholder={dict.placeholder}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  {dict.cta}
                </Button>
              </motion.form>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

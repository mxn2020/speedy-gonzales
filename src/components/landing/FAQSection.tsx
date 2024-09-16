// FAQSection.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FAQSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function FAQSection({ dict, isRTL }: FAQSectionProps) {
  const faqs = [
    { question: dict.question1.question, answer: dict.question1.answer },
    { question: dict.question2.question, answer: dict.question2.answer },
    { question: dict.question3.question, answer: dict.question3.answer },
    { question: dict.question4.question, answer: dict.question4.answer },
    { question: dict.question5.question, answer: dict.question5.answer },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dict.title}
        </motion.h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openIndex === index ? 
                    <ChevronUp className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} /> : 
                    <ChevronDown className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  }
                </Button>
              </CardHeader>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <CardContent className="p-4 pt-0 text-muted-foreground">
                      {faq.answer}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
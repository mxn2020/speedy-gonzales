// PricingSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface PricingOption {
  title: string
  price: {
    monthly: number
    annually: number
  }
  features: string[]
  cta: string
}

interface PricingSectionProps {
  id?: string
  dict: {
    title: string
    subtitle: string
    monthly: string
    annually: string
    options: PricingOption[]
  }
  isRTL: boolean
}

export default function PricingSection({ id, dict, isRTL }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id={id} className={`w-full py-12 md:py-24 lg:py-32 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.title}</h2>
          <p className="mt-4 text-muted-foreground">{dict.subtitle}</p>
        </motion.div>
        <div className={`flex justify-center items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 mb-8`}>
          <span className={`text-sm ${!isAnnual ? 'font-bold' : ''}`}>{dict.monthly}</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual pricing"
          />
          <span className={`text-sm ${isAnnual ? 'font-bold' : ''}`}>{dict.annually}</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {dict.options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-center">{option.title}</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? option.price.annually : option.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Check className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 text-primary`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{option.cta}</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
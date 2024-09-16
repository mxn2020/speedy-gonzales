// ParallaxSection.tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

interface ParallaxSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function ParallaxSection({ dict, isRTL }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={ref} className={`relative h-[70vh] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center mb-40"
        style={{
          backgroundImage: `url("/placeholder.svg")`,
          y
        }}
      />
      <motion.div
        className="absolute inset-20 bg-cover bg-center mb-96"
        style={{
          backgroundImage: `url("/placeholder.svg")`,
          y
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex items-center justify-center text-white">
        <Card className="bg-background/20 border-background/30 backdrop-blur-sm">
          <CardContent className="p-6 md:p-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">{dict.title}</h2>
              <p className="text-xl">{dict.description}</p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

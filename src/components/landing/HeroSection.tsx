// HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface HeroDict {
  title: string;
  description: string;
  cta: string;
}

interface HeroSectionProps {
  dict: HeroDict;
  isRTL: boolean;
}

const techLogos = [
  '/tech-logo-1.svg',
  '/tech-logo-2.svg',
  '/tech-logo-3.svg',
  '/tech-logo-4.svg',
  '/tech-logo-5.svg',
  '/tech-logo-6.svg',
]

export default function HeroSection({ dict, isRTL }: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(true)

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] ${isRTL ? 'lg:grid-cols-[400px_1fr] xl:grid-cols-[600px_1fr]' : ''}`}>
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {dict.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {dict.description}
              </p>
            </div>
            <div className={`flex flex-col gap-2 min-[400px]:flex-row ${isRTL ? 'min-[400px]:flex-row-reverse' : ''}`}>
              <Button asChild size="lg">
                <Link href="/signup">
                  {dict.cta}
                  <ArrowIcon className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full h-full overflow-hidden">
              <CardContent className="p-0">
                <Image
                  alt="Hero"
                  className="aspect-[4/3] object-cover object-center w-full h-full"
                  height={400}
                  src="/placeholder.svg"
                  width={600}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-full overflow-hidden">
            <div className={`flex animate-scroll ${isRTL ? 'flex-row-reverse' : ''}`}>
              {[...techLogos, ...techLogos].map((logo, index) => (
                <Image key={index} src={logo} alt="Tech Logo" className="h-12 w-auto mx-8" width={50} height={50} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroSectionSkeleton({ isRTL }: { isRTL: boolean }) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] ${isRTL ? 'lg:grid-cols-[400px_1fr] xl:grid-cols-[600px_1fr]' : ''}`}>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full max-w-[600px]" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-[300px] w-full max-w-md rounded-lg" />
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton key={index} className="h-12 w-12 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
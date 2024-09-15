'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const techLogos = [
  '/tech-logo-1.svg',
  '/tech-logo-2.svg',
  '/tech-logo-3.svg',
  '/tech-logo-4.svg',
  '/tech-logo-5.svg',
  '/tech-logo-6.svg',
]

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t('title')}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              alt="Hero"
              className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
          </motion.div>
        </div>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-full overflow-hidden">
            <div className="flex animate-scroll">
              {[...techLogos, ...techLogos].map((logo, index) => (
                <img key={index} src={logo} alt="Tech Logo" className="h-12 w-auto mx-8" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
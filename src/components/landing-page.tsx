'use client'

import { motion } from 'framer-motion'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import PricingSection from '@/components/landing/PricingSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import FAQSection from '@/components/landing/FAQSection'
import BlogSection from '@/components/landing/BlogSection'
import NewsletterSection from '@/components/landing/NewsletterSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'
import ChatWidget from '@/components/landing/ChatWidget'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function LandingPage() {
  return (
    <>
      <Header />
      <motion.div {...fadeIn}>
        <HeroSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <FeaturesSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <HowItWorksSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <PricingSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <TestimonialsSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <FAQSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <BlogSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <NewsletterSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <CTASection />
      </motion.div>
      <Footer />
      <ChatWidget />
    </>
  )
}
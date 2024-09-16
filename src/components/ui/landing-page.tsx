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

interface LandingPageProps {
  dict: {
    header: any;
    hero: any;
    features: any;
    howItWorks: any;
    pricing: any;
    testimonials: any;
    faq: any;
    blog: any;
    newsletter: any;
    cta: any;
    footer: any;
    chat: any;
  }
}

export default function LandingPage({ dict }: LandingPageProps) {
  return (
    <>
      <Header dict={dict.header} />
      <motion.div {...fadeIn}>
        <HeroSection dict={dict.hero} />
      </motion.div>
      <motion.div {...fadeIn}>
        <FeaturesSection dict={dict.features} />
      </motion.div>
      <motion.div {...fadeIn}>
        <HowItWorksSection dict={dict.howItWorks} />
      </motion.div>
      <motion.div {...fadeIn}>
        <PricingSection dict={dict.pricing} />
      </motion.div>
      <motion.div {...fadeIn}>
        <TestimonialsSection dict={dict.testimonials} />
      </motion.div>
      <motion.div {...fadeIn}>
        <FAQSection dict={dict.faq} />
      </motion.div>
      <motion.div {...fadeIn}>
        <BlogSection dict={dict.blog} />
      </motion.div>
      <motion.div {...fadeIn}>
        <NewsletterSection dict={dict.newsletter} />
      </motion.div>
      <motion.div {...fadeIn}>
        <CTASection dict={dict.cta} />
      </motion.div>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} />
    </>
  )
}
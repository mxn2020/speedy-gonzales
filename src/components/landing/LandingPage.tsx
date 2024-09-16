'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
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
import ContactSection from '@/components/landing/ContactSection'
import Footer from '@/components/landing/Footer'
import ChatWidget from '@/components/landing/ChatWidget'
import BackToTopButton from '@/components/landing/BackToTopButton'
import CookieConsent from '@/components/landing/CookieConsent'
import ParallaxSection from '@/components/landing/ParallaxSection'
import { Locale } from '@/types'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

interface LandingPageProps {
  dict: {
    metadata: any;
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
    contact: any;
    footer: any;
    chat: any;
    cookieConsent: any;
    parallax: any;
  };
  locale: Locale;
}

export default function LandingPage({ dict, locale }: LandingPageProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const isRTL = locale === 'ar' || locale === 'fa'

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault()
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1)
        const elem = document.getElementById(targetId)
        elem?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll)
      })
    }
  }, [])

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      <Header
        dict={dict.header}
        locale={locale}
        locales={['ar', 'de', 'en', 'es', 'fa', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: isRTL ? scaleX.get() : scaleX, transformOrigin: isRTL ? 'right' : 'left' }}
      />
      <motion.main className="flex flex-col gap-12 md:gap-24 lg:gap-32">
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <HeroSection dict={dict.hero} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <FeaturesSection id="features" dict={dict.features} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <HowItWorksSection dict={dict.howItWorks} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <PricingSection id="pricing" dict={dict.pricing} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <TestimonialsSection id="testimonials" dict={dict.testimonials} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ParallaxSection dict={dict.parallax} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <FAQSection dict={dict.faq} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <BlogSection dict={dict.blog} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <NewsletterSection dict={dict.newsletter} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CTASection dict={dict.cta} isRTL={isRTL} />
        </motion.section>
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ContactSection id="contact" dict={dict.contact} isRTL={isRTL} />
        </motion.section>
      </motion.main>
      <Footer dict={dict.footer} isRTL={isRTL} />
      <ChatWidget dict={dict.chat} isRTL={isRTL} />
      <BackToTopButton isRTL={isRTL} />
      <CookieConsent dict={dict.cookieConsent} isRTL={isRTL} />
    </div>
  )
}
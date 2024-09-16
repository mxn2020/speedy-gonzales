## Context:


## Current Section File and Folder Structure:
./
├-- CTASection.tsx
├-- ChatWidget.tsx
├-- HowItWorksSection.tsx
├-- ParallaxSection.tsx
├-- LandingPage.json
├-- LandingPage.tsx
├-- FAQSection.tsx
├-- NewsletterSection.tsx
├-- Footer.tsx
├-- CookieConsent.tsx
├-- BlogSection.tsx
├-- TestimonialsSection.tsx
├-- HeroSection.tsx
├-- Header.tsx
├-- PricingSection.tsx
├-- ContactSection.tsx
├-- FeaturesSection.tsx
└-- BackToTopButton.tsx

## Instructions:


## SQL Setup:


## CTASection.tsx:
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

## ChatWidget.tsx:
// ChatWidget.tsx
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useBackToTop } from '../../providers/BackToTopProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatWidgetProps {
  dict: any;
  isRTL: boolean;
}

export default function ChatWidget({ dict, isRTL }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isBackToTopVisible } = useBackToTop()

  return (
    <div className={`fixed ${isBackToTopVisible ? 'bottom-20' : 'bottom-4'} ${isRTL ? 'left-4' : 'right-4'} z-50 transition-all duration-300`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="rounded-full shadow-lg"
            >
              <MessageCircle size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`w-80 h-96 shadow-lg ${isRTL ? 'rtl' : 'ltr'}`}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-semibold">{dict.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <p className="text-center text-muted-foreground">{dict.defaultMessage}</p>
              </CardContent>
              <CardFooter>
                <Input
                  type="text"
                  placeholder={dict.placeholder}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


## HowItWorksSection.tsx:
// HowItWorksSection.tsx
import { motion } from 'framer-motion'
import { CheckCircle, Users, BarChart } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface HowItWorksSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function HowItWorksSection({ dict, isRTL }: HowItWorksSectionProps) {
  const steps = [
    {
      title: dict.step1.title,
      description: dict.step1.description,
      icon: CheckCircle,
    },
    {
      title: dict.step2.title,
      description: dict.step2.description,
      icon: Users,
    },
    {
      title: dict.step3.title,
      description: dict.step3.description,
      icon: BarChart,
    },
  ]

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-muted ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dict.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

## ParallaxSection.tsx:
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
    <section ref={ref} className={`relative h-[50vh] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${dict.backgroundImage}")`,
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


## LandingPage.json:
{
  "metadata": {
    "title": "SaaS Company",
    "description": "Empower Your Team with Our SaaS Solution"
  },
  "header": {
    "company": "SaaS Company",
    "features": "Features",
    "pricing": "Pricing",
    "testimonials": "Testimonials",
    "contact": "Contact",
    "login": "Log in",
    "signup": "Sign up",
    "lightMode": "Light Mode",
    "darkMode": "Dark Mode"
  },
  "hero": {
    "title": "Empower Your Team with Our SaaS Solution",
    "description": "Streamline your workflow, boost productivity, and achieve more with our innovative platform.",
    "cta": "Get Started"
  },
  "features": {
    "title": "Our Features",
    "lightning": {
      "title": "Lightning Fast",
      "description": "Experience unparalleled speed and efficiency in your workflow."
    },
    "secure": {
      "title": "Secure",
      "description": "Your data is protected with state-of-the-art security measures."
    },
    "analytics": {
      "title": "Analytics",
      "description": "Gain valuable insights with our powerful analytics tools."
    },
    "filter": {
      "all": "All Features",
      "productivity": "Productivity",
      "security": "Security",
      "analytics": "Analytics"
    }
  },
  "howItWorks": {
    "title": "How It Works",
    "step1": {
      "title": "Sign Up",
      "description": "Create your account in minutes"
    },
    "step2": {
      "title": "Invite Your Team",
      "description": "Collaborate with your colleagues"
    },
    "step3": {
      "title": "Start Analyzing",
      "description": "Gain insights from your data"
    }
  },
  "pricing": {
    "title": "Choose Your Plan",
    "cta": "Get Started",
    "free": {
      "name": "Free",
      "price": "$0",
      "features": [
        "Basic features",
        "Up to 5 users",
        "1GB storage"
      ]
    },
    "starter": {
      "name": "Starter",
      "price": "$29",
      "features": [
        "All Free features",
        "Up to 20 users",
        "10GB storage",
        "Priority support"
      ]
    },
    "pro": {
      "name": "Pro",
      "price": "$99",
      "features": [
        "All Starter features",
        "Unlimited users",
        "100GB storage",
        "Advanced analytics",
        "24/7 support"
      ]
    },
    "compare": {
      "title": "Compare Plans",
      "features": "Features",
      "free": "Free",
      "starter": "Starter",
      "pro": "Pro"
    }
  },
  "testimonials": {
    "title": "What Our Customers Say",
    "testimonial1": {
      "quote": "This SaaS has transformed our team's productivity!",
      "name": "Jane Doe",
      "company": "Tech Co"
    },
    "testimonial2": {
      "quote": "The features are exactly what we needed for our workflow.",
      "name": "John Smith",
      "company": "Startup Inc"
    },
    "testimonial3": {
      "quote": "Customer support is top-notch. Highly recommended!",
      "name": "Emily Brown",
      "company": "Agency Ltd"
    }
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "question1": {
      "question": "What is SaaS Company?",
      "answer": "SaaS Company is a cloud-based software solution that helps businesses streamline their operations, improve collaboration, and boost productivity."
    },
    "question2": {
      "question": "How does pricing work?",
      "answer": "We offer flexible pricing plans to suit businesses of all sizes. Our plans are based on the number of users and features required. Check our pricing page for more details."
    },
    "question3": {
      "question": "Is there a free trial available?",
      "answer": "Yes, we offer a 14-day free trial for all our plans. No credit card is required to start your trial."
    },
    "question4": {
      "question": "How secure is my data?",
      "answer": "We take data security very seriously. We use industry-standard encryption and security protocols to ensure your data is always protected."
    },
    "question5": {
      "question": "Can I cancel my subscription at any time?",
      "answer": "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
    }
  },
  "blog": {
    "title": "Latest from Our Blog",
    "viewAll": "View All Posts",
    "readMore": "Read More",
    "post1": {
      "title": "10 Tips for Improving Team Productivity",
      "excerpt": "Learn how to boost your team's efficiency with these proven strategies.",
      "date": "May 15, 2023"
    },
    "post2": {
      "title": "The Future of Remote Work: Trends to Watch",
      "excerpt": "Discover the emerging trends shaping the future of remote work.",
      "date": "June 2, 2023"
    },
    "post3": {
      "title": "Mastering Data Analytics for Business Growth",
      "excerpt": "Explore how data analytics can drive your business forward.",
      "date": "June 18, 2023"
    },
    "search": {
      "placeholder": "Search blog posts...",
      "button": "Search"
    }
  },
  "newsletter": {
    "title": "Stay Updated",
    "description": "Subscribe to our newsletter for the latest updates, tips, and special offers.",
    "placeholder": "Enter your email",
    "cta": "Subscribe"
  },
  "cta": {
    "title": "Ready to Get Started?",
    "description": "Join thousands of satisfied users and take your productivity to the next level.",
    "cta": "Sign Up Now"
  },
  "footer": {
    "saascompany": "SaaS Company",
    "description": "Empowering teams to achieve more with our innovative SaaS solution.",
    "product": "Product",
    "company": "Company",
    "subscribeTitle": "Subscribe to our newsletter",
    "subscribePlaceholder": "Enter your email",
    "subscribeCta": "Subscribe",
    "copyright": "© 2023 SaaS Company. All rights reserved."
  },
  "chat": {
    "title": "Customer Support",
    "placeholder": "Type your message...",
    "defaultMessage": "How can we help you today?"
  },
  "backToTop": {
    "ariaLabel": "Back to top"
  },
  "cookieConsent": {
    "message": "This website uses cookies to ensure you get the best experience on our website.",
    "accept": "Accept",
    "decline": "Decline"
  },
  "parallax": {
    "title": "Experience the Future of Work",
    "description": "Our SaaS solution is designed to revolutionize your workflow",
    "backgroundImage": "/parallax-background.jpg"
  },
  "progressBar": {
    "ariaLabel": "Page scroll progress"
  }
}

## LandingPage.tsx:
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
          <ContactSection dict={dict.contact} isRTL={isRTL} />
        </motion.section>
      </motion.main>
      <Footer dict={dict.footer} isRTL={isRTL} />
      <ChatWidget dict={dict.chat} isRTL={isRTL} />
      <BackToTopButton isRTL={isRTL} />
      <CookieConsent dict={dict.cookieConsent} isRTL={isRTL} />
    </div>
  )
}

## FAQSection.tsx:
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

## NewsletterSection.tsx:
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
      <div className="container px-4 md:px-6">
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


## Footer.tsx:
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface FooterProps {
  dict: any;
  isRTL: boolean;
}

export default function Footer({ dict, isRTL }: FooterProps) {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your API
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail('')
  }

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <motion.footer
      className={`w-full py-12 bg-background border-t ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
              <span className="font-bold text-xl">{dict.company}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {dict.description}
            </p>
          </motion.div>
          <nav className="grid grid-cols-2 gap-8">
            {['product', 'company'].map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h3 className="font-semibold mb-3">{dict[section]}</h3>
                <ul className="space-y-2">
                  {['features', 'pricing', 'testimonials', 'faq'].map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {dict[item] || item.charAt(0).toUpperCase() + item.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold mb-3">{dict.subscribeTitle}</h3>
            <form onSubmit={handleSubmit} className={`mt-4 flex max-w-sm items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
              <Input
                type="email"
                placeholder={dict.subscribePlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                required
              />
              <Button type="submit" className="group">
                {dict.subscribeCta}
                <ArrowIcon className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
              </Button>
            </form>
          </motion.div>
        </div>
        <motion.div
          className={`mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">{dict.copyright}</p>
          <div className="flex gap-4">
            {[
              { name: 'Facebook', icon: Facebook },
              { name: 'Twitter', icon: Twitter },
              { name: 'LinkedIn', icon: Linkedin }
            ].map((social) => (
              <AnimatePresence key={social.name}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

## CookieConsent.tsx:
// CookieConsent.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CookieConsentProps {
  dict: any;
  isRTL: boolean;
}

export default function CookieConsent({ dict, isRTL }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-0 left-0 right-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <Card className="m-4 bg-background/80 backdrop-blur-sm border-background/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{dict.message}</p>
                <div className="flex gap-4">
                  <Button onClick={handleAccept} variant="default">
                    {dict.accept}
                  </Button>
                  <Button onClick={handleDecline} variant="outline">
                    {dict.decline}
                  </Button>
                </div>
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}
                  aria-label="Close"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

## BlogSection.tsx:
// BlogSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function BlogSection({ dict, isRTL }: BlogSectionProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const blogPosts = [
    {
      title: dict.post1.title,
      excerpt: dict.post1.excerpt,
      image: "/blog-post-1.png",
      date: dict.post1.date,
    },
    {
      title: dict.post2.title,
      excerpt: dict.post2.excerpt,
      image: "/blog-post-2.png",
      date: dict.post2.date,
    },
    {
      title: dict.post3.title,
      excerpt: dict.post3.excerpt,
      image: "/blog-post-3.png",
      date: dict.post3.date,
    },
  ]

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </>
          ) : (
            blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full flex flex-col">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardContent className="flex-grow p-6">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className={isRTL ? 'justify-start' : 'justify-end'}>
                    <Button variant="link" asChild>
                      <Link href="#">
                        {dict.readMore}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="#">
              {dict.viewAll}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function BlogPostSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <CardContent className="flex-grow p-6 space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  )
}

## TestimonialsSection.tsx:
// TestimonialsSection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface TestimonialsSectionProps {
  id?: string;
  dict: any;
  isRTL: boolean;
}

export default function TestimonialsSection({ id, dict, isRTL }: TestimonialsSectionProps) {
  const testimonials = [
    { quote: dict.testimonial1.quote, name: dict.testimonial1.name, company: dict.testimonial1.company, avatar: "/avatar1.png" },
    { quote: dict.testimonial2.quote, name: dict.testimonial2.name, company: dict.testimonial2.company, avatar: "/avatar2.png" },
    { quote: dict.testimonial3.quote, name: dict.testimonial3.name, company: dict.testimonial3.company, avatar: "/avatar3.png" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id={id} className={`w-full py-12 md:py-24 lg:py-32 bg-muted ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dict.title}
        </motion.h2>
        <Card className="bg-background/50 backdrop-blur-sm border-background/20 max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-10">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-xl italic mb-6">"{testimonials[currentIndex].quote}"</p>
                  <div className={`flex items-center justify-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                    <Avatar>
                      <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                      <AvatarFallback>{testimonials[currentIndex].name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <Button
                onClick={isRTL ? nextTestimonial : prevTestimonial}
                variant="ghost"
                size="icon"
                className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2`}
                aria-label={isRTL ? "Next testimonial" : "Previous testimonial"}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={isRTL ? prevTestimonial : nextTestimonial}
                variant="ghost"
                size="icon"
                className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2`}
                aria-label={isRTL ? "Previous testimonial" : "Next testimonial"}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

## HeroSection.tsx:
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

  if (isLoading) {
    return <HeroSectionSkeleton isRTL={isRTL} />
  }

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

## Header.tsx:
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Locale } from '@/types'

const languageNames: Record<Locale, string> = {
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  zh: '中文'
}

interface HeaderProps {
  dict: any;
  locale: Locale;
  locales: string[];
}

export default function Header({ dict, locale, locales }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const isRTL = locale === 'ar' || locale === 'fa'

  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const changeLanguage = (newLocale: Locale) => {
    const { pathname, search, hash } = window.location;
    
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    
    // Construct the new URL
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}${search}${hash}`;
    
    // Log for debugging (you can remove these in production)
    console.log("Current pathname:", pathname);
    console.log("Path without locale:", pathWithoutLocale);
    console.log("New locale:", newLocale);
    console.log("New path:", newPath);
    
    // Update the URL
    window.location.href = newPath;
  }

  return (
    <motion.header
      className={`w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm fixed top-0 z-50 border-b border-border ${isRTL ? 'rtl' : 'ltr'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container mx-auto flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
        <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <span className="font-bold text-xl">{dict.company}</span>
        </Link>
        <nav className={`hidden md:flex ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
          <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
          <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
        </nav>
        <div className={`hidden md:flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} items-center`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
              {locales.map((l) => (
                <DropdownMenuItem key={l} onClick={() => changeLanguage(l)}>
                  {languageNames[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild>
            <Link href="/login">{dict.login}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{dict.signup}</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden absolute top-16 ${isRTL ? 'right-0' : 'left-0'} bg-background border-b border-border w-full`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'} space-y-4 p-4`}>
              <Button variant="ghost" onClick={() => scrollToSection('features')}>{dict.features}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{dict.pricing}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('testimonials')}>{dict.testimonials}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>{dict.contact}</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
                  {locales.map((l) => (
                    <DropdownMenuItem key={l} onClick={() => changeLanguage(l)}>
                      {languageNames[l]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-white dark:bg-gray-800">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" asChild>
                <Link href="/login">{dict.login}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{dict.signup}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

## PricingSection.tsx:
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

## ContactSection.tsx:
// ContactSection.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ContactSectionProps {
  id?: string;
  dict: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  isRTL: boolean;
}

export default function ContactSection({ id, dict, isRTL }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    toast({
      title: dict.success,
      description: "We'll get back to you soon.",
    })
  }

  return (
    <section id={id} className={`w-full py-12 md:py-24 lg:py-32 bg-muted ${isRTL ? 'rtl' : 'ltr'}`}>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {dict.name}
                  </label>
                  <Input id="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {dict.email}
                  </label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {dict.message}
                  </label>
                  <Textarea id="message" required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : dict.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

## FeaturesSection.tsx:
// FeaturesSection.tsx
import { Zap, Shield, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
}

interface FeaturesSectionProps {
  id?: string;
  dict: any;
  isRTL: boolean;
}

export default function FeaturesSection({ id, dict, isRTL }: FeaturesSectionProps) {
  const features = [
    { icon: Zap, title: dict.lightning.title, description: dict.lightning.description },
    { icon: Shield, title: dict.secure.title, description: dict.secure.description },
    { icon: BarChart, title: dict.analytics.title, description: dict.analytics.description },
  ]

  return (
    <section id={id} className={`w-full py-12 md:py-24 lg:py-32 bg-muted ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">{dict.title}</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center space-y-4 text-center"
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
             <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

## BackToTopButton.tsx:
'use client'

import { useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBackToTop } from '../../providers/BackToTopProvider'

interface BackToTopButtonProps {
  isRTL: boolean;
}

export default function BackToTopButton({ isRTL }: BackToTopButtonProps) {
  const { isBackToTopVisible, setIsBackToTopVisible } = useBackToTop()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsBackToTopVisible(true)
      } else {
        setIsBackToTopVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [setIsBackToTopVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isBackToTopVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className={`fixed bottom-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
          aria-label="Back to top"
        >
          <ArrowUp size={24} className={isRTL ? 'transform rotate-180' : ''} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

## Additional Files:


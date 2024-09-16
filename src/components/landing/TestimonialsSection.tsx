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
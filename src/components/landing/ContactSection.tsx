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
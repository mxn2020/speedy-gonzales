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
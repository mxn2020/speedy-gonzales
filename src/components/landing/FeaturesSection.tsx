'use client'

import { Zap, Shield, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'

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

export default function FeaturesSection() {
  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Experience unparalleled speed and efficiency in your workflow.' },
    { icon: Shield, title: 'Secure', description: 'Your data is protected with state-of-the-art security measures.' },
    { icon: BarChart, title: 'Analytics', description: 'Gain valuable insights with our powerful analytics tools.' },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
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
              <div className="p-4 bg-primary/10 rounded-full">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
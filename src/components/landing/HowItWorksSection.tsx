'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Users, BarChart } from 'lucide-react'

const steps = [
  {
    title: "Sign Up",
    description: "Create your account in minutes",
    icon: CheckCircle,
  },
  {
    title: "Invite Your Team",
    description: "Collaborate with your colleagues",
    icon: Users,
  },
  {
    title: "Start Analyzing",
    description: "Gain insights from your data",
    icon: BarChart,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
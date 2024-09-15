'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const planVariants = {
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

export default function PricingSection() {
  const plans = [
    { name: 'Free', price: '$0', features: ['Basic features', 'Limited storage', 'Email support'] },
    { name: 'Starter', price: '$29', features: ['All Free features', 'Unlimited storage', 'Priority support'], popular: true },
    { name: 'Pro', price: '$99', features: ['All Starter features', 'Advanced analytics', 'Custom integrations'] },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`flex flex-col p-6 bg-muted rounded-lg shadow-lg ${plan.popular ? 'border-2 border-primary' : ''}`}
              variants={planVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 text-4xl font-bold">{plan.price}<span className="text-xl font-normal">/month</span></div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="text-primary mr-2 h-4 w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
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
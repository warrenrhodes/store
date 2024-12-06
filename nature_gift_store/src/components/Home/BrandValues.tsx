'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, Leaf, HeartPulse, Zap, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const values = [
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All products are verified and tested for quality',
  },
  {
    icon: HeartPulse,
    title: 'Health First',
    description: 'Products that prioritize your wellbeing',
  },
  {
    icon: Zap,
    title: 'Latest Tech',
    description: 'Cutting-edge electronics and gadgets',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Committed to sustainable practices',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive prices on all products',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping worldwide',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function BrandValues() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            We're committed to providing the best shopping experience
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <value.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

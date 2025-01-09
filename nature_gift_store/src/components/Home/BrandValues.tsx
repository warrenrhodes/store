'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, Leaf, HeartPulse, Zap, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useLocalization } from '@/hooks/useLocalization'
import { useLocale } from '@/hooks/useLocale'

const values = [
  {
    icon: Shield,
    title: {
      en: 'Quality Assurance',
      fr: 'Assurance de qualité',
    },
    description: {
      en: 'All products are verified and tested for quality',
      fr: 'Tous les produits sont verifiés et testés pour la qualité',
    },
  },
  {
    icon: HeartPulse,
    title: {
      en: 'Healthy Products',
      fr: 'Produits sains',
    },
    description: {
      en: 'Products that prioritize your wellbeing',
      fr: 'Produits qui privilegient votre bien-etre',
    },
  },
  {
    icon: Zap,
    title: {
      en: 'Latest Tech',
      fr: 'Dernière technologie',
    },
    description: {
      en: 'Cutting-edge electronics and gadgets',
      fr: 'Electroniques et accessoires de pointe',
    },
  },
  {
    icon: Leaf,
    title: {
      en: 'Eco-Friendly',
      fr: 'Eco-Friendly',
    },
    description: {
      en: 'We use only eco-friendly products',
      fr: 'Nous utilisons uniquement des produits ecologiques',
    },
  },
  {
    icon: Award,
    title: {
      en: 'Best Prices',
      fr: 'Prix les meilleurs',
    },
    description: {
      en: 'We offer the best prices in the market',
      fr: 'Nous offrons les meilleurs prix dans le marché',
    },
  },
  {
    icon: Truck,
    title: {
      en: 'Fast Delivery',
      fr: 'Livraison rapide',
    },
    description: {
      en: 'Quick and reliable shipping worldwide',
      fr: 'Livraison rapide et fiable mondiale',
    },
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
  const { localization } = useLocalization()
  const { locale } = useLocale()

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {localization.whyChooseUs}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{localization.whyChooseUsDescription}</p>
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
                  <h3 className="mt-4 font-semibold">{value.title[locale]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description[locale]}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

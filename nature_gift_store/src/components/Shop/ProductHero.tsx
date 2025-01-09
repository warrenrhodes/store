'use client'

import { useLocalization } from '@/hooks/useLocalization'
import { motion } from 'framer-motion'

export function ProductHero() {
  const { localization } = useLocalization()
  return (
    <section className="relative h-96 bg-gray-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
      />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white mb-6"
          >
            {localization.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-200 mb-8"
          >
            {localization.heroDescription}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { getPromotions } from '@/lib/api/promotions'
import { IPromotion } from '@/lib/models/Promotions'

export function PromotionBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [promotions, setPromotions] = useState<IPromotion[]>([])

  const goToNext = useCallback(() => {
    setOpacity(0)
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % promotions.length)
      setOpacity(1)
    }, 300)
  }, [])

  const fetchPromotions = useCallback(async () => {
    const activePromotions = await getPromotions()
    if (!activePromotions) return

    setPromotions(activePromotions)
  }, [])

  useEffect(() => {
    fetchPromotions()
  }, [fetchPromotions])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (promotions.length > 1) {
      interval = setInterval(goToNext, 7000)
    }
    return () => clearInterval(interval)
  }, [goToNext])

  if (!promotions || promotions.length === 0) return null

  const currentPromotion = promotions[currentIndex]

  return (
    <section className="bg-primary" key={currentPromotion._id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-15"
      >
        <div
          className="relative rounded-2xl overflow-hidden transition-opacity duration-600"
          style={{ opacity }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
                <span className="text-lg font-medium text-primary-foreground">Flash Sale</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                {currentPromotion.name}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                {currentPromotion.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
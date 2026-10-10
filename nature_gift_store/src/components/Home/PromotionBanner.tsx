'use client'

import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLocalization } from '@/hooks/useLocalization'
import { Promotion } from '@/lib/firebase/models'

export function PromotionBanner({ promotions }: { promotions: Promotion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { localization } = useLocalization()

  useEffect(() => {
    if (promotions.length < 2) return
    const interval = setInterval(() => setCurrentIndex(i => (i + 1) % promotions.length), 7000)
    return () => clearInterval(interval)
  }, [promotions.length])

  if (promotions.length === 0) return null
  const promotion = promotions[currentIndex]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div
        key={promotion.path}
        className="flex flex-col gap-6 rounded-xl bg-primary px-6 py-10 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:px-12 animate-in fade-in duration-500"
      >
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground/85">
            <Zap className="h-4 w-4" aria-hidden />
            {localization.flashSale}
          </p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{promotion.name}</h2>
          {promotion.description && (
            <p className="mt-2 text-primary-foreground/85">{promotion.description}</p>
          )}
        </div>
        <Link
          href="/shop"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-background px-7 font-medium text-foreground transition hover:bg-background/90"
        >
          {localization.shop}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

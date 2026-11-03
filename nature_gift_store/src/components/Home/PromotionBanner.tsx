'use client'

import { ArrowRight, Zap } from 'lucide-react'
import { SiteLink as Link } from '@/components/Site'
import { useEffect, useState } from 'react'
import { useLocalization } from '@/hooks/useLocalization'
import { Promotion } from '@/lib/firebase/models'
import { Countdown } from '@/components/Countdown'

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
          <CodesLeft promotion={promotion} className="mt-2 font-semibold" />
        </div>
        <Countdown countdown={{ mode: 'limited', endsAt: promotion.endDate }} />
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

/** "Only 12 left" for a promotion with a total usage limit (count cached for a few minutes). */
export function CodesLeft({ promotion, className }: { promotion: Promotion; className?: string }) {
  const { localization } = useLocalization()
  const total = promotion.usageLimit?.total
  if (!total) return null
  const left = Math.max(0, total - (promotion.usageCount ?? 0))
  return <p className={className}>{localization.codesLeft.replace('{n}', String(left))}</p>
}

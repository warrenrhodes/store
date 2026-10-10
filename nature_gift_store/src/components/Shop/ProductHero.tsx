'use client'

import { useLocalization } from '@/hooks/useLocalization'

export function ProductHero() {
  const { localization } = useLocalization()
  return (
    <section className="border-b bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h1 className="text-3xl font-semibold sm:text-4xl">{localization.heroTitle}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{localization.heroDescription}</p>
      </div>
    </section>
  )
}

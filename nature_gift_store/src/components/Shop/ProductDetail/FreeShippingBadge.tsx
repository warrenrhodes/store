'use client'

import { Truck } from 'lucide-react'
import { useLocalization } from '@/hooks/useLocalization'

/** `areas` from getFreeShippingAreas: null = no offer, [] = free everywhere. */
export function FreeShippingBadge({ areas }: { areas: string[] | null }) {
  const { localization } = useLocalization()
  if (!areas) return null

  return (
    <p className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
      <Truck className="h-4 w-4 shrink-0" aria-hidden />
      {areas.length === 0
        ? localization.freeShipping
        : `${localization.freeShippingIn} : ${areas.join(', ')}`}
    </p>
  )
}

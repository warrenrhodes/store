'use client'

import { toast } from '@/hooks/use-toast'
import { useLocalization } from '@/hooks/useLocalization'
import { usePromoCodes } from '@/hooks/usePromoCodes'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/** Shopify-style discount links: any page opened with ?promo=CODE remembers the code. */
export function PromoLinkCapture() {
  const code = useSearchParams().get('promo')
  const add = usePromoCodes(state => state.add)
  const { localization } = useLocalization()

  useEffect(() => {
    if (!code) return
    add(code)
    toast({ description: `${localization.promoAddedFromLink} : ${code.toUpperCase()}` })
  }, [code])

  return null
}

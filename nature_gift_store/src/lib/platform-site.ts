// Not in components/Site.tsx: a 'use client' module only gives server code references, not
// values, and app/[site]/layout.tsx spreads this object.
import { MARKET } from '@ngift/core/site'
import type { SiteInfo } from '@/components/Site'

/** The platform's own brand, on the marketplace. */
export const PLATFORM_SITE: SiteInfo = {
  site: MARKET,
  name: 'N.Gift',
  whatsapp: '237696689073',
  email: 'natures.gift.237@gmail.com',
  isMarket: true,
}

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

/**
 * The platform's identity on the legal pages (lib/legal.ts). Add the RCCM and NIU once the
 * company is registered.
 */
export const PLATFORM_LEGAL = {
  name: PLATFORM_SITE.name,
  email: PLATFORM_SITE.email,
  whatsapp: PLATFORM_SITE.whatsapp,
  legal: {
    companyName: PLATFORM_SITE.name,
    address:
      "Yaoundé, Carrefour Ekoudoum, lieu dit restaurant Droit Chemin, à côté de l'Hôtel IRIS",
    registration: null,
    taxId: null,
  },
  hosting: 'Vercel Inc. (site, États-Unis) et Google LLC – Firebase (données, États-Unis)',
}

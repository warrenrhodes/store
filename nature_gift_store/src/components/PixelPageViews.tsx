'use client'

import { trackPixel } from '@/lib/analytics/pixel'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * A PageView for every page the visitor opens. The Pixel base code counts the first one; Next
 * changes pages without reloading, so the next ones are sent from here.
 */
export function PixelPageViews() {
  const pathname = usePathname()
  const first = useRef(true)
  // A click on an ad (?fbclid=…) kept as the _fbc cookie, in the Pixel's format, even if the
  // Pixel itself is blocked: the server's Conversions API events send it (match quality).
  useEffect(() => {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid')
    if (fbclid && !document.cookie.includes('_fbc=')) {
      document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; path=/; max-age=7776000; SameSite=Lax`
    }
  }, [])
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    trackPixel('PageView')
  }, [pathname])
  return null
}

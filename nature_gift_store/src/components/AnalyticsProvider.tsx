'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getAnalytics } from '@/lib/analytics'

export function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize tracking on mount and route changes
    const initializeTracking = () => {
      if (!window.analytics) return

      // Start new visit
      const visitId = window.analytics.startVisit()

      // Mark as loaded after a short delay to ensure page is rendered
      setTimeout(() => {
        window.analytics.markPageLoaded(visitId)
      }, 100)

      // Track visit duration
      window.sessionStorage.setItem('current_visit_id', visitId)

      // Cleanup on page unload
      const handleUnload = () => {
        window.analytics.endVisit(visitId)
      }

      window.addEventListener('beforeunload', handleUnload)

      return () => {
        window.removeEventListener('beforeunload', handleUnload)
        window.analytics.endVisit(visitId)
        console.log('AnalyticsProvider unmounted')
      }
    }
    getAnalytics()
    initializeTracking()
  }, [pathname, searchParams])

  return null
}

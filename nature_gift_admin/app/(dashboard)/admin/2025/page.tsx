'use client'
import { DashboardAnalytics, IAnalyticsData } from '@/components/analytics/DashboardAnalytics'
import { useEffect, useState } from 'react'

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<IAnalyticsData[]>([])

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setAnalyticsData)
  }, [])

  return <DashboardAnalytics data={analyticsData} />
}

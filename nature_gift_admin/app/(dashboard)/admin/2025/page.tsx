import { DashboardAnalytics } from '@/components/analytics/DashboardAnalytics'
import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import {
  PageView,
  AnalyticsData,
  SourceAnalytics,
  CampaignAnalytics,
  Conversion,
  CampaignCost,
} from '@prisma/client'
import { prisma } from '@/lib/prisma'

function groupDataByDay(
  pageViews: PageView[],
  conversions: Conversion[],
  campaignCosts: CampaignCost[],
): AnalyticsData[] {
  // Create a map to store data by date
  const dailyDataMap = new Map<
    string,
    {
      pageViews: PageView[]
      conversions: Conversion[]
      campaignCosts: CampaignCost[]
    }
  >()

  // Group page views by date
  pageViews.forEach(view => {
    const date = view.createdAt.toISOString().split('T')[0]
    if (!dailyDataMap.has(date)) {
      dailyDataMap.set(date, {
        pageViews: [],
        conversions: [],
        campaignCosts: [],
      })
    }
    dailyDataMap.get(date)!.pageViews.push(view)
  })

  // Group conversions by date
  conversions.forEach(conversion => {
    const date = conversion.createdAt.toISOString().split('T')[0]
    if (!dailyDataMap.has(date)) {
      dailyDataMap.set(date, {
        pageViews: [],
        conversions: [],
        campaignCosts: [],
      })
    }
    dailyDataMap.get(date)!.conversions.push(conversion)
  })

  // Group campaign costs by date
  campaignCosts.forEach(cost => {
    const date = cost.createdAt.toISOString().split('T')[0]
    if (!dailyDataMap.has(date)) {
      dailyDataMap.set(date, {
        pageViews: [],
        conversions: [],
        campaignCosts: [],
      })
    }
    dailyDataMap.get(date)!.campaignCosts.push(cost)
  })

  // Convert map to array and calculate analytics for each day
  return Array.from(dailyDataMap.entries())
    .map(([date, data]) => {
      const validVisits = data.pageViews.filter(v => v.isCompleteLoad)
      const totalVisits = data.pageViews.length
      const totalRevenue = data.conversions.reduce((sum, conv) => sum + conv.value, 0)

      return {
        id: Math.random().toString(),
        date: new Date(date),
        pageViews: data.pageViews,
        totalVisits,
        validVisits: validVisits.length,
        bounceRate: totalVisits ? ((totalVisits - validVisits.length) / totalVisits) * 100 : 0,
        averageTimeOnSite: calculateAverageTimeOnSite(validVisits),
        totalRevenue,
        totalConversions: data.conversions.length,
        timeDistribution: calculateTimeDistribution(validVisits),
        pagePerformance: calculatePagePerformance(data.pageViews, data.conversions),
        sourceAnalytics: calculateSourceAnalytics(data.pageViews, data.conversions),
        campaignAnalytics: calculateCampaignAnalytics(
          data.pageViews,
          data.conversions,
          data.campaignCosts,
        ),
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

function calculateAverageTimeOnSite(visits: PageView[]): number {
  if (visits.length === 0) return 0
  return visits.reduce((sum, v) => sum + v.timeOnPage, 0) / visits.length
}

function calculateTimeDistribution(visits: PageView[]): Record<string, number> {
  const distribution: Record<string, number> = {}
  const intervals = [0, 10, 30, 60, 180, 300, 600] // secondes

  visits.forEach(visit => {
    const timeInSeconds = visit.timeOnPage / 1000
    const interval = intervals.find(i => timeInSeconds <= i) || 600
    distribution[`${interval}s`] = (distribution[`${interval}s`] || 0) + 1
  })

  return distribution
}

function calculatePagePerformance(
  visits: PageView[],
  conversions: Conversion[],
): Record<string, any> {
  const pages: Record<
    string,
    {
      views: number
      loadTimes: number[]
      bounces: number
      conversions: number
      revenue: number
    }
  > = {}

  visits.forEach(visit => {
    if (!pages[visit.url]) {
      pages[visit.url] = {
        views: 0,
        loadTimes: [],
        bounces: 0,
        conversions: 0,
        revenue: 0,
      }
    }

    pages[visit.url].views++
    pages[visit.url].loadTimes.push(visit.loadTime)
    if (!visit.isCompleteLoad) pages[visit.url].bounces++

    // Ajouter les conversions associées à cette visite
    const visitConversions = conversions.filter(c => c.visitId === visit.id)
    pages[visit.url].conversions += visitConversions.length
    pages[visit.url].revenue += visitConversions.reduce((sum, c) => sum + c.value, 0)
  })

  return Object.entries(pages).reduce(
    (acc, [url, data]) => {
      acc[url] = {
        views: data.views,
        avgLoadTime: data.loadTimes.reduce((sum, time) => sum + time, 0) / data.loadTimes.length,
        bounceRate: (data.bounces / data.views) * 100,
        conversions: data.conversions,
        revenue: data.revenue,
      }
      return acc
    },
    {} as Record<string, any>,
  )
}

function calculateSourceAnalytics(
  visits: PageView[],
  conversions: Conversion[],
): SourceAnalytics[] {
  const sources = new Map<
    string,
    {
      visits: number
      conversions: number
      timeOnSite: number[]
      bounces: number
      revenue: number
    }
  >()

  visits.forEach(visit => {
    const source = visit.source
    if (!sources.has(source)) {
      sources.set(source, {
        visits: 0,
        conversions: 0,
        timeOnSite: [],
        bounces: 0,
        revenue: 0,
      })
    }

    const sourceData = sources.get(source)!
    sourceData.visits++
    sourceData.timeOnSite.push(visit.timeOnPage)
    if (!visit.isCompleteLoad) sourceData.bounces++

    // Ajouter les conversions pour cette visite
    const visitConversions = conversions.filter(c => c.visitId === visit.id)
    sourceData.conversions += visitConversions.length
    sourceData.revenue += visitConversions.reduce((sum, c) => sum + c.value, 0)
  })

  return Array.from(sources.entries()).map(([name, data]) => ({
    name,
    visits: data.visits,
    conversions: data.conversions,
    bounceRate: (data.bounces / data.visits) * 100,
    averageTimeOnSite:
      data.timeOnSite.reduce((sum, time) => sum + time, 0) / data.timeOnSite.length,
    revenue: data.revenue,
  }))
}

function calculateCampaignAnalytics(
  visits: PageView[],
  conversions: Conversion[],
  campaignCosts: CampaignCost[],
): CampaignAnalytics[] {
  const campaigns = new Map<
    string,
    {
      source: string
      visits: number
      conversions: number
      revenue: number
      cost: number
    }
  >()

  // Initialiser les données de campagne avec les coûts
  campaignCosts.forEach(cost => {
    if (!campaigns.has(cost.campaign)) {
      campaigns.set(cost.campaign, {
        source: '',
        visits: 0,
        conversions: 0,
        revenue: 0,
        cost: cost.cost,
      })
    } else {
      campaigns.get(cost.campaign)!.cost = cost.cost
    }
  })

  // Ajouter les visites et conversions
  visits.forEach(visit => {
    if (!visit.utmParams?.campaign) return

    const campaign = visit.utmParams.campaign
    if (!campaigns.has(campaign)) {
      campaigns.set(campaign, {
        source: visit.utmParams.source,
        visits: 0,
        conversions: 0,
        revenue: 0,
        cost: 0,
      })
    }

    const campaignData = campaigns.get(campaign)!
    campaignData.visits++
    campaignData.source = visit.utmParams.source

    // Ajouter les conversions pour cette visite
    const visitConversions = conversions.filter(c => c.visitId === visit.id)
    campaignData.conversions += visitConversions.length
    campaignData.revenue += visitConversions.reduce((sum, c) => sum + c.value, 0)
  })

  return Array.from(campaigns.entries()).map(([name, data]) => ({
    name,
    source: data.source,
    visits: data.visits,
    conversions: data.conversions,
    revenue: data.revenue,
    cost: data.cost,
    roi: data.cost > 0 ? ((data.revenue - data.cost) / data.cost) * 100 : 0,
  }))
}
const getAnalytics = async (): Promise<any> => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }
  const _currentUser = await getUserByClerkId(userId)
  if (!_currentUser?.id) {
    return []
  }

  const [pageViews, conversions, campaignCosts] = await Promise.all([
    prisma.pageView.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    }),
    prisma.conversion.findMany(),
    prisma.campaignCost.findMany(),
  ])

  if (!pageViews || !conversions || !campaignCosts) {
    return NextResponse.json({ error: 'No page views found' }, { status: 404 })
  }

  const dailyData = groupDataByDay(pageViews, conversions, campaignCosts)
  return dailyData
}

export default async function AnalyticsPage() {
  const analyticsData = await getAnalytics()

  return <DashboardAnalytics data={analyticsData} />
}

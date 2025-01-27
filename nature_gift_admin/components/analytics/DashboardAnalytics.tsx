'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { AnalyticsData, PageView } from '@prisma/client'
import { TabsTrigger } from '@/components/ui/tabs'
import { Tabs, TabsList, TabsContent } from '@radix-ui/react-tabs'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
export type IAnalyticsData = AnalyticsData & { date: Date; pageViews: PageView[] }

const DashboardAnalytics = ({ data }: { data: IAnalyticsData[] }) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })
  const [timeFrame, setTimeFrame] = useState('day')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  // Filter data based on date range
  const filteredData = data.filter(item => {
    const date = new Date(item.date)
    return date >= dateRange.from && date <= dateRange.to
  })

  // Get all page views within the date range
  const filteredPageViews = filteredData.flatMap(item =>
    item.pageViews.filter(view => {
      const viewDate = new Date(view.timestamp)
      return viewDate >= dateRange.from && viewDate <= dateRange.to
    }),
  )

  // Group data by timeframe if needed
  const groupedData = timeFrame === 'month' ? groupByMonth(filteredData) : filteredData

  // Calculate summary metrics
  const summaryMetrics = {
    totalVisits: groupedData.reduce((sum, item: any) => sum + item.totalVisits, 0) as number,
    validVisits: groupedData.reduce((sum, item: any) => sum + item.validVisits, 0) as number,
    totalRevenue: groupedData.reduce((sum, item: any) => sum + item.totalRevenue, 0) as number,

    averageTimeOnSite: groupedData.reduce(
      (sum, item: any) => sum + item.averageTimeOnSite,
      0,
    ) as number,
    averageBounceRate:
      (groupedData.reduce((sum, item: any) => sum + item.bounceRate, 0) as number) /
      groupedData.length,
    totalConversions: groupedData.reduce(
      (sum, item: any) => sum + item.totalConversions,
      0,
    ) as number,
    revenuePerVisit: ((groupedData.reduce(
      (sum, item: any) => sum + item.totalRevenue,
      0,
    ) as number) /
      (groupedData.reduce((sum, item: any) => sum + item.totalVisits, 0) as number)) as number,
  }

  // Aggregate page views data
  const aggregatedPageData = filteredPageViews.reduce((acc, view) => {
    const url = view.url
    if (!acc[url]) {
      acc[url] = {
        url,
        avgTime: 0,
        validVisits: 0,
        totalVisits: 1,
        sources: new Set(),
        campaigns: new Set(),
        totalTimeOnPage: view.timeOnPage,
      }
    } else {
      acc[url].totalVisits += 1
      acc[url].totalTimeOnPage += view.timeOnPage
    }

    if (view.isCompleteLoad) {
      acc[url].validVisits += 1
    }

    acc[url].sources.add(view.source)
    if (view.utmParams?.campaign) {
      acc[url].campaigns.add(view.utmParams.campaign)
    }

    return acc
  }, {})

  // Calculate averages and format page data
  const pageAnalytics = Object.values(aggregatedPageData)
    .map((page: any) => ({
      ...page,
      avgTime: Math.round(page.totalTimeOnPage / page.totalVisits),
      sources: Array.from(page.sources).join(', '),
      campaigns: Array.from(page.campaigns).join(', '),
    }))
    .filter(page => page.url.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={range =>
                range &&
                setDateRange({
                  from: range.from || new Date(new Date().setMonth(new Date().getMonth() - 1)),
                  to: range.to || new Date(),
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Page Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Summary Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Total Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryMetrics.totalVisits.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Valid Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryMetrics.validVisits.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Time on site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryMetrics.averageTimeOnSite.toFixed(1)}s
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${summaryMetrics.totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryMetrics.averageBounceRate.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summaryMetrics.totalConversions.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue per Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${summaryMetrics.revenuePerVisit.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Visits & Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Visits & Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={groupedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={date =>
                          format(new Date(date), timeFrame === 'month' ? 'MMM yyyy' : 'MM/dd')
                        }
                      />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="totalVisits"
                        stroke="#8884d8"
                        name="Visits"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="totalRevenue"
                        stroke="#82ca9d"
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Source Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aggregateSourceAnalytics(groupedData)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visits" fill="#8884d8" name="Visits" />
                      <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aggregateCampaignAnalytics(groupedData)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Session Duration Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aggregateTimeDistribution(groupedData)}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {aggregateTimeDistribution(groupedData).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by URL..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Avg Time (s)</TableHead>
                      <TableHead className="text-right">Valid Visits</TableHead>
                      <TableHead className="text-right">Total Visits</TableHead>
                      <TableHead>Sources</TableHead>
                      <TableHead>Campaigns</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageAnalytics.map(page => (
                      <TableRow key={page.url}>
                        <TableCell className="font-medium">{page.url}</TableCell>
                        <TableCell className="text-right">
                          {(page.avgTime / 1000).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">{page.validVisits}</TableCell>
                        <TableCell className="text-right">{page.totalVisits}</TableCell>
                        <TableCell>{page.sources}</TableCell>
                        <TableCell>{page.campaigns}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campaign ROI Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign ROI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aggregateCampaignAnalytics(groupedData)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Conversion Rates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aggregateCampaignConversions(groupedData)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="conversionRate" fill="#82ca9d" name="Conversion Rate %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Details Table */}
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Visits</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                      <TableHead className="text-right">Conv. Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aggregateCampaignDetails(groupedData).map(campaign => (
                      <TableRow key={`${campaign.name}-${campaign.source}`}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.source}</TableCell>
                        <TableCell className="text-right">
                          {campaign.visits.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {campaign.conversions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          ${campaign.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          ${campaign.cost?.toLocaleString() || '0'}
                        </TableCell>
                        <TableCell className="text-right">{campaign.roi?.toFixed(2)}%</TableCell>
                        <TableCell className="text-right">
                          {((campaign.conversions / campaign.visits) * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Utility functions for data aggregation
function groupByMonth(data: IAnalyticsData[]) {
  const monthlyData = data.reduce((acc, item) => {
    const monthKey = format(new Date(item.date), 'yyyy-MM')
    if (!acc[monthKey]) {
      acc[monthKey] = {
        date: new Date(item.date),
        totalVisits: 0,
        validVisits: 0,
        averageTimeOnSite: 0,
        totalRevenue: 0,
        bounceRate: 0,
        totalConversions: 0,
        sourceAnalytics: [],
        pageViews: [],
        campaignAnalytics: [],
        timeDistribution: {},
      }
    }

    acc[monthKey].validVisits += item.validVisits
    acc[monthKey].averageTimeOnSite += item.averageTimeOnSite
    acc[monthKey].totalVisits += item.totalVisits
    acc[monthKey].totalRevenue += item.totalRevenue
    acc[monthKey].totalConversions += item.totalConversions
    acc[monthKey].bounceRate = (acc[monthKey].bounceRate + item.bounceRate) / 2
    acc[monthKey].sourceAnalytics = acc[monthKey].sourceAnalytics.concat(item.sourceAnalytics)
    acc[monthKey].campaignAnalytics = acc[monthKey].campaignAnalytics.concat(item.campaignAnalytics)
    const timeDistribution: Record<string, number> = item.timeDistribution as Record<string, number>
    // Merge time distributions
    Object.entries(timeDistribution).forEach(([key, value]) => {
      acc[monthKey].timeDistribution[key] = (acc[monthKey].timeDistribution[key] || 0) + value
    })

    return acc
  }, {})

  return Object.values(monthlyData)
}

function aggregateSourceAnalytics(data) {
  const sources = data.reduce((acc, day) => {
    day.sourceAnalytics.forEach(source => {
      if (!acc[source.name]) {
        acc[source.name] = { name: source.name, visits: 0, conversions: 0 }
      }
      acc[source.name].visits += source.visits
      acc[source.name].conversions += source.conversions
    })
    return acc
  }, {})

  return Object.values(sources)
}

function aggregateCampaignAnalytics(data) {
  const campaigns = data.reduce((acc, day) => {
    day.campaignAnalytics.forEach(campaign => {
      if (!acc[campaign.name]) {
        acc[campaign.name] = {
          name: campaign.name,
          revenue: 0,
          cost: 0,
          visits: 0,
        }
      }
      acc[campaign.name].revenue += campaign.revenue
      acc[campaign.name].cost += campaign.cost
      acc[campaign.name].visits += campaign.visits
    })
    return acc
  }, {}) as any

  return Object.values(campaigns).map((campaign: any) => ({
    name: campaign.name,
    roi: campaign.cost > 0 ? ((campaign.revenue - campaign.cost) / campaign.cost) * 100 : 0,
  }))
}

function aggregateTimeDistribution(data) {
  const distribution = data.reduce((acc, day) => {
    Object.entries(day.timeDistribution).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value
    })
    return acc
  }, {})

  return Object.entries(distribution).map(([name, value]) => ({
    name: name,
    value: value,
  }))
}

// Add new utility functions for campaign analytics
function aggregateCampaignConversions(data) {
  const campaigns = data.reduce((acc, day) => {
    day.campaignAnalytics.forEach(campaign => {
      if (!acc[campaign.name]) {
        acc[campaign.name] = {
          name: campaign.name,
          visits: 0,
          conversions: 0,
        }
      }
      acc[campaign.name].visits += campaign.visits
      acc[campaign.name].conversions += campaign.conversions
    })
    return acc
  }, {})

  return Object.values(campaigns).map((campaign: any) => ({
    name: campaign.name,
    conversionRate: (campaign.conversions / campaign.visits) * 100,
  }))
}

function aggregateCampaignDetails(data) {
  const campaigns = data.reduce((acc, day) => {
    day.campaignAnalytics.forEach(campaign => {
      const key = `${campaign.name}-${campaign.source}`
      if (!acc[key]) {
        acc[key] = {
          name: campaign.name,
          source: campaign.source,
          visits: 0,
          conversions: 0,
          revenue: 0,
          cost: 0,
        }
      }
      acc[key].visits += campaign.visits
      acc[key].conversions += campaign.conversions
      acc[key].revenue += campaign.revenue
      acc[key].cost += campaign.cost || 0
    })
    return acc
  }, {})

  return Object.values(campaigns).map((campaign: any) => ({
    ...campaign,
    roi: campaign.cost > 0 ? ((campaign.revenue - campaign.cost) / campaign.cost) * 100 : 0,
  }))
}

// Export existing utility functions and component
export { DashboardAnalytics }

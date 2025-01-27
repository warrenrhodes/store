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
import { AnalyticsData, PageView } from '@prisma/client'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
export type IAnalyticsData = AnalyticsData & { date: Date; pageViews: PageView[] }

const DashboardAnalytics = ({ data }: { data: IAnalyticsData[] }) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })
  const [timeFrame, setTimeFrame] = useState('day')

  // Filter data based on date range
  const filteredData = data.filter(item => {
    const date = new Date(item.date)
    return date >= dateRange.from && date <= dateRange.to
  })

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
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center">
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
            <div className="text-2xl font-bold">{summaryMetrics.totalVisits.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valid Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.validVisits.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Time on site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryMetrics.averageTimeOnSite.toLocaleString()}
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
            <div className="text-2xl font-bold">{summaryMetrics.averageBounceRate.toFixed(1)}%</div>
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
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

export { DashboardAnalytics }

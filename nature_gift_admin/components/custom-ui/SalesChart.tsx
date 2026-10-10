'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { priceFormatted } from '@/lib/utils/utils'

type Point = { name: string; sales: number }

const compact = (n: number) =>
  new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

const SalesChart = ({ data }: { data: Point[] }) => (
  <>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barCategoryGap={6}>
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis
          width={48}
          tickLine={false}
          axisLine={false}
          tickFormatter={compact}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          formatter={value => [priceFormatted(Number(value)), 'Revenue']}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid hsl(var(--border))',
            fontSize: 13,
          }}
        />
        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
    {/* Screen-reader / no-JS table view of the same data */}
    <table className="sr-only">
      <caption>Revenue per month</caption>
      <tbody>
        {data.map(d => (
          <tr key={d.name}>
            <th scope="row">{d.name}</th>
            <td>{priceFormatted(d.sales)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default SalesChart

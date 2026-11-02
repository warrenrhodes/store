'use client'

import { Button } from '@/components/ui/button'
import { toCsv } from '@/lib/orders/order-logic'
import { Download } from 'lucide-react'

/** Downloads `rows` as a CSV file (with a BOM so Excel reads accents correctly). */
export function CsvExportButton({
  rows,
  filename,
}: {
  rows: Array<Record<string, string | number | null | undefined>>
  filename: string
}) {
  const download = () => {
    const blob = new Blob(['﻿', toCsv(rows)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: `${filename}-${new Date().toISOString().slice(0, 10)}.csv`,
    })
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <Button variant="outline" size="sm" onClick={download} disabled={rows.length === 0}>
      <Download className="mr-2 h-4 w-4" /> Export CSV
    </Button>
  )
}

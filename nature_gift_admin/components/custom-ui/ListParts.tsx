'use client'

// The pieces shared by the admin's list pages (blogs, products, promotions).
import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toDate } from '@/lib/utils/utils'

export function ListHeader(props: { title: string; description: string; actions: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        <p className="text-muted-foreground">{props.description}</p>
      </div>
      <div className="flex gap-2">{props.actions}</div>
    </div>
  )
}

const STATUS_STYLE: Record<string, string> = {
  PUBLISHED: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100',
  ACTIVE: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100',
  SCHEDULED: 'bg-sky-100 text-sky-900 hover:bg-sky-100',
  EXPIRED: 'bg-red-100 text-red-900 hover:bg-red-100',
}

/** A document's status, in words ("Published"), green when it is live. */
export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        'font-medium',
        STATUS_STYLE[status] ?? 'bg-muted text-muted-foreground hover:bg-muted',
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  )
}

/** A column heading that sorts on click, aligned with the cells under it. */
export function SortHeader<T>({ column, label }: { column: Column<T>; label: string }) {
  return (
    <Button
      variant="ghost"
      className="-ml-3"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
    </Button>
  )
}

/** The row's main cell: its image, its title (links to the edit page) and a detail line. */
export function TitleCell(props: {
  href: string
  title: string
  detail?: string
  image?: string | null
}) {
  return (
    <Link href={props.href} className="group flex items-center gap-3">
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
        {props.image && (
          <Image src={props.image} alt="" fill sizes="40px" className="object-cover" />
        )}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-1 font-medium group-hover:underline">{props.title}</span>
        {props.detail && (
          <span className="line-clamp-1 text-xs text-muted-foreground">{props.detail}</span>
        )}
      </span>
    </Link>
  )
}

/** "4 Nov 2026", or "—". */
export const shortDate = (date: unknown) =>
  toDate(date as never)?.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) ?? '—'

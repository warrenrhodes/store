import { CheckCircle2, CircleDashed, CircleX, Clock, PackageCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

// Icon + label + color, so status is never conveyed by color alone.
const STATUS = {
  PENDING: { label: 'Pending', icon: Clock, className: 'bg-amber-100 text-amber-900' },
  ACCEPTED: { label: 'Accepted', icon: CheckCircle2, className: 'bg-sky-100 text-sky-900' },
  COMPLETED: { label: 'Completed', icon: PackageCheck, className: 'bg-emerald-100 text-emerald-900' },
  CANCELED: { label: 'Canceled', icon: CircleX, className: 'bg-muted text-muted-foreground' },
  REJECTED: { label: 'Rejected', icon: CircleX, className: 'bg-red-100 text-red-900' },
} as const

export function OrderStatusBadge({ status }: { status: string }) {
  const s = STATUS[status as keyof typeof STATUS] ?? {
    label: status,
    icon: CircleDashed,
    className: 'bg-muted text-muted-foreground',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        s.className,
      )}
    >
      <s.icon className="h-3.5 w-3.5" aria-hidden />
      {s.label}
    </span>
  )
}

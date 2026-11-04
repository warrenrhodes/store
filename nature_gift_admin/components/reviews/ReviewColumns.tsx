import { IReview } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, BadgeCheck, Check, Edit, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { setReviewStatus } from '@/lib/actions/reviews.actions'
import { ReviewStatus } from '@/lib/firebase/models'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Button } from '../ui/button'

export const reviewColumns: ColumnDef<IReview>[] = [
  {
    accessorKey: 'userName',
    accessorFn: row => row.data.userName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.data.userName}</div>,
  },
  {
    accessorKey: 'product',
    accessorFn: row => row.data.productPath,
    header: 'Product',
    cell: ({ row }) => <p>{row.original.data.productPath}</p>,
  },
  {
    accessorKey: 'rating',
    accessorFn: row => row.data.rating,
    header: 'Rating',
    cell: ({ row }) => (
      <p aria-label={`${row.original.data.rating} out of 5`}>
        {'★'.repeat(row.original.data.rating)}
      </p>
    ),
  },
  {
    id: 'comment',
    header: 'Comment',
    cell: ({ row }) => (
      <p
        className="max-w-xs truncate text-sm text-muted-foreground"
        title={row.original.data.comment}
      >
        {row.original.data.comment}
      </p>
    ),
  },
  {
    id: 'status',
    // Reviews created before moderation have no status and are published.
    accessorFn: row => row.data.status ?? ReviewStatus.APPROVED,
    header: 'Status',
    cell: ({ row }) => <ReviewModeration review={row.original} />,
  },

  {
    id: 'actions',
    header: 'Product',
    cell: ({ row }) => {
      const review = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/reviews/${getDocumentId(review.path || '')}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/reviews/${getDocumentId(review.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete handleDelete={onDelete} />
        </div>
      )
    },
  },
]

const STATUS_STYLE: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-900',
  APPROVED: 'bg-emerald-100 text-emerald-900',
  REJECTED: 'bg-muted text-muted-foreground',
}

function ReviewModeration({ review }: { review: IReview }) {
  const router = useRouter()
  const status = review.data.status ?? ReviewStatus.APPROVED
  const set = async (next: ReviewStatus) => {
    const res = await setReviewStatus(getDocumentId(review.path), next)
    toast(
      res.success
        ? {
            variant: 'success',
            description: next === 'APPROVED' ? 'Review published' : 'Review hidden',
          }
        : { variant: 'destructive', description: res.error },
    )
    if (res.success) router.refresh()
  }
  return (
    <div className="flex items-center gap-1">
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
        {status === 'PENDING' ? 'To review' : status === 'APPROVED' ? 'Published' : 'Hidden'}
      </span>
      {review.data.verify && (
        <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verified purchase" />
      )}
      {status !== 'APPROVED' && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label="Publish"
          onClick={() => set(ReviewStatus.APPROVED)}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
      {status !== 'REJECTED' && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label="Hide"
          onClick={() => set(ReviewStatus.REJECTED)}
        >
          <EyeOff className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

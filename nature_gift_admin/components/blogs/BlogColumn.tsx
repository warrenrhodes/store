import { toast } from '@/hooks/use-toast'
import { IBlog } from '@/lib/actions/server'
import { BlogStatus } from '@/lib/firebase/models'
import { BlogMetadata } from '@/lib/type'
import { cn } from '@/lib/utils'
import { toDate } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Copy, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const blogsColumns: ColumnDef<IBlog>[] = [
  {
    accessorKey: 'title',
    accessorFn: row => row.data.title,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <span className="font-mono leading-none">{row.original.data.title}</span>,
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge
            className={cn({
              'bg-sky-100 text-sky-900 hover:bg-sky-100':
                row.original.data.status === BlogStatus.DRAFT,
              'bg-red-100 text-red-900 hover:bg-red-100':
                row.original.data.status === BlogStatus.ARCHIVED,
              'bg-emerald-100 text-emerald-900 hover:bg-emerald-100':
                row.original.data.status === BlogStatus.PUBLISHED,
            })}
          >
            {row.original.data.status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'publishedAt',
    accessorFn: row => row.data.publishedAt,
    header: 'Published At',
    cell: ({ row }) =>
      toDate(row.original.data.publishedAt) ? (
        <span>{toDate(row.original.data.publishedAt)!.toLocaleDateString('en-GB')}</span>
      ) : (
        <span>Not Published</span>
      ),
  },
  {
    accessorKey: 'readingTime',
    accessorFn: row => (row.data.metadata as BlogMetadata).readingTime,
    header: 'Reading Time (min)',
    cell: ({ row }) => (
      <span>{(row.original.data.metadata as BlogMetadata).readingTime || 'N/A'}</span>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const blogs = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/blogs/${getDocumentId(blogs.path)}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      const copyLink = (code: string) => {
        navigator.clipboard.writeText(code)
        toast({ description: 'Link copied to clipboard!' })
      }

      return (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy link"
            onClick={() =>
              copyLink(
                `${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').protocol}//${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').hostname}/blogs/${blogs.data.slug}`,
              )
            }
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/blogs/${getDocumentId(blogs.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete item="blogs" handleDelete={onDelete} />
        </div>
      )
    },
  },
]

import { useStorefront } from '@/components/layout/Storefront'
import { toast } from '@/hooks/use-toast'
import { IBlog } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { Copy, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { shortDate, SortHeader, StatusBadge, TitleCell } from '../custom-ui/ListParts'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

/** Copies the article's address in the current store. */
function CopyBlogLink({ slug }: { slug: string }) {
  const { url } = useStorefront()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy link"
      title="Copy link"
      onClick={() => {
        navigator.clipboard.writeText(`${url}/blogs/${slug}`)
        toast({ description: 'Link copied to clipboard!' })
      }}
    >
      <Copy className="h-4 w-4" />
    </Button>
  )
}

export const blogsColumns: ColumnDef<IBlog>[] = [
  {
    accessorKey: 'title',
    accessorFn: row => row.data.title,
    header: ({ column }) => <SortHeader column={column} label="Article" />,
    cell: ({ row }) => (
      <TitleCell
        href={`/blogs/${getDocumentId(row.original.path)}`}
        title={row.original.data.title}
        detail={`/blogs/${row.original.data.slug}`}
        image={row.original.data.metadata?.coverImage?.url}
      />
    ),
  },
  {
    id: 'type',
    accessorFn: row => (row.data.associateProductPath ? 'Sales page' : 'Article'),
    header: 'Type',
    cell: ({ row }) =>
      row.original.data.associateProductPath ? (
        <Badge variant="outline" className="font-medium">
          Sales page
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">Article</span>
      ),
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: ({ column }) => <SortHeader column={column} label="Status" />,
    cell: ({ row }) => <StatusBadge status={row.original.data.status} />,
  },
  {
    accessorKey: 'publishedAt',
    accessorFn: row => row.data.publishedAt,
    header: ({ column }) => <SortHeader column={column} label="Published" />,
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">{shortDate(row.original.data.publishedAt)}</span>
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

      return (
        <div className="flex items-center justify-end gap-1">
          <CopyBlogLink slug={blogs.data.slug} />
          <Button asChild variant="ghost" size="icon" aria-label="Edit" title="Edit">
            <Link href={`/blogs/${getDocumentId(blogs.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete handleDelete={onDelete} />
        </div>
      )
    },
  },
]

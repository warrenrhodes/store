import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Copy, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { BlogMetadata } from '@/lib/type'
import { IBlog } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { Blog, BlogStatus } from '@/lib/firebase/models'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'
import { useState } from 'react'

export const blogsColumns: ColumnDef<IBlog>[] = [
  {
    accessorKey: 'title',
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
              'bg-blue-500': row.original.data.status === BlogStatus.DRAFT,
              'bg-red-500': row.original.data.status === BlogStatus.ARCHIVED,
              'bg-green-500': row.original.data.status === BlogStatus.PUBLISHED,
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
    header: 'Published At',
    cell: ({ row }) =>
      row.original.data.publishedAt ? (
        <span>{new Date(row.original.data.publishedAt).toLocaleDateString('en-US')}</span>
      ) : (
        <span>Not Published</span>
      ),
  },
  {
    accessorKey: 'readingTime',
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

      return (
        <div className="flex flex-col items-center gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="sm">
                Copy link
                <Copy className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Url</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <CopyContent blog={blogs.data} />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/blogs/${getDocumentId(blogs.path)}`}>
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <Delete item="blogs" handleDelete={onDelete} />
          </Button>
        </div>
      )
    },
  },
]

const CopyContent = (props: { blog: Blog }): JSX.Element => {
  const [blogQuery, setBlogQuery] = useState<string>('blogs')
  const copyLink = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ description: 'Link copied to clipboard!' })
  }
  return (
    <div>
      <div className="flex gap-3 py-4 items-center justify-center">
        <span>
          {new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').protocol}
          {'//'}
          {new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').hostname} {'/'}
        </span>
        <span>
          <Select onValueChange={setBlogQuery} defaultValue={blogQuery}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blogs">blogs</SelectItem>
              <SelectItem value="blogs-ads">blogs-ads</SelectItem>
            </SelectContent>
          </Select>
        </span>
        <span>
          {'/'}
          {props.blog.slug}
        </span>
      </div>

      <Button
        onClick={() =>
          copyLink(
            `${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').protocol}//${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').hostname}/${blogQuery}/${props.blog.slug}`,
          )
        }
      >
        Copy
      </Button>
    </div>
  )
}

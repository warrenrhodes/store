'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { ListHeader } from '../custom-ui/ListParts'
import { blogsColumns } from './BlogColumn'
import { IBlog } from '@/lib/actions/server'
interface BlogListProps {
  blogs: IBlog[]
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-4">
      <ListHeader
        title="Blogs"
        description="Your articles, and the sales pages of your ads."
        actions={
          <Button asChild>
            <Link href="/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              New article
            </Link>
          </Button>
        }
      />
      <DataTable
        columns={blogsColumns}
        data={blogs}
        searchKey="title"
        searchPlaceholder="Search articles"
        emptyMessage="No articles yet. Create your first one with New article."
        filterButton={{
          label: 'Status',
          columnKey: 'status',
          values: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
        }}
      />
    </div>
  )
}

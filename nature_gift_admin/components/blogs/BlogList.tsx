'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { blogsColumns } from './BlogColumn'
import { IBlog } from '@/lib/actions/server'
interface BlogListProps {
  blogs: IBlog[]
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Button asChild>
          <Link href="/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Link>
        </Button>
      </div>
      <DataTable
        columns={blogsColumns}
        data={blogs}
        searchKey="title"
        filterButton={{
          label: 'Status',
          columnKey: 'status',
          values: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
        }}
      />
    </div>
  )
}

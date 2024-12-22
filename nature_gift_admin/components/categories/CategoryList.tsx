'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { categoryColumns } from './Column'
import { Prisma } from '@naturegift/models'

interface CategoryListProps {
  categories: Prisma.CategoryGetPayload<object>[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button asChild>
          <Link href="/categories/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>
      <DataTable columns={categoryColumns} data={categories} searchKey="name" />
    </div>
  )
}

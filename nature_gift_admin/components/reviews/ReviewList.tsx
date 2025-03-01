'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { reviewColumns } from './ReviewColumns'
import { IReview } from '@/lib/actions/server'
interface ReviewListProps {
  reviews: IReview[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <Button asChild>
          <Link href="/reviews/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Link>
        </Button>
      </div>
      <DataTable columns={reviewColumns} data={reviews} searchKey="userName" />
    </div>
  )
}

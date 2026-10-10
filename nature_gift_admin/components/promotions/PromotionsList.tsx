'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { promotionsColumns } from './PromotionsColumn'
import { IPromotion } from '@/lib/actions/server'
interface PromotionListProps {
  promotions: IPromotion[]
}

export function PromotionsList({ promotions }: PromotionListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Promotions</h1>
        <Button asChild>
          <Link href="/promotions/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Promotion
          </Link>
        </Button>
      </div>
      <DataTable
        columns={promotionsColumns}
        data={promotions}
        searchKey="name"
        filterButton={{
          label: 'Status',
          columnKey: 'status',
          values: ['ACTIVE', 'DRAFT', 'EXPIRED', 'DISABLED'],
        }}
      />
    </div>
  )
}

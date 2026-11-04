'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { ListHeader } from '../custom-ui/ListParts'
import { promotionsColumns } from './PromotionsColumn'
import { IPromotion } from '@/lib/actions/server'
interface PromotionListProps {
  promotions: IPromotion[]
}

export function PromotionsList({ promotions }: PromotionListProps) {
  return (
    <div className="space-y-4">
      <ListHeader
        title="Promotions"
        description="Your automatic discounts and discount codes."
        actions={
          <Button asChild>
            <Link href="/promotions/new">
              <Plus className="w-4 h-4 mr-2" />
              New promotion
            </Link>
          </Button>
        }
      />
      <DataTable
        columns={promotionsColumns}
        data={promotions}
        searchKey="name"
        searchPlaceholder="Search promotions"
        emptyMessage="No promotions yet. Create your first one with New promotion."
        filterButton={{
          label: 'Status',
          columnKey: 'status',
          values: ['ACTIVE', 'SCHEDULED', 'EXPIRED', 'DRAFT', 'DISABLED'],
        }}
      />
    </div>
  )
}

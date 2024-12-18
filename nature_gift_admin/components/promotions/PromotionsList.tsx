'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { promotionsColumns } from './PromotionsColumn'
import { Prisma } from '@naturegift/models'

interface PromotionListProps {
  promotions: Prisma.PromotionGetPayload<{}>[]
}

export function PromotionsList({ promotions }: PromotionListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Promotions</h2>
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

'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { ListHeader } from '../custom-ui/ListParts'
import { productColumns } from './ProductColumns'
import { IProduct } from '@/lib/actions/server'
import { CsvExportButton } from '../custom-ui/CsvExportButton'

interface ProductListProps {
  products: IProduct[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      <ListHeader
        title="Products"
        description="What your store sells, its prices and its stock."
        actions={
          <>
            <CsvExportButton
              filename="products"
              rows={products.map(p => {
                const price = p.data.price as { regular?: number; sale?: number | null }
                return {
                  title: p.data.title,
                  slug: p.data.slug,
                  status: p.data.status,
                  visible: p.data.visibility ? 'yes' : 'no',
                  price: price?.regular,
                  sale_price: price?.sale ?? '',
                  stock: p.data.inventory?.stockQuantity ?? '',
                  low_stock_alert: p.data.inventory?.lowStockThreshold ?? '',
                  categories: (p.data.categories ?? []).join(' | '),
                }
              })}
            />
            <Button asChild>
              <Link href="/products/new">
                <Plus className="w-4 h-4 mr-2" />
                New product
              </Link>
            </Button>
          </>
        }
      />

      <DataTable
        columns={productColumns}
        data={products}
        searchKey="title"
        searchPlaceholder="Search products"
        emptyMessage="No products yet. Add your first one with New product."
        filterButton={{
          label: 'Status',
          columnKey: 'status',
          values: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
        }}
      />
    </div>
  )
}

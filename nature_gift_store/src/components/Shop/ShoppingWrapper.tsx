'use client'

import { useEffect, useState } from 'react'
import { FilterBar } from '@/components/Shop/FilterBar'
import { ProductGrid } from '@/components/Shop/ProductGrid'
import { ProductHero } from '@/components/Shop/ProductHero'
import { ShoppingCartButton } from '@/components/Shop/ShoppingCartButton'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import { getPrice } from '@/lib/utils/utils'
import { Filters, IProduct } from '@/lib/models/Product'
import { ICategory } from '@/lib/models/Category'
import { FilterOptions } from '@/components/Shop/FilterOptions'
import useFilter from '@/hooks/use-filter'

interface ProductPageData {
  categories: ICategory[]
  products: IProduct[]
  tags: string[]
}

export const ShoppingWrapper = ({
  productList,
  categories,
}: {
  productList: IProduct[]
  categories: ICategory[]
}) => {
  const { filters, MAX_PRICE, MIN_PRICE, setFilters, clearFilters } = useFilter()
  const [pageData, setPageData] = useState<ProductPageData>({
    categories: categories,
    products: productList,
    tags: Array.from(new Set(productList.flatMap(product => product.tags || []))),
  })
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(productList)
  const [activeFilters, setActiveFilters] = useState(0)

  useEffect(() => {
    let count = 0
    if (filters.categories) count++
    if (filters.colors.length > 0) count++
    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) count++
    if (filters.search) count++
    setActiveFilters(count)
  }, [filters])

  useEffect(() => {
    let filtered = [...(pageData?.products || [])]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.content.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        product.categories.some(cat => filters.categories.includes(cat._id)),
      )
    }

    filtered = filtered.filter(
      product =>
        getPrice(product) >= filters.priceRange[0] && getPrice(product) <= filters.priceRange[1],
    )

    if (filters.tags.length > 0) {
      filtered = filtered.filter(product => product.tags?.some(tag => filters.tags.includes(tag)))
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return getPrice(a) - getPrice(b)
        case 'price-desc':
          return getPrice(b) - getPrice(a)
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [filters, pageData?.products])

  return (
    <div className="min-h-screen bg-background">
      <ProductHero />

      <main className="container mx-auto px-4 -mt-20 relative z-10 mb-28">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          categories={pageData?.categories || []}
          tags={pageData?.tags || []}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 sticky top-8 max-lg:hidden">
            <FilterOptions
              filters={filters}
              setFilters={setFilters}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              categories={pageData?.categories || []}
              tags={pageData?.tags || []}
            />
          </aside>
          <div className="lg:col-span-3 space-y-6">
            <ProductGrid products={filteredProducts} loading={false} clearFilters={clearFilters} />
          </div>
        </div>
      </main>

      <ShoppingCartButton />
      <GeneralCTAComponent />
    </div>
  )
}
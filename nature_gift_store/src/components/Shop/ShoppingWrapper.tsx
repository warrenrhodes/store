'use client'

import { FilterBar } from '@/components/Shop/FilterBar'
import { FilterOptions } from '@/components/Shop/FilterOptions'
import { ProductGrid } from '@/components/Shop/ProductGrid'
import { ProductHero } from '@/components/Shop/ProductHero'
import useFilter from '@/hooks/useFilter'
import { Category, Product } from '@/lib/firebase/models'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProductPageData {
  categories: Category[]
  products: Product[]
  tags: string[]
}

export const ShoppingWrapper = ({
  productList,
  categories,
}: {
  productList: Product[]
  categories: Category[]
}) => {
  const { filters, MAX_PRICE, MIN_PRICE, setFilters, clearFilters } = useFilter()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pageData] = useState<ProductPageData>({
    categories: categories,
    products: productList,
    tags: Array.from(new Set(productList.map(product => product.tags?.flat() || []).flat())),
  })

  // Note: productList is now the ALREADY filtered list from server.
  const filteredProducts = productList
  const [activeFilters, setActiveFilters] = useState(0)

  // Sync URL to State on Mount / URL Change
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const categoryParam = searchParams
      .getAll('category')
      .map(s => categories.find(c => c.slug === s)?.name ?? s)
    const tagsParam = searchParams.getAll('tags')
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : MIN_PRICE
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : MAX_PRICE
    const sort = searchParams.get('sort') || 'newest'

    setFilters({
      search,
      categories: categoryParam,
      tags: tagsParam,
      priceRange: [minPrice, maxPrice],
      sortBy: sort as any,
      colors: [],
    })
  }, [searchParams, setFilters, MIN_PRICE, MAX_PRICE, categories])

  // Sync State to URL
  useEffect(() => {
    // Read live store state: on mount the URL->state effect above has just written it,
    // while the `filters` closure is still stale and would push the params away (redirect loop).
    const filters = useFilter.getState().filters
    const params = new URLSearchParams()

    if (filters.search) params.set('search', filters.search)

    filters.categories.forEach(name =>
      params.append('category', categories.find(c => c.name === name)?.slug ?? name),
    )
    filters.tags.forEach(tag => params.append('tags', tag))

    if (filters.priceRange[0] > MIN_PRICE) params.set('minPrice', filters.priceRange[0].toString())
    if (filters.priceRange[1] < MAX_PRICE) params.set('maxPrice', filters.priceRange[1].toString())

    if (filters.sortBy && filters.sortBy !== 'newest') params.set('sort', filters.sortBy)

    const queryString = params.toString()
    const currentQuery = searchParams.toString()

    if (queryString !== currentQuery) {
      router.push(`?${queryString}`, { scroll: false })
    }

    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) count++
    if (filters.search) count++
    setActiveFilters(count)
  }, [filters, MIN_PRICE, MAX_PRICE, router, searchParams, categories])

  return (
    <div className="min-h-screen bg-background">
      <ProductHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          categories={pageData?.categories || []}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 sticky top-24 self-start max-lg:hidden">
            <FilterOptions
              filters={filters}
              setFilters={setFilters}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              categories={pageData?.categories || []}
            />
          </aside>
          <div className="lg:col-span-3 space-y-6">
            <ProductGrid products={filteredProducts} loading={false} clearFilters={clearFilters} />
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { FilterBar } from '@/components/Products/FilterBar'
import { ProductGrid } from '@/components/Products/ProductGrid'
import { ProductHero } from '@/components/Products/ProductHero'
import { ShoppingCartButton } from '@/components/Products/ShoppingCartButton'
import { IProduct } from '@/lib/types'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import { getPrice } from '@/lib/utils'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

export interface Filters {
  search: string
  category: string
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
}

const MIN_PRICE = 0
const MAX_PRICE = 100000

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState(0)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'all',
    priceRange: [MIN_PRICE, MAX_PRICE],
    sortBy: 'newest',
    colors: [],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let count = 0
    if (filters.category !== 'all') count++
    if (filters.colors.length > 0) count++
    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) count++
    if (filters.search) count++
    setActiveFilters(count)
  }, [filters])

  useEffect(() => {
    let filtered = [...products]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(product =>
        product.categories.some(cat => cat.title === filters.category),
      )
    }

    filtered = filtered.filter(
      product =>
        getPrice(product) >= filters.priceRange[0] && getPrice(product) <= filters.priceRange[1],
    )

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color)),
      )
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return getPrice(a) - getPrice(b)
        case 'price-desc':
          return getPrice(b) - getPrice(a)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [filters, products])

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: [MIN_PRICE, MAX_PRICE],
      sortBy: 'newest',
      colors: [],
    })
  }

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
        />

        <LayoutGroup>
          <ProductGrid products={filteredProducts} loading={loading} clearFilters={clearFilters} />
        </LayoutGroup>
      </main>

      <ShoppingCartButton />
      <GeneralCTAComponent />
    </div>
  )
}

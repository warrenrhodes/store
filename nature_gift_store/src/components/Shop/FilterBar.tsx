'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Search, SlidersHorizontal, FilterX } from 'lucide-react'
import { FilterOptions } from './FilterOptions'
import { useLocalization } from '@/hooks/useLocalization'
import { Category, Filters, SortOption } from '@/lib/firebase/models'

interface FilterBarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  activeFilters: number
  clearFilters: () => void
  minPrice: number
  maxPrice: number
  categories: Category[]
}

export function FilterBar({
  filters,
  setFilters,
  activeFilters,
  clearFilters,
  minPrice,
  maxPrice,
  categories,
}: FilterBarProps) {
  const { localization } = useLocalization()
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>

        <div className="flex gap-4 items-center w-full lg:w-auto">
          <Select
            value={filters.sortBy}
            onValueChange={(value: SortOption) => setFilters({ ...filters, sortBy: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{localization.newest}</SelectItem>
              <SelectItem value="price-asc">{localization.lowToHighPrice}</SelectItem>
              <SelectItem value="price-desc">{localization.highToLowPrice}</SelectItem>
              <SelectItem value="rating">{localization.topRates}</SelectItem>
            </SelectContent>
          </Select>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  {localization.filters}
                  {activeFilters > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <SheetTitle>{localization.filters}</SheetTitle>
                    {activeFilters > 0 && (
                      <Button variant="ghost" onClick={clearFilters} className="gap-2">
                        <FilterX className="h-4 w-4" />
                        {localization.clearAll}
                      </Button>
                    )}
                  </div>
                </SheetHeader>

                <FilterOptions
                  filters={filters}
                  setFilters={setFilters}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  categories={categories}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}

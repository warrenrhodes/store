'use client'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Filters } from '@/lib/types'

interface FilterOptionsProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  minPrice: number
  maxPrice: number
}

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Smartphones', name: 'Smartphones' },
  { id: 'Laptops', name: 'Laptops' },
  { id: 'Accessories', name: 'Accessories' },
]

const colorOptions: Record<string, string> = {
  Black: 'bg-black',
  Silver: 'bg-gray-300',
  'Space Gray': 'bg-gray-700',
  White: 'bg-white border-2',
}

export function FilterOptions({ filters, setFilters, minPrice, maxPrice }: FilterOptionsProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-4">Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={filters.category === category.id ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => setFilters({ ...filters, category: category.id })}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium mb-4">Price Range</h3>
        <Slider
          value={filters.priceRange}
          max={maxPrice}
          min={minPrice}
          step={50}
          onValueChange={value => setFilters({ ...filters, priceRange: value as [number, number] })}
        />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(colorOptions).map(([color, className]) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full ${className} ${
                filters.colors.includes(color) ? 'ring-2 ring-offset-2 ring-primary' : ''
              }`}
              onClick={() => {
                setFilters({
                  ...filters,
                  colors: filters.colors.includes(color)
                    ? filters.colors.filter(c => c !== color)
                    : [...filters.colors, color],
                })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

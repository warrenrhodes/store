'use client'

import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ICategory } from '@/lib/models/Category'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: ICategory[]
  filters: {
    minPrice: number
    maxPrice: number
    categories: string[]
    search: string
  }
  onFilterChange: (filters: any) => void
  className?: string
  mobileClassName?: string
}

export function FilterSidebar({
  isOpen,
  onClose,
  categories,
  filters,
  onFilterChange,
  className = '',
  mobileClassName = '',
}: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    })
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId)
    onFilterChange({ ...filters, categories: newCategories })
  }

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between sm:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          defaultValue={[filters.minPrice, filters.maxPrice]}
          max={1000}
          step={1}
          onValueChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {categories.map(category => (
              <div key={`${category._id}`} className="flex items-center space-x-2">
                <Checkbox
                  id={`${category._id}`}
                  checked={filters.categories.includes(category._id)}
                  onCheckedChange={checked =>
                    handleCategoryChange(category._id, checked as boolean)
                  }
                />
                <Label htmlFor={`${category._id}`} className="text-sm">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  return (
    <>
      <aside className={className}>{content}</aside>
      <aside className={mobileClassName}>{content}</aside>
    </>
  )
}

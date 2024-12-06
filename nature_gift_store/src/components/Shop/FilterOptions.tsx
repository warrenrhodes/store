'use client'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ICategory } from '@/lib/models/Category'
import { cn, priceFormatted } from '@/lib/utils/utils'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/badge'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { Filters } from '@/lib/models/Product'

interface FilterOptionsProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  minPrice: number
  maxPrice: number
  categories: ICategory[]
  tags: string[]
}

export function FilterOptions({
  filters,
  setFilters,
  minPrice,
  maxPrice,
  categories,
  tags,
}: FilterOptionsProps) {
  return (
    <div className="mt-8 space-y-6">
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-sm font-medium mb-4">Price Range</h3>
            <Slider
              value={filters.priceRange}
              max={maxPrice}
              min={minPrice}
              step={50}
              onValueChange={value =>
                setFilters({ ...filters, priceRange: value as [number, number] })
              }
            />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>{priceFormatted(filters.priceRange[0])}</span>
              <span>{priceFormatted(filters.priceRange[1])}</span>
            </div>
          </div>

          <Separator />

          <Accordion type="multiple" defaultValue={['categories', 'tags']}>
            <AccordionItem
              value="categories"
              className={cn({
                hidden: categories.length === 0,
              })}
            >
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {categories.map(category => (
                    <div key={`${category._id}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category._id}`}
                        checked={filters.categories.includes(category._id)}
                        onCheckedChange={e =>
                          setFilters({
                            ...filters,
                            categories:
                              e === false
                                ? filters.categories.filter(c => c !== category._id)
                                : [...filters.categories, category._id],
                          })
                        }
                      />
                      <label
                        htmlFor={`${category._id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="tags"
              className={cn({
                hidden: tags.length === 0,
              })}
            >
              <AccordionTrigger>Tags</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {tags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={filters.tags.includes(tag)}
                        onCheckedChange={e =>
                          setFilters({
                            ...filters,
                            tags:
                              e === false
                                ? filters.tags.filter(c => c !== tag)
                                : [...filters.tags, tag],
                          })
                        }
                      />
                      <label
                        htmlFor={tag}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                      >
                        {tag}
                      </label>
                      {/* <span className="text-sm text-muted-foreground">({category.count})</span> */}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

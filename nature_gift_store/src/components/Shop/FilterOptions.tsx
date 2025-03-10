'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, priceFormatted } from '@/lib/utils/utils'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { useLocalization } from '@/hooks/useLocalization'
import { Category, Filters } from '@/lib/firebase/models'

interface FilterOptionsProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  minPrice: number
  maxPrice: number
  categories: Category[]
}

export function FilterOptions({
  filters,
  setFilters,
  minPrice,
  maxPrice,
  categories,
}: FilterOptionsProps) {
  const { localization } = useLocalization()

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
            <h3 className="text-sm font-medium mb-4">{localization.priceRange}</h3>
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
              <AccordionTrigger>{localization.categories}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {categories.map(category => (
                    <div key={`${category.path}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category.path}`}
                        checked={filters.categories.includes(category.name)}
                        onCheckedChange={e =>
                          setFilters({
                            ...filters,
                            categories:
                              e === false
                                ? filters.categories.filter(c => c !== category.name)
                                : [...filters.categories, category.name],
                          })
                        }
                      />
                      <label
                        htmlFor={`${category.path}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem
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
                      <span className="text-sm text-muted-foreground">({category.count})</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

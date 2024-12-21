'use client'

import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import useBlogFilter from '@/hooks/useBlogFilter'
import { Checkbox } from '../ui/checkbox'
import { IBlog } from '@/lib/api/blogs'

export function BlogFilters({
  categories,
  blogs,
}: {
  categories: string[]
  tags: string[]
  blogs: IBlog[]
}) {
  const { filters, setFilters, clearFilters } = useBlogFilter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between h-11">
        <h2 className="text-lg font-semibold">Filters</h2>
        {(filters.categories.length > 0 || filters.tags.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'tags']}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {categories.map(category => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={e =>
                        setFilters({
                          ...filters,
                          categories:
                            e === false
                              ? filters.categories.filter(c => c !== category)
                              : [...filters.categories, category],
                        })
                      }
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                    >
                      {category}
                    </label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (
                    {
                      blogs.filter(c => c.categories.map(e => e.category.name).includes(category))
                        .length
                    }
                    )
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="tags">
          <AccordionTrigger>Tags</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {tags.map(tag => (
                <div key={tag} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({blogs.filter(c => c.tags.includes(tag)).length})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FeaturedBlogCarousel } from '../BlogFeatured'
import { BlogFilters } from './BlogFilters'
import { BlogGrid } from './BlogGrid'
import { BlogSearch } from './BlogSearch'
import useBlogFilter from '@/hooks/useBlogFilter'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog, BlogMetadata } from '@/lib/firebase/models'

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  const { filters } = useBlogFilter()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs)
  const { localization } = useLocalization()

  useEffect(() => {
    let filtered: Blog[] = []
    if (filters.categories.length === 0 && filters.tags.length === 0) {
      setFilteredBlogs(blogs)
      return
    }
    if (filters.categories.length > 0) {
      filtered = blogs.filter(blog =>
        blog.categories.some(category => filters.categories.includes(category)),
      )
    }

    if (filters.tags.length > 0) {
      filtered = blogs.filter(blog => blog.tags?.some(tag => filters.tags.includes(tag)))
    }
    setFilteredBlogs(filtered)
  }, [blogs, filters])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{localization.blog}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{localization.blogsDescription}</p>
        </div>

        <FeaturedBlogCarousel
          blogs={blogs.filter(blog => (blog.metadata as BlogMetadata).featured)}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <BlogFilters
              blogs={blogs}
              categories={Array.from(new Set(blogs.map(blog => blog.categories).flat()))}
              tags={Array.from(new Set(blogs.map(blog => blog.tags).flat()))}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <BlogSearch blogs={blogs} />
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <BlogFilters
                    blogs={blogs}
                    categories={Array.from(new Set(blogs.map(blog => blog.categories).flat()))}
                    tags={Array.from(new Set(blogs.map(blog => blog.tags).flat()))}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <BlogGrid blogs={filteredBlogs} />
          </div>
        </div>
      </div>
    </div>
  )
}

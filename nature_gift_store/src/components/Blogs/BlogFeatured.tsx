'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IBlog } from '@/lib/models/Blog'
import { format, subDays } from 'date-fns'
import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

interface FeaturedBlogCarouselProps {
  blogs: IBlog[]
}

export function FeaturedBlogCarousel({ blogs }: FeaturedBlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {blogs.map(blog => (
            <div key={blog._id} className="relative flex-[0_0_100%] min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[2/1] overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${blog.metadata.coverImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.categories.slice(0, 3).map(category => (
                      <Badge key={category._id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    {blog.title}
                  </h2>
                  <p className="text-lg text-white/80 mb-6 max-w-3xl">{blog.content.excerpt}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={blog.metadata.author.avatar}
                          alt={blog.metadata.author.name}
                        />
                        <AvatarFallback>
                          {blog.metadata.author.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{blog.metadata.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.metadata.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="absolute top-8 right-8" variant="secondary">
                    <Link href={`/blogs/${blog.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {blogs.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
      {blogs.length > 1 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      {blogs.length > 1 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={scrollNext}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog } from '@/lib/firebase/models'

export function BlogSearch({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState('')
  const { localization } = useLocalization()
  const blogsFiltered = blogs.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase()))

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-10 pr-4"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 rounded-md border bg-background shadow-lg"
          >
            <div className="p-4">
              {blogsFiltered.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-96 overflow-y-scroll">
                  {blogsFiltered.map(e => (
                    <motion.div
                      key={e.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <Link href={`/blogs/${e.slug}`}>
                        <Card className="relative overflow-hidden">
                          <CardContent className="p-4">
                            <h1 className="font-bold">{e.title}</h1>
                            <p className="line-clamp-2 text-muted-foreground">
                              {e.content.excerpt}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{`${localization.noResultsFoundFor} "${query}"`}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <h2 className="text-2xl font-bold">{localization.search}</h2>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IBlog } from '@/lib/models/Blog'
import { format, subDays } from 'date-fns'
import { GlobalPagination } from '../GlobalPagination'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface BlogGridProps {
  blogs: IBlog[]
}

export function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <GlobalPagination
      items={blogs}
      itemsPerPage={2}
      children={blogList => (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {blogList.map((blog, index) => (
            <motion.div key={blog._id} variants={itemVariants}>
              <Link href={`/blogs/${blog.slug}`}>
                <Card className="h-full group">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${blog.metadata.coverImage})` }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.categories.slice(0, 3).map(category => (
                        <Badge key={category._id} variant="outline">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {blog.content?.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.metadata.readingTime} min read</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
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
                      <span className="text-sm font-medium">{blog.metadata.author.name}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    />
  )
}
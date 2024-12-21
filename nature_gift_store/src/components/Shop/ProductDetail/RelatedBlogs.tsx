'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format, subDays } from 'date-fns'
import Link from 'next/link'
import { IBlog } from '@/lib/api/blogs'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

export function RelatedBlogs({ relatedBlogs }: { relatedBlogs: IBlog[] }) {
  if (relatedBlogs.length === 0) {
    return <></>
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Learn More</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {relatedBlogs.slice(0, 3).map(blog => (
          <motion.div key={`${blog.id}`} variants={itemVariants}>
            <Card className="group h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={blog.metadata.coverImageURL || ''}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blog.metadata.blurDataUrl || FAKE_BLUR}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {blog.metadata.author.name} •{' '}
                  {format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}
                </div>
                <h3 className="font-semibold mb-2">{blog.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{blog.content.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href={`/blogs/${blog.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />{' '}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

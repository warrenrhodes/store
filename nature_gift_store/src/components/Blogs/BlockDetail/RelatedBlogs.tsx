'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format, subDays } from 'date-fns'
import Link from 'next/link'
import { FAKE_BLUR } from '@/lib/utils/constants'
import Image from 'next/image'
import { useLocalization } from '@/hooks/useLocalization'
import { BlogContent, BlogMetadata } from '@/lib/type'
import { Blog } from '@/lib/firebase/models'

interface RelatedBlogsProps {
  relatedBlogs: Blog[]
}

export function RelatedBlogs({ relatedBlogs }: RelatedBlogsProps) {
  const { localization } = useLocalization()
  if (relatedBlogs.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">{localization.relatedBlogs}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBlogs.map(blog => {
          const metadata = blog.metadata as BlogMetadata
          const content = blog.content as BlogContent
          return (
            <motion.div
              key={`${blog.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                    <Image
                      src={metadata.coverImageURL || ''}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={metadata.blurDataUrl || FAKE_BLUR}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {metadata.author.name} •{' '}
                    {format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}
                  </div>
                  <h3 className="font-semibold mb-2">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{content.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="ghost" className="w-full group" asChild>
                    <Link href={`/blogs/${blog.slug}`}>
                      {localization.readMore}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />{' '}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

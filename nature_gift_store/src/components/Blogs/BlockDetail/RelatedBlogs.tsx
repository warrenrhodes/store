'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format, subDays } from 'date-fns'
import { IBlog } from '@/lib/api/blogs'
import Link from 'next/link'
import { FAKE_BLUR } from '@/lib/utils/constants'
import Image from 'next/image'

const blogs = [
  {
    id: '2',
    title: 'Understanding Smart Health Monitoring',
    excerpt: 'A deep dive into modern health tracking technologies and their impact.',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370',
    author: 'Tech Expert',
    date: 'March 12, 2024',
  },
  {
    id: '3',
    title: 'The Role of AI in Personal Health',
    excerpt: 'How artificial intelligence is transforming personal health management.',
    image: 'https://images.unsplash.com/photo-1557428894-56bcc97113fe',
    author: 'AI Researcher',
    date: 'March 10, 2024',
  },
  {
    id: '4',
    title: 'Next-Gen Fitness Technology',
    excerpt: 'Exploring the latest innovations in fitness tracking and analysis.',
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3',
    author: 'Fitness Tech Analyst',
    date: 'March 8, 2024',
  },
]

interface RelatedBlogsProps {
  relatedBlogs: IBlog[]
}

export function RelatedBlogs({ relatedBlogs }: RelatedBlogsProps) {
  if (relatedBlogs.length === 0) return null
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBlogs.map(blog => (
          <motion.div
            key={`${blog.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
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
      </div>
    </section>
  )
}

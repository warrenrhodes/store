'use client'
import { Separator } from '@radix-ui/react-separator'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import { BlogAuthor } from './BlogAuthor'
import { RelatedBlogs } from './RelatedBlogs'
import { Badge } from '@/components/ui/badge'
import { format, subDays } from 'date-fns'
import Image from 'next/image'
import { IBlog } from '@/lib/api/blogs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FAKE_BLUR } from '@/lib/utils/constants'

const BlogDetail = ({ blog, relatedBlogs }: { blog: IBlog; relatedBlogs: IBlog[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Button variant="ghost" asChild>
        <Link href="/blogs" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
      </Button>

      <div className="space-y-4">
        {blog.metadata.featured && <Badge className="mb-4">Featured Article</Badge>}
        <h1 className="text-5xl font-bold tracking-tight">{blog.title}</h1>
        <p className="text-muted-foreground">{blog.content.excerpt}</p>
        {blog.metadata.coverImageURL && (
          <div className="relative aspect-video overflow-hidden rounded-lg ">
            <Image
              src={blog.metadata.coverImageURL}
              alt={blog.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={blog.metadata.blurDataUrl || FAKE_BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {blog.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              && <span>{format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blog.metadata.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.metadata.author.name}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {blog.categories.map(category => (
            <Badge key={`${category.id}`} variant="outline">
              {category.category.name}
            </Badge>
          ))}
        </div>
      </div>

      {blog.content.type === 'HTML' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content.content }}
        />
      )}

      {blog.content.type === 'MARKDOWN' && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content.content }}
        />
      )}

      {blog.content.type === 'TEXT' && (
        <div className="prose max-w-none">{blog.content.content}</div>
      )}

      <div className="flex flex-wrap gap-2">
        {blog.tags.map(tag => (
          <div key={tag} className="flex items-center text-sm text-muted-foreground">
            <Tag className="w-4 h-4 mr-1" />#{tag}
          </div>
        ))}
      </div>

      <Separator />

      <BlogAuthor author={blog.metadata.author} />

      <Separator />

      {/* {blog.co && <BlogComments />} */}

      <Separator />

      {relatedBlogs.length > 0 && <RelatedBlogs relatedBlogs={relatedBlogs.slice(0, 5)} />}
    </motion.div>
  )
}

export default BlogDetail

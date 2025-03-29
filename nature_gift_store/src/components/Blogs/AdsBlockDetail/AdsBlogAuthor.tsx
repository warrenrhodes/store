'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface BlogAuthorProps {
  author: {
    name: string
    avatar?: string | null
    bio?: string | null
  }
}

export function AdsBlogAuthor({ author }: BlogAuthorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4"
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src={author.avatar ?? undefined} alt={author.name} />
        <AvatarFallback>
          {author.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{author.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{author.bio}</p>
      </div>
    </motion.div>
  )
}

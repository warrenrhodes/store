'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useLocalization } from '@/hooks/useLocalization'

const comments = [
  {
    id: 1,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    content: 'Great article! The insights about AI in healthcare are spot-on.',
    date: '2 days ago',
    likes: 12,
  },
  {
    id: 2,
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    content: 'Would love to see more content about wearable technology integration.',
    date: '5 days ago',
    likes: 8,
  },
]

export function BlogComments() {
  const [likedComments, setLikedComments] = useState<number[]>([])
  const { localization } = useLocalization()

  const toggleLike = (commentId: number) => {
    setLikedComments(prev =>
      prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId],
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{localization.comments}</h2>

      <div className="space-y-4">
        <Textarea placeholder="Share your thoughts..." className="min-h-[100px]" />
        <Button>{localization.postComment}</Button>
      </div>

      <div className="space-y-6">
        {comments.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>
                  {comment.author.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{comment.author.name}</h4>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{comment.content}</p>
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(comment.id)}
                    className={likedComments.includes(comment.id) ? 'text-primary' : undefined}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="mt-6" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

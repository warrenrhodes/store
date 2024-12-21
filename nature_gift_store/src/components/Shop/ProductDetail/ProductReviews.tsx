'use client'

import { motion } from 'framer-motion'
import { Star, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn, getReviewAverage } from '@/lib/utils/utils'
import { formatDistance } from 'date-fns'
import { IProduct } from '@/lib/api/products'

export function ProductReviews({ product }: { product: IProduct }) {
  const { reviews } = product

  if (!reviews || reviews.length === 0) {
    return <></>
  }

  const averageRating = getReviewAverage(reviews)
  const distribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const ratingStats = {
    average: averageRating,
    total: reviews.length,
    distribution: Object.entries(distribution).map(([rating, count]) => ({
      rating: Number(rating),
      count,
    })),
  }

  const durationFormatted = (date: Date) => formatDistance(date, new Date(), { addSuffix: true })

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground">Based on {reviews.length} reviews</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {ratingStats.distribution
            .sort((a, b) => b.rating - a.rating)
            .map(stat => (
              <div key={stat.rating} className="flex items-center gap-4">
                <div className="w-16 text-sm">{stat.rating} stars</div>
                <Progress value={(stat.count / ratingStats.total) * 100} className="flex-1" />
                <div className="w-12 text-sm text-muted-foreground">{stat.count}</div>
              </div>
            ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        {reviews.map(review => (
          <motion.div
            key={`${review.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.imageUrl || undefined} alt={review.userName} />
                <AvatarFallback>
                  {review.userName
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.userName}</h4>
                  <span className="text-sm text-muted-foreground">
                    {durationFormatted(review.createdAt || new Date())}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-muted-foreground">{review.comment}</p>
                {review.helpful && review.helpful > 0 && (
                  <div className="mt-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Separator className="mt-6" />
          </motion.div>
        ))}
      </div>

      <div
        className={cn(
          {
            hidden: reviews.length < 5,
          },
          'text-center',
        )}
      >
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
    </section>
  )
}

import { ReviewList } from '@/components/reviews/ReviewList'
import { getReviews } from '@/lib/actions/actions'

export default async function ReviewsPage() {
  const reviews = await getReviews()
  return (
    <div className="container py-10">
      <ReviewList reviews={reviews} />
    </div>
  )
}

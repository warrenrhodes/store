import ReviewForm from '@/components/reviews/ReviewFrom'
import { getProducts, getReviewById } from '@/lib/actions/actions'

export default async function EditReviewPage(props: { params: Promise<{ reviewId: string }> }) {
  const params = await props.params
  const [review, products] = await Promise.all([getReviewById(params.reviewId), getProducts()])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Review</h1>
        <p className="text-muted-foreground">Make changes to your review</p>
      </div>
      <ReviewForm initialData={review} products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'

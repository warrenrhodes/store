// @refresh reset
import { IBlog } from '@/lib/models/Blog'
import { FeaturedBlogCarousel } from '../BlogFeatured'

export function FeaturedBlogs({ blogs }: { blogs: IBlog[] }) {
  if (blogs.length === 0) {
    return null
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Blogs
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our top-rated blogs for quality content and innovative ideas
          </p>
        </div>

        <FeaturedBlogCarousel blogs={blogs} />
      </div>
    </section>
  )
}

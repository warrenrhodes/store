import { IBlog } from '../models/Blog'

export const getBlog = async (slug: string): Promise<IBlog | null> => {
  const blog = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/blogs/${slug}`)

  if (!blog.ok) return null
  return await blog.json()
}

export const getFilterBlogs = async ({
  query,
}: {
  query?: Partial<{ [key in keyof IBlog]: string }>
}): Promise<IBlog[] | null> => {
  const searchParams = new URLSearchParams()
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        searchParams.append(key, value)
      }
    }
  }

  const blogs = await fetch(
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/blogs/filter${query ? '?' + searchParams.toString() : ''}`,
    {
      next: { revalidate: 3600 },
    },
  )

  if (!blogs.ok) return null
  return await blogs.json()
}

export const getAllBlogs = async (): Promise<IBlog[] | null> => {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/blogs`, {
    next: { revalidate: 3600 },
  })

  if (!blogs.ok) return null
  return await blogs.json()
}
export const getRelatedBlogs = async (slug: string): Promise<IBlog[] | null> => {
  const relatedBlogs = await fetch(
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/products/${slug}/related`,
  )

  if (!relatedBlogs.ok) return null
  return await relatedBlogs.json()
}

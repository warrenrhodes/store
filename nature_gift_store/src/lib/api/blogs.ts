import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type IBlog = Prisma.BlogGetPayload<{
  include: {
    categories: {
      include: {
        category: true
      }
    }
  }
}>
export const fetchBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    return blog
  } catch (error) {
    console.error('Failed to fetch blog by slug:', error)
    return null
  }
}

export const fetchBlogsByQuery = async ({
  query,
}: {
  query?: Partial<{ [key in keyof IBlog]: string }>
}): Promise<IBlog[] | null> => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        ...Object.entries(query || {}).reduce((acc, [key, value]) => {
          if (value !== undefined) {
            if (key === 'categories') {
              acc[key] = {
                some: {
                  categoryId: {
                    in: value.split(','),
                  },
                },
              }
            } else if (value === 'true') {
              acc[key] = true
            } else if (value === 'false') {
              acc[key] = false
            } else if (key === 'id') {
              // Handle ObjectId fields specially
              acc[key] = value.toString()
            } else {
              acc[key] = value
            }
          }
          return acc
        }, {} as any),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    return blogs
  } catch (error) {
    console.error('Failed to fetch blogs by query:', error)
    return null
  }
}

export const fetchAllBlogs = async (): Promise<IBlog[] | null> => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    return blogs
  } catch (error) {
    console.error('Failed to fetch all blogs:', error)
    return null
  }
}

export const fetchRelatedBlogs = async (slug: string): Promise<IBlog[] | null> => {
  try {
    // First get the blog categories
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        categories: true,
      },
    })

    if (!blog) return null

    // Then find blogs with similar categories
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        AND: [
          { slug: { not: slug } }, // Exclude current blog
          {
            categories: {
              some: {
                categoryId: {
                  in: blog.categories.map((c: { categoryId: any }) => c.categoryId),
                },
              },
            },
          },
        ],
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      take: 4, // Limit to 4 related blogs
    })

    return relatedBlogs
  } catch (error) {
    console.error('Failed to fetch related blogs:', error)
    return null
  }
}

export async function getBlogById(blogId: string): Promise<IBlog | null> {
  try {
    const blogPost = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    return blogPost
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

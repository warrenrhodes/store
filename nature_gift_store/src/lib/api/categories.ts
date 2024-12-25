import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type ICategory = Prisma.CategoryGetPayload<{
  include: {
    image: true
  }
}>

export async function getCategories(): Promise<ICategory[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image: true,
      },
    })
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getCategoriesOfProduct(
  productId: string,
): Promise<Prisma.CategoriesOnProductsGetPayload<object>[]> {
  try {
    const categories = await prisma.categoriesOnProducts.findMany({
      where: {
        productId,
      },
    })
    return categories
  } catch (error) {
    console.error(`Failed to fetch categories of productId ${productId}:`, error)
    return []
  }
}

export async function getCategoryById(categoryId: string): Promise<ICategory | null> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        image: true,
      },
    })
    return category
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return null
  }
}

export async function getCategoriesOfBlog(
  blogId: string,
): Promise<Prisma.CategoriesOnBlogsGetPayload<object>[]> {
  try {
    const categories = await prisma.categoriesOnBlogs.findMany({
      where: {
        blogId,
      },
    })
    return categories
  } catch (error) {
    console.error(`Failed to fetch categories of blog ${blogId}:`, error)
    return []
  }
}

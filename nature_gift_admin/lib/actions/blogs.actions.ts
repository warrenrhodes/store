'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { blogSchema, BlogSchemaType } from '@/lib/validations/blog'
import { revalidatePath } from 'next/cache'
import { isTakenAcrossStores, scopedCreate, scopedDelete, scopedUpdate } from '@/lib/tenant'

export async function createBlog(data: BlogSchemaType) {
  try {
    const validatedData = blogSchema.parse(data)

    if (await isTakenAcrossStores(CollectionsName.Blogs, 'slug', validatedData.slug)) {
      return { success: false, error: 'Blog with this slug already exists' }
    }

    const result = await scopedCreate(CollectionsName.Blogs, validatedData)

    if (!result) {
      return { success: false, error: 'Failed to create blog' }
    }

    revalidatePath('/blogs')
    return { success: true }
  } catch (error) {
    console.error('Error creating blog:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateBlog(blogId: string, data: BlogSchemaType) {
  try {
    const validatedData = blogSchema.parse(data)
    const result = await scopedUpdate(CollectionsName.Blogs, blogId, validatedData)

    if (!result) {
      return { success: false, error: 'Failed to update blog' }
    }

    revalidatePath('/blogs')
    revalidatePath(`/blogs/${blogId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating blog:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteBlog(blogId: string) {
  try {
    if (!(await scopedDelete(CollectionsName.Blogs, blogId))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }

    revalidatePath('/blogs')
    return { success: true }
  } catch (error) {
    console.error('Error deleting blog:', error)
    return { success: false, error: 'Internal server error' }
  }
}

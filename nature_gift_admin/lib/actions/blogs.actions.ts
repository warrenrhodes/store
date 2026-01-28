'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { blogSchema, BlogSchemaType } from '@/lib/validations/blog'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { checkDocumentExists, getUserTokens } from './server'

export async function createBlog(data: BlogSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = blogSchema.parse(data)

    const existingBlog = await checkDocumentExists(
      CollectionsName.Blogs,
      'slug',
      validatedData.slug
    )

    if (existingBlog) {
      return { success: false, error: 'Blog with this slug already exists' }
    }

    const result = await backend.database.createRecord(CollectionsName.Blogs, {
      ...validatedData,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

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
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = blogSchema.parse(data)
    const blogPath = getDatabasePath(CollectionsName.Blogs, blogId)

    const result = await backend.database.setRecord(blogPath, {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    })

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
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const dataRef = backend.db.collection(CollectionsName.Blogs).doc(blogId)
    const dataDoc = await dataRef.get()

    if (!dataDoc.exists || dataDoc?.data()?.creatorId !== token.decodedToken.uid) {
       return { success: false, error: 'Not Found or Unauthorized' }
    }

    await dataRef.delete()

    revalidatePath('/blogs')
    return { success: true }
  } catch (error) {
    console.error('Error deleting blog:', error)
    return { success: false, error: 'Internal server error' }
  }
}

'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { categorySchema, CategorySchemaType } from '@/lib/validations/category'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { checkDocumentExists, getUserTokens } from './server'

export async function createCategory(data: CategorySchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = categorySchema.parse(data)

    const existingCategory = await checkDocumentExists(
      CollectionsName.Categories,
      'slug',
      validatedData.slug
    )

    if (existingCategory) {
      return { success: false, error: 'Category with this slug already exists' }
    }

    const result = await backend.database.createRecord(CollectionsName.Categories, {
      ...validatedData,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to create category' }
    }

    revalidatePath('/categories')
    return { success: true }
  } catch (error) {
    console.error('Error creating category:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateCategory(categoryId: string, data: CategorySchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = categorySchema.parse(data)
    const categoryPath = getDatabasePath(CollectionsName.Categories, categoryId)

    const result = await backend.database.setRecord(categoryPath, {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to update category' }
    }

    revalidatePath('/categories')
    revalidatePath(`/categories/${categoryId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating category:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const dataRef = backend.db.collection(CollectionsName.Categories).doc(categoryId)
    const dataDoc = await dataRef.get()

    if (!dataDoc.exists || dataDoc?.data()?.creatorId !== token.decodedToken.uid) {
       return { success: false, error: 'Not Found or Unauthorized' }
    }

    await dataRef.delete()

    revalidatePath('/categories')
    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: 'Internal server error' }
  }
}

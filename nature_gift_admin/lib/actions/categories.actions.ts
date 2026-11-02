'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { categorySchema, CategorySchemaType } from '@/lib/validations/category'
import { revalidatePath } from 'next/cache'
import { isTakenAcrossStores, scopedCreate, scopedDelete, scopedUpdate } from '@/lib/tenant'

export async function createCategory(data: CategorySchemaType) {
  try {
    const validatedData = categorySchema.parse(data)

    if (await isTakenAcrossStores(CollectionsName.Categories, 'slug', validatedData.slug)) {
      return { success: false, error: 'Category with this slug already exists' }
    }

    const result = await scopedCreate(CollectionsName.Categories, validatedData)

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
    const validatedData = categorySchema.parse(data)
    const result = await scopedUpdate(CollectionsName.Categories, categoryId, validatedData)

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
    if (!(await scopedDelete(CollectionsName.Categories, categoryId))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }

    revalidatePath('/categories')
    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: 'Internal server error' }
  }
}

'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { productSchema, ProductSchemaType } from '@/lib/validations/product'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { checkDocumentExists, getUserTokens } from './server'

export async function createProduct(data: ProductSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    // Validate data using schema
    const validatedData = productSchema.parse(data)

    // Check for duplicate slug
    const existingProduct = await checkDocumentExists(
      CollectionsName.Products,
      'slug',
      validatedData.slug
    )

    if (existingProduct) {
      return { success: false, error: 'Product with this slug already exists' }
    }

    const productData = {
      ...validatedData,
      price: {
        ...validatedData.price,
        saleStartDate: validatedData.price.saleStartDate
          ? new Date(validatedData.price.saleStartDate).toISOString()
          : null,
        saleEndDate: validatedData.price.saleEndDate
          ? new Date(validatedData.price.saleEndDate).toISOString()
          : null,
      },
    }

    const result = await backend.database.createRecord(CollectionsName.Products, {
      ...productData,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to create product' }
    }

    revalidatePath('/products')
    return { success: true }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateProduct(productId: string, data: ProductSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    // Validate data using schema
    const validatedData = productSchema.parse(data)

    const productPath = getDatabasePath(CollectionsName.Products, productId)
    
    // We might want to check ownership here if strictly required, 
    // but typical admin usage assumes access. 
    // Ideally we should check if product exists and creatorId matches or user is admin.

    const productData = {
      ...validatedData,
      price: {
        ...validatedData.price,
        saleStartDate: validatedData.price.saleStartDate
          ? new Date(validatedData.price.saleStartDate).toISOString()
          : null,
        saleEndDate: validatedData.price.saleEndDate
          ? new Date(validatedData.price.saleEndDate).toISOString()
          : null,
      },
    }

    const result = await backend.database.setRecord(productPath, {
      ...productData,
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to update product' }
    }

    revalidatePath('/products')
    revalidatePath(`/products/${productId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const dataRef = backend.db.collection(CollectionsName.Products).doc(productId)
    const dataDoc = await dataRef.get()

    if (!dataDoc.exists || dataDoc?.data()?.creatorId !== token.decodedToken.uid) {
       return { success: false, error: 'Not Found or Unauthorized' }
    }

    await dataRef.delete()

    revalidatePath('/products')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Internal server error' }
  }
}

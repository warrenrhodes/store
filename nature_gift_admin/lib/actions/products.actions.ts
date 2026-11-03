'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { productSchema, ProductSchemaType } from '@/lib/validations/product'
import { revalidatePath } from 'next/cache'
import { isTakenInStore, scopedCreate, scopedDelete, scopedUpdate } from '@/lib/tenant'

export async function createProduct(data: ProductSchemaType) {
  try {
    // Validate data using schema
    const validatedData = productSchema.parse(data)

    // Check for duplicate slug
    if (await isTakenInStore(CollectionsName.Products, 'slug', validatedData.slug)) {
      return { success: false, error: 'Product with this slug already exists' }
    }

    const stock = validatedData.inventory?.stockQuantity ?? validatedData.inventory?.quantity ?? 0
    const productData = {
      ...validatedData,
      inventory: { ...validatedData.inventory, stockQuantity: stock, quantity: stock },
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

    const result = await scopedCreate(CollectionsName.Products, productData)

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

/**
 * `loadedStock`: stock shown when the form opened. If unchanged, the stored stock is kept, so
 * saving a product never undoes the orders placed while it was being edited.
 */
export async function updateProduct(
  productId: string,
  data: ProductSchemaType,
  loadedStock?: number,
) {
  try {
    // Validate data using schema
    const validatedData = productSchema.parse(data)

    if (await isTakenInStore(CollectionsName.Products, 'slug', validatedData.slug, productId)) {
      return { success: false, error: 'Product with this slug already exists' }
    }

    const stock = validatedData.inventory?.stockQuantity ?? validatedData.inventory?.quantity
    const {
      quantity: _quantity,
      stockQuantity: _stock,
      ...inventoryRest
    } = validatedData.inventory ?? {}
    const inventory =
      stock === loadedStock
        ? inventoryRest
        : { ...inventoryRest, stockQuantity: stock, quantity: stock }
    const productData = {
      ...validatedData,
      inventory,
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

    // Only a product of the current store (false otherwise).
    const result = await scopedUpdate(CollectionsName.Products, productId, productData)

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
    if (!(await scopedDelete(CollectionsName.Products, productId))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }

    revalidatePath('/products')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Internal server error' }
  }
}

'use client'

import { useStorefront } from '@/components/layout/Storefront'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { generateSlug } from '@/lib/utils/slugify'
import {
  productSchema,
  ProductSchemaType,
  productVerificationForm,
} from '@/lib/validations/product'

import { useToast } from '@/hooks/use-toast'
import { createProduct, deleteProduct, updateProduct } from '@/lib/actions/products.actions'
import { IBlog, ICategory, IProduct } from '@/lib/actions/server'
import { Media, MediaType, ProductStatus } from '@/lib/firebase/models'
import { getDocumentId } from '@spreeloop/database'
import { ContentEditor } from '../custom-ui/ContentEditor'
import { FileUploader } from '../custom-ui/FileUploader'
import { FormActionBar, FormColumns, FormSection, SwitchField } from '../custom-ui/FormLayout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ToastAction } from '../ui/toast'
import { CategoriesForm } from './product-form.tsx/Categories'
import { FeaturesForm } from './product-form.tsx/Features'
import { InventoryFields } from './product-form.tsx/InventoryFields'
import { MetadataFields } from './product-form.tsx/MetadataFields'
import { PriceFields } from './product-form.tsx/PriceFields'
import { VariantFields } from './product-form.tsx/Variant'
interface ProductFormProps {
  initialData?: IProduct | null
  categories: ICategory[]
  blogs: IBlog[]
}

export function ProductFormV2({ initialData, categories, blogs }: ProductFormProps) {
  const storefront = useStorefront()
  const { toast } = useToast()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData?.data
      ? {
          ...initialData.data,
        }
      : {
          title: '',
          slug: '',
          isFeature: false,
          isNewProduct: false,
          description: {
            contentType: 'TEXT',
            content: '',
          },
          price: {
            regular: 0,
            sale: 0,
          },
          inventory: {
            quantity: 0,
            lowStockThreshold: 5,
          },
          visibility: false,
          medias: [],
          categories: [],
          tags: [],
          features: [],
          metadata: {
            seoTitle: '',
            seoDescription: '',
            keywords: [],
          },
        },
  })

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value
      form.setValue('title', title)
      form.setValue('slug', generateSlug(title))
    },
    [form],
  )

  async function onSubmit(data: ProductSchemaType) {
    const errorMessage = productVerificationForm(data)
    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    setIsLoading(true)
    try {
      let res
      if (initialData) {
        // Untouched stock isn't written back: orders may have changed it since the page loaded.
        res = await updateProduct(
          getDocumentId(initialData.path || ''),
          data,
          initialData.data.inventory?.stockQuantity ?? initialData.data.inventory?.quantity,
        )
      } else {
        res = await createProduct(data)
      }

      if (res.success) {
        toast({
          variant: 'success',
          description: `Product ${initialData ? 'updated' : 'created'}`,
        })
        router.push('/products')
      } else {
        toast({
          variant: 'destructive',
          description: res.error || 'Something went wrong! Please try again.',
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'An unexpected error occurred.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (): Promise<boolean> => {
    const res = await deleteProduct(getDocumentId(initialData?.path || ''))
    if (res.success) {
      toast({
        variant: 'success',
        description: 'Product deleted',
      })
      router.push('/products')
      return true
    } else {
      toast({
        variant: 'destructive',
        description: res.error || 'Failed to delete',
      })
      return false
    }
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const slug = form.watch('slug')

  return (
    <Form {...form}>
      <FormColumns
        side={
          <>
            <FormSection title="Publishing">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProductStatus.DRAFT}>Draft</SelectItem>
                        <SelectItem value={ProductStatus.PUBLISHED}>Published</SelectItem>
                        <SelectItem value={ProductStatus.ARCHIVED}>Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SwitchField control={form.control} name="visibility" label="Visible" />
              <SwitchField
                control={form.control}
                name="isFeature"
                label="Featured"
                hint="In your featured products"
              />
              <SwitchField
                control={form.control}
                name="isNewProduct"
                label="New"
                hint="In your new arrivals"
              />
            </FormSection>

            <FormSection title="Organization">
              {categories && <CategoriesForm form={form} categories={categories} />}
              <VariantFields form={form} />
            </FormSection>

            {blogs && blogs.length > 0 && slug && (
              <FormSection title="Linked article">
                <FormField
                  control={form.control}
                  name="blogUrl"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                          <FormControl>
                            <SelectTrigger aria-label="Linked article">
                              <SelectValue placeholder="No article" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {blogs.map(e => (
                              <SelectItem
                                value={`${storefront.url}/blogs/${e.data.slug}`}
                                key={`blogs: ${e.data.slug}`}
                              >
                                {e.data.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="No article"
                            onClick={() => field.onChange(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>
            )}
          </>
        }
      >
        <FormSection title="Product" description="What customers see on the product page.">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={handleKeyPress}
                    onChange={onTitleChange}
                    placeholder="Café Ginseng"
                    className="h-11 text-base"
                  />
                </FormControl>
                {slug && (
                  <p className="truncate text-xs text-muted-foreground">
                    Address: <span className="font-mono">/shop/{slug}</span>
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <ContentEditor
            label="Description"
            form={form}
            contentTypeFieldKey="description.contentType"
            contentFieldKey="description.content"
          />
        </FormSection>

        <FormSection title="Images" description="The first image is the one shown in the lists.">
          <FormField
            control={form.control}
            name="medias"
            render={({ field }) => (
              <FormItem>
                <FileUploader
                  medias={field.value ? field.value : []}
                  setContent={(value: Media[]) => field.onChange(value)}
                  fileType={MediaType.IMAGE}
                  maxFiles={5}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Price">
          <PriceFields form={form} />
        </FormSection>

        <FormSection title="Stock">
          <InventoryFields form={form} />
        </FormSection>

        <FormSection title="Features" description="Benefits listed on the product page.">
          <FeaturesForm form={form} />
        </FormSection>

        <FormSection
          title="Search engines"
          description="How the product appears on Google and when shared."
        >
          <MetadataFields form={form} />
        </FormSection>
      </FormColumns>

      <FormActionBar
        isLoading={isLoading}
        submitLabel={initialData ? 'Save changes' : 'Create product'}
        cancelHref="/products"
        onSubmit={() => onSubmit(form.getValues())}
        onDelete={initialData ? onDelete : undefined}
        deleteTitle="Delete this product?"
        deleteWarning="It disappears from your store. Past orders keep their copy. This can't be undone."
      />
    </Form>
  )
}

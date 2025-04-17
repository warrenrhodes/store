'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2, X } from 'lucide-react'
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
import CustomAccordion from '../accordion/CustomAccordion'
import { FileUploader } from '../custom-ui/FileUploader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { ToastAction } from '../ui/toast'
import { CategoriesForm } from './product-form.tsx/Categories'
import { ContentEditor } from '../custom-ui/ContentEditor'
import { FeaturesForm } from './product-form.tsx/Features'
import { InventoryFields } from './product-form.tsx/InventoryFields'
import { MetadataFields } from './product-form.tsx/MetadataFields'
import { PriceFields } from './product-form.tsx/PriceFields'
import { VariantFields } from './product-form.tsx/Variant'
import { getDocumentId } from '@spreeloop/database'
import { IBlog, ICategory, IProduct } from '@/lib/actions/server'
import { Media, MediaType, ProductStatus } from '@/lib/firebase/models'
import { cn } from '@/lib/utils'
interface ProductFormProps {
  initialData?: IProduct | null
  categories: ICategory[]
  blogs: IBlog[]
}

export function ProductFormV2({ initialData, categories, blogs }: ProductFormProps) {
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
      const url = initialData
        ? `/api/products/${getDocumentId(initialData.path || '')}`
        : `/api/products`
      const res = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast({
          variant: 'success',
          description: `Products ${initialData ? 'updated' : 'created'}`,
        })
        window.location.href = '/products'
        router.push('/products')
      } else {
        toast({
          variant: 'destructive',
          description: 'Something went wrong! Please try again.',
        })
        console.log(res.body)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (): Promise<boolean> => {
    const res = await fetch(`/api/products/${getDocumentId(initialData?.path || '')}`, {
      method: 'DELETE',
    })
    return res.ok
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div className="md:grid sm:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={handleKeyPress}
                    onChange={onTitleChange}
                    placeholder="Product Title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={() => (
              <FormItem>
                <FormLabel>Product Slug</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('slug')}
                    onKeyDown={handleKeyPress}
                    placeholder="product-slug"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:grid sm:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="isFeature"
            render={({ field }) => (
              <FormItem className="space-y-0 flex gap-3 items-center">
                <FormLabel className="!mt-0">Is Feature</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isNewProduct"
            render={({ field }) => (
              <FormItem className="space-y-0 flex gap-3 items-center">
                <FormLabel className="!mt-0">Is New</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ContentEditor
          label="Product Description*"
          form={form}
          contentTypeFieldKey="description.contentType"
          contentFieldKey="description.content"
        />

        <PriceFields form={form} />

        <InventoryFields form={form} />
        <FormField
          control={form.control}
          name="medias"
          render={({ field }) => (
            <FormItem>
              <CustomAccordion title="Product Images*">
                <FileUploader
                  medias={field.value ? field.value : []}
                  setContent={(value: Media[]) => field.onChange(value)}
                  fileType={MediaType.IMAGE}
                  maxFiles={5}
                />
              </CustomAccordion>
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="space-y-0 flex gap-3 items-center">
              <FormLabel className="!mt-0">Visibility</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FeaturesForm form={form} />

        <div className="md:grid sm:grid-cols-2 gap-8">
          {categories && <CategoriesForm form={form} categories={categories} />}
          <VariantFields form={form} />
        </div>

        <MetadataFields form={form} />
        {blogs && blogs.length > 0 && form.watch('slug') && (
          <FormField
            control={form.control}
            name="blogUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!mt-0">Blog Url</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blog url" unselectable="on" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent unselectable="on">
                        {blogs.map(e => (
                          <SelectItem
                            value={`${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').protocol}//${new URL(process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? '').hostname}/blogs/${e.data.slug}`}
                            key={`blogs: ${e.data.slug}`}
                          >
                            {e.data.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <X
                      size={20}
                      className={cn(
                        {
                          hidden: !field.value,
                        },
                        'text-red-500 cursor-pointer',
                      )}
                      onClick={() => field.onChange(null)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between">
          <Button disabled={isLoading} onClick={() => onSubmit(form.getValues())}>
            {isLoading && <Loader2 className="animate-spin" />}
            {initialData ? 'Update' : 'Create'} Product
          </Button>
          {initialData && (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={() => onDelete()}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Product
            </Button>
          )}
        </div>
      </div>
    </Form>
  )
}

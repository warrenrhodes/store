'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { generateSlug } from '@/lib/utils/slugify'
import { CategorySchemaType, categorySchema } from '@/lib/validations/category'
import CustomAccordion from '../accordion/CustomAccordion'
import { FileUploader } from '../custom-ui/FileUploader'
import { Media, MediaType } from '@/lib/firebase/models'
import { ICategory } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'

interface CategoryFormProps {
  category?: ICategory
  categories?: ICategory[]
}

export function CategoryForm({ category, categories }: CategoryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const initialData = useMemo(() => category?.data, [category])

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: useMemo(
      () =>
        initialData
          ? {
              name: initialData.name || '',
              slug: initialData.slug || '',
              description: initialData.description || '',
              featured: initialData.featured || false,
              parentPath: initialData.parentPath || null,
              image: initialData.image || null,
              seoMetadata: {
                seoTitle: initialData.seoMetadata?.seoTitle || '',
                seoDescription: initialData.seoMetadata?.seoDescription || '',
                keywords: initialData.seoMetadata?.keywords || [],
              },
            }
          : {
              name: '',
              slug: '',
              description: '',
              featured: false,
              image: null,
              parentPath: null,
              seoMetadata: {
                seoTitle: '',
                seoDescription: '',
                keywords: [],
              },
            },
      [initialData],
    ),
  })

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    form.setValue('name', name)
    form.setValue('slug', generateSlug(name))
  }

  // Filter out the current category and its children to prevent circular references
  const availableParentCategories = (categories || []).filter(
    category =>
      category.path !== category?.path &&
      (!category.data.parentPath || category.data.parentPath !== category?.path),
  )

  async function onSubmit(data: CategorySchemaType) {
    setIsLoading(true)
    try {
      const url = category ? `/api/categories/${getDocumentId(category.path)}` : `/api/categories`

      const res = await fetch(url, {
        method: category ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast({
          variant: 'default',
          description: `Category ${category ? 'updated' : 'created'}`,
        })
        window.location.href = '/categories'
        router.push('/categories')
      } else {
        toast({
          variant: 'destructive',
          description: 'Something went wrong! Please try again.',
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} onChange={onNameChange} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} disabled onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <CustomAccordion title="Category Image">
                <FileUploader
                  medias={field.value ? [field.value] : []}
                  setContent={(value: Media[]) => field.onChange(value[0])}
                  fileType={MediaType.IMAGE}
                  maxFiles={1}
                />
              </CustomAccordion>
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2 items-end">
          {availableParentCategories.length > 0 && (
            <FormField
              control={form.control}
              name="parentPath"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-3">
                  <FormLabel>Parent</FormLabel>
                  <div className="flex flex-row items-center gap-3">
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a parent" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {availableParentCategories.map(avCategory => (
                          <SelectItem key={avCategory.path} value={avCategory.path}>
                            {avCategory.data.name}
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
                      onClick={() => field.onChange('')}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch defaultChecked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0">Featured Category</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="seoMetadata.seoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoMetadata.seoDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoMetadata.keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords (comma-separated)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value?.join(', ') || ''}
                    onKeyDown={handleKeyPress}
                    onChange={e =>
                      field.onChange(e.target.value.split(',').map(keyword => keyword.trim()))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {category ? 'Update' : 'Create'} Category
          </Button>
          {category && (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                try {
                  await fetch(`/api/categories/${getDocumentId(category.path)}`, {
                    method: 'DELETE',
                  })
                  router.refresh()
                  router.push('/categories')
                } catch (error) {
                  console.error(error)
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Category
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

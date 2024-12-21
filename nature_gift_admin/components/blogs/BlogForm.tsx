'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { AlertTriangle, CalendarIcon, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { generateSlug } from '@/lib/utils/slugify'
import { blogSchema, BlogSchemaType } from '@/lib/validations/blog'
import { Prisma } from '@naturegift/models'
import { FileType } from '../accordion/CustomAccordionItem'
import { MediaIdentity, FileUploader } from '../custom-ui/FileUploader'
import MultiSelect from '../custom-ui/MultiSelect'
import MultiText from '../custom-ui/MultiText'
import { ContentEditor } from '../custom-ui/ContentEditor'

interface BlogFormProps {
  initialData?: Prisma.BlogGetPayload<{}> | null
  categories: Prisma.CategoryGetPayload<{}>[]
  categoriesOnBlog: Prisma.CategoriesOnBlogsGetPayload<{}>[]
}

export function BlogForm({ initialData, categories, categoriesOnBlog }: BlogFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categoryIds: categoriesOnBlog.map(e => e.categoryId),
          metadata: {
            ...initialData.metadata,
          },
        }
      : {
          title: '',
          slug: '',
          content: {
            type: 'HTML',
            content: '',
            excerpt: '',
          },
          publishedAt: new Date(),
          metadata: {
            title: '',
            keywords: [],
            author: {
              name: '',
            },
            featured: false,
          },
          categoryIds: [],
          customFields: null,
          tags: [],
          status: 'DRAFT',
          layout: 'DEFAULT',
        },
  })

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue('title', title)
    form.setValue('slug', generateSlug(title))
  }

  async function onSubmit(data: BlogSchemaType) {
    setIsLoading(true)

    try {
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/blogs/${initialData.id}`
        : `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/blogs`

      const res = await fetch(url, {
        method: initialData ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        toast({
          variant: 'success',
          description: `Blogs ${initialData ? 'updated' : 'created'}`,
        })
        window.location.href = '/blogs'
        router.push('/blogs')
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
    <div className="sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={onTitleChange} onKeyDown={handleKeyPress} />
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
            name="content.excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ContentEditor
            label="Content"
            form={form}
            contentTypeFieldKey="content.type"
            contentFieldKey="content.content"
          />
          <FormField
            control={form.control}
            name="metadata.coverImageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <FileUploader
                      mediaIds={field.value ? [field.value] : []}
                      setContent={(value: string[]) => field.onChange(value[0])}
                      fileType={FileType.IMAGE}
                      maxFiles={1}
                      targetType={MediaIdentity.URL}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  {categories.length > 0 ? (
                    <MultiSelect
                      placeholder="Select categories"
                      selectedValues={(field.value || []).map(value => {
                        return {
                          value,
                          label: categories.find(category => {
                            return category.id === value
                          })?.name as string,
                        }
                      })}
                      values={categories.map(category => {
                        return {
                          value: category.id,
                          label: category.name,
                        }
                      })}
                      onChange={values => field.onChange([...values.map(value => value.value)])}
                    />
                  ) : (
                    <div className="text-red-500 flex items-center gap-3 justify-center">
                      <AlertTriangle /> Adds least of one category before create a blog
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-3 items-end">
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
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="layout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layout</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DEFAULT">Default</SelectItem>
                      <SelectItem value="FEATURED">Featured</SelectItem>
                      <SelectItem value="MINIMAL">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publish Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={(field.value && new Date(field.value)) || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Tags"
                    value={field.value || []}
                    onChange={tag => field.onChange([...(field.value || []), tag])}
                    onRemove={tagToRemove =>
                      field.onChange([...(field.value || []).filter(tag => tag !== tagToRemove)])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metadata.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metadata Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onKeyDown={handleKeyPress}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="metadata.keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metadata Keywords (comma-separated)</FormLabel>
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
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="metadata.featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">Featured Post</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between">
            <Button disabled={isLoading || categories.length < 1}>
              {isLoading && <Loader2 className="animate-spin" />}
              {initialData ? 'Update' : 'Create'} Blog
            </Button>

            {initialData && (
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    await fetch(`/api/blogs/${initialData.id}`, {
                      method: 'DELETE',
                    })
                    router.refresh()
                    router.push('/blogs')
                  } catch (error) {
                    console.error(error)
                  } finally {
                    setIsLoading(false)
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Blog Post
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { AlertTriangle, CalendarIcon, Loader2, Trash2, X } from 'lucide-react'
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
import { toast } from '@/hooks/use-toast'
import { createBlog, deleteBlog, updateBlog } from '@/lib/actions/blogs.actions'
import { IBlog, ICategory, IProduct } from '@/lib/actions/server'
import { BlogStatus, Media, MediaType } from '@/lib/firebase/models'
import { cn } from '@/lib/utils'
import { generateSlug } from '@/lib/utils/slugify'
import { blogSchema, BlogSchemaType } from '@/lib/validations/blog'
import { getDocumentId } from '@spreeloop/database'
import { ContentEditor } from '../custom-ui/ContentEditor'
import { FileUploader } from '../custom-ui/FileUploader'
import MultiSelect from '../custom-ui/MultiSelect'
import MultiText from '../custom-ui/MultiText'

interface BlogFormProps {
  initialData?: IBlog | null
  categories: ICategory[]
  products: IProduct[]
}

export function BlogForm({ initialData, categories, products }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData?.data
      ? {
          ...initialData.data,
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
          categories: [],
          customFields: null,
          tags: [],
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
      let res;
      if (initialData) {
        res = await updateBlog(getDocumentId(initialData.path), data)
      } else {
        res = await createBlog(data)
      }

      if (res.success) {
        toast({
          variant: 'success',
          description: `Blog ${initialData ? 'updated' : 'created'}`,
        })
        router.push('/blogs')
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
          {products.length > 0 && (
            <FormField
              control={form.control}
              name="associateProductPath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associate Product(optional)</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map(e => (
                            <SelectItem key={e.path} value={e.path}>
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
          <ContentEditor
            label="Content"
            form={form}
            contentTypeFieldKey="content.type"
            contentFieldKey="content.content"
          />
          <FormField
            control={form.control}
            name="metadata.coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <FileUploader
                      medias={field.value ? [field.value] : []}
                      setContent={(value: Media[]) =>
                        value.length == 0 ? field.onChange(null) : field.onChange(value[0])
                      }
                      fileType={MediaType.IMAGE}
                      maxFiles={1}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
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
                            return category.data.name === value
                          })?.data.name as string,
                        }
                      })}
                      values={categories.map(category => {
                        return {
                          value: category.data.name,
                          label: category.data.name,
                        }
                      })}
                      onChange={values => field.onChange([...values.map(value => value.label)])}
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
                      <SelectItem value={BlogStatus.DRAFT}>Draft</SelectItem>
                      <SelectItem value={BlogStatus.PUBLISHED}>Published</SelectItem>
                      <SelectItem value={BlogStatus.ARCHIVED}>Archived</SelectItem>
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
            <Button type="submit" disabled={isLoading || categories.length < 1}>
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
                    const res = await deleteBlog(getDocumentId(initialData.path))
                    if (res.success) {
                        router.refresh()
                        router.push('/blogs')
                    } else {
                         toast({
                          variant: 'destructive',
                          description: res.error || 'Failed to delete',
                        })
                    }
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

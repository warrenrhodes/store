'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { AlertTriangle, CalendarIcon, Copy, X } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
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
import { toDate } from '@/lib/utils/utils'
import { blogSchema, BlogSchemaType } from '@/lib/validations/blog'
import { getDocumentId } from '@spreeloop/database'
import { ContentEditor } from '../custom-ui/ContentEditor'
import { FormActionBar, FormColumns, FormSection, SwitchField } from '../custom-ui/FormLayout'
import CustomRichTextEditor from '../accordion/CustomRichText'
import { THANK_YOU_TAGS } from '@ngift/core/thank-you'
import { THANK_YOU_TEMPLATES } from '@ngift/core/thank-you-templates'
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
          publishedAt: new Date().toISOString(),
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
          countdown: null,
          thankYouPage: null,
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
      let res
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

  const thankYouOn = form.watch('thankYouPage') !== null && form.watch('thankYouPage') !== undefined
  const slug = form.watch('slug')

  const remove = async () => {
    if (!initialData) return
    setIsLoading(true)
    try {
      const res = await deleteBlog(getDocumentId(initialData.path))
      // replace, not refresh + push: refreshing re-requests this deleted post (404), and
      // /blogs is dynamic so it reloads anyway.
      if (res.success) router.replace('/blogs')
      else toast({ variant: 'destructive', description: res.error || 'Failed to delete' })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () =>
          toast({ variant: 'destructive', description: 'Some fields need your attention.' }),
        )}
      >
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
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Publish date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {toDate(field.value) ? (
                                format(toDate(field.value)!, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={toDate(field.value)}
                            onSelect={date => field.onChange(date?.toISOString() ?? null)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                <SwitchField
                  control={form.control}
                  name="metadata.featured"
                  label="Featured"
                  hint="Highlighted in the article list"
                />
              </FormSection>

              <FormSection title="Cover image">
                <FormField
                  control={form.control}
                  name="metadata.coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          medias={field.value ? [field.value] : []}
                          setContent={(value: Media[]) =>
                            value.length == 0 ? field.onChange(null) : field.onChange(value[0])
                          }
                          fileType={MediaType.IMAGE}
                          maxFiles={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>

              <FormSection title="Categories">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {categories.length > 0 ? (
                          <MultiSelect
                            placeholder="Select categories"
                            selectedValues={(field.value || []).map(value => ({
                              value,
                              label: categories.find(c => c.data.name === value)?.data
                                .name as string,
                            }))}
                            values={categories.map(category => ({
                              value: category.data.name,
                              label: category.data.name,
                            }))}
                            onChange={values =>
                              field.onChange([...values.map(value => value.label)])
                            }
                          />
                        ) : (
                          <p className="flex items-center gap-2 text-sm text-destructive">
                            <AlertTriangle className="h-4 w-4 shrink-0" /> Create a category first.
                          </p>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>
            </>
          }
        >
          <FormSection title="Article" description="What visitors read.">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={onTitleChange}
                      onKeyDown={handleKeyPress}
                      placeholder="Le café qui donne la pêche"
                      className="h-11 text-base"
                    />
                  </FormControl>
                  {slug && (
                    <p className="truncate text-xs text-muted-foreground">
                      Address: <span className="font-mono">/blogs/{slug}</span>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content.excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      rows={2}
                      placeholder="One or two sentences shown under the title and in the article list."
                    />
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
          </FormSection>

          <FormSection
            title="Sales page"
            description="Sell a product right from this page: an order form appears under the article."
          >
            {products.length > 0 && (
              <FormField
                control={form.control}
                name="associateProductPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product sold</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="None: a regular article" />
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
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="No product"
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
            )}
            <FormField
              control={form.control}
              name="countdown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Countdown</FormLabel>
                  <CountdownFields value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormField
            control={form.control}
            name="thankYouPage"
            render={({ field }) => (
              <FormSection
                title="After the order"
                description="Your own thank-you page for orders placed here. Off: the platform's confirmation. The order number and tracking link are always added below."
                action={
                  <Switch
                    checked={thankYouOn}
                    onCheckedChange={on => field.onChange(on ? THANK_YOU_TEMPLATES[0].html : null)}
                    aria-label="Custom thank-you page"
                  />
                }
              >
                {thankYouOn && (
                  <FormItem className="space-y-4">
                    <Templates
                      onPick={html =>
                        (!field.value?.trim() ||
                          confirm('Replace the current thank-you page with this template?')) &&
                        field.onChange(html)
                      }
                    />
                    <MergeTags />
                    <CustomRichTextEditor content={field.value ?? ''} onSave={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              </FormSection>
            )}
          />

          <FormSection
            title="Search engines"
            description="How the page appears on Google and when shared."
          >
            <FormField
              control={form.control}
              name="metadata.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metadata.keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(', ') || ''}
                      onKeyDown={handleKeyPress}
                      placeholder="café, cordyceps, énergie"
                      onChange={e =>
                        field.onChange(e.target.value.split(',').map(keyword => keyword.trim()))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Add a tag and press Enter"
                      value={field.value || []}
                      onChange={tag => field.onChange([...(field.value || []), tag])}
                      onRemove={tagToRemove =>
                        field.onChange([...(field.value || []).filter(tag => tag !== tagToRemove)])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>
        </FormColumns>

        <FormActionBar
          isLoading={isLoading}
          submitLabel={initialData ? 'Save changes' : 'Create article'}
          submitDisabled={categories.length < 1}
          cancelHref="/blogs"
          onDelete={initialData ? remove : undefined}
          deleteTitle="Delete this article?"
          deleteWarning="Its page and its ad links stop working. This can't be undone."
        />
      </form>
    </Form>
  )
}

type CountdownValue = BlogSchemaType['countdown']

/** ISO date → the browser's local "YYYY-MM-DDTHH:mm", for <input type="datetime-local">. */
const toLocalInput = (iso?: string | null) => {
  const date = toDate(iso)
  return date ? format(date, "yyyy-MM-dd'T'HH:mm") : ''
}

/** Off, limited (stops at the end date) or loop (starts again every cycle after it). */
function CountdownFields(props: { value: CountdownValue; onChange: (v: CountdownValue) => void }) {
  const { value, onChange } = props
  const set = (patch: Partial<NonNullable<CountdownValue>>) => onChange({ ...value!, ...patch })
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Select
        value={value?.mode ?? 'off'}
        onValueChange={mode =>
          onChange(
            mode === 'off'
              ? null
              : {
                  mode: mode as 'limited' | 'loop',
                  endsAt: value?.endsAt ?? new Date(Date.now() + 24 * 3600_000).toISOString(),
                  cycleHours: value?.cycleHours ?? (mode === 'loop' ? 24 : null),
                  label: value?.label ?? null,
                },
          )
        }
      >
        <SelectTrigger aria-label="Countdown mode">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="off">No countdown</SelectItem>
          <SelectItem value="limited">Limited: stops at the end date</SelectItem>
          <SelectItem value="loop">Loop: starts again after the end date</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <>
          <label className="grid gap-1 text-sm">
            {value.mode === 'loop' ? 'End of the first cycle' : 'End date'}
            <Input
              type="datetime-local"
              required
              value={toLocalInput(value.endsAt)}
              onChange={e =>
                e.target.value && set({ endsAt: new Date(e.target.value).toISOString() })
              }
            />
          </label>
          {value.mode === 'loop' && (
            <label className="grid gap-1 text-sm">
              Cycle length (hours)
              <Input
                type="number"
                min={1}
                max={720}
                required
                value={value.cycleHours ?? 24}
                onChange={e => set({ cycleHours: Number(e.target.value) || null })}
              />
            </label>
          )}
          <label className="grid gap-1 text-sm">
            Text above the timer (optional)
            <Input
              placeholder="L'offre se termine dans"
              maxLength={80}
              value={value.label ?? ''}
              onChange={e => set({ label: e.target.value || null })}
            />
          </label>
        </>
      )}
    </div>
  )
}

/** The thank-you page's merge tags, each copied in one click. */
function MergeTags() {
  return (
    <details className="rounded-md border text-sm">
      <summary className="cursor-pointer p-3 font-medium">
        Merge tags: the customer&apos;s name, product, total, tracking link…
      </summary>
      <table className="w-full">
        <tbody>
          {THANK_YOU_TAGS.map(t => (
            <tr key={t.tag} className="border-t">
              <td className="p-2">
                {t.label}
                <span className="block text-xs text-muted-foreground">{t.description}</span>
              </td>
              <td className="p-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 font-mono"
                  title="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(`{{${t.tag}}}`)
                    toast({ description: `{{${t.tag}}} copied` })
                  }}
                >
                  {`{{${t.tag}}}`} <Copy className="h-4 w-4" aria-hidden />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}

/** Ready-made pages (French, the store's colors): one replaces the current page. */
function Templates({ onPick }: { onPick: (html: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        Start from a template, then edit it (text in [brackets] is yours to fill in):
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {THANK_YOU_TEMPLATES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.html)}
            className="rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <span className="font-medium">{t.name}</span>
            <span className="block text-xs text-muted-foreground">{t.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

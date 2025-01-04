'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '@clerk/nextjs'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useToast } from '@/hooks/use-toast'
import { uploadImages } from '@/lib/actions/client'
import { cn } from '@/lib/utils'
import { reviewSchema, ReviewSchemaType } from '@/lib/validations/reviews'
import { AlertTriangle, Camera, Loader2, Trash2, X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Prisma } from '@prisma/client'
interface ReviewFormProps {
  initialData?: Prisma.ReviewGetPayload<object> | null
  products: Prisma.ProductGetPayload<object>[]
}

const ReviewForm: React.FC<ReviewFormProps> = ({ initialData, products }) => {
  const router = useRouter()
  const { getToken } = useAuth()
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<File | null>(null)
  const [isLoading, setLoading] = useState(false)

  const form = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          productId: initialData.productId || '',
          notHelpful: initialData.notHelpful ?? 0,
          helpful: initialData.helpful ?? 0,
        }
      : {
          userName: '',
          rating: 1,
          comment: '',
          helpful: 0,
          verify: false,
          productId: '',
          notHelpful: 0,
        },
  })

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const onSubmit = async (values: ReviewSchemaType) => {
    try {
      setLoading(true)
      if (imagePreview) {
        const imageUrl = await uploadImages([imagePreview], (await getToken()) || '')
        if (imageUrl) {
          values.imageUrl = imageUrl
        } else {
          setLoading(false)
          toast({
            description: 'Failed to upload image. Please try again.',
            variant: 'destructive',
          })
          return
        }
      }
      const url = initialData ? `/api/reviews/${initialData.id}` : '/api/reviews'
      const res = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setLoading(false)
        toast({
          description: `Review ${initialData ? 'updated' : 'created'}`,
          variant: 'success',
        })
        window.location.href = '/reviews'
        router.push('/reviews')
      } else {
        setLoading(false)
        toast({
          description: 'Something went wrong! Please try again.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      setLoading(false)
      console.log('[reviews_POST]', err)
      toast({
        description: 'Something went wrong! Please try again.',
        variant: 'destructive',
      })
    }
  }

  const onDelete = async (): Promise<boolean> => {
    const res = await fetch(`/api/reviews/${initialData?.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
    return res.ok
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(file)
    }
  }

  return (
    <div className="sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="User Name" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-3">
                <FormLabel>Product</FormLabel>

                {products.length > 0 ? (
                  <div className="flex flex-row items-center gap-3">
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.title}
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
                ) : (
                  <div className="text-red-500 flex items-center gap-3 justify-center">
                    <AlertTriangle /> Adds least of one product before create a review
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Button
                      key={star}
                      type="button"
                      variant="ghost"
                      className={`p-1 ${field.value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => field.onChange(star)}
                    >
                      ★
                    </Button>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value || ''}
                    maxLength={500}
                    placeholder="Comment"
                    rows={5}
                    onKeyDown={handleKeyPress}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col items-start space-y-4">
                  <FormLabel>Image</FormLabel>
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={field.value || (imagePreview && URL.createObjectURL(imagePreview)) || ''}
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-gray-100">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <Label htmlFor="userImage" className="cursor-pointer">
                      <div className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-600">
                        <Camera className="w-4 h-4" />
                        <span>Upload Photo</span>
                      </div>
                    </Label>
                    <Input
                      id="userImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="verify"
            render={({ field }) => (
              <FormItem className=" flex items-center gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <FormLabel>Verify</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="helpful"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helpful</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    {...field}
                    onKeyDown={handleKeyPress}
                    onChange={e => field.onChange(parseInt(e.target.value || '0'))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notHelpful"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Not Helpful</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Not Helpful"
                    {...field}
                    onKeyDown={handleKeyPress}
                    onChange={e => field.onChange(parseInt(e.target.value || '0'))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button disabled={isLoading || products.length < 1}>
              {isLoading && <Loader2 className="animate-spin" />}
              {initialData ? 'Update' : 'Create'} Review
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
        </form>
      </Form>
    </div>
  )
}

export default ReviewForm

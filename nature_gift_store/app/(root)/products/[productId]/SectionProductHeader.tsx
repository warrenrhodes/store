'use client'

import { useState, type FC, useCallback, useEffect } from 'react'

import {
  BeneficeType,
  IMedia,
  IProduct,
  IPromotion,
  IReview,
  ShipmentDetailType,
} from '@/lib/types'
import { ProductGallery } from '@/components/ImageShowCase/ImageShowCase'
import {
  Plus,
  Minus,
  ShoppingCart,
  Star,
  StarHalf,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  icons,
} from 'lucide-react'
import ProductSizeButton from '@/components/ProductSizeButton'
import { Button } from '@/components/ui/button'
import { useCart, useCartSideBar } from '@/lib/hooks/useCart'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { MotionDiv } from '@/shared/Motion/MotionDiv'
import { getPromotions } from '@/lib/actions/actions'
import { useRouter } from 'next/navigation'

interface SectionProductHeaderProps {
  media: IMedia[]
  sizes: string[]
  title: string
  expense: number
  price: number
  description: string
  ratings: number
  product: IProduct
  reviews: IReview[]
}

const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  media,
  title,
  expense,
  price,
  reviews,
  sizes,
  ratings,
  description,
  product,
}) => {
  const router = useRouter()
  const fullStars = Math.floor(ratings)
  const hasHalfStar = ratings % 1 >= 0.5
  const cart = useCart()
  const cartSideBar = useCartSideBar()
  const cartItem = cart.cartItems.find(item => item.item.title === title)
  const handleClickDecrement = () => {
    if (!cartItem) return
    if (1 >= cartItem.quantity) return
    cart.decreaseQuantity(cartItem.item._id)
  }
  const handleClickIncrement = () => {
    if (!cartItem) {
      cart.addItem({
        item: product,
        quantity: 1,
      })
      return
    }

    if (99 <= cartItem.quantity) return
    cart.increaseQuantity(cartItem.item._id)
  }

  return (
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
      <ProductGallery medias={media.map(_media => `${_media.url}`)} />
      <div>
        <p className="font-bold text-5xl">{title}</p>

        <div className="flex">
          <div className="relative">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star fill="#111" strokeWidth={0} key={index} />
              ))}
            </div>
            <div className="flex gap-1 absolute top-0">
              {[...Array(fullStars)].map((_, index) => (
                <Star strokeWidth={0} fill="blue" key={index} className="text-blue-600 h-6 w-6" />
              ))}
              {hasHalfStar && (
                <StarHalf fill="blue" className="text-blue-600 h-6 w-6" strokeWidth={0} />
              )}
            </div>
          </div>
          <p>({reviews.length}) Reviews</p>
        </div>
        <Benefices benefices={product.features} />
        <div className="flex flex-wrap mt-4 gap-1 items-center">
          <p className="text-gray-400 text-sm line-through self-end">FCFA {expense}</p>
          <p className="text-gray-800 text-2xl font-bold">FCFA {price}</p>
        </div>
        {sizes.length > 0 && (
          <div className="mb-5 flex items-end justify-between">
            <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4">
          {sizes.map(size => (
            <ProductSizeButton key={size} size={size} />
          ))}
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Quantity</h3>

          <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28 mt-5">
            <Minus
              size={13}
              className="flex h-8 w-8 items-center justify-center rounded-full p-2 border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickDecrement}
            />
            <p className="text-body-bold">{cartItem?.quantity || 1}</p>
            <Plus
              size={13}
              className="flex h-8 w-8 items-center justify-center p-2 rounded-full border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickIncrement}
            />
          </div>
        </div>
        <Promotions productPrice={price} productId={product._id} />
        <div className="mt-5 flex items-center gap-5">
          <MotionDiv className="flex-1">
            <Button
              className="flex w-full  py-6 text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300 hover:shadow-lg"
              onClick={() => {
                if (!cartItem) {
                  handleClickIncrement()
                }
                console.log('buy now')
                setTimeout(() => {
                  router.push('/cart')
                }, 1000)
              }}
            >
              Buy Now
            </Button>
          </MotionDiv>
          <MotionDiv className="flex-1">
            <Button
              variant={'outline'}
              className="flex w-full  py-6 text-primary items-center gap-1 border-2 border-primary font-bold transition-all duration-300 hover:shadow-lg"
              onClick={() => {
                if (!cartItem) {
                  handleClickIncrement()
                }
                cartSideBar.onOpenChange(true)
              }}
            >
              <ShoppingCart /> Add to cart
            </Button>
          </MotionDiv>
        </div>
        <Reviews reviews={reviews} />
        <ShipmentDetails shipment_details={product.shipmentDetails} />
      </div>
    </div>
  )
}

const Reviews = ({ reviews }: { reviews: IReview[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const AUTO_PLAY_DELAY = 4000

  if (reviews.length === 0) return null

  const goToNext = useCallback(() => {
    setOpacity(0)
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length)
      setOpacity(1)
    }, 300)
  }, [])

  const goToPrevious = useCallback(() => {
    setOpacity(0)
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))
      setOpacity(1)
    }, 300)
  }, [])
  // Handle manual navigation
  const handleManualNavigation = (action: VoidFunction) => {
    setIsAutoPlaying(false)
    action()

    // Resume auto-play after delay
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, AUTO_PLAY_DELAY)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying && reviews.length > 1) {
      interval = setInterval(goToNext, 7000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext])

  const currentReview = reviews[currentIndex]

  return (
    <div className="p-6 bg-background rounded-lg shadow-lg mt-3" key={currentIndex}>
      <div className="relative">
        {reviews.length > 1 && (
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              goToPrevious()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 -ml-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {reviews.length > 1 && (
          <button
            onClick={() => handleManualNavigation(goToNext)}
            className="absolute right-3 top-1/2 -translate-y-1/2 -mr-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}

        <div
          className="flex items-start space-x-4 transition-opacity duration-600"
          style={{ opacity }}
        >
          {currentReview?.imageUrl && (
            <div className="relative h-14 w-14 rounded-full shadow-md">
              <Image
                src={currentReview.imageUrl}
                alt={currentReview.userName}
                fill
                sizes="80px"
                unoptimized
                className="h-full w-full rounded-full object-cover "
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800">{currentReview.userName}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500">{'★'.repeat(currentReview.rating)}</span>
                <span className="text-gray-600">{'★'.repeat(5 - currentReview.rating)}</span>
              </div>
            </div>

            <p className="mt-2 text-gray-600">{currentReview.comment}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(goToPrevious)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ShipmentDetails = ({ shipment_details }: { shipment_details: ShipmentDetailType[] }) => {
  if (!shipment_details || shipment_details.length === 0) {
    return null
  }

  return (
    <div>
      <div className="flex mt-4 bg-background rounded-lg p-3 items-center overflow-hidden shadow-lg">
        {shipment_details?.length > 0 &&
          shipment_details.slice(0, 3).map((shipment_detail, index) => {
            const LucideIcon = icons[shipment_detail.icon as keyof typeof icons]
            return (
              <div
                className="flex flex-col flex-1 items-center justify-center gap-2 h-[80px] overflow-hidden"
                key={shipment_detail.description}
              >
                <LucideIcon size={35} />
                <div
                  className="prose prose-slate text-center prose-p:text-[12px]"
                  dangerouslySetInnerHTML={{
                    __html: shipment_detail.description,
                  }}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

const Benefices = ({ benefices }: { benefices: BeneficeType[] }) => {
  if (!benefices || benefices.length === 0) {
    return null
  }
  return (
    <div className=" flex flex-col mt-4 gap-2">
      {benefices?.length > 0 &&
        benefices?.map((benefice, index) => (
          <MotionDiv key={benefice.title} index={index}>
            <div
              className="w-full rounded-lg h-30 p-3 bg-background shadow-lg"
              key={benefice.title}
            >
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-primary" />
                <div
                  className="prose prose-slate prose-sm sm:prose"
                  dangerouslySetInnerHTML={{
                    __html: benefice.title,
                  }}
                />
              </div>
            </div>
          </MotionDiv>
        ))}
    </div>
  )
}
const Promotions = ({ productPrice, productId }: { productPrice: number; productId: string }) => {
  const [promotions, setPromotions] = useState<IPromotion[]>([])
  const [current, setCurrent] = useState<IPromotion | undefined>()
  const cart = useCart()

  const fetchPromotions = useCallback(async () => {
    const result = (await getPromotions())?.filter(
      e => e.product._id === productId && e.isActive && e.discountValue < productPrice,
    )
    if (result && result.length > 0) {
      const cartItem = cart.cartItems.find(
        cartItem => cartItem.promotion?.product._id === productId,
      )
      setPromotions(result)
      if (cartItem) {
        setCurrent(cartItem.promotion)
      }
    }
  }, [])

  const handlePromotionUpdated = (promo: IPromotion) => {
    const cartItems = cart.cartItems.find(item => item.item._id === promo.product._id)

    if ((cartItems?.quantity || 1) < promo.minProductsToApply) {
      toast.error(`Select at least ${promo.minProductsToApply} product to validate the promotion`)
      return
    }
    if (current?._id === promo._id) {
      cart.updatePromotion(promo.product._id)
      setCurrent(undefined)
    } else {
      cart.updatePromotion(promo.product._id, promo)
      setCurrent(promo)
    }
  }

  useEffect(() => {
    fetchPromotions()
  }, [cart])

  if (promotions.length === 0) return <></>

  return (
    <div>
      {promotions.length > 0 && (
        <div>
          <div className="flex items-center">
            <div className="bg-gray-200  h-[1px] flex-1 mr-1" />
            <p className="text-sm text-muted font-bold m-1">Promotions</p>
            <div className="bg-gray-200 h-[1px] flex-1 ml-1" />
          </div>
          <div>
            {promotions.map((promo, index) => (
              <MotionDiv key={promo._id} index={index}>
                <div
                  className={cn(
                    {
                      'border border-primary': current?._id === promo._id,
                    },
                    'w-full bg-background rounded-lg p-3 mb-2 cursor-pointer shadow-lg',
                  )}
                  onClick={() => handlePromotionUpdated(promo)}
                >
                  <div className="flex items-center gap-2">
                    {current?._id === promo._id ? (
                      <CheckSquare size={16} className="text-primary" />
                    ) : (
                      <Square size={16} className="text-primary" />
                    )}
                    <div className="flex-col flex-1">
                      <p className="text-sm font-bold">{promo.promotionName}</p>
                    </div>
                    <div className="flex-col">
                      <p className="text-sm font-bold"> Reduction</p>
                      <p className="text-red-500 text-sm font-bold">- {promo.discountValue} FCFA</p>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionProductHeader
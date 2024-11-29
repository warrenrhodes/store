'use client'
import { motion } from 'framer-motion'
import { icons, ShoppingCart } from 'lucide-react'
import { useCart, useCartSideBar } from '@/lib/hooks/useCart'
import { title } from 'process'
import { IProduct } from '@/lib/types'
import { MotionDiv } from '@/shared/Motion/MotionDiv'
import { Button } from '@/components/ui/button'

const ProductCTA = ({ product }: { product: IProduct }) => {
  // random number between 1 and 20
  const randomRating = 10
  const cart = useCart()
  const cartSideBar = useCartSideBar()
  const cartItem = cart.cartItems.find(item => item.item.title === title)

  return (
    <div className="relative w-full flex items-center justify-center ">
      <div
        className={
          'relative w-full bg-background mx-auto backdrop-blur-md rounded-xl shadow-2xl transition-colors duration-300 border border-white/10'
        }
      >
        <div className=" md:grid md:grid-cols-2 gap-8 p-5 w-full">
          <div className="space-y-6 ">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {product.promoPrice && (
                  <span className={'text-4xl font-bold text-gray-900'}>
                    FCFA {product.promoPrice}
                  </span>
                )}
                <span className="text-xl text-gray-500 line-through">FCFA {product.price}</span>
              </div>
              {randomRating < 20 && (
                <p className="text-sm font-medium text-[#e91e63]">
                  Only {randomRating} items left in stock!
                </p>
              )}
            </div>

            <div className={'space-y-6 text-gray-600'}>
              {product.shipmentDetails?.length > 0 &&
                product.shipmentDetails.map((detail, index) => {
                  const LucideIcon = icons[detail.icon as keyof typeof icons]

                  return (
                    <motion.div
                      whileHover={{ x: 5 }}
                      key={index}
                      className="flex items-center gap-3 text-base"
                    >
                      <LucideIcon size={25} />
                      <div
                        className="prose prose-slate prose-sm sm:prose text-center"
                        dangerouslySetInnerHTML={{
                          __html: detail.description,
                        }}
                      />
                    </motion.div>
                  )
                })}
            </div>
          </div>

          <div className="space-y-4">
            <MotionDiv className="flex-1">
              <Button
                className="flex w-full  py-6 bg-primary text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300 hover:shadow-lg"
                onClick={() => {
                  if (!cartItem) {
                    cart.addItem({
                      item: product,
                      quantity: 1,
                    })
                  }
                  cartSideBar.onOpenChange(true)
                  return
                }}
              >
                <ShoppingCart /> Add to cart
              </Button>
            </MotionDiv>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${'bg-[#6626d9]/10 text-[#6626d9]'} p-4 rounded-lg text-base text-center border border-[#6626d9]/20`}
            >
              🎉 Special offer! Get 10% off on your first purchase
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCTA

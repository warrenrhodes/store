import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, IPromotion } from '../types'

interface CartStore {
  cartItems: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (idToRemove: string) => void
  increaseQuantity: (idToIncrease: string) => void
  decreaseQuantity: (idToDecrease: string) => void
  updatePromotion: (cartItemId: string, promotion?: IPromotion) => void
  clearCart: () => void
}

interface SideBarCart {
  isSideBarCartOpen: boolean
  onOpenChange: (value: boolean) => void
}

const useCartSideBar = create<SideBarCart>(set => ({
  isSideBarCartOpen: false,
  onOpenChange: (value: boolean) => set({ isSideBarCartOpen: value }),
}))

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data
        const currentItems = get().cartItems
        const isExisting = currentItems.find(cartItem => cartItem.item._id === item._id)

        if (isExisting) {
          return toast('Item already in cart')
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] })
        toast.success('Item added to cart', { icon: '🛒' })
      },
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter(cartItem => cartItem.item._id !== idToRemove)
        set({ cartItems: newCartItems })
      },
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map(cartItem =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
        set({ cartItems: newCartItems })
      },
      decreaseQuantity: (idToDecrease: String) => {
        const newCartItems = get().cartItems.map(cartItem => {
          if (cartItem.item._id === idToDecrease) {
            if (cartItem.promotion && cartItem.promotion.minProductsToApply >= cartItem.quantity) {
              toast.error("You can't remove more items, without disabling promotion")
              return cartItem
            }
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }
          return cartItem
        })
        set({ cartItems: newCartItems })
      },
      updatePromotion: (cartItemId: string, promotion?: IPromotion) => {
        const newCartItems = get().cartItems.map(cartItem =>
          cartItem.item._id === cartItemId ? { ...cartItem, promotion: promotion } : cartItem,
        )
        set({ cartItems: newCartItems })
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useCart, useCartSideBar }
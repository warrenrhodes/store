import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '@/hooks/use-toast'
import { sendGTMEvent } from '@next/third-parties/google'
import { IDeliveryInfo, Product } from '@/lib/firebase/models'
export interface CartShipment {
  method: 'DELIVERY' | 'EXPEDITION'
  cost: number
  location: string
}
export interface CartItem {
  product: Product
  quantity: number
  price: number
}

interface CartStore {
  cartItems: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (idToRemove: string) => void
  increaseQuantity: (idToIncrease: string) => void
  decreaseQuantity: (idToDecrease: string) => void
  clearCart: () => void
}

interface SideBarCart {
  isSideBarCartOpen: boolean
  onOpenChange: (value: boolean) => void
}

interface CartDeliveryInfo {
  cartDeliveryInfo?: Partial<IDeliveryInfo>
  clearDeliveryInfo: () => void
  setShipment: (shipment?: Partial<IDeliveryInfo>) => void
}

const useCartSideBar = create<SideBarCart>(set => ({
  isSideBarCartOpen: false,
  onOpenChange: (value: boolean) => set({ isSideBarCartOpen: value }),
}))

const useCartDeliveryInfo = create<CartDeliveryInfo>(set => ({
  clearDeliveryInfo: () => set({ cartDeliveryInfo: undefined }),
  setShipment(shipment) {
    set({ cartDeliveryInfo: shipment })
  },
}))

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { product, quantity, price } = data
        const currentItems = get().cartItems
        const isExisting = currentItems.find(cartItem => cartItem.product.path === product.path)

        if (isExisting) {
          return toast({
            title: '🛒 Item already in cart',
            description: 'You can increase or decrease the quantity',
          })
        }

        set({ cartItems: [...currentItems, { product, quantity, price }] })
        toast({
          title: '🎉🎉 Item added to cart',
        })
        sendGTMEvent({
          event: 'add_to_cart',
          currency: 'XAF',
          value: currentItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
          items: currentItems.map(e => {
            return {
              item_id: e.product.path,
              item_name: e.product.title,
              quantity: e.quantity,
              category: e.product.categories[0],
            }
          }),
        })
      },
      removeItem: (idToRemove: string) => {
        const newCartItems = get().cartItems.filter(
          cartItem => cartItem.product.path !== idToRemove,
        )
        set({ cartItems: newCartItems })

        if (get().cartItems.length === 0) {
          useCartDeliveryInfo.getState().clearDeliveryInfo()
        }
        sendGTMEvent({
          event: 'remove_from_cart',
          currency: 'XAF',
          value: newCartItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
          items: newCartItems.map(e => {
            return {
              item_id: e.product.path,
              item_name: e.product.title,
              quantity: e.quantity,
              category: e.product.categories[0],
            }
          }),
        })
      },
      increaseQuantity: (idToIncrease: string) => {
        const newCartItems = get().cartItems.map(cartItem =>
          cartItem.product.path === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
        set({ cartItems: newCartItems })
      },
      decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.map(cartItem => {
          if (cartItem.product.path === idToDecrease) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }
          return cartItem
        })
        set({ cartItems: newCartItems })
      },
      clearCart: () => {
        set({ cartItems: [] })
        useCartDeliveryInfo.getState().clearDeliveryInfo()
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useCart, useCartSideBar, useCartDeliveryInfo }

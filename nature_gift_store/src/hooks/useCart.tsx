import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '@/hooks/use-toast'
import { CartItem, CartShipment } from '@/lib/models/Cart'
import { IShipment } from '@/lib/models/Shipment'
import { IDeliveryInfo, IOrder } from '@/lib/models/order'

interface CartStore {
  cartItems: CartItem[]
  cartShipment?: Partial<IDeliveryInfo>
  addItem: (item: CartItem) => void
  removeItem: (idToRemove: string) => void
  increaseQuantity: (idToIncrease: string) => void
  decreaseQuantity: (idToDecrease: string) => void
  setShipment: (shipment?: Partial<IDeliveryInfo>) => void
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
        const { product, quantity, price } = data
        const currentItems = get().cartItems
        const isExisting = currentItems.find(cartItem => cartItem.product._id === product._id)

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
      },
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter(cartItem => cartItem.product._id !== idToRemove)
        set({ cartItems: newCartItems })
      },
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map(cartItem =>
          cartItem.product._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
        set({ cartItems: newCartItems })
      },
      decreaseQuantity: (idToDecrease: String) => {
        const newCartItems = get().cartItems.map(cartItem => {
          if (cartItem.product._id === idToDecrease) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }
          return cartItem
        })
        set({ cartItems: newCartItems })
      },
      clearCart: () => set({ cartItems: [], cartShipment: undefined }),
      setShipment(shipment) {
        set({ cartShipment: shipment })
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useCart, useCartSideBar }

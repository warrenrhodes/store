import { IProduct } from './Product'

export interface CartShipment {
  method: 'DELIVERY' | 'EXPEDITION'
  cost: number
  location: string
}
export interface CartItem {
  product: IProduct
  quantity: number
  price: number
}

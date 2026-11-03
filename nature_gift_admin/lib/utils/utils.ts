import { toDate } from '@ngift/core/utils'
export const priceFormatted = (price: number) => {
  return price.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  })
}

export { toDate }

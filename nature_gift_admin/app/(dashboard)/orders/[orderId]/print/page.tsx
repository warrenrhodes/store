import { PrintButton } from '@/components/orders/PrintButton'
import { getOrderByIdCache } from '@/lib/actions/server'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'

/** Invoice + delivery slip on one A4 page: the rider keeps the slip, the customer the invoice. */
export default async function PrintOrderPage(props: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await props.params
  const order = await getOrderByIdCache(orderId)
  if (!order) notFound()

  const data = order.data
  const user = data.userData as UserData
  const info = data.deliveryInfo as unknown as DeliveryInfo
  const prices = data.orderPrices as OrderPrices
  const ref = orderId.slice(0, 8).toUpperCase()
  const date = new Date(data.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const delivery = [info?.location, info?.address, info?.city].filter(Boolean).join(' · ')

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 bg-white text-black">
      <div className="flex justify-end print:hidden">
        <PrintButton />
      </div>

      <section className="space-y-6 rounded-lg border p-8 print:rounded-none print:border-0 print:p-0">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-semibold">N.Gift</p>
            <p className="text-sm text-gray-600">
              {process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL?.replace(/^https?:\/\//, '')}
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="text-lg font-semibold">Facture #{ref}</p>
            <p>{date}</p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold">Client</p>
            <p>{user?.fullName}</p>
            <p>{user?.phone}</p>
            {user?.email && <p>{user.email}</p>}
          </div>
          <div>
            <p className="font-semibold">Livraison</p>
            <p>{delivery || '—'}</p>
            {info?.deliveryDate && (
              <p>
                {new Date(info.deliveryDate).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                {info.deliveryTime}
              </p>
            )}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 font-semibold">Produit</th>
              <th className="py-2 text-right font-semibold">Qté</th>
              <th className="py-2 text-right font-semibold">Prix</th>
              <th className="py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map(item => (
              <tr key={item.product.path} className="border-b">
                <td className="py-2">{item.product.title}</td>
                <td className="py-2 text-right tabular-nums">{item.quantity}</td>
                <td className="py-2 text-right tabular-nums">{priceFormatted(item.price)}</td>
                <td className="py-2 text-right tabular-nums">
                  {priceFormatted(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="ml-auto w-64 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt>Sous-total</dt>
            <dd className="tabular-nums">{priceFormatted(prices.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Livraison</dt>
            <dd className="tabular-nums">{priceFormatted(prices.shipping)}</dd>
          </div>
          {prices.discount > 0 && (
            <div className="flex justify-between">
              <dt>Réductions</dt>
              <dd className="tabular-nums">-{priceFormatted(prices.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t pt-1 text-base font-semibold">
            <dt>Total à payer</dt>
            <dd className="tabular-nums">{priceFormatted(prices.total)}</dd>
          </div>
          <p className="text-right text-xs text-gray-600">Paiement à la livraison</p>
        </dl>
      </section>

      {/* Cut here: the rider's copy. */}
      <section className="space-y-3 rounded-lg border border-dashed p-6 text-sm print:break-inside-avoid">
        <p className="text-base font-semibold">Bon de livraison #{ref}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">{user?.fullName}</p>
            <p className="text-lg font-semibold tabular-nums">{user?.phone}</p>
          </div>
          <div>
            <p>{delivery || '—'}</p>
            {info?.additionalNotes && <p className="italic">“{info.additionalNotes}”</p>}
          </div>
        </div>
        <ul>
          {data.items.map(item => (
            <li key={item.product.path}>
              ☐ {item.quantity} × {item.product.title}
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold">À encaisser : {priceFormatted(prices.total)}</p>
        <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-gray-600">
          <p>Signature client : ____________________</p>
          <p>Livreur : ____________________</p>
        </div>
      </section>
    </div>
  )
}

export const dynamic = 'force-dynamic'

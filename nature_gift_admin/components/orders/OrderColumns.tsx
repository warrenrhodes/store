'use client'

import { toast } from '@/hooks/use-toast'
import { updateOrderStatus } from '@/lib/actions/orders.actions'
import { IOrder } from '@/lib/actions/server'
import { OrderItem } from '@/lib/firebase/models'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { cn } from '@/lib/utils'
import { priceFormatted } from '@/lib/utils/utils'
import { Separator } from '@radix-ui/react-separator'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown, ChevronDown, Eye } from 'lucide-react'
import Link from 'next/link'
import router from 'next/router'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const statusTransitions = {
  PENDING: ['ACCEPTED', 'REJECTED'],
  ACCEPTED: ['COMPLETED', 'CANCELED'],
  COMPLETED: [],
  CANCELED: [],
  REJECTED: [],
}

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: 'Order',
    cell: ({ row }) => {
      return (
        <Link href={`/orders/${getDocumentId(row.original.path)}`} className="hover:text-red-1">
          {getDocumentId(row.original.path).slice(0, 8)}...
        </Link>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const currentStatus = row.original.data.status
      const allowedTransitions = statusTransitions[currentStatus]

      const handleStatusChange = async (newStatus: string) => {
        const res = await updateOrderStatus(getDocumentId(row.original.path), newStatus)
        if (res.success) {
          toast({
            variant: 'success',
            description: `Changing status from ${currentStatus} to ${newStatus}`,
          })
          window.location.href = '/orders'
          router.push('/orders')
        } else {
          toast({
            variant: 'destructive',
            description: res.error || 'Failed to update status',
          })
        }
      }

      return (
        <div className="flex items-center gap-2">
          <Badge
            className={cn({
              'bg-green-500': currentStatus === 'ACCEPTED',
              'bg-gray-500': currentStatus === 'PENDING',
              'bg-blue-500': currentStatus === 'COMPLETED',
              'bg-red-500': currentStatus === 'CANCELED' || currentStatus === 'REJECTED',
            })}
          >
            {currentStatus}
          </Badge>

          {allowedTransitions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {allowedTransitions.map(newStatus => (
                  <DropdownMenuItem key={newStatus} onClick={() => handleStatusChange(newStatus)}>
                    Change to {newStatus}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'deliveryInfo',
    header: 'Delivery Date',
    cell: ({ row }) => (
      <div>
        {format(
          (row.original.data.deliveryInfo as unknown as DeliveryInfo).deliveryDate,
          'dd MMMM yyyy',
        )}{' '}
        {(row.original.data.deliveryInfo as unknown as DeliveryInfo).deliveryTime}
      </div>
    ),
  },
  {
    accessorKey: 'orderPrices',
    header: 'Total (FCFA)',
    cell: ({ row }) => (
      <div>{priceFormatted((row.original.data.orderPrices as OrderPrices).total)}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Create At'}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>
        {row.original.data.createdAt ? format(row.original.data.createdAt, 'dd MMMM yyyy') : '/'}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <OrderView order={order} />
        </div>
      )
    },
  },
]

const OrderView = ({ order }: { order: IOrder }) => {
  const userData = order.data.userData as UserData
  const deliveryInfo = order.data.deliveryInfo
  const promotions = order.data.promotions
  const orderPrices = order.data.orderPrices
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Eye className="h-4 w-4" color="blue" /> View
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" text-grey-1 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Order Detail</AlertDialogTitle>
          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-scroll">
            <div className="flex gap-3">
              <span className="text-muted-foreground">Full Name: </span>
              <p> {userData.fullName}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">Phone: </span>
              <p> {userData.phone}</p>
            </div>
            {userData.email && (
              <div className="flex gap-3">
                <span className="text-muted-foreground">Email: </span>
                <p> {userData.email}</p>
              </div>
            )}
            <Separator className="my-3" />
            <div className="flex gap-3">
              <span className="text-muted-foreground">Address: </span>
              <p> {deliveryInfo.address}</p>
            </div>
            {deliveryInfo?.deliveryDate && (
              <div className="flex gap-3">
                <span className="text-muted-foreground">Delivery Date: </span>
                <p>
                  {format(deliveryInfo.deliveryDate, 'PPP')} {deliveryInfo.deliveryTime}
                </p>
              </div>
            )}
            {deliveryInfo.city && (
              <div className="flex gap-3">
                <span className="text-muted-foreground">City: </span>
                <p> {deliveryInfo.city}</p>
              </div>
            )}
            <div className="flex gap-3">
              <span className="text-muted-foreground">Delivery Method: </span>
              <p>{deliveryInfo.deliveryMethod === 'DELIVERY' ? 'Delivery' : 'Expedition'}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">Delivery Location: </span>
              <p> {deliveryInfo.location}</p>
            </div>
            <Separator className="my-3" />

            {/* The list of items */}
            <div className="flex gap-3">
              <span className="text-muted-foreground">Items: </span>
            </div>
            <div className="flex flex-col gap-3 ml-5">
              {order.data.items.map(item => (
                <OrderItemView item={item} key={item.product.path} />
              ))}
            </div>
            <Separator className="my-3" />
            {promotions && (
              <div className="flex gap-3">
                <span className="text-muted-foreground">Promotions: </span>
              </div>
            )}
            {promotions && (
              <div className="flex flex-col gap-3 ml-5">
                {promotions.map(item => (
                  <div key={item.promotionPath}>
                    <div className="flex gap-3">
                      <span className="text-muted-foreground">Promo Code: </span>
                      <p> {item.code}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-muted-foreground">Discount: </span>
                      <p> {item.discountAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Separator className="my-3" />
            <div className="flex gap-3">
              <span className="text-muted-foreground">SubTotal: </span>
              <p> {orderPrices.subtotal}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">Shipping: </span>
              <p> {orderPrices.shipping}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">Total: </span>
              <p> {orderPrices.total}</p>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const OrderItemView = ({ item }: { item: OrderItem }) => {
  return (
    <div key={item.product.path}>
      <div className="flex gap-3">
        <span className="text-muted-foreground">path: </span>
        <p> {item.product.path}</p>
      </div>
      <div className="flex gap-3">
        <span className="text-muted-foreground">title: </span>
        <p> {item.product.title}</p>
      </div>
      <div className="flex gap-3">
        <span className="text-muted-foreground">Count: </span>
        <p> {item.quantity}</p>
      </div>
      <div className="flex gap-3">
        <span className="text-muted-foreground">Price: </span>
        <p> {item.price}</p>
      </div>
    </div>
  )
}

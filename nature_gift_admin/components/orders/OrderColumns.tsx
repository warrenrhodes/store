'use client'

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { priceFormatted } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { IOrder } from '@/lib/actions/server'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Separator } from '@radix-ui/react-separator'
import { ChevronDown, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import router from 'next/router'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { getDocumentId } from '@spreeloop/database'
import { OrderItem } from '@/lib/firebase/models'

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
        const res = await fetch(`/api/orders/${getDocumentId(row.original.path)}`, {
          method: 'PUT',
          body: JSON.stringify({ status: newStatus }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          toast({
            variant: 'success',
            description: `Changing status from ${currentStatus} to ${newStatus}`,
          })
          window.location.href = '/orders'
          router.push('/orders')
        } else {
          toast({
            variant: 'destructive',
            description: 'Failed to update status',
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
        {format((row.original.data.deliveryInfo as unknown as DeliveryInfo).deliveryDate, 'PPP')}{' '}
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
    header: 'Created At',
    cell: ({ row }) => <div>{format(row.original.data.createdAt || new Date(), 'PPP')}</div>,
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
            <div className="flex gap-3">
              <span className="text-muted-foreground">Delivery Date: </span>
              <p>
                {format(deliveryInfo.deliveryDate, 'PPP')} {deliveryInfo.deliveryTime}
              </p>
            </div>
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
                <OrderItemView item={item} key={item.productPath} />
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex gap-3">
              <span className="text-muted-foreground">Promotions: </span>
            </div>
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
    <div key={item.productPath}>
      <div className="flex gap-3">
        <span className="text-muted-foreground">path: </span>
        <p> {item.productPath}</p>
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

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { priceFormatted } from '@/lib/utils/utils'
import { Link, Badge } from 'lucide-react'
import { format } from 'date-fns'
import { IOrder } from '@/lib/actions/server'

// type Items = IOrder['items'][0]
export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: 'Order',
    cell: ({ row }) => {
      return (
        <Link href={`/orders/${row.original.id}`} className="hover:text-red-1">
          {row.original.id}
        </Link>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-green-500 ': row.original.status === 'ACCEPTED',
            'bg-gray-500': row.original.status === 'PENDING',
            'bg-blue-500': row.original.status === 'COMPLETED',
            'bg-red-500': row.original.status === 'CANCELED' || row.original.status === 'REJECTED',
          })}
        >
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'deliveryInfo',
    header: 'Delivery Date',
    cell: ({ row }) => (
      <div>
        {format(row.original.deliveryInfo.deliveryDate, 'PPP')}{' '}
        {row.original.deliveryInfo.deliveryTime}
      </div>
    ),
  },
  {
    accessorKey: 'orderPrices',
    header: 'Total (FCFA)',
    cell: ({ row }) => <div>{priceFormatted(row.original.orderPrices.total)}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div>{format(row.original.createdAt || new Date(), 'PPP')}</div>,
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const order = row.original
  //     return (
  //       <div>
  //         <OrderView order={order} />
  //       </div>
  //     )
  //   },
  // },
]

// const OrderView = ({ order }: { order: IOrder }) => {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">
//           <Eye className="h-4 w-4" color="blue" /> View
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className=" text-grey-1 ">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-red-1">Order Detail</AlertDialogTitle>
//           <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-scroll">
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Full Name: </span>
//               <p> {order.userData.fullName}</p>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Phone: </span>
//               <p> {order.userData.phone}</p>
//             </div>
//             {order.userData.email && (
//               <div className="flex gap-3">
//                 <span className="text-muted-foreground">Email: </span>
//                 <p> {order.userData.email}</p>
//               </div>
//             )}
//             <Separator className="my-3" />
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Address: </span>
//               <p> {order.deliveryInfo.address}</p>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Delivery Date: </span>
//               <p>
//                 {format(order.deliveryInfo.deliveryDate, 'PPP')} {order.deliveryInfo.deliveryTime}
//               </p>
//             </div>
//             {order.deliveryInfo.city && (
//               <div className="flex gap-3">
//                 <span className="text-muted-foreground">City: </span>
//                 <p> {order.deliveryInfo.city}</p>
//               </div>
//             )}
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Delivery Method: </span>
//               <p>{order.deliveryInfo.deliveryMethod === 'DELIVERY' ? 'Delivery' : 'Expedition'}</p>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Delivery Location: </span>
//               <p> {order.deliveryInfo.location}</p>
//             </div>
//             <Separator className="my-3" />

//             {/* The list of items */}
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Items: </span>
//             </div>
//             <div className="flex flex-col gap-3 ml-5">
//               {order.items.map(item => (
//                 <OrderItem item={item} />
//               ))}
//             </div>
//             <Separator className="my-3" />
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Promotions: </span>
//             </div>
//             <div className="flex flex-col gap-3 ml-5">
//               {order.promotions.map(item => (
//                 <div key={item.promotionId}>
//                   <div className="flex gap-3">
//                     <span className="text-muted-foreground">Promo Code: </span>
//                     <p> {item.code}</p>
//                   </div>
//                   <div className="flex gap-3">
//                     <span className="text-muted-foreground">Discount: </span>
//                     <p> {item.discountAmount}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Separator className="my-3" />
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">SubTotal: </span>
//               <p> {order.orderPrices.subtotal}</p>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Shipping: </span>
//               <p> {order.orderPrices.shipping}</p>
//             </div>
//             <div className="flex gap-3">
//               <span className="text-muted-foreground">Total: </span>
//               <p> {order.orderPrices.total}</p>
//             </div>
//           </div>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Close</AlertDialogCancel>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

// const OrderItem = ({ item }: { item: Items }) => {
//   const product = item.product
//   return (
//     <div key={item.productId}>
//       {product && (
//         <div className="flex gap-3">
//           <span className="text-muted-foreground">Name: </span>
//           <p> {product.title}</p>
//         </div>
//       )}
//       <div className="flex gap-3">
//         <span className="text-muted-foreground">Count: </span>
//         <p> {item.quantity}</p>
//       </div>
//       <div className="flex gap-3">
//         <span className="text-muted-foreground">Price: </span>
//         <p> {item.price}</p>
//       </div>
//     </div>
//   )
// }

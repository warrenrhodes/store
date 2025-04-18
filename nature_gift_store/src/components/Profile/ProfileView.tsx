'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { Package } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { cn, priceFormatted } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { OrderPrices } from '@/lib/type'
import { useAuthStore } from '@/hooks/store/auth-store'
import { Order, OrderItem, OrderStatus } from '@/lib/firebase/models'
import { getDocumentId } from '@spreeloop/database'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const userTabs = [
  {
    label: 'Orders',
    value: 'orders',
  },
  {
    label: 'Personal Info',
    value: 'info',
  },
  {
    label: 'Settings',
    value: 'settings',
  },
]

function TabsWrapper({ orders }: { orders: Order[] }) {
  const { user } = useAuthStore()
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs')
  const { localization } = useLocalization()

  return (
    <Tabs defaultValue={tabs || 'orders'} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        {userTabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="orders">
        <ScrollArea className="h-[600px] pr-4">
          {!orders || orders.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="mt-4 text-lg font-medium">{localization.noOrders}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{localization.noOrdersMessage}</p>
                <Button asChild className="mt-8">
                  <Link href="/shop">{localization.startShopping}</Link>
                </Button>
              </div>
            </div>
          ) : (
            orders?.map(order => {
              const orderPrices = order.orderPrices as OrderPrices
              let status = ''
              if (order.status === OrderStatus.PENDING) {
                status = localization.PENDING
              } else if (order.status === OrderStatus.ACCEPTED) {
                status = localization.ACCEPTED
              } else if (order.status === OrderStatus.REJECTED) {
                status = localization.REJECTED
              } else if (order.status === OrderStatus.COMPLETED) {
                status = localization.COMPLETED
              } else if (order.status === OrderStatus.CANCELED) {
                status = localization.CANCELED
              }

              return (
                <motion.div key={order.path} variants={itemVariants} className="mb-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {localization.order} #{getDocumentId(order.path).substring(0, 5) + '...'}
                        </CardTitle>
                        <Badge
                          className={cn({
                            'bg-green-500': order.status === 'ACCEPTED',
                            'bg-gray-500': order.status === 'PENDING',
                            'bg-blue-500': order.status === 'COMPLETED',
                            'bg-red-500':
                              order.status === 'CANCELED' || order.status === 'REJECTED',
                          })}
                        >
                          {status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(order.createdAt, 'PPP')}
                      </p>
                    </CardHeader>
                    <CardContent>
                      {order.items.map((item: OrderItem) => (
                        <div key={item.createdAt} className="flex items-center gap-4 mb-4">
                          <div className="relative aspect-square w-24 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.medias[0].url}
                              fill
                              alt={item.product.title}
                              className="object-cover w-full h-full"
                              onError={() => console.log('Image not found')}
                              placeholder="blur"
                              blurDataURL={item.product.medias[0].blurDataUrl || FAKE_BLUR}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          <div>
                            <h4 className="font-medium">{item.product.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {localization.quantity}: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">{priceFormatted(item.price)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{localization.subtotal}</span>
                          <span>{priceFormatted(orderPrices.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{localization.shipping}</span>
                          <span>{priceFormatted(orderPrices.shipping)}</span>
                        </div>
                        {orderPrices.discount > 0 && (
                          <div className="flex justify-between text-sm mb-2">
                            <span>{localization.discount}</span>
                            <span>-{priceFormatted(orderPrices.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium mt-4">
                          <span>{localization.total}</span>
                          <span>{priceFormatted(orderPrices.total)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          )}
        </ScrollArea>
      </TabsContent>

      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>{localization.personalInformation}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {localization.fullName}
              </label>
              <p className="mt-1">{user?.fullName ?? '/'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {localization.email}
              </label>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {localization.phone}
              </label>
              <p className="mt-1">{user?.phone ?? '/'}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>{localization.settings}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{localization.noSettingsAvailable}...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default function ProfileView(props: { orders: Order[] }) {
  const { user } = useAuthStore()
  const { localization } = useLocalization()
  if (!user || user?.isAnonymous) {
    return (
      <div className="flex items-center justify-center min-h-[350px] flex-col gap-2">
        <div className="text-center flex items-center gap-2 flex-col">
          <h3 className="mt-4 text-lg font-medium">{localization.notSignedIn}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{localization.notSignedInMessage}</p>
        </div>
        <Button asChild>
          <Link href="/sign-in">{localization.signIn}</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.photoURL || undefined}
                    alt={user?.fullName || undefined}
                  />
                  <AvatarFallback>{(user?.fullName || 'A').charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{user?.fullName}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <span>
                    {props.orders?.length || 0} {localization.orders}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Suspense fallback={<div>Loading...</div>}>
            <TabsWrapper orders={props.orders} />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}

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
import { SignInButton } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { priceFormatted } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'

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

function TabsWrapper() {
  const { user } = useCurrentUser()
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs')
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
          {!user?.order || user.order.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="mt-4 text-lg font-medium">You have no orders</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You need to place an order to see your orders.
                </p>
                <Button asChild className="mt-8">
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            user?.order?.map(order => (
              <motion.div key={order.id} variants={itemVariants} className="mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge variant={order.status === 'PENDING' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(order.createdAt, 'PPP')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 mb-4">
                        <div className="relative aspect-square w-24 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.media[0].media.url}
                            fill
                            alt={item.product.title}
                            className="object-cover w-full h-full"
                            onError={() => console.log('Image not found')}
                            placeholder="blur"
                            blurDataURL={item.product.media[0].media.blurDataUrl || FAKE_BLUR}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {item.product.isFeature && (
                            <Badge className="absolute top-1 left-1">Feature</Badge>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium">{item.product.title}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal</span>
                        <span>{priceFormatted(order.orderPrices.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Shipping</span>
                        <span>{priceFormatted(order.orderPrices.shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Discount</span>
                        <span>-{priceFormatted(order.orderPrices.discount)}</span>
                      </div>
                      <div className="flex justify-between font-medium mt-4">
                        <span>Total</span>
                        <span>{priceFormatted(order.orderPrices.total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </ScrollArea>
      </TabsContent>

      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="mt-1">{user?.fullName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="mt-1">{user?.phone}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Settings content coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default function ProfilePage() {
  const { user } = useCurrentUser()

  if (user?.isAnonymous) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h3 className="mt-4 text-lg font-medium">You are not signed in</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You need to be signed in to view your profile.
          </p>
        </div>
        <SignInButton />
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
                  <AvatarImage src={user?.avatar || undefined} alt={user?.fullName || undefined} />
                  <AvatarFallback>{(user?.fullName || 'A').charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{user?.fullName}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <span>{user?.order?.length || 0} Orders</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Suspense fallback={<div>Loading...</div>}>
            <TabsWrapper />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}

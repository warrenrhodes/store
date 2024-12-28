import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

/// Request to create new order.
export const POST = async (req: NextRequest) => {
  const { order, cartItems, user } = await req.json()

  try {
    const newOrder = await prisma.order.create({
      data: {
        deliveryInfo: order.deliveryInfo,
        userData: order.userData,
        status: 'PENDING',
        orderPrices: order.orderPrices,
        items: {
          create: cartItems.map((item: any) => ({
            product: {
              connect: { id: item.product.id },
            },
            quantity: item.quantity,
            price: item.price,
          })),
        },
        promotions: order.promotions,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    if (!newOrder) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Send notifications
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',') || []
    const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER?.split(',') || []

    if (adminEmails.length > 0) {
      const notificationData = {
        user_name: order.userData.fullName,
        user_number: order.userData.phone,
        selected_products: cartItems.map((item: any) => item.product.title).join(', '),
        delivery_address: order.deliveryInfo.address,
        delivery_location: order.deliveryInfo.location,
        delivery_date: `${format(order.deliveryInfo.deliveryDate, 'PPP')} ${order.deliveryInfo.deliveryTime}`,
      }

      try {
        await Promise.all(
          adminEmails.map(email =>
            sendEmailNotifications({
              email,
              notificationId: 'new_product',
              data: notificationData,
            }),
          ),
        )
      } catch (error) {
        console.error('Failed to send email notifications:', error)
      }
    }

    // SMS notifications commented out for now
    if (adminPhones.length > 0) {
      try {
        await Promise.all(
          adminPhones.map(phone =>
            sendSmsNotifications({
              phoneNumber: phone,
              notificationId: 'new_product',
              data: {
                comment: `Go to ${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/orders`,
              },
            }),
          ),
        )
      } catch (error) {
        console.error('Failed to send SMS notifications:', error)
      }
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

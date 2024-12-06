import Order from '@/lib/models/order'
import { connectToDB } from '@/lib/mongoDB'
import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

/// Request to create new order.
export const POST = async (req: NextRequest) => {
  const order = await req.json()

  try {
    await connectToDB()
    const newOrder = await Order.create({ ...order })
    await newOrder.save()

    if (!newOrder) {
      return NextResponse.json('Failed to create order', { status: 500 })
    }
  } catch (err) {
    console.log('[ORDERS_POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  } finally {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',')
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER?.split(',')
    if (!adminEmail) return new NextResponse('Order created', { status: 200 })

    await Promise.all(
      adminEmail.map(async email => {
        return await sendEmailNotifications({
          email: email,
          notificationId: 'new_product',
          data: {
            user_name: order.userData.fullName,
            user_number: order.userData.phone,
            selected_products: order.items
              .map((item: { product: { title: any } }) => item.product.title)
              .join(', '),
            delivery_address: order.deliveryInfo.address,
            delivery_location: order.deliveryInfo.location,
            delivery_date: `${format(order.deliveryInfo.deliveryDate, 'PPP')} ${order.deliveryInfo.deliveryTime}`,
          },
        })
      }),
    )
    if (!adminPhone) return new NextResponse('Order created', { status: 200 })

    await Promise.all(
      adminPhone.map(async phone => {
        return await sendSmsNotifications({
          phoneNumber: phone,
          notificationId: 'new_product',
          data: {
            comment: `Go to ${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/orders`,
          },
        })
      }),
    )
    return new NextResponse('Order created', { status: 200 })
  }
}

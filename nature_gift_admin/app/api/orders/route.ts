import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import Promotion from "@/lib/models/Promotions";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    // Build query
    const query: any = {};
    if (status) query.status = status;

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate({
        path: "items.productId",
        model: Product,
      })
      .populate({
        path: "items.promotion.id",
        model: Promotion,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.log("[ORDERS_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export const GET = async (req: NextRequest) => {
//   try {
//     await connectToDB();

//     const orders = await Order.find().sort({ createdAt: "desc" });

//     const orderDetails = await Promise.all(
//       orders.map(async (order) => {
//         const customer = await Customer.findOne({
//           clerkId: order.customerClerkId,
//         });
//         return {
//           _id: order._id,
//           customer: customer.name,
//           products: order.products.length,
//           totalAmount: order.totalAmount,
//           createdAt: format(order.createdAt, "MMM do, yyyy"),
//         };
//       })
//     );

//     return NextResponse.json(orderDetails, { status: 200 });
//   } catch (err) {
//     console.log("[orders_GET]", err);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, ...orderData } = body;

    if (
      !items ||
      !orderData.deliveryInfo.address ||
      !orderData.deliveryInfo.deliveryDate ||
      !orderData.deliveryInfo.deliveryTime ||
      !orderData.deliveryInfo.city ||
      !orderData.userData.fullName ||
      !orderData.userData.phone ||
      !orderData.orderPrices.totalAmount
    ) {
      return new NextResponse(
        "Missing required fields.[address, deliveryDate, deliveryTime, city, fullName, phone, totalAmount]",
        { status: 400 }
      );
    }

    const order = await Order.create({
      ...orderData,
      items,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

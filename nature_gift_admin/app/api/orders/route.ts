import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { auth } from "@clerk/nextjs";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDB();

    const orders = await Order.find()
      .populate({
        path: "items.product",
        model: Product,
      })
      .sort({ createdAt: -1 });

    if (!orders) {
      return NextResponse.json({ message: "No orders found" }, { status: 500 });
    }

    const filterOrders = orders.filter((order) => {
      return order.items.some((item: any) => item.product.parternId === userId);
    });

    return NextResponse.json(filterOrders, { status: 201 });
  } catch (err) {
    console.log("[ORDERS_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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

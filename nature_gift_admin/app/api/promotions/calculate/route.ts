import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongoDB";
import { Promotion } from "@/lib/models/Promotions";
import { PromotionCalculator } from "@/lib/utils/promotion-calculator";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart, shipping, customer } = await req.json();

    const promotions = await Promotion.find({
      status: "ACTIVE",
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    })
      .sort({ priority: -1 })
      .lean();

    const calculator = new PromotionCalculator(
      cart,
      shipping,
      customer,
      promotions
    );

    const result = calculator.calculate();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to calculate promotions:", error);
    return NextResponse.json(
      { error: "Failed to calculate promotions" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";

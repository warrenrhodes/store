import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongoDB";
import { Promotion } from "@/lib/models/Promotions";
import { promotionSchema } from "@/lib/validations/promotions";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = status ? { status } : {};

    const promotions = await Promotion.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = promotionSchema.parse({
      ...json,
      metadata: {
        ...json.metadata,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    const promotion = await Promotion.create(body);
    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Failed to create promotion:", error);
    return NextResponse.json(
      { error: "Failed to create promotion" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

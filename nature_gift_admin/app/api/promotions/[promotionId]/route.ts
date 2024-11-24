import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Promotion } from "@/lib/models/Promotions";
import { connectToDB } from "@/lib/mongoDB";
import { promotionSchema } from "@/lib/validations/promotions";

export async function GET(
  req: Request,
  { params }: { params: { promotionId: string } }
) {
  try {
    await connectToDB();
    const promotion = await Promotion.findById(params.promotionId).lean();
    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Failed to fetch promotion:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotion" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { promotionId: string } }
) {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = promotionSchema.partial().parse({
      ...json,
      metadata: {
        ...json.metadata,
        updatedBy: userId,
      },
    });

    const promotion = await Promotion.findByIdAndUpdate(
      params.promotionId,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Failed to update promotion:", error);
    return NextResponse.json(
      { error: "Failed to update promotion" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { promotionId: string } }
) {
  try {
    await connectToDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const promotion = await Promotion.findByIdAndDelete(params.promotionId);

    if (!promotion) {
      return NextResponse.json(
        { error: "Promotion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Failed to delete promotion:", error);
    return NextResponse.json(
      { error: "Failed to delete promotion" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

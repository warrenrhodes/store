import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Shipment from "@/lib/models/Shipment";
import { shipmentSchema } from "@/lib/validations/shipment";

export const GET = async (
  req: NextRequest,
  { params }: { params: { shipmentId: string } }
) => {
  try {
    await connectToDB();

    const shipment = await Shipment.findById(params.shipmentId);

    if (!shipment) {
      return new NextResponse(
        JSON.stringify({ message: "Shipment not found" }),
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(shipment, { status: 200 });
  } catch (err) {
    console.log("[shipmentId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let shipment = await Shipment.findById(params.reviewId);

    if (!shipment) {
      return new NextResponse("Shipment not found", { status: 404 });
    }

    const json = await req.json();
    const body = shipmentSchema.parse(json);

    shipment = await Shipment.findByIdAndUpdate(params.reviewId, body, {
      new: true,
    });

    return NextResponse.json(shipment, { status: 200 });
  } catch (err) {
    console.log("[shipmentId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { shipmentId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Shipment.findByIdAndDelete(params.shipmentId);

    return new NextResponse("Shipment is deleted", { status: 200 });
  } catch (err) {
    console.log("[shipmentId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

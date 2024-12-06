import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { shipmentSchema } from "@/lib/validations/shipment";
import Shipment from "@/lib/models/Shipment";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();
    const json = await req.json();
    const body = shipmentSchema.parse(json);

    const shipment = await Shipment.create(body);

    return NextResponse.json(shipment, { status: 200 });
  } catch (err) {
    console.log("[shipment_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const shipments = await Shipment.find().sort({ createdAt: "desc" });

    return NextResponse.json(shipments, { status: 200 });
  } catch (err) {
    console.log("[shipment_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

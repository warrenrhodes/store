export const GET = async (
  req: NextRequest,
  { params }: { params: { promotionId: string } }
) => {
  try {
    await connectToDB();

    const promotion = await Promotion.findById(params.promotionId).populate({
      path: "product",
      model: Product,
    });

    if (!promotion) {
      return new NextResponse(
        JSON.stringify({ message: "Promotion not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(promotion), {
      status: 200,
    });
  } catch (err) {
    console.log("[promotionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

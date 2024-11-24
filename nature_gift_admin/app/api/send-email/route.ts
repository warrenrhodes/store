import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend for email
const resend = new Resend(process.env.NEXT_PUBLIC_RESENT_API_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const {
      email,
      fullName,
      orderId,
      status,
      totalAmount,
      mode,
      deliveryDate,
    } = await req.json();

    if (mode === "confirm") {
      const result = await sendOrderConfirmationEmail({
        email,
        fullName,
        orderId,
        status,
        totalAmount,
        deliveryDate,
      });
      if (result) {
        return new NextResponse(result, { status: 200 });
      }
      return new NextResponse("Email sending failed", { status: 500 });
    }
    return new NextResponse("Email sending failed", { status: 500 });
  } catch (err) {
    console.log("[categories_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
// Email notification using Resend (generous free tier)
export async function sendOrderConfirmationEmail(
  order: any
): Promise<string | null> {
  try {
    const { email, fullName, orderId, status, totalAmount, deliveryDate } =
      order;
    console.log("Email sent successfully:", order);
    const result = await resend.emails.send({
      from: "webanalyse237@nature-gift.com",
      to: "warrenkenfa@gmail.com",
      subject: `Order Confirmation #${order._id}`,
      html: `
        <h1>Thank you for your order, ${fullName}!</h1>
        <p>Your order #${orderId} has been received and is being processed.</p>
        <h2>Order Details:</h2>
        <p>Delivery Date: ${new Date(deliveryDate).toLocaleDateString()}</p>
        <p>Total Amount: $${totalAmount}</p>
        <p>Status: ${status}</p>
      `,
    });

    console.log("Email sent successfully:", result);
    if (!result.data?.id) return null;
    return result.data.id;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}

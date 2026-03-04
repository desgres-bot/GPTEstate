import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: Verify YooKassa webhook signature
    // TODO: Process payment event
    // event types: payment.succeeded, payment.canceled, refund.succeeded

    const event = body.event;
    const paymentId = body.object?.id;

    console.log(`YooKassa webhook: ${event}, payment: ${paymentId}`);

    if (event === "payment.succeeded") {
      // TODO: Update payment status in Supabase
      // TODO: Add credits to user
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

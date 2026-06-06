import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const stk = body?.Body?.stkCallback;
  if (!stk) return Response.json({ ok: true });

  const checkoutRequestId: string = stk.CheckoutRequestID;
  const resultCode: number        = stk.ResultCode;

  if (resultCode === 0) {
    // Payment succeeded — extract receipt number
    const items: { Name: string; Value: string | number }[] = stk.CallbackMetadata?.Item ?? [];
    const receipt = items.find(i => i.Name === "MpesaReceiptNumber")?.Value as string | undefined;

    await supabase
      .from("orders")
      .update({ status: "paid", mpesa_ref: receipt ?? null })
      .eq("mpesa_checkout_request_id", checkoutRequestId);
  } else {
    // Payment failed or cancelled
    await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("mpesa_checkout_request_id", checkoutRequestId);
  }

  return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
}

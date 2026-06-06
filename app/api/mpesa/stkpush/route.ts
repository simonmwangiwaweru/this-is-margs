import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { initiateSTKPush } from "@/lib/mpesa";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { customerName, customerPhone, customerEmail, deliveryAddress, notes, items, total } = body;

  // 1 — Save order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      customer_name:    customerName,
      customer_phone:   customerPhone,
      customer_email:   customerEmail || null,
      delivery_address: deliveryAddress,
      notes:            notes || null,
      status:           "pending",
      total,
    })
    .select("id")
    .single();

  if (orderErr || !order) {
    return Response.json({ error: "Failed to save order." }, { status: 500 });
  }

  // 2 — Save order items
  const { error: itemsErr } = await supabase.from("order_items").insert(
    items.map((i: { productId: number; productName: string; price: number; quantity: number }) => ({
      order_id:     order.id,
      product_id:   i.productId,
      product_name: i.productName,
      price:        i.price,
      quantity:     i.quantity,
    }))
  );

  if (itemsErr) {
    return Response.json({ error: "Failed to save order items." }, { status: 500 });
  }

  // 3 — Initiate STK Push
  const stk = await initiateSTKPush({
    phone:   customerPhone,
    amount:  total,
    orderId: order.id,
  });

  if ("error" in stk) {
    // Order is saved but payment failed — return orderId so client can retry or fallback
    return Response.json({ orderId: order.id, stkError: stk.error }, { status: 202 });
  }

  // 4 — Store checkout request ID on order
  await supabase
    .from("orders")
    .update({ mpesa_checkout_request_id: stk.CheckoutRequestID })
    .eq("id", order.id);

  return Response.json({ orderId: order.id, checkoutRequestId: stk.CheckoutRequestID });
}

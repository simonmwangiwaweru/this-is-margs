"use server";
import { supabase } from "@/lib/supabase";

export interface OrderPayload {
  customerName:    string;
  customerPhone:   string;
  customerEmail:   string;
  deliveryAddress: string;
  notes:           string;
  items: {
    productId:   number;
    productName: string;
    price:       number;
    quantity:    number;
  }[];
  total: number;
}

export async function submitOrder(
  payload: OrderPayload
): Promise<{ orderId: string } | { error: string }> {
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      customer_name:    payload.customerName,
      customer_phone:   payload.customerPhone,
      customer_email:   payload.customerEmail || null,
      delivery_address: payload.deliveryAddress,
      notes:            payload.notes || null,
      status:           "pending",
      total:            payload.total,
    })
    .select("id")
    .single();

  if (orderErr || !order) {
    console.error("Order insert failed:", orderErr);
    return { error: "Failed to place order. Please try again." };
  }

  const { error: itemsErr } = await supabase.from("order_items").insert(
    payload.items.map(i => ({
      order_id:     order.id,
      product_id:   i.productId,
      product_name: i.productName,
      price:        i.price,
      quantity:     i.quantity,
    }))
  );

  if (itemsErr) {
    console.error("Order items insert failed:", itemsErr);
    return { error: "Failed to save order items. Please try again." };
  }

  return { orderId: order.id };
}

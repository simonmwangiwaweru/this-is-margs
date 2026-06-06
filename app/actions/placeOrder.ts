"use server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyOwnerEmail, notifyOwnerWhatsApp } from "@/lib/notify";

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export async function placeOrder(data: {
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
}): Promise<{ success: true; orderId: string } | { error: string }> {
  const { customerName, customerPhone, items, total } = data;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_name:    customerName,
      customer_phone:   customerPhone,
      delivery_address: "To be confirmed via phone",
      total,
      status:           "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) return { error: "Could not save your order. Please try again." };

  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(
      items.map(i => ({
        order_id:     order.id,
        product_id:   i.productId,
        product_name: i.name,
        price:        i.price,
        quantity:     i.quantity,
      }))
    );

  if (itemsError) return { error: "Could not save order items. Please try again." };

  const orderInfo = { orderId: order.id, customerName, customerPhone, items, total };

  await Promise.allSettled([
    notifyOwnerEmail(orderInfo),
    notifyOwnerWhatsApp(orderInfo),
  ]);

  return { success: true, orderId: order.id };
}

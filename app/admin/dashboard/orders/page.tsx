import { supabaseAdmin } from "@/lib/supabase-admin";
import OrdersClient from "./OrdersClient";

export const metadata = { title: "Orders | MARGS Admin" };

export default async function OrdersPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*, order_items(product_name, quantity, price)")
    .order("created_at", { ascending: false });

  return (
    <div style={{ padding:"2rem" }}>
      <div style={{ marginBottom:"2rem" }}>
        <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>ORDERS</h1>
        <p style={{ fontSize:".85rem", color:"var(--text-soft)", marginTop:".25rem" }}>{(orders ?? []).length} orders total</p>
      </div>
      <OrdersClient orders={orders ?? []} />
    </div>
  );
}

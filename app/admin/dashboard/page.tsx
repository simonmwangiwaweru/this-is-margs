import type { Metadata } from "next";
import { verifyAdminSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase-admin";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = { title: "Dashboard | MARGS Admin" };

export default async function DashboardPage() {
  await verifyAdminSession();

  const [{ data: orders }, { data: subscribers }] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select("*, order_items(product_name, quantity, price)")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const safeOrders      = orders      ?? [];
  const safeSubscribers = subscribers ?? [];

  const stats = {
    total:       safeOrders.length,
    revenue:     safeOrders.filter(o => o.status === "paid" || o.status === "dispatched" || o.status === "delivered").reduce((s, o) => s + o.total, 0),
    pending:     safeOrders.filter(o => o.status === "pending").length,
    subscribers: safeSubscribers.length,
  };

  return (
    <DashboardClient
      orders={safeOrders}
      subscribers={safeSubscribers}
      stats={stats}
    />
  );
}

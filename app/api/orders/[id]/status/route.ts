import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/orders/[id]/status">
) {
  const { id } = await ctx.params;

  const { data, error } = await supabase
    .from("orders")
    .select("status")
    .eq("id", id)
    .single();

  if (error || !data) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json({ status: data.status });
}

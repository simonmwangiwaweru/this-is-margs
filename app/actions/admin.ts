"use server";
import { redirect } from "next/navigation";
import { createAdminSession, deleteAdminSession, verifyAdminSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { OrderStatus } from "@/lib/database.types";

export async function adminLogin(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin/dashboard");
}

export async function adminLogout(): Promise<void> {
  await deleteAdminSession();
  redirect("/admin/login");
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ error: string } | void> {
  await verifyAdminSession();

  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) return { error: "Failed to update status." };
}

"use server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdminSession } from "@/lib/session";

export async function updateContent(key: string, value: string) {
  await verifyAdminSession();
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) return { error: error.message };
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/");
}

export async function updateManyContent(entries: Record<string, string>) {
  await verifyAdminSession();
  const rows = Object.entries(entries).map(([key, value]) => ({
    key, value, updated_at: new Date().toISOString(),
  }));
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert(rows, { onConflict: "key" });
  if (error) return { error: error.message };
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/");
}

"use server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdminSession } from "@/lib/session";

export interface ProductPayload {
  name:           string;
  description:    string;
  price:          number;
  original_price: number | null;
  category:       string;
  image_url:      string;
  badge:          string;
  rating:         number;
  reviews:        number;
  benefits:       string[];
  active:         boolean;
  featured:       boolean;
}

export async function createProduct(payload: ProductPayload) {
  await verifyAdminSession();
  const { error } = await supabaseAdmin.from("products").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/admin/dashboard/products");
}

export async function updateProduct(id: number, payload: Partial<ProductPayload>) {
  await verifyAdminSession();
  const { error } = await supabaseAdmin.from("products").update(payload).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/shop/${id}`);
  revalidatePath("/admin/dashboard/products");
}

export async function deleteProduct(id: number): Promise<void> {
  await verifyAdminSession();
  await supabaseAdmin.from("products").delete().eq("id", id);
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/admin/dashboard/products");
}

export async function toggleProductActive(id: number, active: boolean): Promise<void> {
  await verifyAdminSession();
  await supabaseAdmin.from("products").update({ active }).eq("id", id);
  revalidatePath("/shop");
  revalidatePath("/admin/dashboard/products");
}

export async function toggleProductFeatured(id: number, featured: boolean): Promise<void> {
  await verifyAdminSession();
  await supabaseAdmin.from("products").update({ featured }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/dashboard/products");
}

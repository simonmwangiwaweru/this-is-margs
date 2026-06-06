import { supabaseAdmin } from "./supabase-admin";

export interface DBProduct {
  id:             number;
  name:           string;
  description:    string;
  price:          number;
  original_price: number | null;
  category:       string;
  image_url:      string;
  badge:          string | null;
  rating:         number;
  reviews:        number;
  benefits:       string[];
  active:         boolean;
  featured:       boolean;
}

export async function getAllProducts(): Promise<DBProduct[]> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("active", true)
    .order("id", { ascending: true });
  return data ?? [];
}

export async function getFeaturedProducts(): Promise<DBProduct[]> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("id", { ascending: true })
    .limit(6);
  return data ?? [];
}

export async function getProductById(id: number): Promise<DBProduct | null> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single();
  return data ?? null;
}

export async function getProductsByCategory(category: string): Promise<DBProduct[]> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("category", category)
    .order("id", { ascending: true });
  return data ?? [];
}

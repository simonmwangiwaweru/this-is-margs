import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ProductForm from "../../ProductForm";

export const metadata = { title: "Edit Product | MARGS Admin" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!product) notFound();

  return (
    <div style={{ padding:"2rem" }}>
      <div style={{ marginBottom:"2rem" }}>
        <Link href="/admin/dashboard/products" style={{ fontSize:".82rem", color:"var(--text-soft)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".4rem", fontWeight:600, marginBottom:"1rem" }}>
          ← Back to Products
        </Link>
        <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>EDIT PRODUCT</h1>
        <p style={{ fontSize:".85rem", color:"var(--text-soft)", marginTop:".25rem" }}>{product.name}</p>
      </div>
      <ProductForm product={{ ...product, image_url: product.image_url ?? "" }} />
    </div>
  );
}

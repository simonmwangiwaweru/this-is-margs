import Link from "next/link";
import ProductForm from "../ProductForm";

export const metadata = { title: "Add Product | MARGS Admin" };

export default function NewProductPage() {
  return (
    <div style={{ padding:"2rem" }}>
      <div style={{ marginBottom:"2rem" }}>
        <Link href="/admin/dashboard/products" style={{ fontSize:".82rem", color:"var(--text-soft)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".4rem", fontWeight:600, marginBottom:"1rem" }}>
          ← Back to Products
        </Link>
        <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>ADD PRODUCT</h1>
      </div>
      <ProductForm />
    </div>
  );
}

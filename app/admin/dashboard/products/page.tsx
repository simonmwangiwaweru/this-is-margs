import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { toggleProductActive, toggleProductFeatured, deleteProduct } from "@/app/actions/products";

export const metadata = { title: "Products | MARGS Admin" };

export default async function ProductsPage() {
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const all = products ?? [];

  return (
    <div style={{ padding:"2rem" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem" }}>
        <div>
          <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>PRODUCTS</h1>
          <p style={{ fontSize:".85rem", color:"var(--text-soft)", marginTop:".25rem" }}>{all.length} products total</p>
        </div>
        <Link href="/admin/dashboard/products/new" className="btn btn-red" style={{ padding:".75rem 1.5rem" }}>
          + Add Product
        </Link>
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.25rem" }}>
        {all.map((p: any) => (
          <div key={p.id} className="card" style={{ overflow:"visible", opacity: p.active ? 1 : .55 }}>
            {/* Image */}
            <div style={{ position:"relative", aspectRatio:"1", overflow:"hidden", background:"var(--gray-100)" }}>
              <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              {/* Badges */}
              <div style={{ position:"absolute", top:10, left:10, display:"flex", flexDirection:"column", gap:".3rem" }}>
                {!p.active   && <span style={{ background:"#EF4444", color:"white", fontSize:".6rem", fontWeight:700, padding:".15rem .5rem", borderRadius:99 }}>HIDDEN</span>}
                {p.featured  && <span style={{ background:"var(--amber)", color:"white", fontSize:".6rem", fontWeight:700, padding:".15rem .5rem", borderRadius:99 }}>FEATURED</span>}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding:"1.1rem" }}>
              <p style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--text-soft)", marginBottom:".3rem" }}>{p.category}</p>
              <p style={{ fontWeight:700, fontSize:".95rem", color:"var(--gray-900)", marginBottom:".3rem", lineHeight:1.3 }}>{p.name}</p>
              <p className="display" style={{ fontSize:"1.3rem", color:"var(--g700)", marginBottom:"1rem" }}>
                KES {p.price.toLocaleString()}
                {p.original_price && <span style={{ fontSize:".85rem", color:"var(--text-soft)", textDecoration:"line-through", marginLeft:".5rem", fontFamily:"DM Sans,sans-serif" }}>KES {p.original_price.toLocaleString()}</span>}
              </p>

              {/* Toggles */}
              <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap", marginBottom:".875rem" }}>
                <form action={toggleProductActive.bind(null, p.id, !p.active)}>
                  <button type="submit" style={{ padding:".35rem .8rem", borderRadius:99, fontSize:".72rem", fontWeight:700, border:"1.5px solid", cursor:"pointer", fontFamily:"DM Sans,sans-serif", background: p.active ? "#D1FAE5" : "#FEE2E2", color: p.active ? "#065F46" : "#991B1B", borderColor: p.active ? "#6EE7B7" : "#FCA5A5" }}>
                    {p.active ? "✓ Active" : "✗ Hidden"}
                  </button>
                </form>
                <form action={toggleProductFeatured.bind(null, p.id, !p.featured)}>
                  <button type="submit" style={{ padding:".35rem .8rem", borderRadius:99, fontSize:".72rem", fontWeight:700, border:"1.5px solid", cursor:"pointer", fontFamily:"DM Sans,sans-serif", background: p.featured ? "#FEF3C7" : "var(--gray-100)", color: p.featured ? "#92400E" : "var(--gray-600)", borderColor: p.featured ? "#FCD34D" : "var(--gray-200)" }}>
                    {p.featured ? "★ Featured" : "☆ Feature"}
                  </button>
                </form>
              </div>

              {/* Actions */}
              <div style={{ display:"flex", gap:".5rem" }}>
                <Link href={`/admin/dashboard/products/${p.id}/edit`} style={{ flex:1, padding:".6rem", borderRadius:"var(--radius-sm)", background:"var(--gray-100)", color:"var(--gray-700)", textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".78rem", textAlign:"center", letterSpacing:".06em", textTransform:"uppercase" }}>
                  Edit
                </Link>
                <form action={deleteProduct.bind(null, p.id)} onSubmit={e => { if (!confirm(`Delete "${p.name}"?`)) e.preventDefault(); }}>
                  <button type="submit" style={{ padding:".6rem .875rem", borderRadius:"var(--radius-sm)", background:"#FFF1F2", color:"var(--g700)", border:"none", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".78rem", letterSpacing:".06em", textTransform:"uppercase" }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {all.length === 0 && (
        <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-soft)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🛍️</div>
          <p style={{ marginBottom:"1rem" }}>No products yet.</p>
          <Link href="/admin/dashboard/products/new" className="btn btn-red" style={{ padding:".75rem 1.5rem" }}>Add your first product</Link>
        </div>
      )}
    </div>
  );
}

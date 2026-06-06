"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import type { DBProduct } from "@/lib/getProducts";

const CATEGORIES = ["All","Alkaline","Coffee & Tea","Vitamins","Bone & Joint","Gut Health","Skin & Beauty"];

function dbToProduct(p: DBProduct) {
  return {
    id: p.id, name: p.name, description: p.description,
    price: p.price, originalPrice: p.original_price ?? undefined,
    category: p.category, image: p.image_url,
    badge: p.badge ?? undefined, rating: p.rating,
    reviews: p.reviews, benefits: p.benefits,
  };
}

export default function ShopClient({ products }: { products: DBProduct[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    products.filter(p => {
      const mc = activeCategory === "All" || p.category === activeCategory;
      const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return mc && ms;
    }),
  [products, activeCategory, search]);

  return (
    <>
      {/* Header */}
      <section style={{ background:"linear-gradient(150deg,var(--g950) 0%,#0A3D1F 50%,var(--g900) 100%)", padding:"80px 0 56px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 60% 40%,rgba(34,197,94,.14) 0%,transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto", padding:"0 1.5rem" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:".4rem", background:"rgba(74,222,128,.12)", border:"1px solid rgba(74,222,128,.25)", borderRadius:99, padding:".3rem .9rem", marginBottom:"1.25rem" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--g400)", display:"block" }} />
            <span style={{ fontSize:".66rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--g400)" }}>All Products</span>
          </span>
          <h1 className="display" style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", color:"white", letterSpacing:".05em", marginBottom:"1rem", lineHeight:.95 }}>SHOP SUPPLEMENTS</h1>
          <p style={{ color:"rgba(255,255,255,.58)", fontSize:".96rem", lineHeight:1.7 }}>
            Browse our full range of premium health and wellness products.<br/>
            <span style={{ color:"var(--g400)", fontWeight:600 }}>Free delivery in Nairobi</span> on orders above KES 3,000.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <section style={{ background:"white", borderBottom:"1px solid var(--gray-100)", padding:"1.1rem 0", position:"sticky", top:70, zIndex:50, boxShadow:"0 2px 16px rgba(5,46,22,.08)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`filter-pill${activeCategory===cat?" active":""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div style={{ position:"relative", minWidth:220 }}>
            <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-600)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="input" style={{ paddingLeft:"2.25rem", fontSize:".9rem" }} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pad" style={{ background:"var(--gray-50)" }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem", flexWrap:"wrap", gap:".75rem" }}>
            <p style={{ fontSize:".85rem", color:"var(--text-soft)" }}>
              Showing <strong style={{ color:"var(--g700)" }}>{filtered.length}</strong> product{filtered.length!==1?"s":""}
              {activeCategory!=="All" && <> in <strong style={{ color:"var(--g700)" }}>{activeCategory}</strong></>}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:"3.5rem", marginBottom:"1.25rem" }}>🔍</div>
              <h3 className="serif" style={{ fontSize:"1.4rem", color:"var(--g900)", marginBottom:".5rem" }}>No products found</h3>
              <p style={{ fontSize:".9rem", color:"var(--text-soft)" }}>Try a different search term or browse all categories.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="btn btn-outline-green" style={{ marginTop:"1.5rem" }}>Clear Filters</button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))", gap:"1.5rem" }}>
              {filtered.map(p => <ProductCard key={p.id} product={dbToProduct(p)} />)}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section style={{ background:"linear-gradient(135deg,var(--g800),var(--g700))", padding:"72px 0", textAlign:"center" }}>
        <div style={{ maxWidth:580, margin:"0 auto", padding:"0 1.5rem" }}>
          <div style={{ width:64, height:64, background:"rgba(255,255,255,.1)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          </div>
          <p className="label-amber" style={{ marginBottom:".75rem" }}>Need Help Choosing?</p>
          <h2 className="display" style={{ fontSize:"2.2rem", color:"white", letterSpacing:".05em", marginBottom:"1rem" }}>CHAT WITH OUR WELLNESS EXPERTS</h2>
          <p style={{ color:"rgba(255,255,255,.62)", fontSize:".92rem", marginBottom:"2rem", lineHeight:1.7 }}>Not sure which supplement is right for you? Our team is ready to help on WhatsApp.</p>
          <a href="https://wa.me/254736041184?text=Hi%20THIS%20IS%20MARGS!%20I%20need%20help%20choosing." target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:".6rem", background:"#25D366", color:"white", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".9rem", letterSpacing:".07em", textTransform:"uppercase", padding:".9rem 2.2rem", borderRadius:8, textDecoration:"none", boxShadow:"0 4px 24px rgba(37,211,102,.45)", transition:"all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(37,211,102,.6)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 24px rgba(37,211,102,.45)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

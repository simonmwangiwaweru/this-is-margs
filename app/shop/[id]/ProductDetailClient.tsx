"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cartContext";

const WHATSAPP = "254700000000";

const CAT_COLOR: Record<string, { bar: string; tagBg: string; tag: string }> = {
  "Alkaline":     { bar:"#0EA5E9", tagBg:"#E0F2FE", tag:"#0369A1" },
  "Coffee & Tea": { bar:"#92400E", tagBg:"#FEF3C7", tag:"#78350F" },
  "Vitamins":     { bar:"#16A34A", tagBg:"#DCFCE7", tag:"#15803D" },
  "Bone & Joint": { bar:"#6366F1", tagBg:"#EEF2FF", tag:"#4338CA" },
  "Gut Health":   { bar:"#EC4899", tagBg:"#FCE7F3", tag:"#9D174D" },
  "Skin & Beauty":{ bar:"#F97316", tagBg:"#FFF7ED", tag:"#C2410C" },
};

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= n ? "#F59E0B" : "#E5E7EB"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab]     = useState<"description"|"benefits"|"howto">("description");
  const { addToCart } = useCart();

  const cat   = CAT_COLOR[product.category] ?? CAT_COLOR["Vitamins"];
  const waMsg = encodeURIComponent(`Hi THIS IS MARGS! I'd like to order *${product.name}* x${qty} — KES ${(product.price * qty).toLocaleString()}. Please confirm availability and delivery.`);
  const waUrl = `https://wa.me/${WHATSAPP}?text=${waMsg}`;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div style={{ background:"white", borderBottom:"1px solid var(--gray-100)", padding:".75rem 0" }}>
        <div className="container" style={{ display:"flex", alignItems:"center", gap:".5rem", fontSize:".82rem", color:"var(--text-soft)" }}>
          <Link href="/" style={{ textDecoration:"none", color:"var(--text-soft)" }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ textDecoration:"none", color:"var(--text-soft)" }}>Shop</Link>
          <span>/</span>
          <span style={{ color:"var(--g700)", fontWeight:600 }}>{product.name}</span>
        </div>
      </div>

      {/* ── MAIN PRODUCT SECTION ── */}
      <section style={{ background:"white", padding:"56px 0" }}>
        <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"flex-start" }}>

          {/* LEFT — IMAGE */}
          <div style={{ position:"sticky", top:90 }}>
            {/* Category colour bar at top */}
            <div style={{ height:5, background:cat.bar, borderRadius:"var(--radius) var(--radius) 0 0" }} />
            <div style={{ background:"var(--gray-50)", borderRadius:"0 0 var(--radius) var(--radius)", overflow:"hidden", aspectRatio:"1", position:"relative", boxShadow:"var(--shadow-md)" }}>
              <Image
                src={product.image}
                alt={product.name}
                fill priority
                style={{ objectFit:"cover" }}
                sizes="(max-width:768px) 100vw, 50vw"
              />
              {product.badge && (
                <div style={{ position:"absolute", top:16, left:16, background:"var(--g700)", color:"white", fontSize:".65rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", padding:".3rem .85rem", borderRadius:99, boxShadow:"0 4px 16px rgba(190,18,60,.35)" }}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Trust badges under image */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".75rem", marginTop:"1.5rem" }}>
              {[["🔬","Lab Tested"],["🌿","100% Natural"],["🚚","Fast Delivery"]].map(([icon,label]) => (
                <div key={String(label)} style={{ textAlign:"center", padding:".875rem .5rem", background:"var(--gray-50)", borderRadius:"var(--radius-sm)", border:"1px solid var(--gray-100)" }}>
                  <div style={{ fontSize:"1.3rem", marginBottom:".3rem" }}>{icon}</div>
                  <div style={{ fontSize:".7rem", fontWeight:600, color:"var(--gray-600)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — INFO */}
          <div>
            {/* Category tag */}
            <span style={{ display:"inline-block", fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:cat.tag, background:cat.tagBg, padding:".2rem .75rem", borderRadius:99, marginBottom:"1rem" }}>
              {product.category}
            </span>

            <h1 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", color:"var(--gray-900)", lineHeight:.95, marginBottom:"1rem" }}>
              {product.name.toUpperCase()}
            </h1>

            {/* Rating */}
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1.5rem" }}>
              <Stars n={product.rating} size={18} />
              <span style={{ fontSize:".85rem", color:"var(--text-soft)", fontWeight:500 }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display:"flex", alignItems:"baseline", gap:"1rem", marginBottom:"2rem", paddingBottom:"2rem", borderBottom:"1px solid var(--gray-100)" }}>
              <div>
                <span style={{ fontSize:".75rem", fontWeight:700, color:"var(--text-soft)" }}>KES</span>
                <span className="display" style={{ fontSize:"3rem", color:"var(--g700)", lineHeight:1, marginLeft:".3rem" }}>{product.price.toLocaleString()}</span>
              </div>
              {product.originalPrice && (
                <div>
                  <span style={{ fontSize:".75rem", color:"var(--text-soft)" }}>was </span>
                  <span style={{ fontSize:"1.1rem", color:"var(--text-soft)", textDecoration:"line-through" }}>KES {product.originalPrice.toLocaleString()}</span>
                  <span style={{ display:"inline-block", marginLeft:".5rem", background:"#FEF3C7", color:"#92400E", fontSize:".65rem", fontWeight:700, padding:".18rem .6rem", borderRadius:99 }}>
                    Save KES {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Short description */}
            <p style={{ fontSize:".97rem", color:"var(--gray-600)", lineHeight:1.8, marginBottom:"2rem" }}>
              {product.description}
            </p>

            {/* Quantity + Add to cart */}
            <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap" }}>
              {/* Qty selector */}
              <div style={{ display:"flex", alignItems:"center", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", overflow:"hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width:44, height:52, background:"var(--gray-50)", border:"none", cursor:"pointer", fontSize:"1.25rem", color:"var(--gray-700)", fontWeight:700, transition:"background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background="#f3f4f6")}
                  onMouseLeave={e => (e.currentTarget.style.background="var(--gray-50)")}>−</button>
                <span style={{ width:48, textAlign:"center", fontSize:"1rem", fontWeight:700, color:"var(--gray-900)" }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ width:44, height:52, background:"var(--gray-50)", border:"none", cursor:"pointer", fontSize:"1.25rem", color:"var(--gray-700)", fontWeight:700, transition:"background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background="#f3f4f6")}
                  onMouseLeave={e => (e.currentTarget.style.background="var(--gray-50)")}>+</button>
              </div>

              {/* Add to cart */}
              <button onClick={handleAdd} style={{
                flex:1, minWidth:160, height:52, display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem",
                background: added ? "linear-gradient(135deg,var(--g600),var(--g500))" : "linear-gradient(135deg,var(--g800),var(--g700))",
                color:"white", border:"none", borderRadius:"var(--radius-sm)", cursor:"pointer",
                fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".88rem", letterSpacing:".07em", textTransform:"uppercase",
                boxShadow: added ? "0 4px 20px rgba(225,29,72,.4)" : "0 4px 20px rgba(190,18,60,.25)",
                transition:"all .22s ease",
              }}>
                {added
                  ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Added!</>
                  : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Add to Cart</>
                }
              </button>
            </div>

            {/* Order via WhatsApp */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
              display:"flex", alignItems:"center", justifyContent:"center", gap:".6rem",
              width:"100%", padding:".9rem", borderRadius:"var(--radius-sm)", textDecoration:"none",
              background:"#25D366", color:"white", fontFamily:"DM Sans,sans-serif",
              fontWeight:700, fontSize:".88rem", letterSpacing:".07em", textTransform:"uppercase",
              boxShadow:"0 4px 20px rgba(37,211,102,.3)", transition:"all .22s ease", marginBottom:"2rem",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(37,211,102,.5)"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(37,211,102,.3)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Order via WhatsApp — KES {(product.price * qty).toLocaleString()}
            </a>

            {/* Total if qty > 1 */}
            {qty > 1 && (
              <p style={{ textAlign:"center", fontSize:".85rem", color:"var(--text-soft)", marginTop:"-.5rem", marginBottom:"1.5rem" }}>
                {qty} × KES {product.price.toLocaleString()} = <strong style={{ color:"var(--g700)" }}>KES {(product.price * qty).toLocaleString()}</strong>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── TABS SECTION ── */}
      <section style={{ background:"var(--gray-50)", padding:"56px 0" }}>
        <div className="container">
          {/* Tab bar */}
          <div style={{ display:"flex", gap:0, borderBottom:"2px solid var(--gray-200)", marginBottom:"2.5rem" }}>
            {(["description","benefits","howto"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding:".875rem 1.75rem", background:"none", border:"none", cursor:"pointer",
                fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".88rem",
                letterSpacing:".08em", textTransform:"uppercase",
                color: tab === t ? "var(--g700)" : "var(--text-soft)",
                borderBottom: tab === t ? "3px solid var(--g700)" : "3px solid transparent",
                marginBottom:"-2px", transition:"color .2s",
              }}>
                {t === "description" ? "Description" : t === "benefits" ? "Benefits" : "How to Use"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "description" && (
            <div style={{ maxWidth:720 }}>
              <p style={{ fontSize:".97rem", color:"var(--gray-600)", lineHeight:1.9 }}>{product.description}</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem", marginTop:"2rem" }}>
                {[["📦","Quality Assured"],["🇰🇪","Delivered in Kenya"],["✅","Lab Certified"],["🌿","Natural Formula"]].map(([icon,label]) => (
                  <div key={String(label)} style={{ display:"flex", alignItems:"center", gap:".75rem", padding:".875rem 1rem", background:"white", borderRadius:"var(--radius-sm)", border:"1px solid var(--gray-100)", boxShadow:"var(--shadow-sm)" }}>
                    <span style={{ fontSize:"1.2rem" }}>{icon}</span>
                    <span style={{ fontSize:".82rem", fontWeight:600, color:"var(--gray-700)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "benefits" && (
            <div style={{ maxWidth:680 }}>
              {(product.benefits && product.benefits.length > 0)
                ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                    {product.benefits.map((b,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1rem 1.25rem", background:"white", borderRadius:"var(--radius-sm)", border:"1px solid var(--gray-100)", boxShadow:"var(--shadow-sm)" }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--g100)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--g700)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize:".95rem", fontWeight:600, color:"var(--gray-800)" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )
                : <p style={{ color:"var(--text-soft)", fontSize:".95rem" }}>Benefits information coming soon.</p>
              }
            </div>
          )}

          {tab === "howto" && (
            <div style={{ maxWidth:680 }}>
              {[
                ["1","Check the label","Read the product label for specific dosage instructions before use."],
                ["2","Take as directed","Follow the recommended serving size. Do not exceed the stated dose."],
                ["3","Stay consistent","For best results, take daily as part of your wellness routine."],
                ["4","Stay hydrated","Drink plenty of water throughout the day to support absorption."],
              ].map(([num,title,desc]) => (
                <div key={String(num)} style={{ display:"flex", gap:"1.25rem", marginBottom:"1.5rem" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"var(--g700)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:"white", letterSpacing:".06em" }}>{num}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:".95rem", color:"var(--gray-900)", marginBottom:".3rem" }}>{title}</div>
                    <div style={{ fontSize:".87rem", color:"var(--text-soft)", lineHeight:1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <section className="pad" style={{ background:"white" }}>
          <div className="container">
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p className="label">You May Also Like</p>
              <div className="divider-c" />
              <h2 className="display" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--gray-900)" }}>MORE IN {product.category.toUpperCase()}</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))", gap:"1.5rem" }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK TO SHOP ── */}
      <section style={{ background:"var(--gray-50)", padding:"48px 0", textAlign:"center" }}>
        <Link href="/shop" className="btn btn-outline-red" style={{ padding:"1rem 2.4rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Shop
        </Link>
      </section>

      <style>{`
        @media(max-width:768px){
          .product-detail-grid{grid-template-columns:1fr!important;gap:2rem!important}
        }
      `}</style>
    </>
  );
}

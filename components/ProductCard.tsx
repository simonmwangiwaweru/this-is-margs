"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cartContext";

const CAT_COLOR: Record<string, { bar:string; tag:string; tagBg:string }> = {
  "Alkaline":    { bar:"#0EA5E9", tag:"#0369A1", tagBg:"#E0F2FE" },
  "Vitamins":    { bar:"#22C55E", tag:"#15803D", tagBg:"#DCFCE7" },
  "Coffee & Tea":{ bar:"#92400E", tag:"#78350F", tagBg:"#FEF3C7" },
  "Bone & Joint":{ bar:"#6366F1", tag:"#4338CA", tagBg:"#EEF2FF" },
  "Gut Health":  { bar:"#EC4899", tag:"#9D174D", tagBg:"#FCE7F3" },
  "Skin & Beauty":{ bar:"#F97316", tag:"#C2410C", tagBg:"#FFF7ED" },
};

const BADGE_STYLE: Record<string, { bg:string; color:string }> = {
  "Best Seller":    { bg:"#F59E0B",  color:"white" },
  "New":            { bg:"#22C55E",  color:"white" },
  "Top Rated":      { bg:"#14532D",  color:"white" },
  "Premium":        { bg:"#7C3AED",  color:"white" },
  "Kenyan-Made":    { bg:"#065F46",  color:"white" },
  "Save KES 1,000": { bg:"#EF4444",  color:"white" },
  "Save KES 500":   { bg:"#EF4444",  color:"white" },
  "20% OFF":        { bg:"#EF4444",  color:"white" },
  "Pure & Natural": { bg:"#16A34A",  color:"white" },
};

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24"
          fill={s <= n ? "#F59E0B" : "#E5E7EB"}
          stroke={s <= n ? "#F59E0B" : "#E5E7EB"}
          strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const cat = CAT_COLOR[product.category] ?? CAT_COLOR["Vitamins"];
  const badge = product.badge ? (BADGE_STYLE[product.badge] ?? BADGE_STYLE["New"]) : null;
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="card" style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Category colour bar */}
      <div style={{ height:4, background:cat.bar }} />

      {/* Image — clicking goes to detail page */}
      <Link href={`/shop/${product.id}`} style={{ textDecoration:"none", display:"block" }}>
        <div style={{ position:"relative", aspectRatio:"1", overflow:"hidden", background:"var(--g50)" }}>
          <Image
            src={product.image} alt={product.name} fill
            style={{ objectFit:"cover", transition:"transform .5s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          />
          {badge && product.badge && (
            <div style={{ position:"absolute", top:12, left:12 }}>
              <span style={{ display:"inline-block", fontSize:".6rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".22rem .7rem", borderRadius:99, background:badge.bg, color:badge.color, boxShadow:"0 2px 8px rgba(0,0,0,.2)" }}>
                {product.badge}
              </span>
            </div>
          )}
          {/* "View Details" hover overlay */}
          <div style={{ position:"absolute", inset:0, background:"rgba(76,5,25,.0)", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .3s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(76,5,25,.45)"; const c = e.currentTarget.querySelector(".view-lbl") as HTMLElement; if(c) c.style.opacity="1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(76,5,25,.0)"; const c = e.currentTarget.querySelector(".view-lbl") as HTMLElement; if(c) c.style.opacity="0"; }}
          >
            <span className="view-lbl" style={{ opacity:0, transition:"opacity .3s", color:"white", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".8rem", letterSpacing:".12em", textTransform:"uppercase", background:"rgba(255,255,255,.15)", border:"1.5px solid rgba(255,255,255,.5)", padding:".5rem 1.2rem", borderRadius:99 }}>View Details</span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div style={{ padding:"1.25rem", display:"flex", flexDirection:"column", flex:1 }}>
        {/* Category tag */}
        <span style={{ display:"inline-block", fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:cat.tag, background:cat.tagBg, padding:".18rem .6rem", borderRadius:99, marginBottom:".55rem", width:"fit-content" }}>
          {product.category}
        </span>

        <Link href={`/shop/${product.id}`} style={{ textDecoration:"none" }}>
          <h3 className="serif" style={{ fontWeight:700, fontSize:"1rem", color:"var(--g900)", marginBottom:".45rem", lineHeight:1.35, cursor:"pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color="var(--g700)")}
            onMouseLeave={e => (e.currentTarget.style.color="var(--g900)")}>
            {product.name}
          </h3>
        </Link>

        <p style={{ fontSize:".82rem", color:"var(--text-soft)", lineHeight:1.58, marginBottom:".9rem", flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {product.description}
        </p>

        <div style={{ display:"flex", alignItems:"center", gap:".4rem", marginBottom:"1rem" }}>
          <Stars n={product.rating} />
          <span style={{ fontSize:".73rem", color:"var(--text-soft)" }}>({product.reviews})</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:".5rem", flexWrap:"wrap" }}>
            <div>
              <span style={{ fontSize:".7rem", color:"var(--text-soft)", fontWeight:600 }}>KES</span>
              <span className="display" style={{ fontSize:"1.5rem", color:"var(--g700)", letterSpacing:".02em", marginLeft:".3rem" }}>
                {product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && (
              <span style={{ fontSize:".85rem", color:"var(--text-soft)", textDecoration:"line-through" }}>
                KES {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem",
            width:"100%", padding:".82rem 1rem", borderRadius:"var(--radius-sm)",
            border:"none", cursor:"pointer", fontFamily:"DM Sans,sans-serif",
            fontWeight:700, fontSize:".82rem", letterSpacing:".07em", textTransform:"uppercase",
            transition:"all .22s ease",
            background: added
              ? "linear-gradient(135deg,var(--g600),var(--g500))"
              : "linear-gradient(135deg,var(--g800),var(--g700))",
            color:"white",
            boxShadow: added ? "0 4px 20px rgba(225,29,72,.4)" : "0 2px 10px rgba(190,18,60,.25)",
          }}
          onMouseEnter={e => { if(!added)(e.currentTarget as HTMLElement).style.boxShadow="0 6px 24px rgba(225,29,72,.45)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = added ? "0 4px 20px rgba(225,29,72,.4)" : "0 2px 10px rgba(190,18,60,.25)"; }}
        >
          {added ? (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Added to Cart!</>
          ) : (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

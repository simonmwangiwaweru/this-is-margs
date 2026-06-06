"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cartContext";

const links = [
  { href:"/",        label:"Home" },
  { href:"/shop",    label:"Shop" },
  { href:"/about",   label:"About" },
  { href:"/contact", label:"Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.35)" : "none" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", height:70, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration:"none", display:"flex", flexDirection:"column", gap:0, lineHeight:1 }}>
          <span className="display" style={{ fontSize:"1.55rem", background:"linear-gradient(135deg,var(--g400),var(--g300,#86efac))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".07em" }}>
            THIS IS MARGS
          </span>
          <span style={{ fontSize:".55rem", color:"rgba(74,222,128,.45)", letterSpacing:".24em", textTransform:"uppercase", fontFamily:"DM Sans,sans-serif", marginTop:"-1px" }}>
            Health &amp; Wellness · Kenya
          </span>
        </Link>

        {/* Desktop links */}
        <div id="nav-desktop" style={{ display:"flex", alignItems:"center", gap:"2.25rem" }}>
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily:"DM Sans,sans-serif", fontWeight:600, fontSize:".87rem",
                letterSpacing:".07em", textTransform:"uppercase", textDecoration:"none",
                color: active ? "var(--g400)" : "rgba(255,255,255,.72)",
                paddingBottom:3,
                borderBottom: active ? "2px solid var(--g500)" : "2px solid transparent",
                transition:"color .2s,border-color .2s",
              }}>
                {l.label}
              </Link>
            );
          })}

          {/* Shop CTA */}
          <Link href="/shop" className="btn btn-amber" style={{ padding:".55rem 1.3rem", fontSize:".78rem" }}>
            Shop Now
          </Link>

          {/* Cart button */}
          <button onClick={openCart} aria-label="Open cart" style={{ position:"relative", background:"rgba(74,222,128,.1)", border:"1.5px solid rgba(74,222,128,.2)", borderRadius:"50%", width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--g400)" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span style={{ position:"absolute", top:-5, right:-5, background:"var(--amber)", color:"white", fontSize:".58rem", fontWeight:700, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button id="nav-mobile" onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:4, flexDirection:"column", gap:5 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:"block", width:24, height:2, background:"var(--g400)", borderRadius:2,
              transition:"all .25s",
              transform: open && i===0 ? "rotate(45deg) translate(5px,5px)"
                       : open && i===2 ? "rotate(-45deg) translate(5px,-5px)"
                       : open && i===1 ? "scaleX(0)" : "none",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="anim-slide-down" style={{ background:"rgba(5,46,22,.98)", borderTop:"1px solid rgba(74,222,128,.1)", padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1.2rem" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily:"DM Sans,sans-serif", fontWeight:600, fontSize:"1rem",
              letterSpacing:".08em", textTransform:"uppercase", textDecoration:"none",
              color: pathname === l.href ? "var(--g400)" : "rgba(255,255,255,.82)",
              padding:".5rem 0", borderBottom:"1px solid rgba(74,222,128,.08)",
            }}>{l.label}</Link>
          ))}
          <Link href="/shop" className="btn btn-amber" style={{ textAlign:"center", marginTop:".5rem" }}>
            Shop Now →
          </Link>
        </div>
      )}

      <style>{`
        #nav-desktop { display:flex!important; }
        #nav-mobile  { display:none!important; }
        @media(max-width:768px){
          #nav-desktop { display:none!important; }
          #nav-mobile  { display:flex!important; }
        }
      `}</style>
    </nav>
  );
}

"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background:"linear-gradient(180deg,var(--g950) 0%,#021A0A 100%)", color:"rgba(255,255,255,.78)", paddingTop:72, paddingBottom:32 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>

        {/* Top grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"3rem", marginBottom:"3.5rem" }}>

          {/* Brand */}
          <div>
            <div className="display" style={{ fontSize:"1.8rem", background:"linear-gradient(135deg,var(--g400),var(--g300,#86efac))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:".6rem", letterSpacing:".06em" }}>
              THIS IS MARGS
            </div>
            <p style={{ fontSize:".85rem", lineHeight:1.75, color:"rgba(255,255,255,.48)", maxWidth:240, marginBottom:"1.6rem" }}>
              Kenya&apos;s premier health supplement brand. Fuelling bodies and elevating lives — one supplement at a time.
            </p>
            <div style={{ display:"flex", gap:".6rem" }}>
              {[
                { label:"Instagram", href:"https://instagram.com", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label:"Facebook",  href:"https://facebook.com",  icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label:"WhatsApp",  href:"https://wa.me/254700000000", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width:38, height:38, borderRadius:"50%", background:"rgba(74,222,128,.1)", border:"1px solid rgba(74,222,128,.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--g400)", transition:"all .2s", textDecoration:"none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(74,222,128,.22)"; (e.currentTarget as HTMLElement).style.borderColor="var(--g400)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(74,222,128,.1)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(74,222,128,.15)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--g400)", marginBottom:"1.25rem" }}>Quick Links</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:".7rem" }}>
              {[{href:"/",label:"Home"},{href:"/shop",label:"Shop"},{href:"/about",label:"About"},{href:"/contact",label:"Contact"}].map(l => (
                <Link key={l.href} href={l.href} style={{ color:"rgba(255,255,255,.55)", textDecoration:"none", fontSize:".88rem", transition:"color .2s" }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color="var(--g400)")}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color="rgba(255,255,255,.55)")}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--g400)", marginBottom:"1.25rem" }}>Shop By Category</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:".7rem" }}>
              {[["Alkaline","Alkaline"],["Vitamins","Vitamins"],["Detox","Detox"],["Immunity","Immunity"],["Gut+Health","Gut Health"]].map(([slug,label]) => (
                <Link key={slug} href={`/shop?category=${slug}`} style={{ color:"rgba(255,255,255,.55)", textDecoration:"none", fontSize:".88rem", transition:"color .2s" }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color="var(--g400)")}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color="rgba(255,255,255,.55)")}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--g400)", marginBottom:"1.25rem" }}>Contact Us</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:".75rem" }}>
              {[["📍","Westlands, Nairobi, Kenya"],["📞","+254 700 000 000"],["✉️","hello@thisismargs.co.ke"],["🕐","Mon–Sat 8am–7pm EAT"]].map(([icon,text]) => (
                <div key={text} style={{ display:"flex", gap:".55rem", alignItems:"flex-start" }}>
                  <span style={{ fontSize:".9rem", marginTop:".05rem" }}>{icon}</span>
                  <span style={{ fontSize:".86rem", color:"rgba(255,255,255,.5)", lineHeight:1.55 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/254700000000?text=Hi%20THIS%20IS%20MARGS!" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:".5rem", marginTop:"1.25rem", background:"#25D366", color:"white", padding:".6rem 1.2rem", borderRadius:8, fontSize:".8rem", fontWeight:700, textDecoration:"none", boxShadow:"0 4px 16px rgba(37,211,102,.3)", transition:"all .2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow="0 6px 24px rgba(37,211,102,.5)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow="0 4px 16px rgba(37,211,102,.3)")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(74,222,128,.08)", paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".75rem" }}>
          <p style={{ fontSize:".78rem", color:"rgba(255,255,255,.3)" }}>© 2025 THIS IS MARGS. All rights reserved.</p>
          <p style={{ fontSize:".78rem", color:"rgba(74,222,128,.4)" }}>Made with ♥ in Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}

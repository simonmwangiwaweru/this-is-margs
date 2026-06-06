"use client";
import Image from "next/image";
import Link from "next/link";

const values = [
  { icon:"🌱", title:"Transparency",  desc:"We list every ingredient. No proprietary blends, no hidden fillers — just honest supplements you can trust.", bg:"#DCFCE7" },
  { icon:"⚗️", title:"Quality First",  desc:"Pharmaceutical-grade manufacturing and third-party lab testing on every product, every batch.", bg:"#EDE9FE" },
  { icon:"🤝", title:"Community",      desc:"We're building a movement of Kenyans who refuse to settle for average health. You're part of it.", bg:"#DBEAFE" },
  { icon:"🌍", title:"Sustainability", desc:"Local sourcing, eco-friendly packaging, and giving back to Kenyan farming communities.", bg:"#FEF3C7" },
];

const team = [
  { name:"Margaret 'Margs' Wanjiku", role:"Founder & CEO",      bio:"Former nutritionist with 10+ years in holistic health. Founded THIS IS MARGS after struggling to find quality supplements in Nairobi.", image:"https://picsum.photos/seed/margs-founder/400/400" },
  { name:"David Ochieng",            role:"Head of Product R&D", bio:"Food scientist and supplement formulator passionate about bringing world-class nutritional science to the African market.", image:"https://picsum.photos/seed/david-ochieng/400/400" },
  { name:"Aisha Hassan",             role:"Wellness Advisor",    bio:"Certified nutritionist and herbalist specialising in alkaline health protocols, ensuring every product aligns with our natural philosophy.", image:"https://picsum.photos/seed/aisha-wellness/400/400" },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(150deg,var(--g950) 0%,#0A3D1F 55%,var(--g900) 100%)", padding:"96px 0 72px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 30% 60%,rgba(34,197,94,.14) 0%,transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto", padding:"0 1.5rem" }}>
          <p className="label" style={{ marginBottom:".75rem" }}>Our Story</p>
          <div className="divider-c" />
          <h1 className="display" style={{ fontSize:"clamp(2.5rem,7vw,5rem)", color:"white", letterSpacing:".05em", marginBottom:"1.25rem", lineHeight:.92 }}>
            BORN FROM A DESIRE<br/>FOR BETTER HEALTH
          </h1>
          <p style={{ color:"rgba(255,255,255,.62)", fontSize:"1rem", lineHeight:1.8, maxWidth:520, margin:"0 auto" }}>
            THIS IS MARGS is Kenya&apos;s answer to premium, honest, and accessible health supplementation. Every Kenyan deserves the tools to live their healthiest life.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="pad" style={{ background:"white" }}>
        <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
          <div className="reveal" style={{ position:"relative", borderRadius:"var(--radius-xl)", overflow:"hidden", aspectRatio:"4/5", boxShadow:"var(--shadow-xl)" }}>
            <Image src="https://picsum.photos/seed/about-brand/600/750" alt="THIS IS MARGS Brand Story" fill style={{ objectFit:"cover" }} sizes="(max-width:768px) 100vw,50vw" />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 45%,rgba(5,46,22,.82) 100%)" }} />
            <div style={{ position:"absolute", bottom:28, left:28, right:28 }}>
              <div className="display" style={{ fontSize:"1.25rem", color:"var(--amber)", letterSpacing:".06em", marginBottom:".3rem" }}>
                &ldquo;HEALTH IS NOT A LUXURY.&rdquo;
              </div>
              <p style={{ color:"rgba(255,255,255,.65)", fontSize:".85rem" }}>— Margaret Wanjiku, Founder</p>
            </div>
          </div>

          <div className="reveal">
            <p className="label">How It All Started</p>
            <div className="divider" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,2.9rem)", color:"var(--g900)", marginBottom:"1.5rem", lineHeight:1 }}>FROM NAIROBI,<br/>FOR THE WORLD</h2>
            {[
              "In 2020, our founder Margaret — known to everyone as <strong>Margs</strong> — was battling chronic fatigue, poor gut health and frustration with the lack of quality supplements in Kenya. Everything imported was expensive or unregulated.",
              "She set out to change that. After years of research, formulation and collaborating with Kenyan farmers and food scientists, she launched THIS IS MARGS with one mission: <em>premium wellness, without the premium pretence.</em>",
              "Today we serve thousands of customers across all 47 counties. Every product carries our founder's commitment to quality and the belief that <strong>feeling extraordinary should be within everyone's reach.</strong>",
            ].map((t,i) => (
              <p key={i} style={{ color:"var(--gray-600)", lineHeight:1.85, marginBottom:"1.25rem", fontSize:".95rem" }} dangerouslySetInnerHTML={{ __html:t }} />
            ))}
            <Link href="/shop" className="btn btn-green" style={{ marginTop:".5rem", padding:".95rem 2.4rem" }}>
              Explore Our Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-story-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
      </section>

      {/* Mission + Stats */}
      <section style={{ background:"linear-gradient(135deg,var(--g900),var(--g800))", padding:"88px 0", textAlign:"center" }}>
        <div style={{ maxWidth:780, margin:"0 auto", padding:"0 1.5rem" }}>
          <p className="label-amber" style={{ marginBottom:".75rem" }}>Our Purpose</p>
          <div className="divider-gold" />
          <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3.2rem)", color:"white", letterSpacing:".04em", marginBottom:"1.75rem" }}>OUR MISSION</h2>
          <p className="serif" style={{ fontSize:"clamp(1.05rem,2.5vw,1.3rem)", color:"rgba(255,255,255,.78)", lineHeight:1.85, fontStyle:"italic" }}>
            &ldquo;To make world-class health and wellness accessible to every Kenyan — through honest products, transparent practices, and a community built on real results.&rdquo;
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"2rem", marginTop:"4rem", borderTop:"1px solid rgba(74,222,128,.15)", paddingTop:"3rem" }}>
            {[["2020","Founded"],["2,500+","Customers"],["14","Products"],["47","Counties"]].map(([v,l]) => (
              <div key={l} className="reveal">
                <div className="display" style={{ fontSize:"2.5rem", color:"var(--amber)", lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:".72rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(74,222,128,.55)", marginTop:".4rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pad" style={{ background:"var(--g50)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <p className="label">What Drives Us</p>
            <div className="divider-c" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"var(--g900)" }}>OUR VALUES</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1.5rem" }}>
            {values.map((v,i) => (
              <div key={v.title} className="reveal card" style={{ animationDelay:`${i*.1}s`, padding:"2rem" }}>
                <div style={{ width:60, height:60, borderRadius:16, background:v.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.75rem", marginBottom:"1.25rem" }}>{v.icon}</div>
                <h3 className="serif" style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--g900)", marginBottom:".65rem" }}>{v.title}</h3>
                <p style={{ fontSize:".87rem", color:"var(--text-soft)", lineHeight:1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pad" style={{ background:"white" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <p className="label">The Humans Behind MARGS</p>
            <div className="divider-c" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"var(--g900)" }}>MEET THE TEAM</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"2rem" }}>
            {team.map((m,i) => (
              <div key={m.name} className="reveal card" style={{ animationDelay:`${i*.12}s` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow="var(--shadow-lg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="var(--shadow-sm)"; }}
              >
                <div style={{ position:"relative", aspectRatio:"1", overflow:"hidden" }}>
                  <Image src={m.image} alt={m.name} fill style={{ objectFit:"cover" }} sizes="(max-width:640px) 100vw,33vw" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 60%,rgba(5,46,22,.5) 100%)" }} />
                </div>
                <div style={{ padding:"1.5rem" }}>
                  <div style={{ width:36, height:3, background:"linear-gradient(90deg,var(--g500),var(--g400))", borderRadius:3, marginBottom:"1rem" }} />
                  <h3 className="serif" style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--g900)", marginBottom:".25rem" }}>{m.name}</h3>
                  <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--g600)", marginBottom:".875rem" }}>{m.role}</p>
                  <p style={{ fontSize:".85rem", color:"var(--text-soft)", lineHeight:1.68 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"linear-gradient(135deg,var(--g600),var(--g500))", padding:"80px 0", textAlign:"center" }}>
        <div style={{ maxWidth:580, margin:"0 auto", padding:"0 1.5rem" }}>
          <h2 className="display" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"white", letterSpacing:".04em", marginBottom:"1rem" }}>READY TO START YOUR WELLNESS JOURNEY?</h2>
          <p style={{ color:"rgba(255,255,255,.75)", marginBottom:"2rem", fontSize:".95rem" }}>Join thousands of Kenyans who have already transformed their health.</p>
          <Link href="/shop" className="btn" style={{ background:"white", color:"var(--g700)", padding:".95rem 2.8rem", boxShadow:"0 4px 24px rgba(0,0,0,.2)" }}>
            Shop Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}

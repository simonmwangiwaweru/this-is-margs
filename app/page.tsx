import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/getProducts";
import NewsletterForm from "@/components/NewsletterForm";

const benefits = [
  { icon: "🌿", title: "100% Natural",   desc: "Every product is purely from nature — no synthetic fillers, no proprietary blends. Honest supplements you can trust.", bg: "#FFF1F2", accent: "#BE123C" },
  { icon: "⚗️", title: "Lab Certified",  desc: "Third-party tested every single batch. Pharmaceutical-grade purity you can trust with your body every day.", bg: "#FEF3C7", accent: "#D97706" },
  { icon: "🚚", title: "Fast Delivery",  desc: "Same-day dispatch in Nairobi. Nationwide delivery across all 47 counties — straight to your door.", bg: "#EFF6FF", accent: "#1D4ED8" },
  { icon: "💬", title: "24/7 Support",   desc: "Our WhatsApp team is always ready to help you find the right supplement and answer every question.", bg: "#F0FDF4", accent: "#15803D" },
];

const testimonials = [
  { name: "Amina W.",  loc: "Nairobi",  rating: 5, avatar: "https://picsum.photos/seed/amina-k/80/80",  text: "The Alkaline Cup literally changed my life. I had constant fatigue and headaches for years. Two weeks in — completely different person. 10/10." },
  { name: "Brian K.",  loc: "Mombasa",  rating: 5, avatar: "https://picsum.photos/seed/brian-k/80/80",  text: "The Probiotic Milk Tablets cleared up digestion issues I had struggled with for years. Under a month. I was shocked. Legit results." },
  { name: "Grace M.",  loc: "Kisumu",   rating: 5, avatar: "https://picsum.photos/seed/grace-m/80/80",  text: "Ordered the Cordyceps Coffee and Omega-3. WhatsApp support was incredibly fast, delivery on time. The quality blew me away!" },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= n ? "#F59E0B" : "#E5E7EB"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div style={{ background:"linear-gradient(90deg,var(--g800),var(--g700),var(--g800))", padding:".5rem 1rem", textAlign:"center" }}>
        <p style={{ fontSize:".78rem", fontWeight:600, color:"white", letterSpacing:".06em" }}>
          🚚 FREE DELIVERY in Nairobi on orders above KES 3,000 &nbsp;·&nbsp; Use code <strong>HEALTHY10</strong> for 10% off your first order
        </p>
      </div>

      {/* ══════════════════════════════════════
          HERO — dark red, bold white type,
          huge "MARGS" watermark (like the
          Whey Protein inspiration)
      ══════════════════════════════════════ */}
      <section style={{
        background:"linear-gradient(150deg, var(--g950) 0%, #3A0D18 40%, var(--g900) 100%)",
        minHeight:"94vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden",
      }}>
        {/* Radial glow spots */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 65% 45%,rgba(244,63,94,.18) 0%,transparent 55%), radial-gradient(ellipse at 15% 75%,rgba(245,158,11,.10) 0%,transparent 45%)", pointerEvents:"none" }} />

        {/* HUGE "MARGS" background watermark */}
        <div style={{
          position:"absolute", bottom:"-5%", left:"50%", transform:"translateX(-50%)",
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(10rem,28vw,22rem)",
          color:"rgba(255,255,255,.04)",
          whiteSpace:"nowrap", pointerEvents:"none",
          letterSpacing:".06em", lineHeight:1, userSelect:"none",
        }}>
          MARGS
        </div>

        {/* Decorative rings */}
        {[480,340,200].map((s,i) => (
          <div key={s} style={{ position:"absolute", right:`${-s*.12}px`, top:"50%", transform:"translateY(-50%)", width:s, height:s, borderRadius:"50%", border:`1px solid rgba(251,113,133,${.07-i*.02})`, pointerEvents:"none" }} />
        ))}

        <div className="container" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", alignItems:"center", gap:"3rem", padding:"100px 1.5rem 80px", width:"100%", position:"relative" }}>

          {/* ── LEFT: TEXT ── */}
          <div className="anim-fade-up">
            {/* Trust pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background:"rgba(251,113,133,.12)", border:"1.5px solid rgba(251,113,133,.28)", borderRadius:99, padding:".35rem 1rem", marginBottom:"2rem" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--g400)", boxShadow:"0 0 8px var(--g400)", display:"block" }} />
              <span style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--g400)" }}>Kenya&apos;s Premier Wellness Brand</span>
            </div>

            {/* Headline */}
            <h1 className="display" style={{ fontSize:"clamp(3.5rem,9vw,7rem)", color:"white", lineHeight:.88, marginBottom:".15rem" }}>FUEL</h1>
            <h1 className="display" style={{ fontSize:"clamp(3.5rem,9vw,7rem)", color:"var(--g400)", lineHeight:.88, marginBottom:".15rem" }}>YOUR</h1>
            <h1 className="display" style={{ fontSize:"clamp(3.5rem,9vw,7rem)", color:"white", lineHeight:.88, marginBottom:"1.6rem" }}>BODY.</h1>

            <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,.65)", lineHeight:1.8, maxWidth:440, marginBottom:"2.5rem" }}>
              15 premium natural supplements — coffee blends, vitamins, bone health, gut care, skin &amp; more. Lab tested. Delivered across all 47 counties.
            </p>

            <div style={{ display:"flex", gap:".875rem", flexWrap:"wrap", marginBottom:"3rem" }}>
              <Link href="/shop" className="btn btn-amber" style={{ padding:"1rem 2.4rem", fontSize:".9rem" }}>
                Shop Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/about" className="btn btn-white" style={{ padding:"1rem 2.4rem", fontSize:".9rem" }}>Our Story</Link>
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", paddingTop:"2rem", borderTop:"1px solid rgba(251,113,133,.15)" }}>
              {[["2,500+","Customers"],["15","Products"],["4.9★","Rating"],["47","Counties"]].map(([v,l]) => (
                <div key={l}>
                  <div className="display" style={{ fontSize:"2rem", color:"var(--amber)", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:".67rem", color:"rgba(255,255,255,.4)", letterSpacing:".12em", textTransform:"uppercase", marginTop:".2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: HERO VISUAL ── */}
          <div className="anim-fade-in d300" style={{ position:"relative", display:"flex", justifyContent:"center" }}>
            {/* Circular image frame */}
            <div style={{
              width:"min(460px,100%)", aspectRatio:"1", borderRadius:"50%",
              background:"linear-gradient(135deg,rgba(251,113,133,.25),rgba(156,18,57,.4))",
              position:"relative", overflow:"hidden",
              boxShadow:"0 32px 80px rgba(76,5,25,.6), 0 0 0 20px rgba(251,113,133,.06)",
            }}>
              <Image
                src="https://picsum.photos/seed/wellness-products-fresh/600/600"
                alt="THIS IS MARGS Products"
                fill priority
                style={{ objectFit:"cover" }}
                sizes="(max-width:768px) 0vw,50vw"
              />
              {/* inner vignette */}
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,transparent 40%,rgba(76,5,25,.4) 100%)" }} />
            </div>

            {/* Floating icon badges */}
            <div className="anim-float" style={{ position:"absolute", top:"4%", left:"2%", width:66, height:66, borderRadius:"50%", background:"white", boxShadow:"0 8px 32px rgba(0,0,0,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem" }}>🍃</div>
            <div className="anim-float d200" style={{ position:"absolute", bottom:"18%", left:"-4%", width:62, height:62, borderRadius:"50%", background:"white", boxShadow:"0 8px 32px rgba(0,0,0,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.6rem" }}>☕</div>
            <div className="anim-float d400" style={{ position:"absolute", top:"14%", right:"-2%", width:62, height:62, borderRadius:"50%", background:"white", boxShadow:"0 8px 32px rgba(0,0,0,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.6rem" }}>💊</div>

            {/* Rating card */}
            <div style={{ position:"absolute", bottom:"6%", right:"-2%", background:"white", borderRadius:16, padding:".875rem 1.25rem", boxShadow:"0 12px 40px rgba(0,0,0,.18)", minWidth:176 }}>
              <div style={{ display:"flex", gap:2, marginBottom:".3rem" }}>
                {[1,2,3,4,5].map(s => <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
              <div style={{ fontWeight:700, fontSize:".9rem", color:"#111" }}>4.9 / 5 Rating</div>
              <div style={{ fontSize:".72rem", color:"#666", marginTop:".15rem" }}>From 2,500+ customers</div>
            </div>

            {/* Floating "Lab Certified" badge */}
            <div className="anim-float d300" style={{ position:"absolute", top:"42%", right:"-8%", background:"var(--g700)", borderRadius:12, padding:".75rem 1.1rem", boxShadow:"0 8px 24px rgba(190,18,60,.45)" }}>
              <div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.75)" }}>100% Natural</div>
              <div style={{ fontSize:".85rem", fontWeight:700, color:"white" }}>Lab Certified</div>
            </div>
          </div>
        </div>

        <style>{`
          @media(max-width:768px){
            .hero-main-grid{grid-template-columns:1fr!important}
            .hero-right-panel{display:none!important}
          }
        `}</style>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ background:"white", borderBottom:"1px solid var(--gray-100)", padding:"1.3rem 0" }}>
        <div className="container" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"2.5rem", flexWrap:"wrap" }}>
          {[
            { icon:"🔬", label:"Lab Tested & Certified" },
            { icon:"🌿", label:"100% Natural" },
            { icon:"🛡️", label:"Grass International" },
            { icon:"🚚", label:"Nairobi Same-Day" },
            { icon:"💬", label:"WhatsApp Support" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
              <span style={{ fontSize:"1.1rem" }}>{icon}</span>
              <span style={{ fontSize:".82rem", fontWeight:600, color:"var(--g800)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="pad" style={{ background:"var(--gray-50)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <p className="label">Handpicked For You</p>
            <div className="divider-c" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3.2rem)", color:"var(--gray-900)" }}>OUR BESTSELLERS</h2>
            <p style={{ color:"var(--text-soft)", maxWidth:520, margin:".75rem auto 0", fontSize:".95rem" }}>
              Trusted by thousands of Kenyans. Premium quality, natural ingredients, real results.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))", gap:"1.5rem" }}>
            {featuredProducts.map((p,i) => (
              <div key={p.id} className="reveal" style={{ animationDelay:`${i*.08}s` }}>
                <ProductCard product={{ id:p.id, name:p.name, description:p.description, price:p.price, originalPrice:p.original_price??undefined, category:p.category, image:p.image_url, badge:p.badge??undefined, rating:p.rating, reviews:p.reviews, benefits:p.benefits }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"3rem" }}>
            <Link href="/shop" className="btn btn-red" style={{ padding:".95rem 2.8rem" }}>
              View All 15 Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPOTLIGHT ── */}
      <section style={{ background:"linear-gradient(150deg,var(--g950) 0%,#3A0D18 50%,var(--g900) 100%)", padding:"100px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 30% 60%,rgba(244,63,94,.15) 0%,transparent 55%)", pointerEvents:"none" }} />
        {/* Background text */}
        <div style={{ position:"absolute", bottom:-30, right:-40, fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(8rem,20vw,16rem)", color:"rgba(255,255,255,.03)", pointerEvents:"none", userSelect:"none", letterSpacing:".06em" }}>COFFEE</div>

        <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center", position:"relative" }}>
          {/* Product image */}
          <div className="reveal" style={{ position:"relative" }}>
            <div style={{ borderRadius:"var(--radius-xl)", overflow:"hidden", aspectRatio:"4/5", position:"relative", boxShadow:"0 40px 100px rgba(0,0,0,.6)" }}>
              <Image src="https://picsum.photos/seed/cordyceps-product-shot/600/750" alt="Cordyceps Coffee" fill style={{ objectFit:"cover" }} sizes="(max-width:768px) 0vw,50vw" />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 55%,rgba(76,5,25,.8) 100%)" }} />
            </div>
            <div style={{ position:"absolute", top:24, left:24, background:"var(--amber)", borderRadius:10, padding:".6rem 1.1rem", boxShadow:"var(--glow-amber)" }}>
              <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"white" }}>Save KES 1,000</span>
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <p className="label-amber" style={{ marginBottom:".6rem" }}>Product Spotlight</p>
            <div className="divider-gold" />
            <h2 className="display" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", color:"white", lineHeight:.9, marginBottom:"1.5rem" }}>CORDYCEPS<br/>COFFEE</h2>
            <p style={{ color:"rgba(255,255,255,.72)", fontSize:"1rem", lineHeight:1.8, marginBottom:"2rem" }}>
              Nature&apos;s energy every day. Packed with Cordyceps Extract, Premium Coffee &amp; Essential Nutrients. 300g — designed for performance and daily vitality.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".875rem", marginBottom:"2.5rem" }}>
              {[
                ["⚡","Boosts Energy",     "Helps fight fatigue and keeps you active all day"],
                ["🧠","Enhances Focus",    "Supports mental clarity, concentration and productivity"],
                ["🛡️","Supports Immunity", "Strengthens your natural defenses for overall wellness"],
              ].map(([icon,title,desc]) => (
                <div key={String(title)} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:"rgba(251,113,133,.15)", border:"1px solid rgba(251,113,133,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:".9rem", color:"white" }}>{title}</div>
                    <div style={{ fontSize:".78rem", color:"rgba(255,255,255,.5)", marginTop:".15rem" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"1.5rem", marginBottom:"2rem" }}>
              <div>
                <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.4)", letterSpacing:".1em" }}>NOW</div>
                <div className="display" style={{ fontSize:"3rem", color:"var(--amber)", lineHeight:1 }}>KES 3,000</div>
              </div>
              <div>
                <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.3)" }}>WAS</div>
                <div style={{ fontSize:"1.1rem", color:"rgba(255,255,255,.28)", textDecoration:"line-through", fontWeight:600 }}>KES 4,000</div>
              </div>
            </div>
            <Link href="/shop" className="btn btn-amber" style={{ padding:"1rem 2.4rem" }}>
              Order Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="pad" style={{ background:"white" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <p className="label">The MARGS Difference</p>
            <div className="divider-c" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"var(--gray-900)" }}>WHY CHOOSE US?</h2>
            <p style={{ color:"var(--text-soft)", maxWidth:480, margin:".75rem auto 0", fontSize:".95rem" }}>
              We believe wellness should be natural, effective and accessible to every Kenyan.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(252px,1fr))", gap:"1.5rem" }}>
            {benefits.map((b,i) => (
              <div key={b.title} className="reveal card" style={{ animationDelay:`${i*.1}s`, padding:"2rem" }}>
                <div style={{ width:64, height:64, borderRadius:18, background:b.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.9rem", marginBottom:"1.4rem" }}>
                  {b.icon}
                </div>
                <h3 className="serif" style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--gray-900)", marginBottom:".65rem" }}>{b.title}</h3>
                <p style={{ fontSize:".87rem", color:"var(--text-soft)", lineHeight:1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background:"linear-gradient(135deg,var(--g900),var(--g800))", padding:"72px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-20, left:"50%", transform:"translateX(-50%)", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(6rem,18vw,14rem)", color:"rgba(255,255,255,.03)", whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none" }}>SINCE 2020</div>
        <div className="container" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"2rem", textAlign:"center", position:"relative" }}>
          {[["2,500+","Satisfied Customers"],["15","Premium Products"],["4.9★","Average Rating"],["47","Counties Reached"],["2020","Year Founded"]].map(([v,l]) => (
            <div key={l} className="reveal">
              <div className="display" style={{ fontSize:"2.8rem", color:"var(--amber)", lineHeight:1, marginBottom:".4rem" }}>{v}</div>
              <div style={{ fontSize:".72rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.4)" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="pad" style={{ background:"var(--gray-50)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:"center", marginBottom:"3rem" }}>
            <p className="label">Real People, Real Results</p>
            <div className="divider-c" />
            <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"var(--gray-900)" }}>WHAT KENYANS ARE SAYING</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1.5rem" }}>
            {testimonials.map((t,i) => (
              <div key={t.name} className="reveal tcard" style={{ animationDelay:`${i*.12}s` }}>
                <Stars n={t.rating} />
                <p style={{ fontSize:".95rem", color:"var(--gray-700)", lineHeight:1.75, margin:"1rem 0 1.5rem", fontStyle:"italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:".875rem" }}>
                  <Image src={t.avatar} alt={t.name} width={44} height={44} style={{ borderRadius:"50%", objectFit:"cover", border:"2px solid var(--g400)" }} />
                  <div>
                    <div style={{ fontWeight:700, fontSize:".9rem", color:"var(--gray-900)" }}>{t.name}</div>
                    <div style={{ fontSize:".76rem", color:"var(--text-soft)" }}>{t.loc}, Kenya</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background:"linear-gradient(135deg,var(--g900) 0%,var(--g700) 50%,var(--g800) 100%)", backgroundSize:"200% 200%", animation:"gradient 8s ease infinite", padding:"88px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%,rgba(244,63,94,.15) 0%,transparent 50%)", pointerEvents:"none" }} />
        <div className="reveal container" style={{ maxWidth:620, textAlign:"center", position:"relative" }}>
          <p className="label-amber" style={{ marginBottom:".5rem" }}>Join the Wellness Community</p>
          <div className="divider-gold" />
          <h2 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"white", marginBottom:".75rem" }}>GET 10% OFF YOUR FIRST ORDER</h2>
          <p style={{ fontSize:".95rem", color:"rgba(255,255,255,.72)", marginBottom:"2.25rem", lineHeight:1.68 }}>
            Subscribe for exclusive deals, wellness tips, new product launches and Kenyan health inspiration.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

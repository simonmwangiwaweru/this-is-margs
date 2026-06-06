"use client";
import { useState } from "react";

export default function ContactClient() {
  const [form, setForm]         = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const cards = [
    { icon:"📍", label:"Visit Us",         val:"Westlands, Nairobi", sub:"Near Sarit Centre",      bg:"#DCFCE7", iconColor:"#16A34A" },
    { icon:"📞", label:"Call / WhatsApp",  val:"+254 700 000 000",   sub:"Mon–Sat, 8am–7pm",       bg:"#DBEAFE", iconColor:"#2563EB" },
    { icon:"✉️", label:"Email Us",         val:"hello@thisismargs.co.ke", sub:"Reply within 24hrs", bg:"#EDE9FE", iconColor:"#7C3AED" },
    { icon:"🕐", label:"Shop Hours",       val:"Mon – Saturday",      sub:"8:00 AM – 7:00 PM EAT", bg:"#FEF3C7", iconColor:"#D97706" },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(150deg,var(--g950) 0%,#0A3D1F 55%,var(--g900) 100%)", padding:"96px 0 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 70% 30%,rgba(34,197,94,.14) 0%,transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:600, margin:"0 auto", padding:"0 1.5rem" }}>
          <p className="label" style={{ marginBottom:".75rem" }}>Get In Touch</p>
          <div className="divider-c" />
          <h1 className="display" style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", color:"white", letterSpacing:".05em", marginBottom:"1rem", lineHeight:.95 }}>
            WE&apos;D LOVE TO<br/>HEAR FROM YOU
          </h1>
          <p style={{ color:"rgba(255,255,255,.6)", fontSize:".96rem", lineHeight:1.75 }}>
            Questions, wholesale enquiries, or just want to say hi?<br/>Our team is here — and so is our WhatsApp.
          </p>
        </div>
      </section>

      {/* Info cards (float up over hero bottom) */}
      <section style={{ background:"var(--gray-50)", paddingTop:0 }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1.25rem", transform:"translateY(-44px)" }}>
            {cards.map(c => (
              <div key={c.label} className="card" style={{ padding:"1.5rem" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow="var(--shadow-md)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="var(--shadow-sm)"; }}
              >
                <div style={{ width:48, height:48, borderRadius:14, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", marginBottom:"1rem" }}>{c.icon}</div>
                <p style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:c.iconColor, marginBottom:".3rem" }}>{c.label}</p>
                <p style={{ fontWeight:700, color:"var(--g900)", fontSize:".95rem" }}>{c.val}</p>
                <p style={{ fontSize:".8rem", color:"var(--text-soft)", marginTop:".15rem" }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ background:"var(--gray-50)", paddingBottom:96, marginTop:-44 }}>
        <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>

          {/* Form */}
          <div className="reveal">
            <p className="label" style={{ marginBottom:".5rem" }}>Send a Message</p>
            <div className="divider" />
            <h2 className="display" style={{ fontSize:"2rem", color:"var(--g900)", marginBottom:".5rem" }}>CONTACT FORM</h2>
            <p style={{ fontSize:".88rem", color:"var(--text-soft)", marginBottom:"2rem", lineHeight:1.65 }}>Fill in the form and we&apos;ll reply within 24 hours — or even faster on WhatsApp.</p>

            {submitted ? (
              <div style={{ background:"linear-gradient(135deg,var(--g800),var(--g700))", borderRadius:"var(--radius-lg)", padding:"2.5rem", textAlign:"center" }}>
                <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>✅</div>
                <h3 className="display" style={{ fontSize:"1.6rem", color:"var(--amber)", letterSpacing:".06em", marginBottom:".5rem" }}>MESSAGE SENT!</h3>
                <p style={{ color:"rgba(255,255,255,.72)", fontSize:".9rem", lineHeight:1.7 }}>
                  Thanks <strong style={{ color:"white" }}>{form.name}</strong>! We&apos;ve received your message and will reply within 24 hours.
                </p>
                <a href="https://wa.me/254736041184" target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background:"#25D366", color:"white", fontWeight:700, fontSize:".85rem", letterSpacing:".07em", textTransform:"uppercase", padding:".75rem 1.6rem", borderRadius:8, textDecoration:"none", marginTop:"1.5rem" }}>
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  {[{id:"name",label:"Full Name",type:"text",placeholder:"Margaret Wanjiru"},{id:"email",label:"Email",type:"email",placeholder:"hello@example.com"}].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ display:"block", fontSize:".72rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--g700)", marginBottom:".4rem" }}>{f.label} *</label>
                      <input type={f.type} id={f.id} name={f.id} value={(form as Record<string,string>)[f.id]} onChange={handleChange} placeholder={f.placeholder} className="input" required />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="phone" style={{ display:"block", fontSize:".72rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--g700)", marginBottom:".4rem" }}>Phone / WhatsApp</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" className="input" />
                </div>
                <div>
                  <label htmlFor="subject" style={{ display:"block", fontSize:".72rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--g700)", marginBottom:".4rem" }}>Subject *</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="input" required>
                    <option value="">Select a subject…</option>
                    <option value="product">Product Enquiry</option>
                    <option value="order">Order Status</option>
                    <option value="wholesale">Wholesale / Bulk Orders</option>
                    <option value="returns">Returns &amp; Refunds</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" style={{ display:"block", fontSize:".72rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--g700)", marginBottom:".4rem" }}>Message *</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help…" className="input" required rows={5} style={{ resize:"vertical" }} />
                </div>
                <button type="submit" disabled={loading} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", background:"linear-gradient(135deg,var(--g700),var(--g600))", color:"white", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".88rem", letterSpacing:".08em", textTransform:"uppercase", padding:"1rem", borderRadius:"var(--radius-sm)", border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 4px 20px rgba(22,163,74,.3)", transition:"all .22s" }}
                  onMouseEnter={e => { if(!loading)(e.currentTarget as HTMLElement).style.boxShadow="0 8px 28px rgba(22,163,74,.45)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(22,163,74,.3)"; }}
                >
                  {loading ? <><span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white", borderRadius:"50%", animation:"spin .8s linear infinite" }} />Sending…</> : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="reveal" style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            {/* WhatsApp */}
            <div style={{ background:"linear-gradient(135deg,#065F46,#047857)", borderRadius:"var(--radius-lg)", padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
                <div style={{ width:50, height:50, background:"#25D366", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 16px rgba(37,211,102,.4)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                </div>
                <div>
                  <p style={{ fontWeight:700, color:"white", fontSize:"1rem" }}>Chat on WhatsApp</p>
                  <p style={{ fontSize:".8rem", color:"rgba(255,255,255,.65)" }}>Fastest way to reach us — we respond fast</p>
                </div>
              </div>
              <p style={{ color:"rgba(255,255,255,.72)", fontSize:".88rem", lineHeight:1.72, marginBottom:"1.25rem" }}>Most Kenyan orders happen on WhatsApp! Message us for product advice, order tracking, or anything else.</p>
              <a href="https://wa.me/254736041184?text=Hi%20THIS%20IS%20MARGS!%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background:"#25D366", color:"white", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".85rem", letterSpacing:".08em", textTransform:"uppercase", padding:".75rem 1.5rem", borderRadius:8, textDecoration:"none", boxShadow:"0 4px 16px rgba(37,211,102,.35)", transition:"all .2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform="translateY(-2px)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform="translateY(0)")}
              >+254 700 000 000</a>
            </div>

            {/* Map placeholder */}
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ height:200, background:"linear-gradient(135deg,#C8D5B9,#8AB87F,#4A7C59)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="100%" height="100%" style={{ position:"absolute", inset:0, opacity:.2 }}>
                  {Array.from({length:10}).map((_,i) => <line key={`h${i}`} x1="0" y1={i*22} x2="100%" y2={i*22} stroke="#0D4D2B" strokeWidth="0.6"/>)}
                  {Array.from({length:18}).map((_,i) => <line key={`v${i}`} x1={i*42} y1="0" x2={i*42} y2="100%" stroke="#0D4D2B" strokeWidth="0.6"/>)}
                </svg>
                <div style={{ zIndex:1, textAlign:"center" }}>
                  <div style={{ fontSize:"2.5rem", filter:"drop-shadow(0 4px 8px rgba(0,0,0,.25))" }}>📍</div>
                  <div style={{ background:"var(--g900)", color:"white", padding:".4rem 1rem", borderRadius:99, fontSize:".78rem", fontWeight:700, marginTop:".5rem", boxShadow:"0 4px 12px rgba(0,0,0,.2)" }}>THIS IS MARGS · Westlands</div>
                </div>
              </div>
              <div style={{ padding:"1.25rem 1.5rem" }}>
                <p style={{ fontWeight:700, color:"var(--g900)", fontSize:".95rem", marginBottom:".25rem" }}>📍 Westlands, Nairobi</p>
                <p style={{ fontSize:".82rem", color:"var(--text-soft)", lineHeight:1.65 }}>Near Sarit Centre. Free parking available.<br/><strong>Hours:</strong> Mon–Sat 8am–7pm</p>
              </div>
            </div>

            {/* FAQ */}
            <div style={{ background:"white", borderRadius:"var(--radius)", padding:"1.75rem", boxShadow:"var(--shadow-sm)", border:"1px solid var(--gray-100)" }}>
              <p style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--g600)", marginBottom:"1.25rem" }}>Quick Answers</p>
              {[
                { q:"Do you deliver across Kenya?", a:"Yes! Nairobi: 1–2 days. Upcountry: 2–4 days via courier." },
                { q:"Is there a minimum order?",     a:"No minimum. Orders above KES 3,000 get free Nairobi delivery." },
                { q:"Can I pay on delivery?",        a:"Yes — Cash on Delivery and M-Pesa Till for Nairobi orders." },
              ].map((item,i,arr) => (
                <div key={item.q} style={{ marginBottom:i<arr.length-1?".9rem":0, paddingBottom:i<arr.length-1?".9rem":0, borderBottom:i<arr.length-1?"1px solid var(--gray-100)":"none" }}>
                  <p style={{ fontWeight:700, fontSize:".88rem", color:"var(--g900)", marginBottom:".2rem" }}>{item.q}</p>
                  <p style={{ fontSize:".82rem", color:"var(--text-soft)", lineHeight:1.6 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes spin { to{transform:rotate(360deg)} }
          @media(max-width:768px){ .contact-grid{grid-template-columns:1fr!important;gap:2rem!important} }
        `}</style>
      </section>
    </>
  );
}

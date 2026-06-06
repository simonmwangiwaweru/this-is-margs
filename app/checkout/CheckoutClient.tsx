"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { submitOrder } from "@/app/actions/orders";

const WHATSAPP = "254700000000";
type PayMethod = "mpesa" | "delivery";
type View      = "form" | "waiting" | "failed";

/* ── Waiting / phone-prompt screen ──────────────────────────────────── */
function WaitingScreen({
  orderId,
  phone,
  onSuccess,
  onFailed,
  onRetry,
}: {
  orderId: string;
  phone:   string;
  onSuccess: () => void;
  onFailed:  () => void;
  onRetry:   () => void;
}) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Poll order status every 4 s
    const poll = setInterval(async () => {
      try {
        const res  = await fetch(`/api/orders/${orderId}/status`);
        const data = await res.json();
        if (data.status === "paid")      { clearInterval(poll); onSuccess(); }
        if (data.status === "cancelled") { clearInterval(poll); onFailed(); }
      } catch {}
    }, 4000);

    // Count seconds elapsed
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);

    return () => {
      clearInterval(poll);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId, onSuccess, onFailed]);

  const shortId = orderId.slice(0, 8).toUpperCase();
  const waMsg   = encodeURIComponent(`Hi THIS IS MARGS! I tried to pay for order #${shortId} but had issues. Please help.`);

  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--gray-50)", padding:"2rem 1.5rem" }}>
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>

        {/* Phone animation */}
        <div style={{ width:100, height:100, borderRadius:"50%", background:"linear-gradient(135deg,#22C55E,#15803D)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2rem", boxShadow:"0 0 0 16px rgba(34,197,94,.1), 0 0 0 32px rgba(34,197,94,.05)", animation:"pulse 2s ease-in-out infinite" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </div>

        <h2 className="display" style={{ fontSize:"2.2rem", color:"var(--gray-900)", marginBottom:".75rem" }}>CHECK YOUR PHONE</h2>
        <p style={{ fontSize:"1rem", color:"var(--text-soft)", lineHeight:1.75, marginBottom:".5rem" }}>
          An M-Pesa prompt has been sent to <strong style={{ color:"var(--gray-900)" }}>{phone}</strong>
        </p>
        <p style={{ fontSize:".88rem", color:"var(--text-soft)", marginBottom:"2rem" }}>Enter your M-Pesa PIN to complete payment.</p>

        {/* Order ref */}
        <div style={{ display:"inline-block", background:"white", border:"1px solid var(--gray-200)", borderRadius:"var(--radius)", padding:".875rem 1.5rem", marginBottom:"2rem" }}>
          <p style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--text-soft)", marginBottom:".2rem" }}>Order Reference</p>
          <p className="display" style={{ fontSize:"1.5rem", color:"var(--g700)", letterSpacing:".1em" }}>#{shortId}</p>
        </div>

        {/* Waiting indicator */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".6rem", marginBottom:"2.5rem", color:"var(--text-soft)", fontSize:".85rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:"spin .9s linear infinite", flexShrink:0 }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Waiting for payment confirmation… {seconds}s
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
          <button onClick={onRetry} style={{ background:"transparent", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", padding:".85rem", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".82rem", letterSpacing:".08em", textTransform:"uppercase", color:"var(--gray-700)", cursor:"pointer" }}>
            Didn't receive? Retry
          </button>
          <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", padding:".85rem", borderRadius:"var(--radius-sm)", background:"#25D366", color:"white", textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".82rem", letterSpacing:".07em", textTransform:"uppercase" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Need help? WhatsApp us
          </a>
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 16px rgba(34,197,94,.1),0 0 0 32px rgba(34,197,94,.05)} 50%{box-shadow:0 0 0 24px rgba(34,197,94,.08),0 0 0 48px rgba(34,197,94,.02)} }
        @keyframes spin  { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

/* ── Main checkout ───────────────────────────────────────────────────── */
export default function CheckoutClient() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName:    "",
    customerPhone:   "",
    customerEmail:   "",
    deliveryAddress: "",
    notes:           "",
  });
  const [payMethod, setPayMethod] = useState<PayMethod>("mpesa");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [view,      setView]      = useState<View>("form");
  const [orderId,   setOrderId]   = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      items: items.map(i => ({
        productId:   i.product.id,
        productName: i.product.name,
        price:       i.product.price,
        quantity:    i.quantity,
      })),
      total: totalPrice,
    };

    if (payMethod === "mpesa") {
      const res  = await fetch("/api/mpesa/stkpush", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);

      if (data.error && !data.orderId) {
        setError(data.error);
        return;
      }

      setOrderId(data.orderId);
      clearCart();

      if (data.stkError) {
        // Order saved but STK push failed — go straight to success with a note
        router.push(`/checkout/success?id=${data.orderId}&warn=stk`);
        return;
      }

      setView("waiting");
      return;
    }

    // Pay on delivery — use existing server action
    const result = await submitOrder(payload);
    setLoading(false);
    if ("error" in result) { setError(result.error); return; }
    clearCart();
    router.push(`/checkout/success?id=${result.orderId}`);
  };

  if (view === "waiting") {
    return (
      <WaitingScreen
        orderId={orderId}
        phone={form.customerPhone}
        onSuccess={() => router.push(`/checkout/success?id=${orderId}`)}
        onFailed={() => setView("failed")}
        onRetry={async () => {
          await fetch("/api/mpesa/stkpush", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              ...form,
              items: items.map(i => ({ productId: i.product.id, productName: i.product.name, price: i.product.price, quantity: i.quantity })),
              total: totalPrice,
            }),
          });
        }}
      />
    );
  }

  if (view === "failed") {
    return (
      <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.25rem", padding:"3rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:"3.5rem" }}>❌</div>
        <h2 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>PAYMENT CANCELLED</h2>
        <p style={{ color:"var(--text-soft)", maxWidth:380 }}>Your M-Pesa payment was cancelled or timed out. Your order #{orderId.slice(0,8).toUpperCase()} is saved — you can pay via WhatsApp.</p>
        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
          <button onClick={() => { setView("form"); setError(""); }} className="btn btn-outline-red" style={{ padding:".9rem 2rem" }}>Try Again</button>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi MARGS! I need help paying for order #${orderId.slice(0,8).toUpperCase()}`)}`} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:".5rem", padding:".9rem 2rem", borderRadius:"var(--radius-sm)", background:"#25D366", color:"white", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".82rem", letterSpacing:".07em", textTransform:"uppercase", textDecoration:"none" }}>
            Pay via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5rem", padding:"3rem" }}>
        <div style={{ fontSize:"4rem", opacity:.4 }}>🛒</div>
        <p style={{ color:"var(--text-soft)", fontSize:"1.05rem" }}>Your cart is empty.</p>
        <Link href="/shop" className="btn btn-red" style={{ padding:".9rem 2rem" }}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div style={{ background:"var(--gray-50)", minHeight:"100vh", padding:"56px 0 96px" }}>
      <div className="container" style={{ maxWidth:1100 }}>

        <Link href="/shop" style={{ display:"inline-flex", alignItems:"center", gap:".4rem", fontSize:".82rem", color:"var(--text-soft)", textDecoration:"none", marginBottom:"2rem", fontWeight:600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Shop
        </Link>

        <h1 className="display" style={{ fontSize:"clamp(2rem,5vw,3rem)", color:"var(--gray-900)", marginBottom:"2.5rem" }}>CHECKOUT</h1>

        <div style={{ display:"grid", gridTemplateColumns:"1.1fr .9fr", gap:"2.5rem", alignItems:"flex-start" }}>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

            {/* Contact */}
            <div className="card" style={{ padding:"2rem" }}>
              <h2 className="serif" style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--gray-900)", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:".6rem" }}>
                <span style={{ width:28, height:28, borderRadius:"50%", background:"var(--g700)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:".75rem", fontWeight:700, fontFamily:"Bebas Neue,sans-serif" }}>1</span>
                Contact Details
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".82rem", fontWeight:600, color:"var(--gray-700)", marginBottom:".4rem" }}>Full Name *</label>
                  <input className="input" required value={form.customerName} onChange={set("customerName")} placeholder="e.g. Amina Wanjiku" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".82rem", fontWeight:600, color:"var(--gray-700)", marginBottom:".4rem" }}>
                    Phone Number * {payMethod === "mpesa" && <span style={{ color:"var(--g600)", fontWeight:400 }}>(M-Pesa prompt sent here)</span>}
                  </label>
                  <input className="input" required type="tel" value={form.customerPhone} onChange={set("customerPhone")} placeholder="e.g. 0712 345 678" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".82rem", fontWeight:600, color:"var(--gray-700)", marginBottom:".4rem" }}>
                    Email <span style={{ color:"var(--text-soft)", fontWeight:400 }}>(optional)</span>
                  </label>
                  <input className="input" type="email" value={form.customerEmail} onChange={set("customerEmail")} placeholder="e.g. amina@email.com" />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="card" style={{ padding:"2rem" }}>
              <h2 className="serif" style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--gray-900)", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:".6rem" }}>
                <span style={{ width:28, height:28, borderRadius:"50%", background:"var(--g700)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:".75rem", fontWeight:700, fontFamily:"Bebas Neue,sans-serif" }}>2</span>
                Delivery Details
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".82rem", fontWeight:600, color:"var(--gray-700)", marginBottom:".4rem" }}>Delivery Address *</label>
                  <input className="input" required value={form.deliveryAddress} onChange={set("deliveryAddress")} placeholder="e.g. Westlands, Nairobi — near Sarit Centre" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".82rem", fontWeight:600, color:"var(--gray-700)", marginBottom:".4rem" }}>
                    Notes <span style={{ color:"var(--text-soft)", fontWeight:400 }}>(optional)</span>
                  </label>
                  <textarea className="input" rows={3} value={form.notes} onChange={set("notes") as React.ChangeEventHandler<HTMLTextAreaElement>} placeholder="Any special instructions..." style={{ resize:"vertical" }} />
                </div>
              </div>
              <div style={{ marginTop:"1.25rem", padding:"1rem", background:"#EFF6FF", borderRadius:"var(--radius-sm)", border:"1px solid #BFDBFE", display:"flex", gap:".75rem" }}>
                <span style={{ fontSize:"1.2rem", flexShrink:0 }}>🚚</span>
                <p style={{ fontSize:".78rem", color:"#1E40AF", lineHeight:1.6 }}>
                  <strong style={{ color:"#1D4ED8" }}>Same-day delivery in Nairobi</strong> on orders before 2pm. Nationwide 1–3 days. Free delivery above KES 3,000.
                </p>
              </div>
            </div>

            {/* Payment method */}
            <div className="card" style={{ padding:"2rem" }}>
              <h2 className="serif" style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--gray-900)", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:".6rem" }}>
                <span style={{ width:28, height:28, borderRadius:"50%", background:"var(--g700)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:".75rem", fontWeight:700, fontFamily:"Bebas Neue,sans-serif" }}>3</span>
                Payment Method
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
                {(["mpesa", "delivery"] as PayMethod[]).map(m => {
                  const active = payMethod === m;
                  return (
                    <label key={m} onClick={() => setPayMethod(m)} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1rem 1.25rem", borderRadius:"var(--radius-sm)", border:`2px solid ${active ? "var(--g500)" : "var(--gray-200)"}`, background: active ? "var(--g50)" : "white", cursor:"pointer", transition:"all .18s" }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${active ? "var(--g500)" : "var(--gray-300)"}`, background: active ? "var(--g500)" : "white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .18s" }}>
                        {active && <div style={{ width:8, height:8, borderRadius:"50%", background:"white" }} />}
                      </div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:".9rem", color:"var(--gray-900)" }}>
                          {m === "mpesa" ? "Pay with M-Pesa" : "Pay on Delivery (Cash)"}
                        </p>
                        <p style={{ fontSize:".76rem", color:"var(--text-soft)", marginTop:".15rem" }}>
                          {m === "mpesa"
                            ? "Get an instant STK push on your phone. Safe & instant."
                            : "Pay cash when your order arrives. Available in Nairobi."}
                        </p>
                      </div>
                      {m === "mpesa" && (
                        <div style={{ marginLeft:"auto", background:"#00A859", color:"white", fontSize:".62rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".2rem .6rem", borderRadius:99, flexShrink:0 }}>
                          M-PESA
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {error && (
              <div style={{ padding:"1rem 1.25rem", background:"#FFF1F2", border:"1px solid #FECDD3", borderRadius:"var(--radius-sm)", color:"var(--g700)", fontSize:".88rem", fontWeight:600 }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-red" style={{ padding:"1.15rem", fontSize:".92rem", width:"100%", opacity: loading ? .7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:"spin .8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processing…</>
              ) : payMethod === "mpesa" ? (
                <>Pay KES {totalPrice.toLocaleString()} with M-Pesa <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
              ) : (
                <>Place Order — KES {totalPrice.toLocaleString()} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
              )}
            </button>

            <p style={{ textAlign:"center", fontSize:".78rem", color:"var(--text-soft)" }}>
              {payMethod === "mpesa"
                ? "You will receive an M-Pesa STK push on your phone after clicking."
                : "Our team will contact you on WhatsApp to confirm before dispatch."}
            </p>
          </form>

          {/* ── ORDER SUMMARY ── */}
          <div style={{ position:"sticky", top:90, display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div className="card" style={{ padding:"2rem" }}>
              <h2 className="serif" style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--gray-900)", marginBottom:"1.5rem" }}>Order Summary</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"1.5rem" }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ display:"flex", gap:".875rem", alignItems:"center" }}>
                    <div style={{ width:56, height:56, borderRadius:10, overflow:"hidden", flexShrink:0, position:"relative", background:"var(--gray-100)" }}>
                      <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit:"cover" }} sizes="56px" />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:".88rem", color:"var(--gray-900)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.product.name}</p>
                      <p style={{ fontSize:".76rem", color:"var(--text-soft)", marginTop:".1rem" }}>Qty: {item.quantity}</p>
                    </div>
                    <span className="display" style={{ fontSize:"1rem", color:"var(--g700)", flexShrink:0 }}>
                      KES {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:"1px solid var(--gray-100)", paddingTop:"1.25rem", display:"flex", flexDirection:"column", gap:".6rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:".85rem", color:"var(--text-soft)" }}>
                  <span>Subtotal</span><span>KES {totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:".85rem", color:"var(--text-soft)" }}>
                  <span>Delivery</span>
                  <span style={{ color: totalPrice >= 3000 ? "#15803D" : "var(--text-soft)" }}>
                    {totalPrice >= 3000 ? "FREE" : "Calculated on confirmation"}
                  </span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingTop:".6rem", borderTop:"1px solid var(--gray-100)", marginTop:".2rem" }}>
                  <span style={{ fontWeight:700, fontSize:".95rem" }}>Total</span>
                  <span className="display" style={{ fontSize:"1.8rem", color:"var(--g700)" }}>KES {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div style={{ padding:"1.25rem", background:"#F0FDF4", borderRadius:"var(--radius)", border:"1px solid #BBF7D0" }}>
              <p style={{ fontSize:".82rem", fontWeight:700, color:"#15803D", marginBottom:".4rem" }}>Prefer WhatsApp?</p>
              <p style={{ fontSize:".76rem", color:"#166534", lineHeight:1.6, marginBottom:".875rem" }}>Chat with our team for personalised service.</p>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi THIS IS MARGS! I'd like to place an order.")}`} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", padding:".75rem", borderRadius:"var(--radius-sm)", background:"#25D366", color:"white", textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".8rem", letterSpacing:".07em", textTransform:"uppercase" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        @media(max-width:768px){ .container > div { grid-template-columns:1fr!important; } }
      `}</style>
    </div>
  );
}

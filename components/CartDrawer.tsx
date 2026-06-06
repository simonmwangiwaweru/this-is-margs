"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { placeOrder } from "@/app/actions/placeOrder";

type Step = "cart" | "form" | "loading" | "success";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, isOpen, closeCart } = useCart();

  const [step,  setStep]  = useState<Step>("cart");
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [err,   setErr]   = useState("");

  const resetForm = () => { setStep("cart"); setName(""); setPhone(""); setErr(""); };

  const handleClose = () => { closeCart(); setTimeout(resetForm, 400); };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setErr("Please fill in all fields."); return; }
    setStep("loading");
    setErr("");

    const result = await placeOrder({
      customerName:  name.trim(),
      customerPhone: phone.trim(),
      items: items.map(i => ({ productId: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      total: totalPrice,
    });

    if ("error" in result) { setErr(result.error); setStep("form"); return; }
    clearCart();
    setStep("success");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".75rem 1rem", borderRadius: 8,
    border: "1.5px solid rgba(192,132,252,.2)", background: "rgba(255,255,255,.05)",
    color: "white", fontFamily: "DM Sans, sans-serif", fontSize: ".92rem", outline: "none",
    boxSizing: "border-box",
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,.55)", opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none", transition:"opacity .3s ease" }} />

      {/* Drawer */}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, zIndex:201, width:"min(420px,100vw)", background:"#0D0521", borderLeft:"1px solid rgba(192,132,252,.12)", display:"flex", flexDirection:"column", transform: isOpen ? "translateX(0)" : "translateX(100%)", transition:"transform .32s cubic-bezier(.4,0,.2,1)", boxShadow:"-8px 0 48px rgba(0,0,0,.5)" }}>

        {/* Header */}
        <div style={{ padding:"1.25rem 1.5rem", borderBottom:"1px solid rgba(192,132,252,.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
            {step === "form" || step === "loading" ? (
              <button onClick={() => setStep("cart")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.6)", fontSize:"1.1rem", padding:0, lineHeight:1 }}>←</button>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--g400)" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            )}
            <span className="display" style={{ fontSize:"1.2rem", color:"white", letterSpacing:".06em" }}>
              {step === "form" || step === "loading" ? "YOUR DETAILS" : step === "success" ? "ORDER PLACED" : "YOUR CART"}
            </span>
            {step === "cart" && totalItems > 0 && (
              <span style={{ background:"var(--amber)", color:"white", fontSize:".65rem", fontWeight:700, width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>{totalItems}</span>
            )}
          </div>
          <button onClick={handleClose} style={{ background:"rgba(255,255,255,.07)", border:"none", cursor:"pointer", width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.7)", fontSize:"1.1rem" }}>✕</button>
        </div>

        {/* SUCCESS */}
        {step === "success" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem", textAlign:"center", gap:"1rem" }}>
            <div style={{ fontSize:"3.5rem" }}>✅</div>
            <h2 className="display" style={{ color:"var(--g400)", fontSize:"1.4rem", letterSpacing:".06em" }}>ORDER RECEIVED!</h2>
            <p style={{ color:"rgba(255,255,255,.6)", lineHeight:1.7, fontSize:".92rem" }}>
              Thank you! We have received your order and will contact you shortly to confirm delivery and payment.
            </p>
            <button onClick={handleClose} style={{ marginTop:"1rem", padding:".85rem 2rem", background:"var(--g700)", color:"white", border:"none", borderRadius:"var(--radius-sm)", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".85rem", letterSpacing:".08em", textTransform:"uppercase" }}>
              Continue Shopping
            </button>
          </div>
        )}

        {/* FORM */}
        {(step === "form" || step === "loading") && (
          <form onSubmit={handlePlaceOrder} style={{ flex:1, display:"flex", flexDirection:"column", padding:"1.5rem", gap:"1.25rem" }}>
            <p style={{ color:"rgba(255,255,255,.5)", fontSize:".85rem", margin:0 }}>Leave your details and we will contact you to confirm your order and arrange delivery.</p>

            <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
              <label style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.45)" }}>Full Name *</label>
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Wanjiru" required disabled={step === "loading"} />
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
              <label style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.45)" }}>Phone Number *</label>
              <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 0712 345 678" required disabled={step === "loading"} type="tel" />
            </div>

            {err && <p style={{ color:"#FCA5A5", fontSize:".82rem", margin:0 }}>⚠️ {err}</p>}

            {/* Order summary */}
            <div style={{ background:"rgba(255,255,255,.04)", borderRadius:8, padding:"1rem", border:"1px solid rgba(192,132,252,.08)" }}>
              <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:".75rem" }}>Order Summary</p>
              {items.map(i => (
                <div key={i.product.id} style={{ display:"flex", justifyContent:"space-between", fontSize:".82rem", color:"rgba(255,255,255,.6)", marginBottom:".35rem" }}>
                  <span>{i.product.name} × {i.quantity}</span>
                  <span>KES {(i.product.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid rgba(192,132,252,.1)", marginTop:".75rem", paddingTop:".75rem", display:"flex", justifyContent:"space-between", fontWeight:700, color:"white" }}>
                <span>Total</span>
                <span className="display" style={{ color:"var(--amber)", fontSize:"1.1rem" }}>KES {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" disabled={step === "loading"} style={{ padding:"1rem", background:"var(--g700)", color:"white", border:"none", borderRadius:"var(--radius-sm)", cursor: step === "loading" ? "wait" : "pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".88rem", letterSpacing:".08em", textTransform:"uppercase", opacity: step === "loading" ? .7 : 1, marginTop:"auto" }}>
              {step === "loading" ? "Placing Order…" : "Confirm Order"}
            </button>
          </form>
        )}

        {/* CART */}
        {step === "cart" && (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
              {items.length === 0 ? (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.25rem", paddingTop:"3rem" }}>
                  <div style={{ fontSize:"3.5rem", opacity:.35 }}>🛒</div>
                  <p style={{ color:"rgba(255,255,255,.4)", fontSize:".95rem", textAlign:"center" }}>Your cart is empty.<br/>Add some products to get started!</p>
                  <button onClick={handleClose} style={{ background:"transparent", border:"1.5px solid rgba(192,132,252,.35)", borderRadius:"var(--radius-sm)", color:"var(--g400)", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".8rem", letterSpacing:".1em", textTransform:"uppercase", padding:".7rem 1.6rem", cursor:"pointer" }}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} style={{ display:"flex", gap:"1rem", padding:"1rem", background:"rgba(255,255,255,.04)", borderRadius:"var(--radius-sm)", border:"1px solid rgba(192,132,252,.08)" }}>
                    <div style={{ width:72, height:72, borderRadius:10, overflow:"hidden", flexShrink:0, position:"relative", background:"rgba(255,255,255,.06)" }}>
                      <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit:"cover" }} sizes="72px" />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:".88rem", color:"white", marginBottom:".2rem", lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.product.name}</p>
                      <p style={{ fontSize:".75rem", color:"rgba(255,255,255,.4)", marginBottom:".65rem" }}>KES {item.product.price.toLocaleString()} each</p>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", alignItems:"center", border:"1px solid rgba(192,132,252,.2)", borderRadius:8, overflow:"hidden" }}>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width:30, height:30, background:"rgba(255,255,255,.05)", border:"none", cursor:"pointer", color:"rgba(255,255,255,.8)", fontSize:"1rem", fontWeight:700 }}>−</button>
                          <span style={{ width:28, textAlign:"center", fontSize:".85rem", fontWeight:700, color:"white" }}>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width:30, height:30, background:"rgba(255,255,255,.05)", border:"none", cursor:"pointer", color:"rgba(255,255,255,.8)", fontSize:"1rem", fontWeight:700 }}>+</button>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                          <span className="display" style={{ fontSize:"1rem", color:"var(--amber)" }}>KES {(item.product.price * item.quantity).toLocaleString()}</span>
                          <button type="button" onClick={() => removeFromCart(item.product.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.3)", fontSize:".85rem", padding:2, lineHeight:1 }} title="Remove">✕</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding:"1.25rem 1.5rem", borderTop:"1px solid rgba(192,132,252,.1)", flexShrink:0, display:"flex", flexDirection:"column", gap:".875rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                  <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.5)", fontWeight:600 }}>SUBTOTAL</span>
                  <span className="display" style={{ fontSize:"1.6rem", color:"white" }}>KES {totalPrice.toLocaleString()}</span>
                </div>
                <button onClick={() => setStep("form")} style={{ padding:"1rem", background:"var(--g700)", color:"white", border:"none", borderRadius:"var(--radius-sm)", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".9rem", letterSpacing:".08em", textTransform:"uppercase" }}>
                  Place Order →
                </button>
                <button type="button" onClick={clearCart} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.25)", fontFamily:"DM Sans,sans-serif", fontSize:".75rem", letterSpacing:".08em", textTransform:"uppercase", textDecoration:"underline", textAlign:"center" }}>
                  Clear cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

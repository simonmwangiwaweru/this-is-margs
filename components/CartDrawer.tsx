"use client";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";

const WHATSAPP = "254736041184";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, isOpen, closeCart } = useCart();

  const waLines = items.map(i => `• ${i.product.name} x${i.quantity} — KES ${(i.product.price * i.quantity).toLocaleString()}`).join("%0A");
  const waMsg   = encodeURIComponent(`Hi THIS IS MARGS! I'd like to place an order:\n`) + waLines + encodeURIComponent(`\n\nTotal: KES ${totalPrice.toLocaleString()}`);
  const waUrl   = `https://wa.me/${WHATSAPP}?text=${waMsg}`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position:"fixed", inset:0, zIndex:200,
          background:"rgba(0,0,0,.55)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition:"opacity .3s ease",
        }}
      />

      {/* Drawer */}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, zIndex:201,
        width:"min(420px,100vw)",
        background:"#0a1f0f",
        borderLeft:"1px solid rgba(74,222,128,.12)",
        display:"flex", flexDirection:"column",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition:"transform .32s cubic-bezier(.4,0,.2,1)",
        boxShadow:"-8px 0 48px rgba(0,0,0,.5)",
      }}>

        {/* Header */}
        <div style={{ padding:"1.25rem 1.5rem", borderBottom:"1px solid rgba(74,222,128,.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--g400)" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="display" style={{ fontSize:"1.2rem", color:"white", letterSpacing:".06em" }}>YOUR CART</span>
            {totalItems > 0 && (
              <span style={{ background:"var(--amber)", color:"white", fontSize:".65rem", fontWeight:700, width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} style={{ background:"rgba(255,255,255,.07)", border:"none", cursor:"pointer", width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.7)", fontSize:"1.1rem" }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
          {items.length === 0 ? (
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.25rem", paddingTop:"3rem" }}>
              <div style={{ fontSize:"3.5rem", opacity:.35 }}>🛒</div>
              <p style={{ color:"rgba(255,255,255,.4)", fontSize:".95rem", textAlign:"center" }}>Your cart is empty.<br/>Add some products to get started!</p>
              <button onClick={closeCart} style={{ background:"transparent", border:"1.5px solid rgba(74,222,128,.35)", borderRadius:"var(--radius-sm)", color:"var(--g400)", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".8rem", letterSpacing:".1em", textTransform:"uppercase", padding:".7rem 1.6rem", cursor:"pointer" }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} style={{ display:"flex", gap:"1rem", padding:"1rem", background:"rgba(255,255,255,.04)", borderRadius:"var(--radius-sm)", border:"1px solid rgba(74,222,128,.08)" }}>
                {/* Image */}
                <div style={{ width:72, height:72, borderRadius:10, overflow:"hidden", flexShrink:0, position:"relative", background:"rgba(255,255,255,.06)" }}>
                  <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit:"cover" }} sizes="72px" />
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontWeight:700, fontSize:".88rem", color:"white", marginBottom:".2rem", lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.product.name}</p>
                  <p style={{ fontSize:".75rem", color:"rgba(255,255,255,.4)", marginBottom:".65rem" }}>KES {item.product.price.toLocaleString()} each</p>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    {/* Qty controls */}
                    <div style={{ display:"flex", alignItems:"center", border:"1px solid rgba(74,222,128,.2)", borderRadius:8, overflow:"hidden" }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ width:30, height:30, background:"rgba(255,255,255,.05)", border:"none", cursor:"pointer", color:"rgba(255,255,255,.8)", fontSize:"1rem", fontWeight:700 }}>−</button>
                      <span style={{ width:28, textAlign:"center", fontSize:".85rem", fontWeight:700, color:"white" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ width:30, height:30, background:"rgba(255,255,255,.05)", border:"none", cursor:"pointer", color:"rgba(255,255,255,.8)", fontSize:"1rem", fontWeight:700 }}>+</button>
                    </div>

                    {/* Line total + remove */}
                    <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                      <span className="display" style={{ fontSize:"1rem", color:"var(--amber)" }}>KES {(item.product.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(item.product.id)}
                        style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.3)", fontSize:".85rem", padding:2, lineHeight:1 }}
                        title="Remove">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding:"1.25rem 1.5rem", borderTop:"1px solid rgba(74,222,128,.1)", flexShrink:0, display:"flex", flexDirection:"column", gap:".875rem" }}>
            {/* Subtotal */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
              <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.5)", fontWeight:600 }}>SUBTOTAL</span>
              <span className="display" style={{ fontSize:"1.6rem", color:"white" }}>KES {totalPrice.toLocaleString()}</span>
            </div>

            {/* WhatsApp order button */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".6rem", padding:"1rem", borderRadius:"var(--radius-sm)", background:"#25D366", color:"white", textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".92rem", letterSpacing:".07em", textTransform:"uppercase" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </a>
            <p style={{ textAlign:"center", fontSize:".72rem", color:"rgba(255,255,255,.3)", margin:"-.25rem 0 0" }}>Chat with us to confirm & pay</p>

            <button onClick={clearCart} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.25)", fontFamily:"DM Sans,sans-serif", fontSize:".75rem", letterSpacing:".08em", textTransform:"uppercase", textDecoration:"underline", textAlign:"center" }}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

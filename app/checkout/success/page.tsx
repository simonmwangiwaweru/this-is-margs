import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed | THIS IS MARGS",
};

const WHATSAPP = "254736041184";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const shortId = id ? id.slice(0, 8).toUpperCase() : "—";
  const waMsg = encodeURIComponent(`Hi THIS IS MARGS! I just placed order #${shortId} on your website. Please confirm.`);

  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--gray-50)", padding:"3rem 1.5rem" }}>
      <div style={{ maxWidth:560, width:"100%", textAlign:"center" }}>

        {/* Success icon */}
        <div style={{ width:96, height:96, borderRadius:"50%", background:"linear-gradient(135deg,var(--g700),var(--g500))", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2rem", boxShadow:"0 16px 48px rgba(190,18,60,.3)" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <p className="label" style={{ marginBottom:".5rem" }}>Order Received</p>
        <h1 className="display" style={{ fontSize:"clamp(2.2rem,6vw,3.5rem)", color:"var(--gray-900)", marginBottom:".75rem", lineHeight:.95 }}>
          THANK YOU!
        </h1>
        <p style={{ fontSize:"1rem", color:"var(--text-soft)", lineHeight:1.75, marginBottom:"2rem" }}>
          Your order has been placed successfully. Our team will reach out on WhatsApp to confirm details and arrange delivery.
        </p>

        {/* Order ID */}
        {id && (
          <div style={{ background:"white", border:"1px solid var(--gray-200)", borderRadius:"var(--radius)", padding:"1.25rem 1.5rem", marginBottom:"2rem", display:"inline-block" }}>
            <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--text-soft)", marginBottom:".3rem" }}>Order Reference</p>
            <p className="display" style={{ fontSize:"1.6rem", color:"var(--g700)", letterSpacing:".1em" }}>#{shortId}</p>
          </div>
        )}

        {/* What happens next */}
        <div style={{ background:"white", borderRadius:"var(--radius)", border:"1px solid var(--gray-100)", padding:"1.75rem", marginBottom:"2rem", textAlign:"left" }}>
          <p style={{ fontWeight:700, fontSize:".9rem", color:"var(--gray-900)", marginBottom:"1.1rem" }}>What happens next?</p>
          {[
            ["💬", "WhatsApp confirmation", "We'll message you within 30 minutes to confirm your order."],
            ["🚚", "Dispatch", "Orders confirmed before 2pm are dispatched same day in Nairobi."],
            ["📦", "Delivery", "You'll receive a tracking update when your order is on the way."],
          ].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ display:"flex", gap:".875rem", marginBottom:".875rem" }}>
              <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{icon}</span>
              <div>
                <p style={{ fontWeight:700, fontSize:".85rem", color:"var(--gray-900)" }}>{title}</p>
                <p style={{ fontSize:".78rem", color:"var(--text-soft)", marginTop:".1rem" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", padding:"1rem", borderRadius:"var(--radius-sm)", background:"#25D366", color:"white", textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".88rem", letterSpacing:".07em", textTransform:"uppercase" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Confirm on WhatsApp
          </a>
          <Link href="/shop" className="btn btn-outline-red" style={{ padding:"1rem" }}>
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

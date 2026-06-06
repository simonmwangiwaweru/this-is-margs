import type { Metadata } from "next";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = { title: "Dashboard | MARGS Admin" };

export default async function DashboardPage() {
  const [{ data: orders }, { data: products }, { data: subscribers }] = await Promise.all([
    supabaseAdmin.from("orders").select("status, total, created_at").order("created_at", { ascending: false }),
    supabaseAdmin.from("products").select("id, active, featured"),
    supabaseAdmin.from("newsletter_subscribers").select("id"),
  ]);

  const o = orders ?? [];
  const p = products ?? [];

  const stats = [
    { label:"Total Orders",    value: o.length,                                                                   color:"var(--g700)",  href:"/admin/dashboard/orders" },
    { label:"Revenue (KES)",   value: `${o.filter(x => ["paid","dispatched","delivered"].includes(x.status)).reduce((s,x)=>s+x.total,0).toLocaleString()}`, color:"#15803D", href:"/admin/dashboard/orders" },
    { label:"Pending Orders",  value: o.filter(x=>x.status==="pending").length,                                   color:"#D97706",      href:"/admin/dashboard/orders" },
    { label:"Active Products", value: p.filter(x=>x.active).length,                                              color:"#7C3AED",      href:"/admin/dashboard/products" },
    { label:"Subscribers",     value: (subscribers ?? []).length,                                                 color:"#0369A1",      href:"/admin/dashboard/subscribers" },
  ];

  const recent = o.slice(0, 5);

  return (
    <div style={{ padding:"2rem" }}>
      <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)", marginBottom:"2rem" }}>OVERVIEW</h1>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"2.5rem" }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration:"none" }}>
            <div className="card" style={{ padding:"1.5rem", textAlign:"center", cursor:"pointer" }}>
              <p style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"var(--text-soft)", marginBottom:".4rem" }}>{s.label}</p>
              <p className="display" style={{ fontSize:"2rem", color:s.color, lineHeight:1 }}>{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem", marginBottom:"2.5rem" }}>
        {[
          { href:"/admin/dashboard/products/new", label:"+ Add Product",   color:"var(--g700)", bg:"var(--g50)" },
          { href:"/admin/dashboard/content",      label:"✏️ Edit Content",  color:"#1D4ED8",     bg:"#EFF6FF" },
          { href:"/admin/dashboard/orders",       label:"📦 View Orders",   color:"#D97706",     bg:"#FFFBEB" },
        ].map(a => (
          <Link key={a.href} href={a.href} style={{ display:"block", padding:"1.25rem", borderRadius:"var(--radius)", background:a.bg, border:`1px solid ${a.color}22`, textDecoration:"none", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".9rem", color:a.color, textAlign:"center" }}>
            {a.label}
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      {recent.length > 0 && (
        <div className="card" style={{ padding:"1.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h3 className="serif" style={{ fontWeight:700, fontSize:"1rem", color:"var(--gray-900)" }}>Recent Orders</h3>
            <Link href="/admin/dashboard/orders" style={{ fontSize:".78rem", color:"var(--g700)", textDecoration:"none", fontWeight:600 }}>View all →</Link>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:".75rem" }}>
            {recent.map((order: any) => (
              <div key={order.created_at} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:".75rem", background:"var(--gray-50)", borderRadius:"var(--radius-sm)" }}>
                <div>
                  <p style={{ fontSize:".82rem", fontWeight:600, color:"var(--gray-900)" }}>
                    {new Date(order.created_at).toLocaleDateString("en-KE", { day:"2-digit", month:"short" })}
                  </p>
                  <p style={{ fontSize:".72rem", color:"var(--text-soft)" }}>KES {order.total?.toLocaleString()}</p>
                </div>
                <span style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".2rem .7rem", borderRadius:99, background: order.status==="paid"?"#D1FAE5":order.status==="pending"?"#FEF3C7":"#E0E7FF", color: order.status==="paid"?"#065F46":order.status==="pending"?"#92400E":"#3730A3" }}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

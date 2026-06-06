"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions/admin";

const NAV = [
  { href:"/admin/dashboard",           label:"Overview",    icon:"📊" },
  { href:"/admin/dashboard/products",  label:"Products",    icon:"🛍️" },
  { href:"/admin/dashboard/content",   label:"Content",     icon:"📝" },
  { href:"/admin/dashboard/orders",    label:"Orders",      icon:"📦" },
  { href:"/admin/dashboard/subscribers", label:"Subscribers", icon:"📧" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width:220, background:"linear-gradient(180deg,var(--g950) 0%,#021A0A 100%)", borderRight:"1px solid rgba(74,222,128,.1)", display:"flex", flexDirection:"column", flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto" }}>
      {/* Logo */}
      <div style={{ padding:"1.5rem 1.25rem", borderBottom:"1px solid rgba(74,222,128,.1)" }}>
        <div className="display" style={{ fontSize:"1.1rem", background:"linear-gradient(135deg,var(--g400),#fb7185)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".06em" }}>
          THIS IS MARGS
        </div>
        <div style={{ fontSize:".62rem", color:"rgba(255,255,255,.3)", letterSpacing:".18em", textTransform:"uppercase", marginTop:".15rem" }}>
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"1rem .75rem", display:"flex", flexDirection:"column", gap:".25rem" }}>
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display:"flex", alignItems:"center", gap:".75rem",
              padding:".65rem .875rem", borderRadius:"var(--radius-sm)",
              textDecoration:"none", fontSize:".85rem", fontWeight:600,
              fontFamily:"DM Sans,sans-serif",
              background: active ? "rgba(74,222,128,.12)" : "transparent",
              color: active ? "var(--g400)" : "rgba(255,255,255,.55)",
              border: active ? "1px solid rgba(74,222,128,.2)" : "1px solid transparent",
              transition:"all .18s",
            }}>
              <span style={{ fontSize:"1rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding:"1rem .75rem", borderTop:"1px solid rgba(74,222,128,.1)" }}>
        <form action={adminLogout}>
          <button type="submit" style={{ width:"100%", display:"flex", alignItems:"center", gap:".75rem", padding:".65rem .875rem", borderRadius:"var(--radius-sm)", background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.15)", color:"rgba(252,165,165,.8)", fontFamily:"DM Sans,sans-serif", fontSize:".82rem", fontWeight:600, cursor:"pointer", transition:"all .18s" }}>
            <span>🚪</span> Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}

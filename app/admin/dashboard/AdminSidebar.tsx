"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions/admin";

const NAV = [
  { href:"/admin/dashboard",             label:"Overview",    icon:"📊" },
  { href:"/admin/dashboard/products",    label:"Products",    icon:"🛍️" },
  { href:"/admin/dashboard/content",     label:"Content",     icon:"📝" },
  { href:"/admin/dashboard/orders",      label:"Orders",      icon:"📦" },
  { href:"/admin/dashboard/subscribers", label:"Subscribers", icon:"📧" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div style={{ padding:"1.5rem 1.25rem", borderBottom:"1px solid rgba(192,132,252,.12)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div className="display" style={{ fontSize:"1.1rem", background:"linear-gradient(135deg,var(--g400),var(--g300))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".06em" }}>
            THIS IS MARGS
          </div>
          <div style={{ fontSize:".62rem", color:"rgba(255,255,255,.3)", letterSpacing:".18em", textTransform:"uppercase", marginTop:".15rem" }}>
            Admin Panel
          </div>
        </div>
        {/* Close button (mobile only) */}
        <button onClick={() => setOpen(false)} className="sidebar-close" style={{ background:"rgba(255,255,255,.07)", border:"none", cursor:"pointer", width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.6)", fontSize:"1rem" }}>✕</button>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"1rem .75rem", display:"flex", flexDirection:"column", gap:".25rem" }}>
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display:"flex", alignItems:"center", gap:".75rem",
              padding:".75rem .875rem", borderRadius:"var(--radius-sm)",
              textDecoration:"none", fontSize:".9rem", fontWeight:600,
              fontFamily:"DM Sans,sans-serif",
              background: active ? "rgba(192,132,252,.14)" : "transparent",
              color: active ? "var(--g400)" : "rgba(255,255,255,.6)",
              border: active ? "1px solid rgba(192,132,252,.22)" : "1px solid transparent",
              transition:"all .18s",
            }}>
              <span style={{ fontSize:"1.1rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding:"1rem .75rem", borderTop:"1px solid rgba(192,132,252,.12)" }}>
        <form action={adminLogout}>
          <button type="submit" style={{ width:"100%", display:"flex", alignItems:"center", gap:".75rem", padding:".75rem .875rem", borderRadius:"var(--radius-sm)", background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.15)", color:"rgba(252,165,165,.8)", fontFamily:"DM Sans,sans-serif", fontSize:".88rem", fontWeight:600, cursor:"pointer" }}>
            <span>🚪</span> Log Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* ── MOBILE TOP BAR ── */}
      <div className="admin-topbar">
        <div className="display" style={{ fontSize:"1rem", background:"linear-gradient(135deg,var(--g400),var(--g300))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".06em" }}>
          THIS IS MARGS
        </div>
        <button onClick={() => setOpen(true)} style={{ background:"rgba(192,132,252,.12)", border:"1px solid rgba(192,132,252,.22)", borderRadius:8, cursor:"pointer", width:40, height:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, padding:8 }}>
          {[0,1,2].map(i => <span key={i} style={{ display:"block", width:18, height:2, background:"var(--g400)", borderRadius:2 }} />)}
        </button>
      </div>

      {/* ── MOBILE BACKDROP ── */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.6)", zIndex:298, backdropFilter:"blur(2px)" }} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar${open ? " admin-sidebar-open" : ""}`} style={{ background:"linear-gradient(180deg,#1A0533 0%,#0D0521 100%)", borderRight:"1px solid rgba(192,132,252,.12)", display:"flex", flexDirection:"column", flexShrink:0 }}>
        {sidebarContent}
      </aside>

      <style>{`
        /* Desktop: normal sticky sidebar */
        .admin-sidebar {
          width: 220px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .admin-topbar { display: none; }
        .sidebar-close { display: none !important; }

        /* Mobile: top bar + slide-in overlay */
        @media (max-width: 768px) {
          .admin-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 299;
            background: #1A0533;
            padding: .875rem 1.25rem;
            border-bottom: 1px solid rgba(192,132,252,.15);
            height: 60px;
          }
          .admin-sidebar {
            position: fixed !important;
            top: 0; left: 0; bottom: 0;
            z-index: 300;
            width: 260px;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform .3s cubic-bezier(.4,0,.2,1);
            box-shadow: 8px 0 48px rgba(0,0,0,.5);
          }
          .admin-sidebar.admin-sidebar-open {
            transform: translateX(0);
          }
          .sidebar-close { display: flex !important; }
          .admin-main-content { padding-top: 60px !important; }
        }
      `}</style>
    </>
  );
}

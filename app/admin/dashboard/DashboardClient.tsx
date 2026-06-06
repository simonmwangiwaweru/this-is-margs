"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminLogout, updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@/lib/database.types";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_address: string;
  status: OrderStatus;
  total: number;
  mpesa_ref: string | null;
  notes: string | null;
  order_items: { product_name: string; quantity: number; price: number }[];
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
  pending:    { bg:"#FEF3C7", color:"#92400E" },
  paid:       { bg:"#D1FAE5", color:"#065F46" },
  dispatched: { bg:"#DBEAFE", color:"#1E40AF" },
  delivered:  { bg:"#F3E8FF", color:"#6B21A8" },
  cancelled:  { bg:"#FEE2E2", color:"#991B1B" },
};

const ALL_STATUSES: OrderStatus[] = ["pending", "paid", "dispatched", "delivered", "cancelled"];

function StatusBadge({ status }: { status: OrderStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{ display:"inline-block", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".2rem .7rem", borderRadius:99, background:c.bg, color:c.color }}>
      {status}
    </span>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleStatus = (status: OrderStatus) => {
    startTransition(async () => {
      await updateOrderStatus(order.id, status);
      router.refresh();
    });
  };

  const shortId  = order.id.slice(0, 8).toUpperCase();
  const date     = new Date(order.created_at).toLocaleDateString("en-KE", { day:"2-digit", month:"short", year:"numeric" });
  const itemsStr = order.order_items.map(i => `${i.product_name} ×${i.quantity}`).join(", ");

  return (
    <>
      <tr style={{ borderBottom:"1px solid var(--gray-100)", cursor:"pointer" }} onClick={() => setOpen(o => !o)}>
        <td style={{ padding:".875rem 1rem", fontSize:".82rem", fontWeight:700, color:"var(--g700)", whiteSpace:"nowrap" }}>#{shortId}</td>
        <td style={{ padding:".875rem 1rem" }}>
          <p style={{ fontWeight:700, fontSize:".88rem", color:"var(--gray-900)" }}>{order.customer_name}</p>
          <p style={{ fontSize:".75rem", color:"var(--text-soft)" }}>{order.customer_phone}</p>
        </td>
        <td style={{ padding:".875rem 1rem", fontSize:".8rem", color:"var(--text-soft)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{order.delivery_address}</td>
        <td style={{ padding:".875rem 1rem", fontSize:".78rem", color:"var(--gray-700)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{itemsStr}</td>
        <td style={{ padding:".875rem 1rem", fontWeight:700, fontSize:".9rem", color:"var(--g700)", whiteSpace:"nowrap" }}>KES {order.total.toLocaleString()}</td>
        <td style={{ padding:".875rem 1rem" }}><StatusBadge status={order.status} /></td>
        <td style={{ padding:".875rem 1rem", fontSize:".75rem", color:"var(--text-soft)", whiteSpace:"nowrap" }}>{date}</td>
        <td style={{ padding:".875rem 1rem" }} onClick={e => e.stopPropagation()}>
          <select
            value={order.status}
            disabled={isPending}
            onChange={e => handleStatus(e.target.value as OrderStatus)}
            style={{ fontSize:".78rem", padding:".35rem .6rem", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", background:"white", cursor:"pointer", color:"var(--gray-700)", fontFamily:"DM Sans,sans-serif" }}>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </td>
      </tr>

      {/* Expanded row */}
      {open && (
        <tr style={{ background:"var(--gray-50)" }}>
          <td colSpan={8} style={{ padding:"1rem 1.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem", fontSize:".82rem" }}>
              {order.customer_email && (
                <div><span style={{ color:"var(--text-soft)", fontWeight:600 }}>Email: </span>{order.customer_email}</div>
              )}
              {order.mpesa_ref && (
                <div><span style={{ color:"var(--text-soft)", fontWeight:600 }}>M-Pesa Ref: </span>{order.mpesa_ref}</div>
              )}
              {order.notes && (
                <div style={{ gridColumn:"1/-1" }}><span style={{ color:"var(--text-soft)", fontWeight:600 }}>Notes: </span>{order.notes}</div>
              )}
              <div>
                <span style={{ color:"var(--text-soft)", fontWeight:600 }}>Items: </span>
                {order.order_items.map(i => (
                  <span key={i.product_name} style={{ display:"block", marginTop:".2rem" }}>
                    {i.product_name} ×{i.quantity} — KES {(i.price * i.quantity).toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function DashboardClient({
  orders,
  subscribers,
  stats,
}: {
  orders:      Order[];
  subscribers: Subscriber[];
  stats: { total: number; revenue: number; pending: number; subscribers: number };
}) {
  const [tab,    setTab]    = useState<"orders"|"subscribers">("orders");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [isPending, startTransition] = useTransition();

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const STAT_CARDS = [
    { label:"Total Orders",      value: stats.total,                         color:"var(--g700)" },
    { label:"Revenue",           value:`KES ${stats.revenue.toLocaleString()}`, color:"#15803D" },
    { label:"Pending",           value: stats.pending,                        color:"#D97706" },
    { label:"Subscribers",       value: stats.subscribers,                    color:"#7C3AED" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--gray-50)" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,var(--g950),var(--g900))", borderBottom:"1px solid rgba(251,113,133,.15)", padding:"0 1.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span className="display" style={{ fontSize:"1.4rem", background:"linear-gradient(135deg,var(--g400),#fb7185)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".07em" }}>
              THIS IS MARGS
            </span>
            <span style={{ fontSize:".65rem", color:"rgba(255,255,255,.3)", letterSpacing:".18em", textTransform:"uppercase", marginLeft:".75rem" }}>
              Admin
            </span>
          </div>
          <form action={adminLogout}>
            <button type="submit" style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:"var(--radius-sm)", padding:".45rem 1rem", color:"rgba(255,255,255,.7)", fontFamily:"DM Sans,sans-serif", fontSize:".78rem", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer" }}>
              Log Out
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"2rem 1.5rem" }}>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {STAT_CARDS.map(s => (
            <div key={s.label} className="card" style={{ padding:"1.5rem", textAlign:"center" }}>
              <p style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"var(--text-soft)", marginBottom:".4rem" }}>{s.label}</p>
              <p className="display" style={{ fontSize:"2rem", color: s.color, lineHeight:1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:0, borderBottom:"2px solid var(--gray-200)", marginBottom:"1.5rem" }}>
          {(["orders","subscribers"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:".875rem 1.75rem", background:"none", border:"none", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".85rem", letterSpacing:".08em", textTransform:"uppercase", color: tab===t ? "var(--g700)" : "var(--text-soft)", borderBottom: tab===t ? "3px solid var(--g700)" : "3px solid transparent", marginBottom:"-2px", transition:"color .2s" }}>
              {t === "orders" ? `Orders (${orders.length})` : `Subscribers (${subscribers.length})`}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab === "orders" && (
          <>
            {/* Status filter */}
            <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
              {(["all", ...ALL_STATUSES] as const).map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  style={{ padding:".38rem 1rem", borderRadius:99, fontSize:".78rem", fontWeight:600, border:`1.5px solid ${filter===s ? "var(--g600)" : "var(--gray-200)"}`, background: filter===s ? "var(--g600)" : "white", color: filter===s ? "white" : "var(--gray-700)", cursor:"pointer", fontFamily:"DM Sans,sans-serif", transition:"all .18s" }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)} {s !== "all" && `(${orders.filter(o => o.status===s).length})`}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-soft)" }}>No orders found.</div>
            ) : (
              <div style={{ background:"white", borderRadius:"var(--radius)", border:"1px solid var(--gray-100)", overflow:"auto", boxShadow:"var(--shadow-sm)" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ borderBottom:"2px solid var(--gray-100)", background:"var(--gray-50)" }}>
                      {["Ref","Customer","Address","Items","Total","Status","Date","Update"].map(h => (
                        <th key={h} style={{ padding:".75rem 1rem", textAlign:"left", fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-soft)", whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(o => <OrderRow key={o.id} order={o} />)}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Subscribers tab */}
        {tab === "subscribers" && (
          <div style={{ background:"white", borderRadius:"var(--radius)", border:"1px solid var(--gray-100)", overflow:"auto", boxShadow:"var(--shadow-sm)" }}>
            {subscribers.length === 0 ? (
              <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-soft)" }}>No subscribers yet.</div>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"2px solid var(--gray-100)", background:"var(--gray-50)" }}>
                    {["#","Email","Subscribed On"].map(h => (
                      <th key={h} style={{ padding:".75rem 1rem", textAlign:"left", fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-soft)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom:"1px solid var(--gray-100)" }}>
                      <td style={{ padding:".875rem 1rem", fontSize:".82rem", color:"var(--text-soft)" }}>{i + 1}</td>
                      <td style={{ padding:".875rem 1rem", fontSize:".88rem", fontWeight:600, color:"var(--gray-900)" }}>{s.email}</td>
                      <td style={{ padding:".875rem 1rem", fontSize:".78rem", color:"var(--text-soft)" }}>
                        {new Date(s.created_at).toLocaleDateString("en-KE", { day:"2-digit", month:"short", year:"numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

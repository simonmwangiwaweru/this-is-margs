"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@/lib/database.types";

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
  pending:    { bg:"#FEF3C7", color:"#92400E" },
  paid:       { bg:"#D1FAE5", color:"#065F46" },
  dispatched: { bg:"#DBEAFE", color:"#1E40AF" },
  delivered:  { bg:"#F3E8FF", color:"#6B21A8" },
  cancelled:  { bg:"#FEE2E2", color:"#991B1B" },
};
const ALL_STATUSES: OrderStatus[] = ["pending","paid","dispatched","delivered","cancelled"];

function StatusBadge({ status }: { status: OrderStatus }) {
  const c = STATUS_COLORS[status];
  return <span style={{ display:"inline-block", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".2rem .7rem", borderRadius:99, background:c.bg, color:c.color }}>{status}</span>;
}

function OrderRow({ order }: { order: any }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const shortId = order.id.slice(0,8).toUpperCase();
  const date    = new Date(order.created_at).toLocaleDateString("en-KE", { day:"2-digit", month:"short", year:"numeric" });
  const items   = order.order_items?.map((i: any) => `${i.product_name} ×${i.quantity}`).join(", ") ?? "";

  const handleStatus = (status: OrderStatus) => {
    startTransition(async () => { await updateOrderStatus(order.id, status); router.refresh(); });
  };

  return (
    <>
      <tr style={{ borderBottom:"1px solid var(--gray-100)", cursor:"pointer" }} onClick={() => setOpen(o => !o)}>
        <td style={{ padding:".875rem 1rem", fontSize:".82rem", fontWeight:700, color:"var(--g700)", whiteSpace:"nowrap" }}>#{shortId}</td>
        <td style={{ padding:".875rem 1rem" }}>
          <p style={{ fontWeight:700, fontSize:".88rem", color:"var(--gray-900)" }}>{order.customer_name}</p>
          <p style={{ fontSize:".75rem", color:"var(--text-soft)" }}>{order.customer_phone}</p>
        </td>
        <td style={{ padding:".875rem 1rem", fontSize:".8rem", color:"var(--text-soft)", maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{order.delivery_address}</td>
        <td style={{ padding:".875rem 1rem", fontSize:".78rem", color:"var(--gray-700)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{items}</td>
        <td style={{ padding:".875rem 1rem", fontWeight:700, fontSize:".9rem", color:"var(--g700)", whiteSpace:"nowrap" }}>KES {order.total?.toLocaleString()}</td>
        <td style={{ padding:".875rem 1rem" }}><StatusBadge status={order.status} /></td>
        <td style={{ padding:".875rem 1rem", fontSize:".75rem", color:"var(--text-soft)", whiteSpace:"nowrap" }}>{date}</td>
        <td style={{ padding:".875rem 1rem" }} onClick={e => e.stopPropagation()}>
          <select value={order.status} disabled={isPending} onChange={e => handleStatus(e.target.value as OrderStatus)} style={{ fontSize:".78rem", padding:".35rem .6rem", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", background:"white", cursor:"pointer", fontFamily:"DM Sans,sans-serif" }}>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
        </td>
      </tr>
      {open && (
        <tr style={{ background:"var(--gray-50)" }}>
          <td colSpan={8} style={{ padding:"1rem 1.5rem", fontSize:".82rem" }}>
            {order.customer_email && <p><strong>Email:</strong> {order.customer_email}</p>}
            {order.mpesa_ref      && <p><strong>M-Pesa Ref:</strong> {order.mpesa_ref}</p>}
            {order.notes          && <p><strong>Notes:</strong> {order.notes}</p>}
          </td>
        </tr>
      )}
    </>
  );
}

export default function OrdersClient({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <>
      <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
        {(["all", ...ALL_STATUSES] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding:".38rem 1rem", borderRadius:99, fontSize:".78rem", fontWeight:600, border:`1.5px solid ${filter===s?"var(--g600)":"var(--gray-200)"}`, background:filter===s?"var(--g600)":"white", color:filter===s?"white":"var(--gray-700)", cursor:"pointer", fontFamily:"DM Sans,sans-serif" }}>
            {s.charAt(0).toUpperCase()+s.slice(1)} {s!=="all"&&`(${orders.filter(o=>o.status===s).length})`}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-soft)" }}>No orders found.</div>
      ) : (
        <div style={{ background:"white", borderRadius:"var(--radius)", border:"1px solid var(--gray-100)", overflow:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--gray-100)", background:"var(--gray-50)" }}>
                {["Ref","Customer","Address","Items","Total","Status","Date","Update"].map(h => (
                  <th key={h} style={{ padding:".75rem 1rem", textAlign:"left", fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-soft)", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>{filtered.map(o => <OrderRow key={o.id} order={o} />)}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

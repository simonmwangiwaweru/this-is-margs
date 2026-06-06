import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata = { title: "Subscribers | MARGS Admin" };

export default async function SubscribersPage() {
  const { data: subscribers } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const all = subscribers ?? [];

  return (
    <div style={{ padding:"2rem" }}>
      <div style={{ marginBottom:"2rem" }}>
        <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>SUBSCRIBERS</h1>
        <p style={{ fontSize:".85rem", color:"var(--text-soft)", marginTop:".25rem" }}>{all.length} newsletter subscribers</p>
      </div>

      {all.length === 0 ? (
        <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-soft)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>📧</div>
          <p>No subscribers yet. Share your website to grow your list!</p>
        </div>
      ) : (
        <div style={{ background:"white", borderRadius:"var(--radius)", border:"1px solid var(--gray-100)", overflow:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:"2px solid var(--gray-100)", background:"var(--gray-50)" }}>
                {["#","Email","Subscribed On"].map(h => (
                  <th key={h} style={{ padding:".75rem 1rem", textAlign:"left", fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-soft)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {all.map((s: any, i: number) => (
                <tr key={s.id} style={{ borderBottom:"1px solid var(--gray-100)" }}>
                  <td style={{ padding:".875rem 1rem", fontSize:".82rem", color:"var(--text-soft)" }}>{i+1}</td>
                  <td style={{ padding:".875rem 1rem", fontSize:".88rem", fontWeight:600, color:"var(--gray-900)" }}>{s.email}</td>
                  <td style={{ padding:".875rem 1rem", fontSize:".78rem", color:"var(--text-soft)" }}>
                    {new Date(s.created_at).toLocaleDateString("en-KE", { day:"2-digit", month:"short", year:"numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

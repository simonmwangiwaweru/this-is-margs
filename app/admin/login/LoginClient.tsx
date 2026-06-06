"use client";
import { useActionState } from "react";
import { adminLogin } from "@/app/actions/admin";

export default function LoginClient() {
  const [state, action, pending] = useActionState(adminLogin, undefined);

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(150deg,var(--g950) 0%,#3A0D18 50%,var(--g900) 100%)", padding:"2rem" }}>
      <div style={{ width:"100%", maxWidth:380 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <p className="display" style={{ fontSize:"2rem", background:"linear-gradient(135deg,var(--g400),#fb7185)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:".07em" }}>
            THIS IS MARGS
          </p>
          <p style={{ fontSize:".72rem", color:"rgba(255,255,255,.35)", letterSpacing:".22em", textTransform:"uppercase", marginTop:".2rem" }}>
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(251,113,133,.15)", borderRadius:"var(--radius-lg)", padding:"2.5rem 2rem", backdropFilter:"blur(12px)" }}>
          <h1 className="serif" style={{ fontSize:"1.35rem", fontWeight:700, color:"white", textAlign:"center", marginBottom:"2rem" }}>
            Sign In
          </h1>

          <form action={action} style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div>
              <label style={{ display:"block", fontSize:".78rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.5)", marginBottom:".5rem" }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoFocus
                placeholder="Enter admin password"
                className="input"
                style={{ background:"rgba(255,255,255,.07)", border:"1.5px solid rgba(251,113,133,.2)", color:"white" }}
              />
            </div>

            {state?.error && (
              <p style={{ fontSize:".82rem", color:"#FCA5A5", background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", borderRadius:"var(--radius-sm)", padding:".75rem 1rem" }}>
                ⚠️ {state.error}
              </p>
            )}

            <button type="submit" disabled={pending} className="btn btn-red" style={{ padding:"1rem", width:"100%", opacity: pending ? .7 : 1, cursor: pending ? "not-allowed" : "pointer" }}>
              {pending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign:"center", fontSize:".72rem", color:"rgba(255,255,255,.2)", marginTop:"1.5rem" }}>
          This area is restricted to authorised personnel only.
        </p>
      </div>
    </div>
  );
}

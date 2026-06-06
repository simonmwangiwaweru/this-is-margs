"use client";
import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email,   setEmail]   = useState("");
  const [state,   setState]   = useState<State>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    const result = await subscribeNewsletter(email);

    if ("error" in result) {
      setState("error");
      setMessage(result.error);
    } else {
      setState("success");
      setEmail("");
    }
  };

  if (state === "success") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem" }}>
          🎉
        </div>
        <p style={{ fontSize:"1.05rem", fontWeight:700, color:"white" }}>You&apos;re in!</p>
        <p style={{ fontSize:".88rem", color:"rgba(255,255,255,.75)", textAlign:"center", lineHeight:1.65 }}>
          Welcome to the MARGS family. Use code{" "}
          <span style={{ background:"var(--amber)", color:"white", fontWeight:700, padding:".15rem .6rem", borderRadius:6, fontFamily:"monospace", letterSpacing:".06em" }}>
            HEALTHY10
          </span>{" "}
          for 10% off your first order.
        </p>
        <button
          onClick={() => { setState("idle"); setMessage(""); }}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:".75rem", color:"rgba(255,255,255,.35)", textDecoration:"underline", fontFamily:"DM Sans,sans-serif" }}>
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display:"flex", gap:".75rem", flexWrap:"wrap", justifyContent:"center" }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          placeholder="Enter your email address"
          className="input"
          style={{ flex:1, minWidth:220, maxWidth:340 }}
          disabled={state === "loading"}
        />
        <button
          type="submit"
          className="btn btn-amber"
          disabled={state === "loading"}
          style={{ padding:".9rem 2rem", opacity: state === "loading" ? .7 : 1, cursor: state === "loading" ? "not-allowed" : "pointer" }}>
          {state === "loading" ? (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:"spin .8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Subscribing…</>
          ) : "Subscribe"}
        </button>
      </form>

      {state === "error" && (
        <p style={{ fontSize:".8rem", color:"#FCA5A5", marginTop:".6rem" }}>⚠️ {message}</p>
      )}

      <p style={{ fontSize:".74rem", color:"rgba(255,255,255,.38)", marginTop:".875rem" }}>
        No spam. Unsubscribe anytime.
      </p>

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </>
  );
}

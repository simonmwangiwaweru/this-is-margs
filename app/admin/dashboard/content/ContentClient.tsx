"use client";
import { useState } from "react";
import { updateManyContent } from "@/app/actions/content";

const SECTIONS = [
  {
    title: "About Page",
    fields: [
      { key:"about_hero_title", label:"Hero Title",  type:"input",    placeholder:"WE BELIEVE WELLNESS SHOULD BE NATURAL" },
      { key:"about_story",     label:"Brand Story",  type:"textarea", placeholder:"Tell the story of THIS IS MARGS..." },
      { key:"about_mission",   label:"Mission",      type:"textarea", placeholder:"Our mission is..." },
      { key:"about_founded",   label:"Year Founded", type:"input",    placeholder:"2020" },
    ],
  },
  {
    title: "Contact Details",
    fields: [
      { key:"contact_address", label:"Physical Address", type:"input", placeholder:"Westlands, Nairobi..." },
      { key:"contact_phone",   label:"Phone / WhatsApp", type:"input", placeholder:"+254 736 041 184" },
      { key:"contact_email",   label:"Email Address",    type:"input", placeholder:"hello@thisismargs.co.ke" },
      { key:"contact_hours",   label:"Opening Hours",    type:"input", placeholder:"Mon–Sat 8am–7pm EAT" },
    ],
  },
];

export default function ContentClient({ content }: { content: Record<string, string> }) {
  const [values,  setValues]  = useState<Record<string, string>>(content);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");

  const set = (key: string, val: string) => {
    setValues(v => ({ ...v, [key]: val }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const result = await updateManyContent(values);
    setSaving(false);
    if (result?.error) { setError(result.error); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = { width:"100%", padding:".75rem 1rem", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", fontSize:".9rem", fontFamily:"DM Sans,sans-serif", color:"var(--gray-900)", background:"white", outline:"none" };
  const labelStyle = { display:"block" as const, fontSize:".75rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase" as const, color:"var(--gray-600)", marginBottom:".4rem" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", maxWidth:780 }}>
      {SECTIONS.map(section => (
        <div key={section.title} className="card" style={{ padding:"2rem" }}>
          <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>{section.title}</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
            {section.fields.map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={5}
                    style={{ ...inputStyle, resize:"vertical" }}
                    value={values[f.key] ?? ""}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                ) : (
                  <input
                    style={inputStyle}
                    value={values[f.key] ?? ""}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div style={{ padding:"1rem", background:"#FFF1F2", border:"1px solid #FECDD3", borderRadius:"var(--radius-sm)", color:"var(--g700)", fontSize:".88rem" }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-red" style={{ padding:"1rem 2.5rem", opacity: saving ? .7 : 1 }}>
          {saving ? "Saving…" : "Save All Changes"}
        </button>
        {saved && <span style={{ fontSize:".85rem", color:"#15803D", fontWeight:600 }}>✓ Saved successfully</span>}
      </div>
    </div>
  );
}

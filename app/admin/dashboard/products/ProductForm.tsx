"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, type ProductPayload } from "@/app/actions/products";

const CATEGORIES = ["Alkaline","Coffee & Tea","Vitamins","Bone & Joint","Gut Health","Skin & Beauty"];
const BADGES     = ["","Best Seller","Top Rated","New","Premium","Save KES 500","Save KES 1,000","20% OFF","Pure & Natural"];

interface Props {
  product?: ProductPayload & { id: number };
}

export default function ProductForm({ product }: Props) {
  const router  = useRouter();
  const isEdit  = !!product;

  const [form, setForm] = useState<ProductPayload>({
    name:           product?.name           ?? "",
    description:    product?.description    ?? "",
    price:          product?.price          ?? 0,
    original_price: product?.original_price ?? null,
    category:       product?.category       ?? "Vitamins",
    image_url:      product?.image_url      ?? "",
    badge:          product?.badge          ?? "",
    rating:         product?.rating         ?? 5.0,
    reviews:        product?.reviews        ?? 0,
    benefits:       product?.benefits       ?? [],
    active:         product?.active         ?? true,
    featured:       product?.featured       ?? false,
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [uploading,    setUploading]    = useState(false);
  const [uploadError,  setUploadError]  = useState("");

  const set = <K extends keyof ProductPayload>(k: K, v: ProductPayload[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const addBenefit = () => {
    const b = benefitInput.trim();
    if (b && !form.benefits.includes(b)) {
      set("benefits", [...form.benefits, b]);
      setBenefitInput("");
    }
  };

  const removeBenefit = (b: string) =>
    set("benefits", form.benefits.filter(x => x !== b));

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (json.error) { setUploadError(json.error); return; }
    set("image_url", json.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { ...form, badge: form.badge || null } as unknown as ProductPayload;
    const result  = isEdit
      ? await updateProduct(product.id, payload)
      : await createProduct(payload);

    setLoading(false);
    if (result?.error) { setError(result.error); return; }
    router.push("/admin/dashboard/products");
    router.refresh();
  };

  const inputStyle = { width:"100%", padding:".75rem 1rem", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", fontSize:".9rem", fontFamily:"DM Sans,sans-serif", color:"var(--gray-900)", background:"white", outline:"none" };
  const labelStyle = { display:"block" as const, fontSize:".75rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase" as const, color:"var(--gray-600)", marginBottom:".4rem" };

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.5rem", maxWidth:780 }}>

      {/* Basic info */}
      <div className="card" style={{ padding:"2rem" }}>
        <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>Basic Information</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div>
            <label style={labelStyle}>Product Name *</label>
            <input required style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Cordyceps Coffee" />
          </div>
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea required rows={4} style={{ ...inputStyle, resize:"vertical" }} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the product, ingredients, and size..." />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select required style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Badge</label>
              <select style={inputStyle} value={form.badge ?? ""} onChange={e => set("badge", e.target.value)}>
                {BADGES.map(b => <option key={b} value={b}>{b || "— None —"}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card" style={{ padding:"2rem" }}>
        <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>Pricing</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          <div>
            <label style={labelStyle}>Price (KES) *</label>
            <input required type="number" min={0} style={inputStyle} value={form.price} onChange={e => set("price", Number(e.target.value))} placeholder="3000" />
          </div>
          <div>
            <label style={labelStyle}>Original Price (KES) <span style={{ fontWeight:400, textTransform:"none" }}>— optional, for sale badge</span></label>
            <input type="number" min={0} style={inputStyle} value={form.original_price ?? ""} onChange={e => set("original_price", e.target.value ? Number(e.target.value) : null)} placeholder="4000" />
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="card" style={{ padding:"2rem" }}>
        <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>Product Image</h3>

        {/* File upload */}
        <div style={{ marginBottom:"1.25rem" }}>
          <label style={labelStyle}>Upload from device</label>
          <label style={{ display:"inline-flex", alignItems:"center", gap:".6rem", padding:".75rem 1.25rem", background:"var(--g700)", color:"white", borderRadius:"var(--radius-sm)", cursor: uploading ? "wait" : "pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".82rem", opacity: uploading ? .7 : 1 }}>
            {uploading ? "Uploading…" : "📁 Choose Image"}
            <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleImageFile} disabled={uploading} />
          </label>
          <p style={{ fontSize:".72rem", color:"var(--text-soft)", marginTop:".4rem" }}>JPG, PNG, WEBP — max 5 MB. Works on phone and computer.</p>
          {uploadError && <p style={{ fontSize:".75rem", color:"var(--g700)", marginTop:".3rem" }}>⚠️ {uploadError}</p>}
        </div>

        {/* OR divider */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
          <div style={{ flex:1, height:1, background:"var(--gray-200)" }} />
          <span style={{ fontSize:".72rem", color:"var(--text-soft)", fontWeight:600 }}>OR PASTE A URL</span>
          <div style={{ flex:1, height:1, background:"var(--gray-200)" }} />
        </div>

        <div>
          <label style={labelStyle}>Image URL *</label>
          <input required style={inputStyle} value={form.image_url} onChange={e => set("image_url", e.target.value)} placeholder="https://..." />
        </div>

        {form.image_url && (
          <div style={{ marginTop:"1rem", width:120, height:120, borderRadius:"var(--radius-sm)", overflow:"hidden", border:"1px solid var(--gray-200)", background:"var(--gray-50)" }}>
            <img src={form.image_url} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => (e.currentTarget.style.display="none")} />
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="card" style={{ padding:"2rem" }}>
        <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>Benefits</h3>
        <div style={{ display:"flex", gap:".75rem", marginBottom:"1rem" }}>
          <input style={{ ...inputStyle, flex:1 }} value={benefitInput} onChange={e => setBenefitInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter") { e.preventDefault(); addBenefit(); }}} placeholder="e.g. Boosts Energy" />
          <button type="button" onClick={addBenefit} style={{ padding:".75rem 1.25rem", background:"var(--g700)", color:"white", border:"none", borderRadius:"var(--radius-sm)", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:".82rem", whiteSpace:"nowrap" }}>
            + Add
          </button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
          {form.benefits.map(b => (
            <span key={b} style={{ display:"inline-flex", alignItems:"center", gap:".4rem", background:"var(--g50)", border:"1px solid var(--g200)", borderRadius:99, padding:".25rem .75rem", fontSize:".8rem", color:"var(--g700)", fontWeight:600 }}>
              {b}
              <button type="button" onClick={() => removeBenefit(b)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--g500)", lineHeight:1, padding:0, fontSize:"1rem" }}>×</button>
            </span>
          ))}
          {form.benefits.length === 0 && <p style={{ fontSize:".82rem", color:"var(--text-soft)" }}>No benefits added yet.</p>}
        </div>
      </div>

      {/* Stats + visibility */}
      <div className="card" style={{ padding:"2rem" }}>
        <h3 className="serif" style={{ fontWeight:700, fontSize:"1.05rem", color:"var(--gray-900)", marginBottom:"1.5rem" }}>Stats & Visibility</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.25rem" }}>
          <div>
            <label style={labelStyle}>Rating (1–5)</label>
            <input type="number" min={1} max={5} step={0.1} style={inputStyle} value={form.rating} onChange={e => set("rating", Number(e.target.value))} />
          </div>
          <div>
            <label style={labelStyle}>Review Count</label>
            <input type="number" min={0} style={inputStyle} value={form.reviews} onChange={e => set("reviews", Number(e.target.value))} />
          </div>
        </div>
        <div style={{ display:"flex", gap:"2rem" }}>
          {([["active","Active (visible in shop)"],["featured","Featured on homepage"]] as const).map(([k, label]) => (
            <label key={k} style={{ display:"flex", alignItems:"center", gap:".6rem", cursor:"pointer" }}>
              <input type="checkbox" checked={form[k] as boolean} onChange={e => set(k, e.target.checked)} style={{ width:18, height:18, accentColor:"var(--g600)", cursor:"pointer" }} />
              <span style={{ fontSize:".88rem", fontWeight:600, color:"var(--gray-700)" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ padding:"1rem", background:"#FFF1F2", border:"1px solid #FECDD3", borderRadius:"var(--radius-sm)", color:"var(--g700)", fontSize:".88rem" }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ display:"flex", gap:"1rem" }}>
        <button type="submit" disabled={loading} className="btn btn-red" style={{ padding:"1rem 2.5rem", opacity: loading ? .7 : 1 }}>
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <button type="button" onClick={() => router.back()} style={{ padding:"1rem 1.5rem", background:"white", border:"1.5px solid var(--gray-200)", borderRadius:"var(--radius-sm)", cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontWeight:600, fontSize:".88rem", color:"var(--gray-700)" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

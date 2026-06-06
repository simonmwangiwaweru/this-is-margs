import { supabaseAdmin } from "@/lib/supabase-admin";
import ContentClient from "./ContentClient";

export const metadata = { title: "Content | MARGS Admin" };

export default async function ContentPage() {
  const { data } = await supabaseAdmin.from("site_content").select("*");
  const content: Record<string, string> = {};
  (data ?? []).forEach((row: { key: string; value: string }) => {
    content[row.key] = row.value;
  });
  return (
    <div style={{ padding:"2rem" }}>
      <div style={{ marginBottom:"2rem" }}>
        <h1 className="display" style={{ fontSize:"2rem", color:"var(--gray-900)" }}>CONTENT</h1>
        <p style={{ fontSize:".85rem", color:"var(--text-soft)", marginTop:".25rem" }}>Edit your website text — About page, contact details and more.</p>
      </div>
      <ContentClient content={content} />
    </div>
  );
}

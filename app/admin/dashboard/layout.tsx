import { verifyAdminSession } from "@/lib/session";
import AdminSidebar from "./AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await verifyAdminSession();
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--gray-50)" }}>
      <AdminSidebar />
      <div className="admin-main-content" style={{ flex:1, minWidth:0 }}>{children}</div>
    </div>
  );
}

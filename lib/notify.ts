import "server-only";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderInfo {
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

async function getNotificationSettings(): Promise<{ email: string; phone: string }> {
  const { data } = await supabaseAdmin
    .from("site_content")
    .select("key, value")
    .in("key", ["notification_email", "notification_phone"]);

  const map: Record<string, string> = {};
  data?.forEach(row => { map[row.key] = row.value; });

  return {
    email: map["notification_email"] ?? process.env.OWNER_EMAIL ?? "",
    phone: map["notification_phone"] ?? process.env.OWNER_PHONE ?? "254736041184",
  };
}

export async function notifyOwnerEmail(order: OrderInfo) {
  if (!process.env.RESEND_API_KEY) return;

  const { email } = await getNotificationSettings();
  if (!email) return;

  const itemLines = order.items
    .map(i => `<tr>
      <td style="padding:6px 12px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right">KES ${(i.price * i.quantity).toLocaleString()}</td>
    </tr>`)
    .join("");

  await resend.emails.send({
    from: "THIS IS MARGS Orders <onboarding@resend.dev>",
    to: email,
    subject: `New Order — KES ${order.total.toLocaleString()} from ${order.customerName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <div style="background:#7B0D1E;padding:24px 32px">
          <h1 style="color:white;margin:0;font-size:22px;letter-spacing:2px">THIS IS MARGS</h1>
          <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:13px">New order received</p>
        </div>
        <div style="padding:28px 32px;background:#fff">
          <h2 style="margin:0 0 20px;font-size:18px">Order #${order.orderId.slice(0, 8).toUpperCase()}</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr style="background:#f5f5f5">
              <th style="padding:8px 12px;text-align:left;font-size:12px;text-transform:uppercase">Product</th>
              <th style="padding:8px 12px;text-align:center;font-size:12px;text-transform:uppercase">Qty</th>
              <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase">Subtotal</th>
            </tr>
            ${itemLines}
            <tr style="background:#fafafa">
              <td colspan="2" style="padding:10px 12px;font-weight:700">TOTAL</td>
              <td style="padding:10px 12px;text-align:right;font-weight:700;font-size:17px">KES ${order.total.toLocaleString()}</td>
            </tr>
          </table>
          <div style="background:#f9fafb;border-radius:8px;padding:16px 20px">
            <p style="margin:0 0 6px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:1px">Customer</p>
            <p style="margin:0 0 4px;font-weight:700;font-size:16px">${order.customerName}</p>
            <p style="margin:0;color:#444">📞 ${order.customerPhone}</p>
          </div>
          <p style="margin:20px 0 0;font-size:13px;color:#888">Contact the customer to confirm delivery and arrange payment.</p>
        </div>
      </div>
    `,
  });
}

export async function notifyOwnerWhatsApp(order: OrderInfo) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  const { phone } = await getNotificationSettings();
  if (!phone) return;

  const itemLines = order.items
    .map(i => `• ${i.name} x${i.quantity} — KES ${(i.price * i.quantity).toLocaleString()}`)
    .join("\n");

  const message = `🛍️ NEW ORDER — THIS IS MARGS\n\nOrder #${order.orderId.slice(0, 8).toUpperCase()}\n\n${itemLines}\n\nTOTAL: KES ${order.total.toLocaleString()}\n\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\n\nContact them to confirm delivery & payment.`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
  await fetch(url);
}

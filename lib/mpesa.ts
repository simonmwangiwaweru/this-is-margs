const BASE =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0"))   return "254" + digits.slice(1);
  return "254" + digits;
}

async function getToken(): Promise<string> {
  const creds = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res  = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${creds}` },
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token as string;
}

export interface STKResult {
  CheckoutRequestID: string;
}

export async function initiateSTKPush(params: {
  phone:   string;
  amount:  number;
  orderId: string;
}): Promise<STKResult | { error: string }> {
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey   = process.env.MPESA_PASSKEY!;
  const callback  = process.env.MPESA_CALLBACK_URL!;

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  const phone    = formatPhone(params.phone);

  const token = await getToken();

  const res  = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
    method:  "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password:          password,
      Timestamp:         timestamp,
      TransactionType:   "CustomerPayBillOnline",
      Amount:            Math.ceil(params.amount),
      PartyA:            phone,
      PartyB:            shortcode,
      PhoneNumber:       phone,
      CallBackURL:       callback,
      AccountReference:  `MARGS-${params.orderId.slice(0, 6).toUpperCase()}`,
      TransactionDesc:   "THIS IS MARGS Order",
    }),
  });

  const data = await res.json();

  if (data.ResponseCode === "0") {
    return { CheckoutRequestID: data.CheckoutRequestID };
  }

  return { error: data.errorMessage ?? data.ResponseDescription ?? "STK Push failed" };
}

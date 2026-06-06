import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SESSION_SECRET ?? "fallback-dev-secret-change-in-prod");

export async function encrypt(payload: object): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function createAdminSession(): Promise<void> {
  const token     = await encrypt({ admin: true });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const store     = await cookies();
  store.set("admin_session", token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    expires:  expiresAt,
    sameSite: "lax",
    path:     "/",
  });
}

export async function deleteAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete("admin_session");
}

export async function verifyAdminSession(): Promise<void> {
  const store   = await cookies();
  const token   = store.get("admin_session")?.value;
  const payload = token ? await decrypt(token) : null;
  if (!payload?.admin) redirect("/admin/login");
}

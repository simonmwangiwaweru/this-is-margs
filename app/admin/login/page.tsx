import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = { title: "Admin Login | THIS IS MARGS" };

export default function LoginPage() {
  return <LoginClient />;
}

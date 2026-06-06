import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | THIS IS MARGS",
  description: "Complete your order for premium health supplements. Fast delivery across Kenya.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

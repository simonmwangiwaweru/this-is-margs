import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop | THIS IS MARGS — Premium Health Supplements",
  description:
    "Browse our full range of premium health supplements. Alkaline water products, vitamins, detox, immunity boosters and gut health. Free delivery in Nairobi on orders above KES 3,000.",
};

export default function ShopPage() {
  return <ShopClient />;
}

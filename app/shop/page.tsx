import type { Metadata } from "next";
import { getAllProducts } from "@/lib/getProducts";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop | THIS IS MARGS — Premium Health Supplements",
  description: "Browse our full range of premium health supplements. Free delivery in Nairobi on orders above KES 3,000.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  return <ShopClient products={products} />;
}

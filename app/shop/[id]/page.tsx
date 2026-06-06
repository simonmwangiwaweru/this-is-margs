import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return products.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  if (!product) return { title: "Product Not Found | THIS IS MARGS" };
  return {
    title: `${product.name} | THIS IS MARGS`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  if (!product) notFound();
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  return <ProductDetailClient product={product} related={related} />;
}

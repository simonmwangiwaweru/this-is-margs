import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById, getProductsByCategory } from "@/lib/getProducts";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id }  = await params;
  const product = await getProductById(Number(id));
  if (!product) return { title: "Product Not Found | THIS IS MARGS" };
  return { title: `${product.name} | THIS IS MARGS`, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { id }  = await params;
  const product = await getProductById(Number(id));
  if (!product) notFound();

  const categoryProducts = await getProductsByCategory(product.category);
  const related          = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);

  const mapped = (p: typeof product) => ({
    id:            p.id,
    name:          p.name,
    description:   p.description,
    price:         p.price,
    originalPrice: p.original_price ?? undefined,
    category:      p.category,
    image:         p.image_url,
    badge:         p.badge ?? undefined,
    rating:        p.rating,
    reviews:       p.reviews,
    benefits:      p.benefits,
  });

  return (
    <ProductDetailClient
      product={mapped(product)}
      related={related.map(mapped)}
    />
  );
}

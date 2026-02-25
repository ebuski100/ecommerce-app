import CartUI from "../../components/CartUI";
import { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.products || [];
}

export default async function CartPage() {
  const products = await fetchProducts();

  return <CartUI products={products} />;
}

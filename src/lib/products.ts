import { Product, Category } from "@/types/product";
import { cookies } from "next/headers";

const BASE_URL = "https://dummyjson.com";
export async function getProducts(category?: string) {
  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export async function getCartProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products || [];
}

export async function getCartedProducts() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cart");

  if (!cartCookie?.value) return [];

  let cartIds: number[] = [];

  try {
    cartIds = JSON.parse(cartCookie.value);
  } catch (error) {
    console.error("Invalid cart cookie:", error);
    return [];
  }

  const allProducts = await fetchProducts();

  return allProducts.filter((p) => cartIds.includes(p.id));
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export async function fetchSingleProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export async function fetchProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/category/${category}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export async function getSpecProduct(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

export async function fetchShopCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/categories`,
    { cache: "no-store" },
  );

  const data = await res.json();

  return data;
}

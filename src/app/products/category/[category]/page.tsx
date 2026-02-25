import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
};

async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const resolvedParams = await params;

  const products = await fetchProductsByCategory(resolvedParams.category);

  if (products.length === 0) {
    return (
      <p className="text-center py-10">
        No products found for {params.category}
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-3 rounded">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={200}
            className="object-contain"
          />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

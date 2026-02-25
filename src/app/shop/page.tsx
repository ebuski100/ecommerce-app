import React from "react";
import Image from "next/image";
import { Camera, Search } from "lucide-react";
import SideNav from "@/components/SideNav";
import Link from "next/link";
type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  thumbnail: string;
  description: string;
};

type Category = {
  slug: string;
  name: string;
};

async function fetchProducts(category?: string): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = category
    ? `${base}/api/products/category/${category}`
    : `${base}/api/products`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/categories`,
    { cache: "no-store" },
  );

  const data = await res.json();

  return data;
}

const Shop = async (category: string) => {
  const products = await fetchProducts();
  console.log(products);
  const categories = await fetchCategories();

  console.log(categories);
  return (
    <div className="flex  flex-col w-full   genCont p-4 pb-30 mt-15">
      <SideNav categories={categories} activeCategory={category} />

      <div className=" z-50 p-2 shadow fixed top-0 right-0 left-0 bg-white mb-6">
        <div>
          <input
            type="text"
            placeholder="I'm shopping for..."
            className="relative w-full border rounded-[1rem] p-3 "
          />
        </div>
        <Camera
          className="absolute top-1/2 right-20 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={30}
        />

        <Search
          size={30}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 cursor-pointer bg-black text-white rounded-2xl w-[50px] p-1 "
        />
      </div>

      <div className="deals ml-40 md:ml-40 flex-1 ">
        <h1 className="font-bold ml-2">For you</h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-4">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="rounded-lg p-3 border m-2 cursor-pointer block"
              >
                {product.images && (
                  <div className="flex justify-center">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                )}

                <h2 className="font-medium text-green-500 mt-2">
                  {product.title}
                </h2>
                <p className="text-gray-500">${product.price}</p>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {product.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React from "react";
import Image from "next/image";
import { fetchProductsByCategory } from "@/lib/products";

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
    <div className="mt-15 pb-30">
      <h1 className=" text-green-500 font-bold p-4 capitalize bg-white fixed top-0 left-0 right-0 shadow z-50 ">
        {resolvedParams.category}
      </h1>
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className=" p-2 rounded-xl shadow-md flex justify-center items-center border-t border-gray-300 "
          >
            <div>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain"
              />
              <h2 className="font-bold">{product.title}</h2>
              <p className=" text-green-500 text-2xl">${product.price}</p>
            </div>
            <p className="text-gray-400 text-sm w-[50%]  h-full flex items-end p-4">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

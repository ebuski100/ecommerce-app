"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";

import AnimatedCartButton from "@/components/AnimatedCartButton";
import AnimatedHeart from "@/components/AnimatedHeart";
import Link from "next/link";

type MoreToLoveProps = {
  products: Product[];
  cartIds: number[];
};
const MoretoLove = ({ products, cartIds }: MoreToLoveProps) => {
  return (
    <div className="p-2 ">
      <h1 className="font-bold my-3 text-green-500">More to love</h1>

      <div className="grid grid-cols-2 gap-4 ">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            prefetch={true}
            scroll={true}
            className="rounded-lg p-3 border border-gray-300 m-2 cursor-pointer shadow relative hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center  mt-7">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain "
              />
            </div>

            <AnimatedCartButton
              isInCart={cartIds.includes(product.id)}
              product={product}
              className="top-0 right-1 flex justify-center  items-center"
            />
            <AnimatedHeart className="top-3 left-2" />

            <h2 className="font-medium text-green-500 mt-2">{product.title}</h2>

            <p className="text-gray-500">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoretoLove;

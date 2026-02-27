"use client";

import { MapPin, Heart, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import DeleteModal from "./DeleteModal";
import AnimatedHeart from "./AnimatedHeart";
import AnimatedCartButton from "./AnimatedCartButton";
import Link from "next/link";

type CartUIProps = {
  cartedProducts: Product[];
  products: Product[];
  cartIds: number[];
};

export default function CartUI({
  cartedProducts,
  products,
  cartIds,
}: CartUIProps) {
  const router = useRouter();
  const handleExplore = () => {
    router.push("/");
    console.log("Explore clicked");
  };
  const [modalType, setModalType] = useState<"deleteAll" | "deleteOne" | null>(
    null,
  );

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const handleConfirmDelete = async () => {
    if (modalType === "deleteAll") {
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ action: "clear" }),
      });
    }

    if (modalType === "deleteOne") {
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          action: "remove",
          productId: selectedProductId,
        }),
      });
    }

    setModalType(null);
  };
  const goWish = () => {
    router.push("/wishlist");
  };

  return (
    <div className="mt-20 pb-30">
      <div className="flex justify-between fixed top-0 left-0 right-0 p-2 shadow bg-white z-20">
        <h1 className="p-2 font-bold">Cart{cartIds.length}</h1>

        <div className="flex flex-row p-2">
          <MapPin size={24} />
          <p className="text-gray-500 text-sm mr-2">Enugu North</p>

          <Heart onClick={goWish} className="mx-2" size={24} />
          <Trash
            className="mx-2 cursor-pointer"
            onClick={() => setModalType("deleteAll")}
          />
        </div>
      </div>

      {cartedProducts.length === 0 ? (
        <div className="flex justify-center flex-col items-center">
          <img
            src="/emptyCart.jfif"
            alt="emptycart"
            className="h-[150px] w-[150px]"
          />
          <p className="font-bold my-2">Your Cart is empty</p>
          <button
            onClick={handleExplore}
            className="bg-black text-white font-bold p-2 w-[200px] rounded-3xl my-2 cursor-pointer"
          >
            Explore items
          </button>
        </div>
      ) : (
        <div className="mt-20 px-4 space-y-4">
          {cartedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-t border-gray-300 rounded-xl shadow pb-4 pt-2"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                width={80}
                height={80}
                className="object-contain"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
              <div className=" h-full">
                <Trash
                  className="text-red-500 mr-3 cursor-pointer"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setModalType("deleteOne");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-2">
        <h1 className="font-bold my-3 text-green-500 mt-10 mx-2">
          More to love
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="rounded-lg p-3 shadow-md border-t border-gray-300 m-2 cursor-pointer relative hover:scale-102"
            >
              <div className="flex justify-center">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <AnimatedHeart className="absolute top-3 left-3" />
              <AnimatedCartButton
                isInCart={cartIds.includes(product.id)}
                product={product}
                className="absolute top-1 right-3"
              />

              <h2 className="font-medium text-green-500 mt-2">
                {product.title}
              </h2>

              <p className="text-gray-500">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {modalType && (
        <DeleteModal
          modalType={modalType}
          context="cart"
          setModalType={setModalType}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}

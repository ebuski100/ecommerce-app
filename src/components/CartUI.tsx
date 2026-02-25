"use client";

import { MapPin, Heart, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import DeleteModal from "./DeleteModal";

type CartUIProps = {
  products: Product[];
};

export default function CartUI({ products }: CartUIProps) {
  const router = useRouter();
  const handleExplore = () => {
    router.push("/");
    console.log("Explore clicked");
  };
  const [modalType, setModalType] = useState<"deleteAll" | "deleteOne" | null>(
    null,
  );

  const handleConfirmDelete = () => {
    if (modalType === "deleteAll") {
      console.log("Delete all wishlist items");
    }

    if (modalType === "deleteOne") {
      console.log("Delete selected wishlist item");
    }

    setModalType(null);
  };

  const goWish = () => {
    router.push("/wishlist");
  };

  return (
    <div className="mt-20 pb-30">
      <div className="flex justify-between fixed top-0 left-0 right-0 p-2 shadow bg-white z-20">
        <h1 className="p-2 font-bold">Cart(0)</h1>

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

      <div className="p-2">
        <h1 className="font-bold my-3">More to love</h1>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg p-3 border m-2 cursor-pointer"
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

              <h2 className="font-medium text-green-500 mt-2">
                {product.title}
              </h2>

              <p className="text-gray-500">${product.price}</p>
            </div>
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

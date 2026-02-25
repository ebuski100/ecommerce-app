"use client";

import React, { useState } from "react";
import { ChevronLeft, ShoppingCart, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/DeleteModal";

const Wishlist = () => {
  const router = useRouter();
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

  return (
    <div className="mt-15">
      <div className="flex justify-between p-4 fixed  top-0 right-0 shadow left-0 bg-white z-50">
        <div className="flex flex-row ">
          <ChevronLeft
            className="mr-2 cursor-pointer"
            size={24}
            onClick={() => router.back()}
          />
          <h1 className="font-bold">Wishlist</h1>
        </div>
        <div className="flex flex-row">
          <div className="cursor-pointer relative mr-5">
            <ShoppingCart size={30} onClick={() => router.push("/cart")} />
            <span className="text-red-500 text-xs font-bold absolute -top-1 -right-2  rounded-full  h-5 w-5 bg-green-500 text-white flex items-center justify-center">
              3
            </span>
          </div>
          <Trash
            className="cursor-pointer"
            size={24}
            onClick={() => setModalType("deleteAll")}
          />
        </div>
      </div>
      <div className="p-3">
        <h1 className="font-bold">Items</h1>
        <div>
          <div className="flex flex-row items-center justify-center bg-gray-200/20 cursor-pointer hover:scale-101 transition-transform duration-500 p-2 ">
            <div className="h-[200px] w-[50%]  flex items-center">
              <img src="/adidas.jfif" />
            </div>
            <div className=" w-[50%] p-4 ">
              <p className="font-bold">WRIST WATCH</p>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Debitis consequuntur in modi,
              </p>
              <div className="mt-6 flex justify-end">
                <Trash
                  className="cursor-pointer text-red-500"
                  onClick={() => setModalType("deleteOne")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalType && (
        <DeleteModal
          modalType={modalType}
          context="wishlist"
          setModalType={setModalType}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Wishlist;

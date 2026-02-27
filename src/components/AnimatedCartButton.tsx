"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/lib/utils";
import Toast from "@/components/Toast";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

type AnimatedCartButtonProps = {
  product: Product;
  isInCart: boolean;
  className?: string;
};

export default function AnimatedCartButton({
  product,
  isInCart,
  className = "",
}: AnimatedCartButtonProps) {
  const [clicked, setClicked] = useState(isInCart);
  const [animating, setAnimating] = useState(false);
  const { message, type, showToast } = useToast();

  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !clicked;

    setClicked(newState);
    setAnimating(true);
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: product.id }),
    });
    router.refresh();
    setTimeout(() => {
      if (newState) {
        showToast("Added to Cart 🛒", "success");
      } else {
        showToast("Removed from Cart ❌", "error");
      }
    }, 300);

    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };
  useEffect(() => {
    setClicked(isInCart);
  }, [isInCart]);

  return (
    <>
      <div
        onClick={(e) => handleClick(e)}
        className={` absolute  p-2 cursor-pointer transition-transform duration-300 flex flex-row  justify-center  items-center ${className} ${
          animating ? "scale-125 rotate-12" : "scale-100"
        } ${clicked ? "text-green-500" : "text-gray-500"}`}
      >
        <span
          className={`font-bold text-gray-500 text-xl transition-colors duration-300 ${clicked ? "text-green-500" : "text-gray-500"}`}
        >
          +
        </span>
        <ShoppingCart
          size={20}
          className={`transition-colors duration-300 ${
            clicked ? " text-green-500" : "text-gray-500"
          }`}
        />
      </div>

      <Toast message={message} type={type} />
    </>
  );
}

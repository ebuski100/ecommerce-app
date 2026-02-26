"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/lib/utils";
import Toast from "@/components/Toast";
type Props = {
  className?: string;
};
export default function AnimatedCartButton({ className = "" }: Props) {
  const [clicked, setClicked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { message, type, showToast } = useToast();

  const handleClick = () => {
    const newState = !clicked;
    setClicked(newState);
    setAnimating(true);

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

  return (
    <>
      <div
        onClick={handleClick}
        className={` absolute  p-2 cursor-pointer transition-transform duration-300 ${className} ${
          animating ? "scale-125 rotate-12" : "scale-100"
        } ${clicked ? "text-green-500" : "text-gray-500"}`}
      >
        <span
          className={`font-bold text-gray-500 text-2xl transition-colors duration-300 ${clicked ? "text-green-500" : "text-gray-500"}`}
        >
          +
        </span>
        <ShoppingCart
          className={`transition-colors duration-300 ${
            clicked ? " text-green-500" : "text-gray-500"
          }`}
        />
      </div>

      <Toast message={message} type={type} />
    </>
  );
}

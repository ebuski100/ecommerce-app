"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Toast from "@/components/Toast";
import { useToast } from "@/lib/utils";
type Props = {
  className?: string;
};

export default function AnimatedHeart({ className = "" }: Props) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const { message, type, showToast } = useToast();

  const handleClick = () => {
    const newState = !liked;
    setLiked(newState);
    setAnimating(true);

    setTimeout(() => {
      if (newState) {
        showToast("Added to wishlist ❤️", "success");
      } else {
        showToast("Removed from wishlist", "error");
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
        className={`absolute ${className}  cursor-pointer transition-transform duration-300 ${
          animating ? "scale-110" : "scale-100 "
        }`}
      >
        <Heart
          size={24}
          className={`transition-colors duration-300 ${
            liked ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </div>

      <Toast message={message} type={type} />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function GoBack() {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/shop")}
      className="absolute text-gray-600 top-5 left-3 cursor-pointer"
    >
      <ChevronLeft size={30} />
    </span>
  );
}

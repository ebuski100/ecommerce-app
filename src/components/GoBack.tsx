"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
type Props = {
  className?: string;
};
export default function GoBack({ className = "" }: Props) {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/shop")}
      className="absolute text-gray-600 top-2 left-1 cursor-pointer  "
    >
      <ChevronLeft size={20} className={`${className}`} />
    </span>
  );
}

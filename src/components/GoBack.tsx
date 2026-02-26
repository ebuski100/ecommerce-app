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
      className={`absolute text-gray-600  cursor-pointer  ${className}`}
    >
      <ChevronLeft size={22} />
    </span>
  );
}

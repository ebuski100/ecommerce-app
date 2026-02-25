"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useState, useCallback } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage(null);
    }, 1000); // toast lasts 1s
  }, []);

  return {
    message,
    showToast,
  };
}

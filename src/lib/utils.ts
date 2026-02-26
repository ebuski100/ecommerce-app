// "use client";

// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// import { useState, useCallback } from "react";
// // type ToastType = "success" | "error" | "default";

// export function useToast() {
//   const [message, setMessage] = useState<string | null>(null);

//   const showToast = useCallback((msg: string) => {
//     setMessage(msg);

//     setTimeout(() => {
//       setMessage(null);
//     }, 1000); // toast lasts 1s
//   }, []);

//   return {
//     message,
//     showToast,
//   };
// }

import { useState } from "react";

type ToastType = "success" | "error" | "default";

export function useToast() {
  const [toast, setToast] = useState<{
    message: string | null;
    type: ToastType;
  }>({
    message: null,
    type: "default",
  });

  const showToast = (message: string, type: ToastType = "default") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: null, type: "default" });
    }, 1000);
  };

  return {
    message: toast.message,
    type: toast.type,
    showToast,
  };
}

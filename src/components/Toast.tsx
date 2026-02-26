// "use client";

// type ToastProps = {
//   message: string | null;
// };

// export default function Toast({ message }: ToastProps) {
//   if (!message) return null;

//   return (
//     <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full shadow-lg text-sm z-100 text-center animate-fade-in">
//       {message}
//     </div>
//   );
// }

"use client";

type ToastProps = {
  message: string | null;
  type?: "success" | "error" | "default";
};

export default function Toast({ message, type = "default" }: ToastProps) {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500/70"
      : type === "error"
        ? "bg-red-500/70"
        : "bg-black/40";

  return (
    <div
      className={`fixed bottom-10 left-1/2 font-bold -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-full shadow-lg text-sm z-[100] text-center transition-all duration-300`}
    >
      {message}
    </div>
  );
}

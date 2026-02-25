"use client";

type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full shadow-lg text-sm z-100 text-center animate-fade-in">
      {message}
    </div>
  );
}

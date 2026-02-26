"use client";

import { useEffect, useState } from "react";

export default function FlashCountdown() {
  // 🔥 Set countdown target (today at midnight example)
  const getTargetTime = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(23, 59, 59, 999); // expires at midnight
    return target.getTime();
  };

  const [timeLeft, setTimeLeft] = useState(getTargetTime());

  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = timeLeft - now;

      if (distance <= 0) {
        setTimeRemaining("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <span className="ml-2 bg-black text-white px-2 py-1 rounded-2xl text-sm">
      ⏰ {timeRemaining}
    </span>
  );
}

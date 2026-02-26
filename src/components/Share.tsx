"use client";

import React from "react";
import { Share2 } from "lucide-react";
type Props = {
  className?: string;
};
const Share = ({ className = "" }: Props) => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check this out!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        // Fallback: copy link
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div onClick={handleShare} className={`${className}`}>
      <Share2 size={18} />
    </div>
  );
};

export default Share;

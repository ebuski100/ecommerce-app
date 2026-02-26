"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import GoBack from "./GoBack";
import Share from "@/components/Share";
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
const sections = [
  { id: "description", label: "Description" },
  { id: "shipping", label: "Shipping" },
  { id: "reviews", label: "Reviews" },
  { id: "moretolove", label: "More to Love" },
];

export default function SmartHeader() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("description");

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 120) {
        setVisible(false);
      }
      // Show once past threshold
      else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["description", "shipping", "reviews", "moretolove"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50px 0px -50% 0px",
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 ">
        <GoBack className="top-2 left-2" />
        <Share className="text-gray-700 absolute top-2 right-2" />
      </div>

      {/* Section Tabs */}
      <div className="flex justify-around overflow-x-auto no-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            // href={`#${section.id}`}
            onClick={() => scrollToSection(section.id)}
            className={`py-3 text-sm transition-colors duration-200 ${
              active === section.id
                ? "text-green-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}

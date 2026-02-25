"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "description", label: "Description" },
  { id: "shipping", label: "Shipping" },
  { id: "reviews", label: "Reviews" },
  { id: "moretolove", label: "More to Love" },
];

export default function ProductSectionTabs() {
  const [active, setActive] = useState("description");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);
          }
        },
        {
          rootMargin: "-40% 0px -50% 0px",
          threshold: 0,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-12 z-30 bg-white border-b">
      <div className="relative flex justify-around">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`py-3 text-sm font-medium ${
              active === section.id ? "text-black" : "text-gray-500"
            }`}
          >
            {section.label}
          </button>
        ))}

        {/* Animated Bar */}
        <div
          className="absolute bottom-0 h-[3px] bg-black transition-all duration-300"
          style={{
            width: `${100 / sections.length}%`,
            transform: `translateX(${
              sections.findIndex((s) => s.id === active) * 100
            }%)`,
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

import Header from "@/components/layouts/header/Header";
import Navbar from "@/components/layouts/header/Navbar";

export default function NavLayout() {
  const [showHeader, setShowHeader] = useState(true);

  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // 최상단
      if (currentY <= 0) {
        setShowHeader(true);
      } else if (currentY > lastY.current) {
        setShowHeader(false);
      } else if (currentY < lastY.current) {
        setShowHeader(true);
      }

      lastY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-500 bg-brand-black transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-16"}`}
    >
      <div
        className={`transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-16"}`}
      >
        <Header />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
}

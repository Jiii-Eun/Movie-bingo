import { useEffect, useState } from "react";

export const getPageSize = () => {
  if (typeof window === "undefined") return 8;
  if (window.matchMedia("(min-width: 1024px)").matches) return 12;
  if (window.matchMedia("(min-width: 768px)").matches) return 9;
  return 8;
};

export const useResize = () => {
  const [size, setSize] = useState(getPageSize());
  useEffect(() => {
    const handleResize = () => {
      setSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

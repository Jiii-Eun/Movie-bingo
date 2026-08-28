"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        className,
        "relative",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:bg-brand-red after:transition-transform after:duration-300",
        isActive ? "after:scale-x-100" : "after:scale-x-0",
      )}
    >
      {children}
    </Link>
  );
}

import NavLink from "@/components/common/NavLink";
import Image from "next/image";
import clsx from "clsx";

export default function Navbar() {
  const headerNavItemClasses = clsx(
    "flex items-center gap-2",
    "text-sm font-medium",
    "text-brand-gray",
    "border-1 border-transparent",
    "px-4 py-2",
    "transition-colors duration-200",
    "hover:bg-white/10 hover:rounded-sm",
  );

  return (
    <nav className="border-t-1 border-t-white/10 shadow-sm p-2 bg-white/2">
      <ul className="flex items-center gap-2">
        <li>
          <NavLink href="/" className={headerNavItemClasses}>
            <span className="h-6 flex-center">
              추천 <div className="hidden md:block"> 영화</div>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/movies/netflix" className={headerNavItemClasses}>
            <Image
              src="/logos/logo-netflix.svg"
              alt="netflix"
              width={100}
              height={100}
              className="w-14 h-6"
            />
          </NavLink>
        </li>
        <li>
          <NavLink href="/movies/prime-video" className={headerNavItemClasses}>
            <Image
              src="/logos/logo-prime-video.svg"
              alt="prime-video"
              width={100}
              height={100}
              className="w-22 h-6"
            />
          </NavLink>
        </li>
        <li>
          <NavLink href="/movies/disney-plus" className={headerNavItemClasses}>
            <Image
              src="/logos/logo-disney-plus.svg"
              alt="disney-plus"
              width={100}
              height={100}
              className="w-12 h-6"
            />
          </NavLink>
        </li>
        <li>
          <NavLink href="/movies/apple-tv" className={headerNavItemClasses}>
            <Image
              src="/logos/logo-apple-tv.svg"
              alt="apple-tv"
              width={100}
              height={100}
              className="w-12 h-6 invert"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

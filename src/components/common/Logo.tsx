import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex h-16 items-center px-4">
      <Link href="/" className="group inline-flex items-center gap-2.5">
        <p>
          <span className="font-bold [text-shadow:0_0_1.25rem_var(--color-brand-red)] transition">
            B
          </span>
          in
          <span className="text-brand-red">go</span>
        </p>
      </Link>
    </div>
  );
}

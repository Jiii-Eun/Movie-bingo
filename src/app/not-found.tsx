import Logo from "@/components/common/Logo";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(228,57,70,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-size-[6rem_6rem] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] opacity-[0.18]"
      />

      <div className="relative mb-4 text-xs font-medium tracking-[0.28em] uppercase">
        <Logo />
      </div>

      <p className="relative text-[clamp(5.5rem,18vw,9rem)] leading-none font-semibold tracking-[-0.08rem] text-transparent [text-shadow:0_0_5rem_rgba(228,57,70,0.25)] [-webkit-text-stroke:1px_rgba(244,244,245,0.35)]">
        404
      </p>

      <h1 className="relative mt-6 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        페이지가 없어요
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        찾으시는 작품이나 페이지가 없거나 주소가 바뀌었을 수 있어요.
        <br />
        홈으로 돌아가 다시 시도해주세요.
      </p>

      <Link
        href="/"
        className="mt-10 btn-red shadow-[0_0_1.5rem_rgba(228,57,70,0.35)]"
      >
        홈으로
      </Link>
    </main>
  );
}

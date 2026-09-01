import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-6">검색 페이지를 불러오는 중…</div>}>
      {children}
    </Suspense>
  );
}

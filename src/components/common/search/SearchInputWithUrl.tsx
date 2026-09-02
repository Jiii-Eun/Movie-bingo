"use client";

import SearchInput, {
  SearchInputProps,
} from "@/components/common/search/SearchInput";
import { useSearchParams } from "next/navigation";

export default function SearchInputWithUrl(
  props: Omit<SearchInputProps, "initKeyword">,
) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";

  return <SearchInput key={keyword} initKeyword={keyword} {...props} />;
}

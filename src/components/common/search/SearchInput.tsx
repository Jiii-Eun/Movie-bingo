"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { SxProps } from "@mui/material";

export type SearchInputProps = {
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: SxProps;
  initKeyword?: string;
};

export default function SearchInput({
  initKeyword = "",
  containerClassName,
  inputClassName,
  buttonClassName,
}: {
  initKeyword?: string;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: SxProps;
}) {
  const router = useRouter();

  const [keyword, setKeyword] = useState(initKeyword || "");

  const isComposing = useRef<boolean>(false);

  const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const onCompositionStart = () => {
    isComposing.current = true;
  };

  const onCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    const value = e.currentTarget.value;
    setKeyword(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch(keyword);
    }
  };

  const runSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;

    router.push(`/search?keyword=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <div className={`relative ${containerClassName}`}>
        <input
          type="text"
          placeholder="Search"
          className={`rounded-sm p-2 border-1 border-transparent bg-white/10 focus:outline-none focus:border-white w-full ${inputClassName}`}
          value={keyword}
          onChange={keywordChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onKeyDown={onKeyDown}
        />
        <Button
          isIcon
          sx={{
            position: "absolute",
            "&:hover": {
              backgroundColor: "transparent",
            },
            ...buttonClassName,
          }}
          className="right-0 top-1/2 -translate-y-1/2 p-2"
          onClick={() => runSearch(keyword)}
        >
          <SearchIcon />
        </Button>
      </div>
    </>
  );
}

"use client";

import SearchInput from "@/components/common/SearchInput";
import { useSearchParams } from "next/navigation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SideFilter from "@/components/search/SideFilter";
import OttCardSkeleton from "@/components/ott/OttCardSkeleton";
import { useApi } from "@/hooks/apiHook";
import { getSearchFilter } from "@/api/actions";
import { useState } from "react";
import {
  StreamingAvailabilityCatalog,
  StreamingAvailabilityShowType,
} from "@/type/apiType";
import OttCard from "@/components/ott/OttCard";
import { Show } from "streaming-availability";

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [showType, setShowType] =
    useState<StreamingAvailabilityShowType>("movie");
  const [catalogs, setCatalogs] = useState<StreamingAvailabilityCatalog[]>([
    "netflix",
    "prime",
    "disney",
    "apple",
  ]);
  const [selectGenre, setSelectGenre] = useState("all");
  const [yearRange, setYearRange] = useState<number[]>([1700, 2026]);

  const { data: searchData, isPending } = useApi(
    [
      "search",
      keyword,
      showType,
      catalogs.join(","),
      selectGenre,
      String(yearRange[0]),
      String(yearRange[1]),
    ],
    () => {
      return getSearchFilter(
        keyword,
        showType,
        catalogs,
        selectGenre && selectGenre !== "all" ? [selectGenre] : undefined,
        yearRange[0],
        yearRange[1],
      );
    },
  );

  console.log(searchData);

  return (
    <>
      <div className="my-6 mx-2">
        <div className="flex-center">
          <SearchInput
            containerClassName="w-2/3 h-12 bg-white rounded-sm var(--color-brand-black) border-1 border-white"
            inputClassName="text-brand-black"
            buttonClassName={{
              fontSize: "1.5rem",
              width: "3rem",
              height: "3rem",
              color: "var(--color-brand-black)",
            }}
            initKeyword={keyword}
          />
        </div>
        <div className="flex items-end justify-center gap-4 my-6">
          <div>검색 결과</div>
          <div className="flex">
            <FormatQuoteIcon sx={{ rotate: "-180deg" }} />
            <div className="text-2xl font-bold text-brand-red">{keyword}</div>
            <FormatQuoteIcon />
          </div>
        </div>
        <div className="flex gap-4">
          <SideFilter
            showType={showType}
            setShowType={setShowType}
            catalogs={catalogs}
            setCatalogs={setCatalogs}
            selectGenre={selectGenre}
            setSelectGenre={setSelectGenre}
            setYearRange={setYearRange}
            yearRange={yearRange}
          />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
            {isPending ? (
              <OttCardSkeleton />
            ) : (
              <>
                {searchData?.shows.length === 0 ? (
                  <div>검색 결과가 없습니다.</div>
                ) : (
                  <>
                    {searchData?.shows.map((item: Show) => (
                      <OttCard key={item.imdbId ?? item.id} ott={item} />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

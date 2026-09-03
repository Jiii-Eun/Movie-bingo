"use client";

import SearchInput from "@/components/common/search/SearchInput";
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
import { Netflix, PrimeVideo, DisneyPlus, AppleTV } from "@/constans/ott";
import ContentPagination from "@/components/common/ContentPagination";
import { useResize } from "@/hooks/resize";

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [showType, setShowType] =
    useState<StreamingAvailabilityShowType>("movie");
  const [catalogs, setCatalogs] = useState<StreamingAvailabilityCatalog[]>([
    Netflix,
    PrimeVideo,
    DisneyPlus,
    AppleTV,
  ]);
  const [selectGenre, setSelectGenre] = useState("all");
  const [yearRange, setYearRange] = useState<number[]>([1700, 2026]);
  const [page, setPage] = useState(1);

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

  const searchLength = searchData?.shows.length ?? 0;
  const pageSize = useResize();
  const pagedData =
    searchData?.shows.slice((page - 1) * pageSize, page * pageSize) ?? [];

  return (
    <>
      <div className="my-6 mx-2">
        <div className="flex-center">
          <SearchInput
            key={keyword}
            initKeyword={keyword}
            containerClassName="w-2/3 h-12 bg-white rounded-sm var(--color-brand-black) border-1 border-white"
            inputClassName="text-brand-black"
            buttonClassName={{
              fontSize: "1.5rem",
              width: "3rem",
              height: "3rem",
              color: "var(--color-brand-black)",
            }}
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
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2 m-4">
              {isPending ? (
                <OttCardSkeleton />
              ) : (
                <>
                  {searchData?.shows.length === 0 ? (
                    <div>검색 결과가 없습니다.</div>
                  ) : (
                    <>
                      {pagedData?.map((item: Show) => (
                        <OttCard key={item.imdbId ?? item.id} ott={item} />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-center">
              <ContentPagination
                totalCount={searchLength}
                currentPage={page}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

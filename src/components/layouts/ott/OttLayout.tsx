"use client";

import { getTopShows } from "@/api/actions";
import Button from "@/components/common/Button";
import Error from "@/components/common/Error";
import ContentPagination from "@/components/common/ContentPagination";
import OttCard from "@/components/ott/OttCard";
import OttCardSkeleton from "@/components/ott/OttCardSkeleton";
import { useApi } from "@/hooks/apiHook";
import {
  StreamingAvailabilityCatalog,
  StreamingAvailabilityShowType,
} from "@/type/apiType";
import { useState } from "react";
import { Show } from "streaming-availability";
import { useResize } from "@/hooks/resize";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export default function OttLayout({
  ottTitle,
  className,
  classNameChildren,
  serviceType,
}: {
  ottTitle?: React.ReactNode;
  className?: string;
  classNameChildren?: string;
  serviceType: StreamingAvailabilityCatalog;
}) {
  const [activeTab, setActiveTab] =
    useState<StreamingAvailabilityShowType>("movie");

  const handleActiveTab = (tab: StreamingAvailabilityShowType) => {
    setActiveTab(tab);
  };

  const {
    data: ottData,
    isPending,
    error,
  } = useApi<Show[]>(["ott", serviceType, activeTab], () =>
    getTopShows(activeTab, serviceType),
  );

  const [page, setPage] = useState(1);
  const pageSize = useResize();
  const ottLength = ottData?.length ?? 0;

  type RatingSortMode = "default" | "asc" | "desc";
  const [ratingButton, setRatingButton] = useState<RatingSortMode>("default");
  const handleRatingButton = () => {
    setRatingButton((prev) =>
      prev === "default" ? "asc" : prev === "asc" ? "desc" : "default",
    );
  };

  console.log(ottData);

  const sortedData = (() => {
    const list = ottData ?? [];
    if (ratingButton === "default") return list;
    return [...list].sort((a, b) =>
      ratingButton === "asc" ? a.rating - b.rating : b.rating - a.rating,
    );
  })();

  const pagedSortedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className={`flex flex-col gap-4 py-6 px-2 ${className}`}>
      <div className="flex items-end gap-6">
        <h3 className="m-0 text-2xl align-bottom">{ottTitle}</h3>
        <div className="flex justify-between w-full">
          <div className="flex-center gap-2">
            <Button
              sx={{
                padding: 0,
                textAlign: "center",
                fontSize: "1.125rem",
                color:
                  activeTab === "movie"
                    ? "var(--color-brand-red-muted)"
                    : "var(--color-white)",
              }}
              onClick={() => handleActiveTab("movie")}
            >
              <div>영화</div>
            </Button>
            <span className="w-[1px] h-4 bg-white/30"></span>
            <Button
              sx={{
                padding: 0,
                textAlign: "center",
                fontSize: "1.125rem",
                color:
                  activeTab === "series"
                    ? "var(--color-brand-red-muted)"
                    : "var(--color-white)",
              }}
              onClick={() => handleActiveTab("series")}
            >
              시리즈
            </Button>
          </div>
          <Button
            onClick={handleRatingButton}
            sx={{
              marginRight: "1rem",
              color: "var(--color-brand-red)",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "1px solid var(--color-brand-red)",
              borderRadius: "0.5rem",
              padding: "0.25rem 1rem",
              "&:hover": {
                backgroundColor: "var(--color-brand-red)",
                color: "#fff",
              },
            }}
          >
            순위{" "}
            {ratingButton === "asc" ? (
              <KeyboardArrowUpIcon />
            ) : ratingButton === "desc" ? (
              <KeyboardArrowDownIcon />
            ) : (
              <HorizontalRuleIcon />
            )}
          </Button>
        </div>
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 ${classNameChildren}`}
      >
        {isPending ? (
          <OttCardSkeleton />
        ) : (
          <>
            {pagedSortedData?.map((ott) => (
              <OttCard key={ott.id} ott={ott} />
            ))}
          </>
        )}
      </div>

      {isPending ? (
        <div className="flex justify-center">
          <ContentPagination
            totalCount={ottLength}
            currentPage={page}
            onChange={(page) => setPage(page)}
          />
        </div>
      ) : null}
    </div>
  );
}

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
  const pagedData =
    ottData?.slice((page - 1) * pageSize, page * pageSize) ?? [];

  console.log(ottData);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className={`flex flex-col gap-4 py-6 px-2 ${className}`}>
      <div className="flex items-end gap-6">
        <h3 className="m-0 text-2xl align-bottom">{ottTitle}</h3>
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
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 ${classNameChildren}`}
      >
        {isPending ? (
          <OttCardSkeleton />
        ) : (
          <>
            {pagedData?.map((ott) => (
              <OttCard key={ott.id} ott={ott} />
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center">
        <ContentPagination
          totalCount={ottLength}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}

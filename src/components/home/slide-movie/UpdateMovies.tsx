"use client";

import { useState } from "react";

import { ChangesResult } from "streaming-availability";
import { getChanges } from "@/api/actions";
import { useApi } from "@/hooks/apiHook";

import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

import SlideMovies from "@/components/common/SlideMovies";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import MovieCardPost from "@/components/home/slide-movie/MovieCardPost";
import Error from "@/components/common/Error";

export default function UpdateMovies() {
  const [changeType, setChangeType] = useState<"new" | "expiring" | "upcoming">(
    "new",
  );

  const {
    data: updateMovies,
    isPending,
    error,
  } = useApi<ChangesResult>(["updateMovies", changeType], () =>
    getChanges(changeType, ["netflix", "prime", "disney", "apple"]),
  );

  if (error) {
    return <Error error={error} />;
  }

  const contentShows = updateMovies?.shows
    ? Object.values(updateMovies.shows).filter(
        (show) => show.streamingOptions?.kr?.[0],
      )
    : undefined;

  console.log(contentShows);

  const targetMovies = [
    { name: "신작", value: "new" },
    { name: "종료 예정", value: "expiring" },
    { name: "개봉 예정", value: "upcoming" },
  ];

  return (
    <section className="px-2 py-6">
      <h3>
        {changeType === "new"
          ? "신작 영화"
          : changeType === "expiring"
            ? "종료하기 전 확인해보세요🔥"
            : "공개 예정된 영화🎬"}
      </h3>
      <div className="flex gap-2 mb-4">
        {" "}
        {targetMovies.map((target) => (
          <Button
            key={target.value}
            onClick={() =>
              setChangeType(target.value as "new" | "expiring" | "upcoming")
            }
            sx={{ padding: 0 }}
          >
            <Badge
              className={`${changeType === target.value ? "bg-brand-red-muted" : ""}`}
            >
              {target.name}
            </Badge>
          </Button>
        ))}{" "}
      </div>

      <SlideMovies data={contentShows ?? []} isPending={isPending}>
        {contentShows?.map((show) => (
          <MovieCardPost
            key={show.id}
            show={show}
            activeBadge={
              show?.streamingOptions?.kr[0]?.service
                ?.id as StreamingAvailabilityCatalog
            }
          />
        ))}
      </SlideMovies>
    </section>
  );
}

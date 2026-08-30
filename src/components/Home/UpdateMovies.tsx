"use client";

import { getChanges } from "@/api/actions";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import MovieCardPost from "@/components/Home/MovieCardPost";
import { useApi } from "@/hooks/apiHook";
import { useState } from "react";
import { ChangesResult } from "streaming-availability";
import CardSkeleton from "@/components/Home/CardSkeleton";
import NoList from "@/components/Home/NoList";
import Carousel from "react-multi-carousel";
import { responsive } from "./TopMovies";
import { StreamingAvailabilityCatalog } from "@/type/apiType";

export default function UpdateMovies() {
  const [changeType, setChangeType] = useState<"new" | "expiring" | "upcoming">(
    "new",
  );

  const { data: updateMovies, isPending } = useApi<ChangesResult>(
    ["updateMovies", changeType],
    () => getChanges(changeType, ["netflix", "prime", "disney", "apple"]),
  );

  const shows = updateMovies ? Object.values(updateMovies.shows) : undefined;

  console.log(shows);

  const targetMovies = [
    { name: "신작", value: "new" },
    { name: "종료 예정", value: "expiring" },
    { name: "개봉 예정", value: "upcoming" },
  ];

  return (
    <section className="container-max-w-full px-2 py-6">
      <h2 className="text-2xl font-bold">
        {changeType === "new"
          ? "신작 영화"
          : changeType === "expiring"
            ? "종료 예정 영화"
            : "개봉 예정 영화"}
      </h2>
      <div className="flex gap-2 my-4">
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
      {isPending ? (
        <CardSkeleton />
      ) : !shows?.length ? (
        <NoList />
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          keyBoardControl
          swipeable
          draggable
          containerClass="overflow-visible"
        >
          {shows.map((show) => (
            <MovieCardPost
              key={show.id}
              show={show}
              activeBadge={
                show.streamingOptions.kr[0].service
                  .name as StreamingAvailabilityCatalog
              }
            />
          ))}
        </Carousel>
      )}
    </section>
  );
}

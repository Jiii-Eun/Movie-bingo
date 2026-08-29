"use client";

import { getTopShows } from "@/api/actions";
import Button from "@/components/common/Button";
import Skeleton from "@/components/common/Skeleton";
import { useApi } from "@/hooks/apiHook";
import Image from "next/image";
import { Show } from "streaming-availability";

export default function Banner() {
  const { data: topShows, isLoading } = useApi<Show[]>(["banner"], () =>
    getTopShows("movie", "netflix"),
  );

  const featured = topShows?.[0];

  return (
    <>
      <div className="relative container-max-w-full py-6">
        {isLoading || !featured ? (
          <Skeleton className="w-full aspect-video rounded-2xl" />
        ) : (
          <div className="rounded-2xl shadow-banner border-1 border-white/10">
            <Image
              src={featured.imageSet.horizontalPoster.w1440}
              alt={featured.title}
              width={1440}
              height={752}
              className="object-cover rounded-2xl"
              priority
            />
            <div className="absolute bottom-10 left-10 p-4 max-w-2xl">
              <div className="flex flex-col gap-6">
                <div className="text-sm text-white/80 md:text-xl">
                  {featured.genres.map((genre) => genre.name).join(" • ")} •{" "}
                  {featured.runtime}분 • {featured.releaseYear} 년 개봉
                </div>
                <p className="text-white md:text-2xl md:pb-3 font-bold">
                  {featured.overview}
                </p>
                <div className="flex gap-3">
                  <Button
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6rem",
                      padding: "0.5rem 1rem",
                      fontSize: "0.875rem",
                      height: "2.25rem",
                      color: "var(--color-brand-black)",
                    }}
                    className="gap-2"
                  >
                    <div className="play text-brand-black" />
                    재생
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "6rem",
                      padding: "0.5rem 1rem",
                      fontSize: "0.875rem",
                      height: "2.25rem",
                      color: "white",
                    }}
                  >
                    상세 정보
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

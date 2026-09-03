"use client";

import { getTopShows } from "@/api/actions";
import Skeleton from "@/components/common/Skeleton";
import { useApi } from "@/hooks/apiHook";
import Image from "next/image";
import { Show } from "streaming-availability";
import Error from "@/components/common/Error";
import ConnectButton from "@/components/common/ConectButton";

export default function Banner() {
  const {
    data: topShows,
    isLoading,
    error,
  } = useApi<Show[]>(["banner"], () => getTopShows("movie", "netflix"));

  const featured = topShows?.[6];

  if (error) {
    return <Error error={error} />;
  }

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
                <p className="text-white md:text-2xl md:pb-3 font-bold line-clamp-2">
                  {featured.overview}
                </p>
                <div className="flex gap-3">
                  <ConnectButton
                    optionLink={featured.streamingOptions.kr[0].link}
                    imdbId={featured.imdbId}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

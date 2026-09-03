"use client";

import { getTrailer } from "@/api/tmdb/actions";
import Error from "@/components/common/Error";
import { useApi } from "@/hooks/apiHook";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import YouTube, { YouTubeProps } from "react-youtube";
import { TmdbVideo } from "@/type/tmdbType";

export default function MovieTrailer({
  tmdbId,
}: {
  id: string;
  tmdbId: string;
}) {
  const {
    data: trailerList = [],
    isPending,
    error,
  } = useApi(["trailer", tmdbId], () => getTrailer(tmdbId), {
    select: (data): TmdbVideo[] =>
      (data.results ?? []).filter(
        (video: TmdbVideo) =>
          video.site === "YouTube" && video.type === "Trailer",
      ),
  });

  const [activeKey, setActiveKey] = useState<string | null>(null);

  console.log(trailerList);

  const sorted = [...trailerList].sort(
    (a, b) => Number(b.official) - Number(a.official),
  );
  const currentKey = activeKey ?? sorted[0]?.key;
  const current = sorted.find((t) => t.key === currentKey) ?? sorted[0];

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  if (isPending) {
    return (
      <section className="flex-center px-2 py-10">
        <ClipLoader color="#fff" size={28} />
      </section>
    );
  }

  if (error) return <Error error={error} />;

  return (
    <>
      {trailerList.length !== 0 && (
        <section className="px-2 py-6">
          <h3>예고편</h3>
          {sorted.length > 1 && (
            <div className="my-4 flex flex-col gap-2 md:flex-row md:flex-wrap">
              {sorted.map((trailer) => {
                const isActive = trailer.key === current.key;
                return (
                  <button
                    key={trailer.id}
                    type="button"
                    onClick={() => setActiveKey(trailer.key)}
                    className={`w-full rounded-md px-4 py-3 text-left text-sm transition-colors md:w-auto md:min-w-48 cursor-pointer ${
                      isActive
                        ? "bg-brand-red text-white"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {trailer.name}
                  </button>
                );
              })}
            </div>
          )}
          <div className="overflow-hidden rounded-xl bg-black shadow-banner">
            <div className="aspect-video w-full [&_iframe]:h-full [&_iframe]:w-full">
              <YouTube
                videoId={current.key}
                opts={opts}
                className="h-full w-full"
                iframeClassName="h-full w-full"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

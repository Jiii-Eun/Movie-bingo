"use client";

import { getRecommendedMovies } from "@/api/tmdb/actions";
import Error from "@/components/common/Error";
import SlideMovies from "@/components/common/SlideMovies";
import { useApi } from "@/hooks/apiHook";
import { RecommendedMovie } from "@/type/tmdbType";
import Image from "next/image";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import AddIcon from "@mui/icons-material/Add";

const TMDB_BACKDROP = "https://image.tmdb.org/t/p/w780";

export default function MovieRecommended({
  id,
  tmdbId,
}: {
  id: string;
  tmdbId: string;
}) {
  const {
    data: recommendedMovieList = [],
    isPending,
    error,
  } = useApi(
    ["recommendedMovies", tmdbId],
    () => getRecommendedMovies(tmdbId),
    {
      select: (data) => data.results,
    },
  );

  if (error) return <Error error={error} />;

  return (
    <section className="px-2 py-6">
      <h3>추천 영화</h3>
      <SlideMovies
        data={recommendedMovieList}
        isPending={isPending}
        skeletonClass="aspect-16/9 h-auto w-full object-cover"
        skeletonContainerClass="overflow-visible"
      >
        {recommendedMovieList.map((movie: RecommendedMovie) => {
          const year = movie.release_date?.slice(0, 4);
          const imagePath = movie.backdrop_path ?? movie.poster_path;
          const image = imagePath ? `${TMDB_BACKDROP}${imagePath}` : null;

          if (!image) return null;

          return (
            <div
              key={movie.id}
              className="px-2 transition-transform duration-200 hover:scale-105"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Link href={`/movies/${id}`} className="block h-full">
                  <Image
                    src={image}
                    alt={movie.title}
                    width={780}
                    height={440}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 bg-linear-to-t from-black/90 via-black/50 to-transparent px-2.5 pt-8 pb-2.5 sm:px-3 sm:pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm leading-snug font-semibold text-white sm:text-base">
                      {movie.title}
                    </p>
                    {year && (
                      <p className="mt-0.5 truncate text-xs whitespace-nowrap text-white/70">
                        {year}년
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/movies/${id}`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-red text-white transition-colors duration-200 hover:bg-brand-red-hover sm:size-9"
                    aria-label={`${movie.title} 상세 정보`}
                  >
                    <AddIcon sx={{ color: "white", fontSize: "1.25rem" }} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </SlideMovies>
    </section>
  );
}

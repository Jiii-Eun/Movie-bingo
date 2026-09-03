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
import { useResize } from "@/hooks/resize";

const TMDB_BACKDROP = "https://image.tmdb.org/t/p/w780";

export default function MovieRecommended({
  id,
  tmdbId,
}: {
  id: string;
  tmdbId: string;
}) {
  const widthSize = useResize();

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
      <h3>추천 {widthSize === 12 ? "영화" : ""}</h3>
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
              className="px-2 transition-transform duration-200 hover:scale-110"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Link href={`/movies/${id}`} className="block">
                  <Image
                    src={image}
                    alt={movie.title}
                    width={780}
                    height={440}
                  />
                </Link>
                <div className="text-sm text-gray-500 bg-white/70 rounded-full px-2 py-1 absolute left-3 top-3">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/85 to-transparent px-3 pt-10 pb-3">
                  <div className="min-w-0">
                    <p className="flex items-end gap-2 text-sm font-medium text-white md:text-2xl md:font-bold">
                      <span>{movie.title}</span>
                      <span className="text-xs text-white/70 md:text-[0.875rem]">
                        {year}년
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/movies/${id}`}
                    className="flex shrink-0 items-center justify-center rounded-md bg-brand-red px-2.5 py-1.5 text-white transition-colors duration-200 hover:bg-brand-red-hover md:px-3 md:py-2"
                  >
                    <AddIcon
                      className="md:hidden"
                      sx={{ color: "white", fontSize: "1.25rem" }}
                    />
                    <span className="hidden text-sm font-medium lg:block">
                      상세 정보
                    </span>
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

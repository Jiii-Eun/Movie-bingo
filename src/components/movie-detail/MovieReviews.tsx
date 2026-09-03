"use client";

import { getMovieReviews } from "@/api/tmdb/actions";
import Error from "@/components/common/Error";
import LoadMoreButton from "@/components/movie-detail/load-more/LoadMoreButton";
import { REVIEW_PAGE_SIZE } from "@/constans/detail";
import { useApi } from "@/hooks/apiHook";
import { TmdbReview } from "@/type/tmdbType";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";
import { Rating } from "@mui/material";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const DEFAULT_AVATARS = [FaceIcon, Face2Icon, Face3Icon] as const;

const formatReviewDate = (createdAt: string, updatedAt?: string) => {
  const format = (iso: string) => {
    const date = new Date(iso);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  if (updatedAt && updatedAt !== createdAt) {
    return `${format(updatedAt)} (수정됨)`;
  }

  return format(createdAt);
};

const pickDefaultAvatar = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i)) % DEFAULT_AVATARS.length;
  }
  return DEFAULT_AVATARS[hash];
};

const getAvatarSrc = (avatarPath: string | null | undefined) => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith("http")) return avatarPath;
  if (avatarPath.startsWith("/http")) return avatarPath.slice(1);
  return `https://image.tmdb.org/t/p/w45${avatarPath}`;
};

const toMuiRating = (rating: number | null | undefined) => {
  if (rating == null) return null;
  // TMDB 평점은 보통 1~10 → MUI Rating(0~5)로 변환
  return Math.min(5, Math.max(0, rating / 2));
};

export default function MovieReviews({
  tmdbId,
}: {
  id: string;
  tmdbId: string;
}) {
  const {
    data: reviewList = [],
    isPending,
    error,
  } = useApi(["reviews", tmdbId], () => getMovieReviews(tmdbId), {
    select: (data): TmdbReview[] => data.results ?? [],
  });

  const [visibleCount, setVisibleCount] = useState(REVIEW_PAGE_SIZE);

  if (isPending) {
    return (
      <section className="flex-center px-2 py-10">
        <ClipLoader color="#fff" size={28} />
      </section>
    );
  }
  if (error) return <Error error={error} />;

  const reviews: TmdbReview[] = reviewList ?? [];
  if (!reviews.length) return null;

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;

  return (
    <section className="px-2 py-6">
      <h3>리뷰</h3>
      <ul className="flex flex-col gap-4">
        {visibleReviews.map((review: TmdbReview) => {
          const username =
            review.author_details.username ||
            review.author_details.name ||
            review.author ||
            "익명";
          const avatarSrc = getAvatarSrc(review.author_details.avatar_path);
          const DefaultAvatar = pickDefaultAvatar(review.id || username);
          const ratingValue = toMuiRating(review.author_details.rating);

          return (
            <li
              key={review.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  {avatarSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarSrc}
                      alt={username}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar sx={{ color: "#fff", fontSize: "1.5rem" }} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold text-white">{username}</p>
                    <p className="text-xs text-white/50">
                      {formatReviewDate(review.created_at, review.updated_at)}
                    </p>
                  </div>

                  {ratingValue != null && (
                    <Rating
                      name={`review-rating-${review.id}`}
                      value={ratingValue}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{
                        mt: 0.5,
                        "& .MuiRating-iconFilled": {
                          color: "var(--color-brand-red)",
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255, 255, 255, 0.25)",
                        },
                      }}
                    />
                  )}

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80 md:text-base">
                    {review.content}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <LoadMoreButton
          onClick={() => setVisibleCount((count) => count + REVIEW_PAGE_SIZE)}
        />
      )}
    </section>
  );
}

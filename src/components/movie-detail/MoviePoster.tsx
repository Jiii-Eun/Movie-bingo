"use client";

import Badge from "@/components/common/Badge";
import {
  AppleTVBadgeRound,
  DisneyPlusBadgeRound,
  NetflixBadgeRound,
  PrimeVideoBadgeRound,
} from "@/components/common/OttBadge";
import { AppleTV, DisneyPlus, Netflix, PrimeVideo } from "@/constans/ott";
import { useApi } from "@/hooks/apiHook";
import { getShow } from "@/api/actions";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import { useParams } from "next/navigation";
import MoviePosterSkeleton from "./MoviePosterSkeleton";
import Image from "next/image";
import Link from "next/link";
import { PAID_TYPES, TYPE_LABELS } from "@/constans/detail";
import MovieRecommended from "./MovieRecommended";
import MovieTrailer from "./MovieTrailer";
import MovieReviews from "./MovieReviews";
import Error from "@/components/common/Error";

export default function MoviePoster() {
  const { id } = useParams<{ id: string }>();

  const {
    data: detailData,
    isPending,
    error,
  } = useApi(["movie-detail", id], () => getShow(id));

  const formatPrice = (amount: string) => {
    const value = Number(amount);
    if (!Number.isFinite(value)) return null;
    return `${value.toLocaleString("ko-KR")}원`;
  };

  const poster =
    detailData?.imageSet?.verticalPoster?.w720 ??
    detailData?.imageSet?.verticalPoster?.w480 ??
    "";

  const backdrop =
    detailData?.imageSet?.horizontalPoster?.w1080 ??
    detailData?.imageSet?.horizontalPoster?.w720 ??
    "";

  console.log(detailData);

  if (isPending) return <MoviePosterSkeleton />;
  if (error) return <Error error={error} />;

  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src={backdrop}
          alt=""
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/30" />

        <div className="relative px-4 py-8 md:py-14 flex-center">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-12">
            <div className="w-full flex-center shrink-0 max-w-[47rem] md:max-w-[20rem] ">
              <Image
                src={poster}
                alt={detailData.title}
                width={780}
                height={1170}
                className="aspect-2/3 max-w-full md:max-w-[20rem] h-auto w-full rounded-2xl object-cover shadow-banner"
                priority
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-5 pb-1">
              <div>
                <p className="text-sm text-white/50">
                  {detailData.originalTitle}
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-5xl">
                  {detailData.title}
                </h1>
                <p className="mt-3 text-sm text-white/70 md:text-base">
                  {detailData.releaseYear} · {detailData.runtime}분 ·{" "}
                  {detailData.genres.map((genre) => genre.name).join(" / ")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand-red px-2.5 py-1 text-sm font-semibold text-white">
                  ⭐ {detailData.rating}
                </span>
                {detailData.genres.map((genre) => (
                  <Badge key={genre.id} className="bg-white/5">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <dl className="flex items-center gap-4 text-sm md:text-base">
                <Meta
                  label="감독"
                  value={detailData?.directors?.join(", ") ?? ""}
                />
                <Meta label="출연" value={detailData?.cast?.join(", ") ?? ""} />
              </dl>

              <div>
                <h2 className="mb-2 text-base font-semibold text-white">
                  줄거리
                </h2>
                <p className="text-sm leading-relaxed text-white/80 md:text-base">
                  {detailData.overview}
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 md:flex-row md:flex-wrap">
                {detailData.streamingOptions.kr.map((option, index) => {
                  const isPaid = PAID_TYPES.includes(
                    option.type as (typeof PAID_TYPES)[number],
                  );
                  const price =
                    isPaid && option.price?.amount
                      ? formatPrice(option.price.amount)
                      : null;
                  const typeLabel =
                    TYPE_LABELS[option.type as keyof typeof TYPE_LABELS] ??
                    option.type;
                  const ottId = option.service
                    .id as StreamingAvailabilityCatalog;

                  return (
                    <Link
                      key={`${option.service.id}-${option.type}-${index}`}
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-brand-black hover:bg-brand-red hover:text-white md:w-auto md:min-w-40"
                    >
                      <span className=" md:flex">
                        <OttServiceIcon id={ottId} />
                      </span>
                      <span className="text-sm font-medium md:inline">
                        {typeLabel}
                      </span>
                      <span className="text-sm font-semibold">
                        {price ?? ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <MovieRecommended id={id} tmdbId={detailData.tmdbId} />
        <MovieTrailer id={id} tmdbId={detailData.tmdbId} />
        <MovieReviews id={id} tmdbId={detailData.tmdbId} />
      </section>
    </>
  );
}

function OttServiceIcon({ id }: { id: StreamingAvailabilityCatalog }) {
  if (id === Netflix) return <NetflixBadgeRound />;
  if (id === PrimeVideo) return <PrimeVideoBadgeRound />;
  if (id === DisneyPlus) return <DisneyPlusBadgeRound />;
  if (id === AppleTV) return <AppleTVBadgeRound />;
  return null;
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-white/45 md:text-sm">{label}</dt>
      <dd className="mt-1 font-medium text-white">{value}</dd>
    </div>
  );
}

import {
  NetflixBadgeRound,
  PrimeVideoBadgeRound,
  DisneyPlusBadgeRound,
  AppleTVBadgeRound,
} from "@/components/common/OttBadge";
import { DisneyPlus, Netflix, PrimeVideo } from "@/constans/ott";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import Image from "next/image";
import Link from "next/link";
import { Show } from "streaming-availability";
import AddIcon from "@mui/icons-material/Add";

export default function OttCard({ ott }: { ott: Show }) {
  const poster =
    ott.imageSet.verticalPoster.w720 ?? ott.imageSet.verticalPoster.w600;
  const meta = [
    ott.releaseYear,
    ott.genres.map((genre) => genre.name).join(" / "),
    ott.showType === "movie" && ott.runtime
      ? `${ott.runtime}분`
      : ott.seasonCount
        ? `시즌 ${ott.seasonCount}`
        : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const ottOptions = ott.streamingOptions?.kr?.[0];

  if (!ottOptions) {
    return null;
  }

  const ottType = ottOptions.service.id as StreamingAvailabilityCatalog;

  const linkStyle =
    "flex items-center rounded-md text-lg py-2 px-4 transition-colors duration-200 w-full";

  return (
    <div className="relative z-200 rounded-xl transition-transform duration-200 group hover:scale-105 overflow-visible">
      <Link href={`/movies/${ott.imdbId}`} className="block">
        <Image
          src={poster}
          alt={ott.title}
          width={1080}
          height={1620}
          className="aspect-2/3 h-auto w-full object-cover rounded-xl"
          loading="lazy"
        />
        {ottType && (
          <div className="absolute top-2 left-2 z-300 transition-transform duration-200 group-hover:scale-105">
            {ottType === Netflix ? (
              <NetflixBadgeRound />
            ) : ottType === DisneyPlus ? (
              <DisneyPlusBadgeRound />
            ) : ottType === PrimeVideo ? (
              <PrimeVideoBadgeRound />
            ) : (
              <AppleTVBadgeRound />
            )}
          </div>
        )}
        {ott.rating !== 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-black/70 px-1.5 py-1 text-xs font-semibold text-red ">
            ⭐ {ott.rating}위
          </span>
        )}
      </Link>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-black/85 to-transparent px-3 pb-6 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        <Link
          href={`/movies/${ott.imdbId}`}
          className="line-clamp-2 text-lg font-semibold text-white"
        >
          {ott.title}
        </Link>
        <p className="line-clamp-1 text-sm text-white/70">{meta}</p>
        <div className="flex gap-2 sm:gap-3">
          <Link
            href={ottOptions.link}
            target="_blank"
            className={`${linkStyle} group/link flex items-center justify-center gap-2 bg-white text-brand-black hover:bg-brand-red hover:text-white`}
          >
            <div className="play lg:hidden block shrink-0 text-brand-black transition-colors duration-200 group-hover/link:text-white" />

            <span className="hidden text-brand-black transition-colors duration-200 group-hover/link:text-white lg:block">
              바로가기
            </span>
          </Link>

          <Link
            href={`/movies/${ott.imdbId}`}
            className={`${linkStyle} flex items-center justify-center bg-brand-red hover:bg-brand-red-hover`}
          >
            <div className="lg:hidden">
              <AddIcon
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                }}
              />
            </div>

            <span className="hidden text-white lg:block">상세 정보</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

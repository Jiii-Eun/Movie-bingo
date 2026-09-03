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
    ott.imageSet.verticalPoster.w480 ?? ott.imageSet.verticalPoster.w360;
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
    "flex items-center rounded-md text-lg py-2 px-4 transition-colors duration-200";

  return (
    <div className="relative z-200 rounded-xl transition-transform duration-200 group hover:scale-105 overflow-visible">
      <Link href={`/movies/${ott.imdbId}`} className="block">
        <Image
          src={poster}
          alt={ott.title}
          width={480}
          height={720}
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
        <div className="flex gap-3">
          <Link
            href={ottOptions.link}
            target="_blank"
            className={`${linkStyle} items-center gap-2 bg-white align-middle text-brand-black hover:bg-brand-red hover:text-white group/link`}
          >
            <div className="play text-brand-black transition-colors duration-200 group-hover/link:text-white" />
            <div className="hidden text-brand-black transition-colors duration-200 group-hover/link:text-white md:block">
              바로가기
            </div>
          </Link>
          <Link
            href={`/movies/${ott.imdbId}`}
            className={`${linkStyle} bg-brand-red align-middle hover:bg-brand-red-hover`}
          >
            <div className="block md:hidden">
              <AddIcon
                sx={{ color: "white", fontSize: "1.5rem", overflow: "hidden" }}
              />
            </div>
            <div className="text-white hidden md:block">상세 정보</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

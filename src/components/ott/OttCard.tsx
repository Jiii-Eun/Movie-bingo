import Image from "next/image";
import Link from "next/link";
import { Show } from "streaming-availability";

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

  return (
    <Link href={`/movies/${ott.imdbId ?? ott.id}`} className="block">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={poster}
          alt={ott.title}
          width={480}
          height={720}
          className="aspect-2/3 h-auto w-full object-cover"
        />
        {ott.rating !== 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-red ">
            ⭐ {ott.rating} 위
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-3 pt-10 pb-3">
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {ott.title}
          </p>
          <p className="mt-1 line-clamp-1 text-xs text-white/70">{meta}</p>
        </div>
      </div>
    </Link>
  );
}

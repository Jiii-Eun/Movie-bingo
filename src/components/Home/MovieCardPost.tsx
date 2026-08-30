import IconBadge from "@/components/Home/IconBadge";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import Image from "next/image";
import { Show } from "streaming-availability";

export default function MovieCardPost({
  show,
  activeBadge,
}: {
  show: Show;
  activeBadge: StreamingAvailabilityCatalog;
}) {
  return (
    <div className="px-2">
      <div className="relative overflow-hidden rounded-xl">
        {activeBadge && <IconBadge type={activeBadge} />}
        <Image
          src={show.imageSet.verticalPoster.w360}
          alt={show.title}
          width={240}
          height={360}
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-3 pt-8 pb-2">
          <p className="line-clamp-2 text-center text-xs text-white">
            {show.releaseYear}・
            {show.genres.map((genre) => genre.name).join(" / ")}
          </p>
        </div>
      </div>
    </div>
  );
}

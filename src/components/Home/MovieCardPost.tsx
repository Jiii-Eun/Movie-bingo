import Image from "next/image";
import { Show } from "streaming-availability";

export default function MovieCardPost({ show }: { show: Show }) {
  return (
    <>
      <div className="flex-col gap-2" key={show.id}>
        <div>{show.title}</div>
        <div className="flex-center gap-2">
          <Image
            src={show.imageSet.verticalPoster.w360}
            alt={show.title}
            width={360}
            height={360}
            className="object-cover"
            priority
          />
          <div className="flex-center gap-2">
            {show.genres.map((genre) => (
              <div key={genre.id}>{genre.name}</div>
            ))}
          </div>
          <div className="flex-col">
            <h4>{show.title}</h4>
            <p>{show.releaseYear}</p>
          </div>
        </div>
      </div>
    </>
  );
}

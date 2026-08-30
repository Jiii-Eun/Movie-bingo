"use client";

import { getTopShows } from "@/api/actions";
import { OttBadge } from "@/components/common/OttBadge";
import { useApi } from "@/hooks/apiHook";
import { Show } from "streaming-availability";
import { useState } from "react";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import MovieCardPost from "@/components/Home/MovieCardPost";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import NoList from "@/components/Home/NoList";
import CardSkeleton from "@/components/Home/CardSkeleton";

interface TopMoviesProps {
  title: string;
  badges: StreamingAvailabilityCatalog[];
}

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 768 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function TopMovies({ title, badges }: TopMoviesProps) {
  const [active, setActive] = useState<StreamingAvailabilityCatalog>(badges[0]);

  const { data: topShows, isPending } = useApi<Show[]>(
    ["topMovies", active],
    () => getTopShows("movie", active),
  );

  const handleSelect = (badge: StreamingAvailabilityCatalog) => {
    setActive(badge);
  };

  return (
    <section className="px-2 py-6">
      <h3 className="mb-3 text-lg font-semibold md:text-xl">{title}</h3>
      <div className="mb-4 flex flex-wrap gap-1">
        {badges.map((badge) => (
          <OttBadge
            key={badge}
            type={badge as StreamingAvailabilityCatalog}
            onSelect={() => handleSelect(badge)}
            isActive={active === badge}
          />
        ))}
      </div>

      {isPending ? (
        <CardSkeleton />
      ) : !topShows?.length ? (
        <NoList />
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          keyBoardControl
          swipeable
          draggable
          containerClass="overflow-visible"
        >
          {topShows.map((show) => (
            <MovieCardPost key={show.id} show={show} activeBadge={active} />
          ))}
        </Carousel>
      )}
    </section>
  );
}

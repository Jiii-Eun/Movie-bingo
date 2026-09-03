"use client";

import { getTopShows } from "@/api/actions";
import { OttBadge } from "@/components/common/OttBadge";
import { useApi } from "@/hooks/apiHook";
import { Show } from "streaming-availability";
import { useState } from "react";
import { StreamingAvailabilityCatalog } from "@/type/apiType";

import SlideMovies from "@/components/common/SlideMovies";
import MovieCardPost from "@/components/home/slide-movie/MovieCardPost";
import Error from "@/components/common/Error";

interface TopMoviesProps {
  title: string;
  badges: StreamingAvailabilityCatalog[];
}

export default function TopMovies({ title, badges }: TopMoviesProps) {
  const [active, setActive] = useState<StreamingAvailabilityCatalog>(badges[0]);

  const {
    data: topShows,
    isPending,
    error,
  } = useApi<Show[]>(["topMovies", active], () => getTopShows("movie", active));

  const handleSelect = (badge: StreamingAvailabilityCatalog) => {
    setActive(badge);
  };

  if (error) {
    return <Error error={error} />;
  }

  return (
    <section className="px-2 py-6">
      <h3>{title}</h3>
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

      <SlideMovies data={topShows ?? []} isPending={isPending}>
        {topShows?.map((show) => (
          <MovieCardPost key={show.id} show={show} activeBadge={active} />
        ))}
      </SlideMovies>
    </section>
  );
}

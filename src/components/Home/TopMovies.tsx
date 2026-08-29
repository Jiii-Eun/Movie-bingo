"use client";

import { getTopShows } from "@/api/actions";
import { Badge } from "@/components/common/Badge";
import { useApi } from "@/hooks/apiHook";
import { Show } from "streaming-availability";
import { useState } from "react";
import { StreamingAvailabilityCatalog } from "@/type/apiType";
import Image from "next/image";
import MovieCardPost from "@/components/Home/MovieCardPost";

interface TopMoviesProps {
  title: string;
  badges: StreamingAvailabilityCatalog[];
}

export default function TopMovies({ title, badges }: TopMoviesProps) {
  const [active, setActive] = useState<StreamingAvailabilityCatalog>(badges[0]);

  const { data: topShows, refetch } = useApi<Show[]>(["topShows"], () =>
    getTopShows("movie", active as StreamingAvailabilityCatalog),
  );

  console.log(topShows);

  const handleSelect = (badge: StreamingAvailabilityCatalog) => {
    setActive(badge);
    refetch();
  };

  return (
    <>
      <h3>{title}</h3>
      <div className="flex gap-1">
        {badges.map((badge) => (
          <Badge
            key={badge}
            type={badge as StreamingAvailabilityCatalog}
            onSelect={() => handleSelect(badge)}
            isActive={active === badge}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {topShows?.map((show) => (
          <MovieCardPost key={show.id} show={show} />
        ))}
      </div>
    </>
  );
}

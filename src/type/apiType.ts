import { getGenres } from "../api/actions";
import { ottTypes } from "@/constans/ott";

export type StreamingAvailabilityCatalog =
  (typeof ottTypes)[keyof typeof ottTypes];

export type StreamingAvailabilityShowType = "series" | "movie";

export const getGenreNames = async () => {
  const genres = await getGenres();
  return genres.map((genre) => genre.name);
};

const genreNames = await getGenreNames();

export type StreamingAvailabilityGenre = typeof genreNames;

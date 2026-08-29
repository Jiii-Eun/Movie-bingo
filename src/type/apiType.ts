import { getGenres } from "../api/actions";

export type StreamingAvailabilityCatalog =
  | "netflix"
  | "prime"
  | "disney"
  | "apple";

export type StreamingAvailabilityShowType = "series" | "movie";

export const getGenreNames = async () => {
  const genres = await getGenres();
  return genres.map((genre) => genre.name);
};

const genreNames = await getGenreNames();

export type StreamingAvailabilityGenre = typeof genreNames;

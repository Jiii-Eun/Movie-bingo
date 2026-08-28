import { getGenres } from "../api/streamingApi";

export type StreamingAvailabilityCatalog =
  | "netflix"
  | "amazon_prime"
  | "disney"
  | "apple";

export type StreamingAvailabilityShowType = "series" | "movie";

export const getGenreNames = async () => {
  const genres = await getGenres();
  return genres.map((genre) => genre.name);
};

const genreNames = await getGenreNames();

export type StreamingAvailabilityGenre = typeof genreNames;

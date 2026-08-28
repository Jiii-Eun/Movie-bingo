import * as streamingAvailability from "streaming-availability";

import {
  StreamingAvailabilityShowType,
  StreamingAvailabilityCatalog,
  StreamingAvailabilityGenre,
} from "../type/apiType";

const API_KEY = process.env.STREAMING_AVAILABILITY_API_KEY;

export const streamingClient = new streamingAvailability.Client(
  new streamingAvailability.Configuration({
    apiKey: API_KEY,
  }),
);

export const getGenres = async () => {
  return await streamingClient.genresApi.getGenres({
    outputLanguage: "en",
  });
};

export const getShow = async (id: string) => {
  return await streamingClient.showsApi.getShow({
    id: id,
  });
};

export const getSearchFilter = async (
  showType: StreamingAvailabilityShowType,
  catalogs: StreamingAvailabilityCatalog[],
  keyword?: string,
  genres?: StreamingAvailabilityGenre,
  yearMin?: number,
  yearMax?: number,
) => {
  return await streamingClient.showsApi.searchShowsByFilters({
    country: "en",
    showType: showType,
    keyword: keyword,
    catalogs: catalogs,
    yearMin: yearMin,
    yearMax: yearMax,
    genres: genres,
    orderBy: "rating",
  });
};

export const getTopShows = async (
  country: string,
  showType: StreamingAvailabilityShowType,
  service: StreamingAvailabilityCatalog,
) => {
  return await streamingClient.showsApi.getTopShows({
    country: "en",
    showType: showType,
    service: service,
  });
};

export const getChanges = async (
  country: string,
  changeType: "new" | "expiring" | "upcoming",
  catalogs: StreamingAvailabilityCatalog[],
) => {
  return await streamingClient.changesApi.getChanges({
    country: "en",
    changeType: changeType,
    itemType: "show",
    catalogs: catalogs,
  });
};

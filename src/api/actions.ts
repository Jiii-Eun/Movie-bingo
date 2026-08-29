"use server";

import {
  StreamingAvailabilityShowType,
  StreamingAvailabilityCatalog,
  StreamingAvailabilityGenre,
} from "../type/apiType";

import { streamingClient } from "./client";

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
    country: "kr",
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
  showType: StreamingAvailabilityShowType,
  service: StreamingAvailabilityCatalog,
) => {
  return await streamingClient.showsApi.getTopShows({
    country: "kr",
    showType: showType,
    service: service,
  });
};

export const getChanges = async (
  changeType: "new" | "expiring" | "upcoming",
  catalogs: StreamingAvailabilityCatalog[],
) => {
  return await streamingClient.changesApi.getChanges({
    country: "kr",
    changeType: changeType,
    itemType: "show",
    catalogs: catalogs,
  });
};

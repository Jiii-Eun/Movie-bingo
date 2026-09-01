"use server";

import {
  StreamingAvailabilityShowType,
  StreamingAvailabilityCatalog,
  StreamingAvailabilityGenre,
} from "../type/apiType";

import { streamingClient } from "./client";

// 장르 목록
export const getGenres = async () => {
  return await streamingClient.genresApi.getGenres({
    outputLanguage: "en",
  });
};

// 상세 페이지
export const getShow = async (id: string) => {
  return await streamingClient.showsApi.getShow({
    id: id,
  });
};

// 검색 필터 및 목록
export const getSearchFilter = async (
  keyword: string,
  showType?: StreamingAvailabilityShowType,
  catalogs?: StreamingAvailabilityCatalog[],
  genres?: StreamingAvailabilityGenre,
  yearMin?: number,
  yearMax?: number,
) => {
  return await streamingClient.showsApi.searchShowsByFilters({
    country: "kr",
    keyword: keyword,
    showType: showType,
    catalogs: catalogs,
    yearMin: yearMin,
    yearMax: yearMax,
    genres: genres,
    orderBy: "rating",
  });
};

// 인기 영화 목록
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

// 변경될 영화 목록
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

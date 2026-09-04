"use server";

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
});

export const getRecommendedMovies = async (
  movieId: string,
  page: number = 1,
) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/${movieId}/recommendations?language=ko-KR&page=${page}`,
  );
  return data;
};

export const getMovieReviews = async (movieId: string, page: number = 1) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/${movieId}/reviews?language=ko-KR&page=${page}`,
  );
  return data;
};

export const getTrailer = async (id: string) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/${id}/videos?language=ko-KR`,
  );
  return data;
};

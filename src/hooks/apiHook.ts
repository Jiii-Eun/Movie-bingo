import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useApi = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>,
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options,
  });
};

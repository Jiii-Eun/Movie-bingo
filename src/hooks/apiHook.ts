import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useApi = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000 * 24,
    ...options,
  });
};

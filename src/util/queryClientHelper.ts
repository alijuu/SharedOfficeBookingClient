import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type StrictQueryOptions<TData> = UseQueryOptions<TData> & {
  queryKey: readonly unknown[]; // force queryKey to be required
};
export function createQueryHook<TData>(options: StrictQueryOptions<TData>) {
  function useHook() {
    return useQuery<TData>(options);
  }

  useHook.getOptions = () => options;

  return useHook;
}

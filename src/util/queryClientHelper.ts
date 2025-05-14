import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type StrictQueryOptions<TData> = UseQueryOptions<TData> & {
  queryKey: readonly unknown[]; // force queryKey to be required
};
export function createQueryHook<TData, TVariables = void>(
  getOptions:
    | StrictQueryOptions<TData>
    | ((variables: TVariables) => StrictQueryOptions<TData>),
) {
  function useHook(variables?: TVariables) {
    const options =
      typeof getOptions === "function"
        ? (getOptions as (v: TVariables) => StrictQueryOptions<TData>)(
            variables!,
          )
        : getOptions;

    return useQuery<TData>(options);
  }

  useHook.getOptions = getOptions;

  return useHook;
}

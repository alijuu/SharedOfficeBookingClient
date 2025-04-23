import { useMemo } from "react";
import { object, pipe, nonEmpty, string } from "valibot";

export function useLoginSchema() {
  return useMemo(
    () =>
      object({
        username: pipe(string(), nonEmpty()),
        password: pipe(string(), nonEmpty()),
      }),
    [],
  );
}

import { useMemo } from "react";
import { object, pipe, nonEmpty, string, email } from "valibot";

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

export function useRegisterSchema() {
  return useMemo(
    () =>
      object({
        username: pipe(string(), nonEmpty()),
        password: pipe(string(), nonEmpty()),
        email: pipe(string(), email()),
      }),
    [],
  );
}

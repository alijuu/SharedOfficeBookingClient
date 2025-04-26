import { useMemo } from "react";
import {
  object,
  pipe,
  nonEmpty,
  string,
  email,
  url,
  array,
  number,
} from "valibot";

export function useWorkspaceForm() {
  return useMemo(
    () =>
      object({
        name: pipe(string(), nonEmpty()),
        address: pipe(string(), nonEmpty()),
        email: pipe(string(), email()),
        phone: pipe(string(), nonEmpty()),
        description: pipe(string(), nonEmpty()),
        imageUrl: pipe(string(), url()),
        floorPlan: array(array(number())),
      }),
    [],
  );
}

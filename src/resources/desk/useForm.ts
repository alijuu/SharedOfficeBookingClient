import { useMemo } from "react";
import { date, nonEmpty, object, pipe, string } from "valibot";

export function useBookingSchema() {
  return useMemo(
    () =>
      object({
        startTime: date(),
        endTime: date(),
        type: pipe(string(), nonEmpty()),
        deskId: string(),
      }),
    [],
  );
}

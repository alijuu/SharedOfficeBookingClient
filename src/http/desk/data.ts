import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../util/client.ts";

export interface DeskResponse {
  id: string;
  code: string;
}

export function useGetDesk(id: string) {
  return useQuery({
    queryKey: ["desks/available", id],
    queryFn: async (): Promise<DeskResponse> => {
      const { data } = await apiClient.get(`/api/Desk/desk/${id}`);
      return data;
    },
  });
}

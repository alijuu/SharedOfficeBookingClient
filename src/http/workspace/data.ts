import { useMutation } from "@tanstack/react-query";
import { apiClient, queryClient } from "../../util/client.ts";
import { createQueryHook } from "../../util/queryClientHelper.ts";
import { WorkspacesResponse } from "../../resources/workspaces/model.ts";

export interface CreateWorkspaceDto {
  name: string;
  address: string;
  email: string;
  phone: string;
  imageUrl: string;
  description: string;
  floorPlan: number[][]; // 2D array of numbers representing the floor layout
}
export function useCreateWorkspace() {
  return useMutation({
    mutationFn: async (data: CreateWorkspaceDto) => {
      const response = await apiClient.post("/api/workspaces/create", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },
  });
}

export const useGetAllWorkspaces = createQueryHook<WorkspacesResponse>({
  queryKey: ["workspace"],
  queryFn: async () => {
    const { data } = await apiClient.request({
      method: "GET",
      url: "/api/workspaces/get",
    });
    return data;
  },
});

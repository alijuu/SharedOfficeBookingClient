import { useMutation } from "@tanstack/react-query";
import { apiClient, queryClient } from "../../util/client.ts";
import { createQueryHook } from "../../util/queryClientHelper.ts";
import {
  WorkspaceResponse,
  WorkspacesResponse,
} from "../../resources/workspaces/model.ts";

export interface CreateWorkspaceDto {
  name: string;
  address: string;
  email: string;
  phone: string;
  imageUrl: string;
  description: string;
  floorPlan: number[][];
}
export interface CreateBooking {
  userId: string;
  deskId: number;
  type: string;
  startTime: string;
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
  queryKey: ["workspaces"],
  queryFn: async () => {
    const { data } = await apiClient.request({
      method: "GET",
      url: "/api/workspaces/get",
    });
    return data;
  },
});

export const useGetWorkspace = createQueryHook<
  WorkspaceResponse,
  { id: string }
>(({ id }) => ({
  queryKey: ["workspace", id],
  queryFn: async () => {
    const { data } = await apiClient.request({
      method: "GET",
      url: `/api/workspaces/get/${id}`,
    });
    return data;
  },
  enabled: !!id,
}));

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: CreateBooking) => {
      const response = await apiClient.post("/api/booking", data);
      return response.data;
    },
  });
}
// export const useGetBookingDest = createQueryHook<>();

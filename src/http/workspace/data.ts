import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient, queryClient } from "../../util/client.ts";
import { createQueryHook } from "../../util/queryClientHelper.ts";
import {
  WorkspaceResponse,
  WorkspacesResponse,
} from "../../resources/workspaces/model.ts";
import { useNotification } from "../../context/notifications/useNotifications.ts";

export interface CreateWorkspaceDto {
  name: string;
  address: string;
  email: string;
  phone: string;
  imageUrl: string;
  description: string;
  floorPlan: number[][];
}
export interface UpdateWorkspaceDto {
  name: string;
  address: string;
  email: string;
  phone: string;
  imageUrl: string;
  description: string;
  floorPlan: number[][];
}
export interface UpdateWorkspace {
  workspace: UpdateWorkspaceDto;
  id: string;
}
export interface CreateBooking {
  userId: string;
  deskId: string;
  type: number;
  startTime: string;
  endTime: string;
}

export function useCreateWorkspace() {
  const { open } = useNotification();
  return useMutation({
    mutationFn: async (data: CreateWorkspaceDto) => {
      const response = await apiClient.post("/api/workspaces/create", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
      open("Workspace created successfully!", "success");
    },
    onError: () => {
      open("Workspace creation failed.", "error");
    },
  });
}
export function useEditWorkspace() {
  const { open } = useNotification();
  return useMutation({
    mutationFn: async (data: UpdateWorkspace) => {
      const response = await apiClient.put(
        `/api/workspaces/update/${data.id}`,
        data.workspace,
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
      open("Workspace updated successfully!", "success");
    },
    onError: () => {
      open("Workspace update failed.", "error");
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
  const { open } = useNotification();
  return useMutation({
    mutationFn: async (data: CreateBooking) => {
      const response = await apiClient.post("/api/booking", data);
      return response.data;
    },
    onSuccess: async () => {
      open("Booking successful!", "success");
    },
    onError: async () => {
      open("Booking failed.", "error");
    },
  });
}

export function useDeleteWorkspace() {
  const { open } = useNotification();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/api/workspaces/delete/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      open("Workspace deleted successfully!", "success");
    },
    onError: () => {
      open("Workspace deletion failed.", "error");
    },
  });
}

export function useGetAvailableDesk(id: string) {
  return useQuery({
    queryKey: ["desks/available", id],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/api/desk/workspace/${id}/booked-now`,
      );
      return data;
    },
  });
}

// export const useGetBookingDest = createQueryHook<>();

import { useMutation } from "@tanstack/react-query";
import { authProvider } from "../../authProvider.ts";
import { AuthRequest, RegisterRequest } from "./data.ts";
import { useNavigate } from "@tanstack/react-router";
import { useNotification } from "../../context/notifications/useNotifications.ts";

export function useLogin() {
  const { open } = useNotification();

  return useMutation({
    mutationFn: async (data: AuthRequest) => {
      const response = await authProvider.login(data);
      if (!response.success) {
        throw response.error;
      }
      return response;
    },
    onSuccess: () => {
      open("Login successful!", "success");
    },
    onError: () => {
      open("Login failed.", "error");
    },
  });
}

export const useLogout = () => {
  const { open } = useNotification();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authProvider.logout();
      open("Logout successful!", "success");
      await navigate({ to: "/login" }); // Notification on logout success
    } catch (error) {
      open(`Logout failed ${error}`, "error"); // Notification on failure
    }
  };

  return { logout };
};

export function useRegister() {
  const { open } = useNotification();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authProvider.register(data);
      if (!response.success) {
        throw new Error("Registration failed."); // trigger onError
      }
      return response;
    },
    onSuccess: () => {
      open("Registration successful!", "success");
    },
    onError: () => {
      open("Registration failed.", "error");
    },
  });
}

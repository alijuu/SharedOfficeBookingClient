import {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
} from "./http/auth/data.ts";
import { apiClient, queryClient } from "./util/client.ts";
import { ApplicationHttpError } from "./util/error.ts";

// let username: string | undefined;
let prevPassword: string | undefined;
// let prevRemember: boolean | undefined

export const authProvider = {
  login: async (data: AuthRequest) => {
    try {
      const res = await apiClient.post<AuthResponse>("/login", {
        username: data.username,
        password: data.password! ?? prevPassword,
      } satisfies AuthRequest);
      console.log(res);
      localStorage.setItem("accessToken", res.data.token);
      // if (data.remember || prevRemember) {
      //     localStorage.setItem('refreshToken', res.data.refreshToken)
      // }
      // const authData = await queryClient.ensureQueryData({
      //     queryKey: ['auth', 'identity'],
      //     queryFn: () => authProvider.getIdentity(),
      // })
      // username = undefined;
      prevPassword = undefined;
      // prevRemember = undefined
      return {
        success: true,
      };
    } catch (error) {
      const appError = error as ApplicationHttpError<unknown, unknown>;
      return {
        success: false,
        error: appError,
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.clear();
    return {
      success: true,
    };
  },
  register: async (data: RegisterRequest) => {
    try {
      await apiClient.post<AuthResponse>(
        "/register",
        data satisfies RegisterRequest,
      );
      return {
        success: true,
      };
    } catch (error) {
      const appError = error as ApplicationHttpError<unknown, unknown>;
      return {
        success: false,
        error: appError,
      };
    }
  },
  // getIdentity: async (): Promise<Al> => {
  //     const response = await apiClient.get<l>('/admin/auth/info')
  //     return response.data
  // },
};

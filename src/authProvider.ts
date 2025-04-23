import { AuthRequest, AuthResponse } from "./http/auth/data.ts";
import { apiClient, queryClient } from "./util/client.ts";

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
      return {
        success: false,
        error: error,
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
  // getIdentity: async (): Promise<Al> => {
  //     const response = await apiClient.get<l>('/admin/auth/info')
  //     return response.data
  // },
};

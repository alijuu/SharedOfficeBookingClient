import {QueryClient} from "@tanstack/react-query";
import {config} from "./env.ts";
import axios from 'axios'
import qs from 'qs'


export const apiClient = axios.create({
    baseURL: config.API_BASE_URL,
    withCredentials: true,
    paramsSerializer: (params) =>
        qs.stringify(params, {
            arrayFormat: 'repeat',
        }),
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
}
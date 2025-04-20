export interface AuthResponse {
    tokenType: string
    accessToken: string
    expiresIn: number
    refreshToken: string
}

export interface AuthRequest {
    email?: string
    password?: string
    remember?: boolean
}
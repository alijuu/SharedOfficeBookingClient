export interface AuthResponse {
  token: string;
  // accessToken: string
  // expiresIn: number
  // refreshToken: string
}

export interface AuthRequest {
  username?: string;
  password?: string;
}

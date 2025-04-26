export interface AuthResponse {
  token: string;
  // accessToken: string
  // expiresIn: number
  // refreshToken: string
}

export interface RegisterResponse {
  message: string;
  // accessToken: string
  // expiresIn: number
  // refreshToken: string
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

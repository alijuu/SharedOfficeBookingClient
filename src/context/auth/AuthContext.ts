import * as React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (auth: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  user: AuthUser | null;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export const AuthContext = React.createContext<AuthContext | null>(null);

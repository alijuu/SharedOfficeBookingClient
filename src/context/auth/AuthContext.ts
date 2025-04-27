import * as React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

export const AuthContext = React.createContext<AuthContext | null>(null);

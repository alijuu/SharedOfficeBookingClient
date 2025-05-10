import * as React from "react";
import { AuthContext } from "./AuthContext.ts";

const key = "tanstack.auth.user";

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  try {
    if (user) {
      localStorage.setItem(key, user);
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string | null>(() => getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (username: string) => {
    setStoredUser(username);
    setUser(username);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.Context = AuthContext;

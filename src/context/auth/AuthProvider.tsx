import * as React from "react";
import { AuthContext, AuthUser } from "./AuthContext";
import { authProvider } from "../../authProvider.ts";

const key = "tanstack.auth.users";

function getStoredUser() {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(key, JSON.stringify(user));
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(() => getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    await authProvider.logout();
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (userObj: AuthUser) => {
    setStoredUser(userObj);
    setUser(userObj);
  }, []);

  React.useEffect(() => {
    const checkIdentity = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const identity = await authProvider.getIdentity();
        setStoredUser(identity);
        setUser(identity);
      } catch (err) {
        console.warn("Failed to fetch identity:", err);
        await logout();
      }
    };

    if (!user) {
      checkIdentity();
    }
  }, [user, logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.Context = AuthContext;

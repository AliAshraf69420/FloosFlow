import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import userService from "../services/userService"; // your service to fetch user info
import authService from "../services/authService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!authService.isAuthenticated()) {
        setUser(null);
        return;
      }
      const data = await userService.getPersonalInfo(); // fetch from backend
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Listen to auth token changes (login/logout in other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        if (!e.newValue) {
          clearUser();
        } else {
          fetchUser();
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchUser, clearUser]);

  const value = {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const NotificationsContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000/api";

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const isAuthenticatedRef = useRef(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  // Initialize WebSocket connection// Initialize WebSocket connection
  const initializeSocket = useCallback(() => {
    if (!isAuthenticated() || socketRef.current) return;

    const token = localStorage.getItem("authToken");
    console.log("🔑 Initializing socket with token:", token ? "✅ exists" : "❌ missing");

    // Create socket connection with auth
    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Listen for new notifications
    socketRef.current.on("notification", (notification) => {
      console.log("🔔 Notification received:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });

    // Handle connection events
    socketRef.current.on("connect", () => {
      console.log("✅ WebSocket connected! Socket ID:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    // Only fetch if user is authenticated
    if (!isAuthenticated()) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          // User is unauthorized, clear notifications
          setNotifications([]);
          return;
        }
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark single notification as read
  const markAsRead = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to mark as read");

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/notifications/read-all`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to mark all as read");

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Clear notifications (useful on logout)
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  // Initialize on mount and when auth changes
  useEffect(() => {
    const authenticated = isAuthenticated();

    if (authenticated && !isAuthenticatedRef.current) {
      // User just logged in
      isAuthenticatedRef.current = true;
      fetchNotifications();
      initializeSocket();
    } else if (!authenticated && isAuthenticatedRef.current) {
      // User just logged out
      isAuthenticatedRef.current = false;
      clearNotifications();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [fetchNotifications, initializeSocket, clearNotifications]);

  // Listen for storage changes (logout in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        if (!e.newValue) {
          // Token was removed (logout)
          clearNotifications();
          isAuthenticatedRef.current = false;
        } else if (!isAuthenticatedRef.current) {
          // Token was added (login)
          isAuthenticatedRef.current = true;
          fetchNotifications();
          initializeSocket();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [clearNotifications, fetchNotifications, initializeSocket]);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return context;
}
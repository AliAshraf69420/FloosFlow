import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import notificationService from "../services/notificationService";

const NotificationsContext = createContext(null);

const SOCKET_URL = "http://localhost:5000";

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const isAuthenticatedRef = useRef(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isAuthenticated = () => !!localStorage.getItem("authToken");

  // Initialize WebSocket
  const initializeSocket = useCallback(() => {
    if (!isAuthenticated() || socketRef.current) return;

    const token = localStorage.getItem("authToken");
    console.log("🔑 Initializing socket with token:", token ? "✅ exists" : "❌ missing");

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current.on("notification", (notification) => {
      console.log("🔔 Notification received:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });

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

  // Fetch all notifications
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated()) {
      setNotifications([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAllNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark single notification as read
  const markAsRead = useCallback(async (id) => {
    try {
      await notificationService.markAsRead(id);
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
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  // Initialize on mount or auth changes
  useEffect(() => {
    const authenticated = isAuthenticated();

    if (authenticated && !isAuthenticatedRef.current) {
      isAuthenticatedRef.current = true;
      fetchNotifications();
      initializeSocket();
    } else if (!authenticated && isAuthenticatedRef.current) {
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

  // Listen for token changes (logout/login in other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        if (!e.newValue) {
          clearNotifications();
          isAuthenticatedRef.current = false;
        } else if (!isAuthenticatedRef.current) {
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

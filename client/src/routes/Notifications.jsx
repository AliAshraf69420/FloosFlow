import { useNotifications } from "../context/NotificationsContext";
import NotificationHeader from "../components/Notifications/NotificationHeader";
import NotificationItem from "../components/Notifications/NotificationItem";
import EmptyNotifications from "../components/Notifications/EmptyNotifications";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const { notifications, unreadCount, loading, error, markAsRead, markAllAsRead } = useNotifications();
  const { fetchUser } = useUser()
  const navigate = useNavigate(); // to redirect after login

  useEffect(async () => {
    await fetchUser()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-ff-bg-dark px-4 sm:px-6 lg:px-10 py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-ff-accent rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Loading notifications...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ff-bg-dark px-4 sm:px-6 lg:px-10 py-24 overflow-y-auto scroll-smooth">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
        />

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        ) : (
          <EmptyNotifications />
        )}
      </div>
    </main>
  );
}

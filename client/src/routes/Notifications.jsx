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

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, [fetchUser]);

  return (
    <main className="min-h-screen bg-ff-bg-dark px-4 sm:px-6 lg:px-10 py-12 sm:py-24 overflow-y-auto scroll-smooth flex flex-col items-center">
      <div className="w-full max-w-3xl">
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

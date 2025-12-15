import React, { useState } from "react";
import NotificationHeader from "../components/Notifications/NotificationHeader";
import NotificationItem from "../components/Notifications/NotificationItem";
import EmptyNotifications from "../components/Notifications/EmptyNotifications";

const initialNotifications = [
  {
    id: 1,
    title: "Payment Received",
    message: "You received $250.00 from John Doe",
    time: "2 minutes ago",
    read: false,
    type: "payment",
  },
  {
    id: 2,
    title: "Transfer Successful",
    message: "Your transfer of $100.00 to Jane Smith was completed",
    time: "1 hour ago",
    read: false,
    type: "transfer",
  },
  {
    id: 3,
    title: "Card Added",
    message: "Your new card ending in 4532 has been added successfully",
    time: "3 hours ago",
    read: true,
    type: "card",
  },
  {
    id: 4,
    title: "Security Alert",
    message: "New login detected from a new device",
    time: "Yesterday",
    read: true,
    type: "security",
  },
  {
    id: 5,
    title: "Monthly Statement",
    message: "Your November statement is now available",
    time: "2 days ago",
    read: true,
    type: "statement",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="min-h-screen bg-[#121212] px-4 sm:px-6 lg:px-10 py-24 overflow-y-auto scroll-smooth">
      <div className="max-w-3xl mx-auto">
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
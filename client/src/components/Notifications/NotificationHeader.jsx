import React from "react";

export default function NotificationHeader({ unreadCount, onMarkAllAsRead }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Notifications</h1>
        {unreadCount > 0 && (
          <p className="text-white/60 text-sm mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
      {unreadCount > 0 && (
        <button
          onClick={onMarkAllAsRead}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold text-sm hover:scale-105 transition-transform duration-200"
        >
          Mark all as read
        </button>
      )}
    </div>
  );
}
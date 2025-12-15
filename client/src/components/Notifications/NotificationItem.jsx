import React from "react";
import NotificationIcon from "./NotificationIcon";

export default function NotificationItem({ notification, onMarkAsRead }) {
  const { id, title, message, time, read, type } = notification;

  return (
    <div
      className={`ff-card-Transfer p-4 flex items-start gap-4 transition-all duration-200 ${
        !read ? "border-l-4 border-[#49EB8C]" : ""
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          !read
            ? "bg-gradient-to-br from-[#62A6BF] to-[#49EB8C] text-white"
            : "bg-white/10 text-white/60"
        }`}
      >
        <NotificationIcon type={type} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold ${!read ? "text-white" : "text-white/70"}`}>
            {title}
          </h3>
          <span className="text-white/40 text-xs flex-shrink-0">{time}</span>
        </div>
        <p className={`text-sm mt-1 ${!read ? "text-white/80" : "text-white/50"}`}>
          {message}
        </p>
      </div>

      {/* Mark as read button */}
      {!read && (
        <button
          onClick={() => onMarkAsRead(id)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200 flex-shrink-0"
          title="Mark as read"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
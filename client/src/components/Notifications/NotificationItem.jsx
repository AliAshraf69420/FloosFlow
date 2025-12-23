import React, { useEffect, useState } from "react";
import NotificationIcon from "./NotificationIcon";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";
export default function NotificationItem({ notification, onMarkAsRead }) {
  const { id, message, createdAt, read, type, UserMessage } = notification;
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser()

  // Format the date/time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Extract title from message (first line or first 50 chars)
  const getTitle = (msg) => {
    const firstLine = msg.split('\n')[0];
    return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
  };

  // Get message body (rest of the message or truncate if too long)
  const getMessageBody = (msg) => {
    const lines = msg.split('\n');
    if (lines.length > 1) {
      return lines.slice(1).join('\n');
    }
    return msg.length > 50 ? msg : '';
  };

  const title = getTitle(message);
  const body = getMessageBody(message);

  // Handle accepting money request
  const handleAcceptRequest = async () => {
    try {
      // Extract amount and requester email from the message
      // Message format: "FirstName LastName is requesting $amount..."
      const amountMatch = message.match(/\$(\d+(?:\.\d+)?)/);
      const amount = amountMatch ? parseFloat(amountMatch[1]) : null;

      if (!amount) {
        alert("Unable to process request - missing information");
        return;
      }

      // Show confirmation prompt
      const confirmation = window.confirm(
        `Accept money request for $${amount}?\n\nThis will transfer the money from your selected card.`
      );

      if (!confirmation) return;

      setIsProcessing(true);

      // Call transferMoney - you'll need to get the requester's email and your card ID
      // For now, we'll need to extract or pass additional data
      // This is a simplified version - you may need to store more data in the notification

      await transactionService.transferMoney({
        recipientEmail: user.email,
        amount: amount,
        senderCardId: user.cards.find(card => card.isSelectedForReceiving).id,
        message: `Accepting your request: ${UserMessage || ''}`
      });

      alert("Transfer successful!");
      onMarkAsRead(id);
    } catch (error) {
      console.error("Transfer error:", error);
      alert(`Transfer failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div
      className={`ff-card-Transfer p-4 flex items-start gap-4 transition-all duration-200 ${!read ? "border-l-4 border-[#49EB8C]" : ""
        }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${!read
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
          <span className="text-white/40 text-xs flex-shrink-0">
            {formatTime(createdAt)}
          </span>
        </div>
        {body && (
          <p className={`text-sm mt-1 ${!read ? "text-white/80" : "text-white/50"}`}>
            {body}

          </p>
        )}
        {UserMessage && (
          <p className={`text-sm mt-1 ${!read ? "text-white/80" : "text-white/50"}`}>
            Message : {UserMessage}
          </p>
        )}
      </div>

      {/* Mark as read button */}
      {type === "request" && !read && (
        <button
          onClick={handleAcceptRequest}
          disabled={isProcessing}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#62A6BF] to-[#49EB8C] text-white font-semibold hover:opacity-90 transition-all duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Accept money request"
          aria-label="Accept money request"
        >
          {isProcessing ? "Processing..." : "Accept"}
        </button>
      )}

      {!read && (

        <button
          onClick={() => onMarkAsRead(id)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200 flex-shrink-0"
          title="Mark as read"
          aria-label="Mark notification as read"
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
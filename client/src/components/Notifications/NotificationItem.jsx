import React, { useEffect, useState } from "react";
import NotificationIcon from "./NotificationIcon";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";

export default function NotificationItem({ notification, onMarkAsRead }) {
  const { id, message, createdAt, read, type, UserMessage, requesterEmail, requestAmount } = notification;
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Extract title from message
  const getTitle = (msg) => {
    const firstLine = msg.split("\n")[0];
    return firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine;
  };

  // Get message body
  const getMessageBody = (msg) => {
    const lines = msg.split("\n");
    if (lines.length > 1) {
      return lines.slice(1).join("\n");
    }
    return msg.length > 50 ? msg : "";
  };

  const title = getTitle(message);
  const body = getMessageBody(message);

  // Handle accepting money request
  const handleAcceptRequest = async () => {
    try {
      const amount = requestAmount ? parseFloat(requestAmount) : null;

      if (!amount || !requesterEmail) {
        alert("Unable to process request - missing information");
        return;
      }

      const selectedCard = user?.selectedReceivingCard;
      if (!selectedCard) {
        alert("You don't have a card selected for receiving/sending money");
        return;
      }

      if (parseFloat(selectedCard.balance) < amount) {
        alert(`Insufficient balance. You need $${amount} but only have $${parseFloat(selectedCard.balance).toFixed(2)}`);
        return;
      }

      const confirmation = window.confirm(
        `Accept money request for $${amount} from ${requesterEmail}?\n\nThis will transfer the money from your card ending in ${selectedCard.cardNumber.slice(-4)}.`
      );

      if (!confirmation) return;

      setIsProcessing(true);

      await transactionService.transferMoney({
        recipientEmail: requesterEmail,
        amount: amount,
        senderCardId: selectedCard.id,
        message: `Accepting your request${UserMessage ? `: ${UserMessage}` : ""}`,
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
      className={`ff-card-Transfer p-4 flex items-start gap-4 transition-all duration-200 ${
        !read ? "border-l-4 border-[#49EB8C]" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          !read ? "bg-gradient-to-br from-[#62A6BF] to-[#49EB8C] text-white" : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/60"
        }`}
      >
        <NotificationIcon type={type} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold ${!read ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-white/70"}`}>
            {title}
          </h3>
          <span className="text-gray-400 dark:text-white/40 text-xs flex-shrink-0">{formatTime(createdAt)}</span>
        </div>

        {(body || UserMessage) && (
          <p className={`text-sm mt-1 ${!read ? "text-gray-700 dark:text-white/80" : "text-gray-500 dark:text-white/50"}`}>
            {body || `Message: ${UserMessage}`}
          </p>
        )}
      </div>

      {/* Action buttons */}
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
          className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-all duration-200 flex-shrink-0"
          title="Mark as read"
          aria-label="Mark notification as read"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

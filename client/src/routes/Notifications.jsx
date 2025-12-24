import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../context/NotificationsContext";
import NotificationHeader from "../components/Notifications/NotificationHeader";
import NotificationItem from "../components/Notifications/NotificationItem";
import EmptyNotifications from "../components/Notifications/EmptyNotifications";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const listVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

export default function NotificationsPage() {
  const { notifications, unreadCount, loading, error, markAsRead, markAllAsRead } = useNotifications();
  const { fetchUser } = useUser();
  const navigate = useNavigate();

  // Optionally fetch user data on mount
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

  if (loading) {
    return (
      <motion.main
        className="min-h-screen bg-ff-bg-light dark:bg-ff-bg-dark px-4 sm:px-6 lg:px-10 py-24 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-gray-300 dark:border-white/20 border-t-ff-accent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-white/60 text-sm">Loading notifications...</p>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="min-h-screen bg-ff-bg-light dark:bg-ff-bg-dark px-4 sm:px-6 lg:px-10 py-24 overflow-y-auto scroll-smooth"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="main" // Landmark for the main content
    >
      <div className="max-w-3xl mx-auto">
        {/* Error Message with aria-live for screen readers */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="alert" // Ensures screen readers announce it immediately
              aria-live="assertive" // Immediate announcement for urgent errors
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NotificationHeader
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            aria-label={`You have ${unreadCount} unread notifications`} // Accessible label for screen readers
          />
        </motion.div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <motion.div
            className="space-y-3"
            variants={listVariants}
            initial="initial"
            animate="animate"
            aria-live="polite" // Announce the notifications updates
          >
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  variants={itemVariants}
                  layout
                  className="hover-lift"
                  aria-labelledby={`notification-${notification.id}`} // Adds accessibility label to each notification
                >
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    aria-label={`Mark notification from ${notification.sender} as read`} // Label for screen readers
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EmptyNotifications />
          </motion.div>
        )}
      </div>
    </motion.main>

  );
}

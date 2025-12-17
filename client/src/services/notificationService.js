// src/services/notificationService.js
import apiClient from './apiClient';

const notificationService = {
    // Get all notifications
    getAllNotifications: async (params = {}) => {
        try {
            const response = await apiClient.get('/notifications', { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching all notifications:", error);
            throw error;
        }
    },

    // Get single notification
    getSingleNotification: async (notificationId) => {
        try {
            const response = await apiClient.get(`/notifications/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching notification ${notificationId}:`, error);
            throw error;
        }
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        try {
            const response = await apiClient.post(`/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            console.error(`Error marking notification ${notificationId} as read:`, error);
            throw error;
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            const response = await apiClient.post('/notifications/read-all');
            return response.data;
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
            throw error;
        }
    },

    // Delete notification
    deleteNotification: async (notificationId) => {
        try {
            const response = await apiClient.delete(`/notifications/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting notification ${notificationId}:`, error);
            throw error;
        }
    }
};

export default notificationService;

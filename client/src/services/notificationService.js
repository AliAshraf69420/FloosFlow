// src/services/notificationService.js
import apiClient from './apiClient';
//// NOT YET CONFIGURED, DON'T SCREW IT
const notificationService = {
    // Get all notifications
    getAllNotifications: async (params = {}) => {
        const response = await apiClient.get('/notifications', { params });
        return response.data;
    },

    // Get single notification
    getSingleNotification: async (notificationId) => {
        const response = await apiClient.get(`/notifications/${notificationId}`);
        return response.data;
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        const response = await apiClient.put(`/notifications/${notificationId}/read`);
        return response.data;
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        const response = await apiClient.put('/notifications/read-all');
        return response.data;
    },

    // Delete notification
    deleteNotification: async (notificationId) => {
        const response = await apiClient.delete(`/notifications/${notificationId}`);
        return response.data;
    }
};

export default notificationService;
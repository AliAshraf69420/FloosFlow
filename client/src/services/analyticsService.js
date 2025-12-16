// src/services/analyticsService.js
import apiClient from './apiClient';

const analyticsService = {
    // Get analytics data
    getAnalytics: async (params = {}) => {
        const response = await apiClient.get('/analytics/analytics', { params });
        return response.data;
    },


};

export default analyticsService;
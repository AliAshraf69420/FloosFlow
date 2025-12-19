// src/services/analyticsService.js
import apiClient from './apiClient';

const analyticsService = {
    // Get analytics data
    getAnalytics: async (params = {}) => {
        const response = await apiClient.get('/analytics/analytics', { params });
        console.log(response.data);
        console.log(response.status)
        return response.data;
    },


};

export default analyticsService;
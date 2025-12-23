// src/services/authService.js
import apiClient from './apiClient';
import { useNotifications } from '../context/NotificationsContext';
const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        }
        catch (err) {
            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to register";
            console.log(message)
            throw new Error(message);
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            console.log(response.status);
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (err) {
            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to login";
            console.log(message)
            throw new Error(message);
        }
    },

    // Google OAuth login
    googleAuth: async (googleToken) => {
        try {
            const response = await apiClient.post('/auth/google', { token: googleToken });
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (err) {
            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to login";
            console.log(message)
            throw new Error(message);
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/Login';
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    // Get current user
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('authToken');
    }
};

export default authService;
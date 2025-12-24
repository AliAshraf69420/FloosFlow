// src/services/apiClient.js
import axios from 'axios';
import dotenv from 'dotenv';
// Base configuration
// Use Vite env when available, fallback to VPS URL for production build
const BASE_URL = import.meta?.env?.VITE_API_URL || "http://179.61.219.167:4000/api";

// Create axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,

    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - token expired or invalid
        // But DON'T redirect if we're already on the login call
        if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/Login';
        }

        // Handle other errors
        const errorMessage = error.response?.data?.error || error.response?.data?.message || 'An error occurred';
        console.error('API Error:', errorMessage);

        return Promise.reject(error);
    }
);

export default apiClient;